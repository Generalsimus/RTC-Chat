import { addLoader } from "./addLoader.js";
import { addMessage } from "./addMessage.js";

export const createWebSockMessageListener = (socket, RTCMediaStream, webSockState, connectFormState) => {
    const loader = addLoader();
    const callSafe = async (callBack) => {
        try {
            await callBack();
        } catch (e) {
            loader.start("Waiting Partner...");
            await webSockState.sendData({
                type: "INIT_CLIENT_CONNECT"
            });
            await webSockState.sendData({
                type: "GET_RTC_OFFER"
            });
        }
    };
    // Listen for messages
    socket.addEventListener('message', async (event) => {
        // console.log('Message from server ', event.data); 
        const messageData = JSON.parse(event.data);
        await RTCMediaStream.addIceCandidateListener((event) => {
            if (event.candidate) {
                webSockState.sendData({
                    type: "ADD_ICE_CANDIDATE_FOR_MY_PEAR",
                    candidate: event.candidate.toJSON(),
                });
            }

        });

        switch (messageData.data.type) {
            case "GET_RTC_OFFER":
                loader.start("Waiting answer...");
                callSafe(async () => {
                    const offer = await RTCMediaStream.createOffer();
                    await webSockState.sendData({
                        type: "SEND_CREATED_OFFER",
                        offer: offer
                    });
                })
                break;
            case "GET_ANSWER_OF_OFFER":
                loader.start("Send Answer...");
                callSafe(async () => {
                    await RTCMediaStream.catchOffer(messageData.data.offer);
                    const answer = await RTCMediaStream.createAnswer();
                    webSockState.sendData({
                        type: "SEND_ANSWER_FOR_OFFER_CREATOR",
                        answer: answer
                    });
                })
                break;
            case "CATCH_ANSWER":
                loader.start("Waiting candidate...");
                callSafe(async () => {
                    await RTCMediaStream.catchAnswer(messageData.data.answer);
                });
                break;
            case "ADD_ICE_CANDIDATE":
                loader.end();
                callSafe(async () => {
                    await RTCMediaStream.addIceCandidate(messageData.data.candidate);
                })
                break;
            case "CATCH_TEXT_MESSAGE":
                webSockState.sendData({
                    type: "TRANSLATE_TEXT_MESSAGE",
                    language: connectFormState.language,
                    author: messageData.data.author,
                    message: messageData.data.message
                });
                break;
            case "CATCH_TRANSLATED_TEXT_MESSAGE":
                const authorIndex = connectFormState.myName === messageData.data.author ? "me" : "you";
                addMessage(messageData.data.translatedMessage, messageData.data.originalMessage, authorIndex);
                break;
        }
    });
}
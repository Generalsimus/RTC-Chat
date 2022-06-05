import { addLoader } from "./addLoader.js";
import { addMessage } from "./addMessage.js";

export const createWebSockMessageListener = (socket, RTCMediaStream, webSockState, connectFormState) => {
    const chatBox = document.querySelector('.chat-start-messaging-here');
    // Listen for messages
    socket.addEventListener('message', async (event) => {
        // console.log('Message from server ', event.data); 
        const loader = addLoader();
        const messageData = JSON.parse(event.data);
        await RTCMediaStream.addIceCandidateListener((event) => {
            if (event.candidate) {
                loader.start("Waiting candidate...");
                webSockState.sendData({
                    type: "ADD_ICE_CANDIDATE_FOR_MY_PEAR",
                    candidate: event.candidate.toJSON(),
                });
            }

        });

        switch (messageData.data.type) {
            case "GET_RTC_OFFER":
                loader.start("Waiting answer...");
                const offer = await RTCMediaStream.createOffer();
                webSockState.sendData({
                    type: "SEND_CREATED_OFFER",
                    offer: offer
                });
                break;
            case "GET_ANSWER_OF_OFFER":
                loader.start("Send Answer...");
                await RTCMediaStream.catchOffer(messageData.data.offer);
                const answer = await RTCMediaStream.createAnswer();
                webSockState.sendData({
                    type: "SEND_ANSWER_FOR_OFFER_CREATOR",
                    answer: answer
                });
                break;
            case "CATCH_ANSWER":
                loader.start("Take Answer...");
                await RTCMediaStream.catchAnswer(messageData.data.answer);
                break;
            case "ADD_ICE_CANDIDATE":
                loader.end();
                await RTCMediaStream.addIceCandidate(messageData.data.candidate);
                break;
            case "CATCH_TEXT_MESSAGE":
                const authorIndex = connectFormState.myName === messageData.data.author ? "me" : "you"
                addMessage(messageData.data.message, authorIndex);
                break;

        }
    });
}
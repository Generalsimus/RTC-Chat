export const createWebSocket = async (RTCMediaStream, connectFormState) => {
    const wsProtocol = window.location.protocol === "http:" ? "ws" : "wss"
    const socket = new WebSocket(`${wsProtocol}://${window.location.host}/sw`);
    const webSockState = {
        sendData(data = {}) {
            socket.send(JSON.stringify({
                author: connectFormState.myName,
                connectToName: connectFormState.yourName,
                data: data
            }));
        }
    }

    socket.addEventListener('open', async (event) => {
        webSockState.sendData({
            type: "INIT_CLIENT_CONNECT"
        })
        webSockState.sendData({
            type: "GET_RTC_OFFER"
        })
    });

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
                const offer = await RTCMediaStream.createOffer();
                webSockState.sendData({
                    type: "SEND_CREATED_OFFER",
                    offer: offer
                });
                break;
            case "GET_ANSWER_OF_OFFER":
                await RTCMediaStream.catchOffer(messageData.data.offer);
                const answer = await RTCMediaStream.createAnswer();
                webSockState.sendData({
                    type: "SEND_ANSWER_FOR_OFFER_CREATOR",
                    answer: answer
                });
                break;
            case "CATCH_ANSWER":
                await RTCMediaStream.catchAnswer(messageData.data.answer);
                break;
            case "ADD_ICE_CANDIDATE":
                console.log("🚀 --> file: createWebSocket.js --> line 28 --> socket.addEventListener --> messageData", messageData);
                await RTCMediaStream.addIceCandidate(messageData.data.candidate);
                break;
            // case "ADD_ICE_CANDIDATE_FOR_MY_PEAR":
            //     SENT({ type: "ADD_ICE_CANDIDATE", answer: messageData.data.iceCandidate }, paraClient);
            // case "TAKE_OFFER_AND_ANSWER":

            //     console.log("🚀 --> file: createWebSocket.js --> line 30 --> socket.addEventListener --> messageData.data.offerData", messageData.data.offerData);

            //     await RTCMediaStream.catchOffer(messageData.data.offerData);

            //     const answer = await RTCMediaStream.createAnswer();

            //     webSockState.sendData({
            //         type: "TAKE_MY_ANSWER_FOR_OFFER",
            //         answer: answer
            //         // {
            //         //     type: answer.type,
            //         //     sdp: answer.sdp,
            //         // }
            //     });


            //     await RTCMediaStream.addIceCandidateListener((event) => {
            //         console.log("🚀 --> file: createWebSocket.js --> line 42 --> awaitRTCMediaStream.addIceCandidateListener --> event", event);
            //         if (event.candidate) {
            //             webSockState.sendData({
            //                 type: "ADD_CANDIDATE_FOR_MY_PEAR",
            //                 iceCandidate: event.candidate
            //             });
            //         }
            //     });

            //     break
            // case "CATCH_ANSWER_FOR_FOR_OFFER":
            //     console.log("🚀 --> file: createWebSocket.js --> line 57 --> socket.addEventListener --> messageData.data.answer", messageData.data.answer);

            //     await RTCMediaStream.catchAnswer(messageData.data.answer);

            //     await RTCMediaStream.addIceCandidateListener((event) => {
            //         console.log("🚀 --> file: createWebSocket.js --> line 42 --> awaitRTCMediaStream.addIceCandidateListener --> event", event);
            //         if (event.candidate) {
            //             // webSockState.sendData({
            //             //     type: "ADD_CANDIDATE_FOR_MY_PEAR",
            //             //     iceCandidate: event.candidate.toJSON()
            //             // });
            //         }
            //     });
            //     break
            // case "ADD_ICE_CANDIDATE":
            //     console.log("🚀 --> file: createWebSocket.js --> line 72 --> socket.addEventListener --> messageData.data.iceCandidate", messageData.data.iceCandidate);

            //     await RTCMediaStream.addIceCandidate(messageData.data.iceCandidate);
            //     break
        }
    });
    return webSockState
}
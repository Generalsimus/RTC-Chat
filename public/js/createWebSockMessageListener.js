export const createWebSockMessageListener = (socket, webSockState) => {
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
            case "CATCH_TEXT_MESSAGE":
                break;

        }
    });
}
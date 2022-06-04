export const createWebSocket = async (RTCMediaStream, connectFormState) => {

    const socket = new WebSocket(`ws://${window.location.host}/sw`);
    const webSockState = {
        sendData(data) {
            socket.send(JSON.stringify({
                author: connectFormState.myName,
                connectToName: connectFormState.yourName,
                data: data
            }));
        }
    }

    socket.addEventListener('open', async (event) => {
        const offerDescription = await RTCMediaStream.createOffer();
        webSockState.sendData({
            type: "GET_MY_OFFER_OR_TAKE_MAIN",
            offer: {
                sdp: offerDescription.sdp,
                type: offerDescription.type,
            }
        })
    });

    // Listen for messages
    socket.addEventListener('message', async (event) => {
        console.log('Message from server ', event.data);
    });
    return webSockState
}
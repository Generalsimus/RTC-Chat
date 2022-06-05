import { addLoader } from "./addLoader.js";
import { cerateChatMessenger } from "./cerateChatMessenger.js";
import { createWebSockMessageListener } from "./createWebSockMessageListener.js";

const createWebSocketServer = () => {
    const wsProtocol = window.location.protocol === "http:" ? "ws" : "wss"
    let socket = new WebSocket(`${wsProtocol}://${window.location.host}/sw`);
    return socket
}

export const createWebSocket = async (RTCMediaStream, connectFormState) => {
    let socket
    const loader = addLoader();
    const webSockState = {
        async sendData(data = {}) {
            if (!socket || socket.readyState === WebSocket.CLOSED) {
                loader.start();
                loader.setMessage("Connecting...");

                socket = createWebSocketServer();

                await new Promise((resolve, reject) => (socket.addEventListener('open', resolve)));

                createWebSockMessageListener(socket, RTCMediaStream, webSockState, connectFormState);
                socket.addEventListener('close', function (event) {
                    webSockState.sendData({
                        type: "INIT_CLIENT_CONNECT"
                    });
                });
                loader.end();
            }

            socket.send(JSON.stringify({
                author: connectFormState.myName,
                connectToName: connectFormState.yourName,
                language: connectFormState.language,
                data: data
            }));
        }
    }
    await webSockState.sendData({
        type: "INIT_CLIENT_CONNECT"
    });
    loader.start();
    loader.setMessage("Waiting Partner...");
    await webSockState.sendData({
        type: "GET_RTC_OFFER"
    });

    cerateChatMessenger(webSockState);
    return webSockState
}
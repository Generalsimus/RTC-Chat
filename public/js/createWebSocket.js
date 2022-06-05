import { createWebSockMessageListener } from "./createWebSockMessageListener.js";

const createWebSocketServer = () => {
    const wsProtocol = window.location.protocol === "http:" ? "ws" : "wss"
    let socket = new WebSocket(`${wsProtocol}://${window.location.host}/sw`);
    return socket
}

export const createWebSocket = async (RTCMediaStream, connectFormState) => {
    let socket
    const webSockState = {
        async sendData(data = {}) {
            if (!socket || socket.readyState === WebSocket.CLOSED) {
                socket = createWebSocketServer();
                await new Promise((resolve, reject) => socket.addEventListener('open', resolve));
                webSockState.sendData({
                    type: "GET_RTC_OFFER"
                })
                createWebSockMessageListener(socket, RTCMediaStream, webSockState);
                socket.addEventListener('close', function (event) {
                    webSockState.sendData({
                        type: "INIT_CLIENT_CONNECT"
                    });
                });
            }

            socket.send(JSON.stringify({
                author: connectFormState.myName,
                connectToName: connectFormState.yourName,
                data: data
            }));
        }
    }

    webSockState.sendData({
        type: "INIT_CLIENT_CONNECT"
    });

    return webSockState
}
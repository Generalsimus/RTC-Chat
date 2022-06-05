"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWebSocket = void 0;
const createWebSockMessageListener_js_1 = require("./createWebSockMessageListener.js");
const createWebSocketServer = () => {
    const wsProtocol = window.location.protocol === "http:" ? "ws" : "wss";
    let socket = new WebSocket(`${wsProtocol}://${window.location.host}/sw`);
    return socket;
};
const createWebSocket = (RTCMediaStream, connectFormState) => __awaiter(void 0, void 0, void 0, function* () {
    let socket;
    const webSockState = {
        sendData(data = {}) {
            return __awaiter(this, void 0, void 0, function* () {
                if (!socket || socket.readyState === WebSocket.CLOSED) {
                    socket = createWebSocketServer();
                    yield new Promise((resolve, reject) => socket.addEventListener('open', resolve));
                    webSockState.sendData({
                        type: "INIT_CLIENT_CONNECT"
                    });
                    webSockState.sendData({
                        type: "GET_RTC_OFFER"
                    });
                    (0, createWebSockMessageListener_js_1.createWebSockMessageListener)(socket, webSockState);
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
            });
        }
    };
    return webSockState;
});
exports.createWebSocket = createWebSocket;

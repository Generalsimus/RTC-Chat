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
exports.createWebSockMessageListener = void 0;
const createWebSockMessageListener = (socket, webSockState) => {
    // Listen for messages
    socket.addEventListener('message', (event) => __awaiter(void 0, void 0, void 0, function* () {
        // console.log('Message from server ', event.data);
        const messageData = JSON.parse(event.data);
        yield RTCMediaStream.addIceCandidateListener((event) => {
            if (event.candidate) {
                webSockState.sendData({
                    type: "ADD_ICE_CANDIDATE_FOR_MY_PEAR",
                    candidate: event.candidate.toJSON(),
                });
            }
        });
        switch (messageData.data.type) {
            case "GET_RTC_OFFER":
                const offer = yield RTCMediaStream.createOffer();
                webSockState.sendData({
                    type: "SEND_CREATED_OFFER",
                    offer: offer
                });
                break;
            case "GET_ANSWER_OF_OFFER":
                yield RTCMediaStream.catchOffer(messageData.data.offer);
                const answer = yield RTCMediaStream.createAnswer();
                webSockState.sendData({
                    type: "SEND_ANSWER_FOR_OFFER_CREATOR",
                    answer: answer
                });
                break;
            case "CATCH_ANSWER":
                yield RTCMediaStream.catchAnswer(messageData.data.answer);
                break;
            case "ADD_ICE_CANDIDATE":
                console.log("🚀 --> file: createWebSocket.js --> line 28 --> socket.addEventListener --> messageData", messageData);
                yield RTCMediaStream.addIceCandidate(messageData.data.candidate);
                break;
            case "CATCH_TEXT_MESSAGE":
                break;
        }
    }));
};
exports.createWebSockMessageListener = createWebSockMessageListener;

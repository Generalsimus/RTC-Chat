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
const addLoader_js_1 = require("./addLoader.js");
const addMessage_js_1 = require("./addMessage.js");
const createWebSockMessageListener = (socket, RTCMediaStream, webSockState, connectFormState) => {
    const chatBox = document.querySelector('.chat-start-messaging-here');
    // Listen for messages
    socket.addEventListener('message', (event) => __awaiter(void 0, void 0, void 0, function* () {
        // console.log('Message from server ', event.data); 
        const loader = (0, addLoader_js_1.addLoader)();
        const messageData = JSON.parse(event.data);
        yield RTCMediaStream.addIceCandidateListener((event) => {
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
                const offer = yield RTCMediaStream.createOffer();
                webSockState.sendData({
                    type: "SEND_CREATED_OFFER",
                    offer: offer
                });
                break;
            case "GET_ANSWER_OF_OFFER":
                loader.start("Send Answer...");
                yield RTCMediaStream.catchOffer(messageData.data.offer);
                const answer = yield RTCMediaStream.createAnswer();
                webSockState.sendData({
                    type: "SEND_ANSWER_FOR_OFFER_CREATOR",
                    answer: answer
                });
                break;
            case "CATCH_ANSWER":
                loader.start("Take Answer...");
                yield RTCMediaStream.catchAnswer(messageData.data.answer);
                break;
            case "ADD_ICE_CANDIDATE":
                loader.end();
                yield RTCMediaStream.addIceCandidate(messageData.data.candidate);
                break;
            case "CATCH_TEXT_MESSAGE":
                const authorIndex = connectFormState.myName === messageData.data.author ? "me" : "you";
                (0, addMessage_js_1.addMessage)(messageData.data.message, authorIndex);
                break;
        }
    }));
};
exports.createWebSockMessageListener = createWebSockMessageListener;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cerateChatMessenger = void 0;
const cerateChatMessenger = (webSockState) => {
    const formTag = document.querySelector('.chat-form');
    const inputTag = document.querySelector('.chat-text-input');
    const convertValue = (v) => v.trim();
    formTag.addEventListener('submit', (e) => {
        e.preventDefault();
        webSockState.sendData({
            type: 'CATCH_TEXT_MESSAGE',
            message: convertValue(inputTag.value)
        });
        inputTag.value = "";
        inputTag.focus();
    });
};
exports.cerateChatMessenger = cerateChatMessenger;

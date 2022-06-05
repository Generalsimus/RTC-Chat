"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cerateChatMessenger = void 0;
const addMessage_js_1 = require("./addMessage.js");
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
        (0, addMessage_js_1.addMessage)(inputTag.value, "me");
        inputTag.value = "";
        inputTag.focus();
    });
    // const onChangeInputValue = () => {
    // }
    // inputTag.addEventListener('change', onChangeInputValue)
    // inputTag.addEventListener('input', onChangeInputValue)
};
exports.cerateChatMessenger = cerateChatMessenger;

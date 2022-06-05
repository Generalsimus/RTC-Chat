"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addMessage = void 0;
const chatBox = document.querySelector('.chat-start-messaging-here');
const addMessage = (translatedMessage = "", originalMessage = "", type = "me") => {
    const date = new Date();
    chatBox.insertAdjacentHTML("afterend", /* html */ `
    <div class=${"chat-message-" + type}>
    <div>
        <div  class="chat-text-message-translated">${translatedMessage}</div>
        <div class="chat-text-message-original">${originalMessage}</div>
    </div>
    <div class="chat-message-time">${date.getHours() + `:` + date.getMinutes()}</div>
    </div>
    `);
};
exports.addMessage = addMessage;

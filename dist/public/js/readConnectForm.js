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
exports.readConnectForm = void 0;
const readConnectForm = () => __awaiter(void 0, void 0, void 0, function* () {
    const myNameInput = document.querySelector('.my-join-name');
    const yourNameInput = document.querySelector('.your-join-name');
    const joinChatButton = document.querySelector('.join-chat-button');
    const chatFormContainerTag = document.querySelector('.join-chat-form');
    const chatMessengerContainer = document.querySelector('.chat-container');
    const nameState = {
        myName: undefined,
        yourName: undefined,
    };
    myNameInput.addEventListener('change', (e) => {
        nameState.myName = myNameInput.value.trim();
    });
    myNameInput.addEventListener('input', (e) => {
        nameState.myName = myNameInput.value.trim();
    });
    yourNameInput.addEventListener('change', (e) => {
        nameState.yourName = yourNameInput.value.trim();
    });
    yourNameInput.addEventListener('input', (e) => {
        nameState.yourName = yourNameInput.value.trim();
    });
    chatFormContainerTag.addEventListener('submit', (e) => {
        e.preventDefault();
        chatFormContainerTag.style.display = 'none';
        chatMessengerContainer.style.display = 'flex';
    });
    return {
        nameState,
        onSubmit(callBack) {
            chatFormContainerTag.addEventListener('submit', (e) => {
                e.preventDefault();
                callBack(nameState);
            });
        }
    };
});
exports.readConnectForm = readConnectForm;

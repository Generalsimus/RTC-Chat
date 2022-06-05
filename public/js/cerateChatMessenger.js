import { addMessage } from "./addMessage.js";

export const cerateChatMessenger = (webSockState) => {
    const formTag = document.querySelector('.chat-form')
    const inputTag = document.querySelector('.chat-text-input');
    const convertValue = (v) => v.trim()

    formTag.addEventListener('submit', (e) => {
        e.preventDefault();
        webSockState.sendData({
            type: 'CATCH_TEXT_MESSAGE',
            message: convertValue(inputTag.value)
        });

        addMessage(inputTag.value, "me");

        inputTag.value = ""
        inputTag.focus();
    })
    // const onChangeInputValue = () => {

    // }
    // inputTag.addEventListener('change', onChangeInputValue)
    // inputTag.addEventListener('input', onChangeInputValue)

}
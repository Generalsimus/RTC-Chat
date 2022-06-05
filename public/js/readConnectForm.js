export const readConnectForm = async () => {
    const myNameInput = document.querySelector('.my-join-name');
    const yourNameInput = document.querySelector('.your-join-name');
    const joinChatButton = document.querySelector('.join-chat-button');
    const chatFormContainerTag = document.querySelector('.join-chat-form');
    const chatMessengerContainer = document.querySelector('.chat-container');
    const chatMessagingLang = document.querySelector('.chat-messaging-lang');

    const convertValue = (v) => v.trim().toLowerCase();
    const nameState = {
        myName: undefined,
        yourName: undefined,
        language: undefined,
    };

    chatFormContainerTag.addEventListener('submit', (e) => {
        e.preventDefault();
        nameState.myName = convertValue(myNameInput.value);
        nameState.yourName = convertValue(yourNameInput.value);
        nameState.language = convertValue(chatMessagingLang.value);
        chatFormContainerTag.style.display = 'none'
        chatMessengerContainer.style.display = 'flex'
    })


    return {
        nameState,
        onSubmit(callBack) {
            chatFormContainerTag.addEventListener('submit', (e) => {
                e.preventDefault();
                callBack(nameState);
            });

        }
    }
}
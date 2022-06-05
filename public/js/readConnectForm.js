export const readConnectForm = async () => {
    const myNameInput = document.querySelector('.my-join-name');
    const yourNameInput = document.querySelector('.your-join-name');
    const joinChatButton = document.querySelector('.join-chat-button');
    const chatFormContainerTag = document.querySelector('.join-chat-form');
    const chatMessengerContainer = document.querySelector('.chat-container');
    const convertValue = (v) => v.trim().toLowerCase();
    const nameState = {
        myName: undefined,
        yourName: undefined,
    }
    myNameInput.addEventListener('change', (e) => {
        nameState.myName = convertValue(myNameInput.value);
    })
    myNameInput.addEventListener('input', (e) => {
        nameState.myName = convertValue(myNameInput.value);
    })
    yourNameInput.addEventListener('change', (e) => {
        nameState.yourName = convertValue(yourNameInput.value);
    })
    yourNameInput.addEventListener('input', (e) => {
        nameState.yourName = convertValue(yourNameInput.value);
    })
    chatFormContainerTag.addEventListener('submit', (e) => {
        e.preventDefault();
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
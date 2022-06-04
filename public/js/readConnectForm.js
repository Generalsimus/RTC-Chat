export const readConnectForm = async () => {
    const myNameInput = document.querySelector('.my-join-name');
    const yourNameInput = document.querySelector('.your-join-name');
    const joinChatButton = document.querySelector('.join-chat-button');
    const chatFormContainerTag = document.querySelector('.join-chat-form');
    const chatMessengerContainer = document.querySelector('.chat-container');

    const nameState = {
        myName: undefined,
        yourName: undefined,
    }
    myNameInput.addEventListener('change', (e) => {
        nameState.myName = myNameInput.value
    })
    myNameInput.addEventListener('input', (e) => {
        nameState.myName = myNameInput.value
    })
    yourNameInput.addEventListener('change', (e) => {
        nameState.yourName = yourNameInput.value
    })
    yourNameInput.addEventListener('input', (e) => {
        nameState.yourName = yourNameInput.value
    })
    joinChatButton.addEventListener('click', () => {
        chatFormContainerTag.style.display = 'none'
        chatMessengerContainer.style.display = 'flex'
    })

    return nameState
}

const chatBox = document.querySelector('.chat-start-messaging-here');
export const addMessage = (message = "", type = "me") => {
    const date = new Date();
    chatBox.insertAdjacentHTML("afterend", /* html */`
    <div class=${"chat-message-" + type}>
    <div class="chat-text-message">${message}</div>
    <div class="chat-message-time">${date.getHours() + `:` + date.getMinutes()}</div>
    </div>
    `);
}
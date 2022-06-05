
const chatBox = document.querySelector('.chat-start-messaging-here');
export const addMessage = (translatedMessage = "", originalMessage = "", type = "me") => {
    const date = new Date();
    chatBox.insertAdjacentHTML("afterend", /* html */`
    <div class=${"chat-message-" + type}>
    <div>
        <div  class="chat-text-message-translated">${translatedMessage}</div>
        <div class="chat-text-message-original">${originalMessage}</div>
    </div>
    <div class="chat-message-time">${date.getHours() + `:` + date.getMinutes()}</div>
    </div>
    `);
}
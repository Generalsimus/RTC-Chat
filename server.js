
import express from 'express'
import path from 'path';
import WebSocket from 'ws'

export const globalRootDir = path.join(__dirname, '../');


const app = express();



app.use("/", express.static(path.join(globalRootDir, "public")));

const port = Number(process.env.PORT || 3000);

const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));

const webSocketServer = new WebSocket.Server({ server: server, path: "/sw" });
const clientsByName = new Map();
webSocketServer.on('connection', (client) => {
    const SENT = (data, netClient) => (netClient || client).send(JSON.stringify({ data }));


    client.on('message', async (dataString) => {
        const messageData = JSON.parse(dataString);
        const paraClient = clientsByName.get(messageData.connectToName);


        switch (messageData.data.type) {
            case 'INIT_CLIENT_CONNECT':
                clientsByName.set(messageData.author, client);
                client.on('disconnect', () => {
                    if (clientsByName.has(messageData.author)) {
                        clientsByName.delete(messageData.author);
                    }
                })
                break;
            case "GET_RTC_OFFER":
                if (paraClient) {
                    SENT({ type: "GET_RTC_OFFER" }, paraClient);
                }
                break;
            case "SEND_CREATED_OFFER":
                if (paraClient) {
                    SENT({ type: "GET_ANSWER_OF_OFFER", offer: messageData.data.offer }, paraClient);
                }
                break;
            case "SEND_ANSWER_FOR_OFFER_CREATOR":
                if (paraClient) {
                    SENT({ type: "CATCH_ANSWER", answer: messageData.data.answer }, paraClient);
                }
                break;
            case "ADD_ICE_CANDIDATE_FOR_MY_PEAR":
                if (paraClient) {
                    SENT({ type: "ADD_ICE_CANDIDATE", candidate: messageData.data.candidate }, paraClient);
                }
                break;
            case "CATCH_TEXT_MESSAGE":
                const language = messageData.language;
                const translateString = messageData.data.message

                const translatedText = language && translateString;


                if (paraClient) {
                    SENT({
                        type: "CATCH_TEXT_MESSAGE",
                        author: messageData.author,
                        originalMessage: messageData.data.message,
                        message: translatedText || messageData.data.message,
                    }, paraClient);
                }
                SENT({
                    type: "CATCH_TEXT_MESSAGE",
                    author: messageData.author,
                    originalMessage: messageData.data.message,
                    message: translatedText || messageData.data.message,
                });
                break;
        }
    });

});

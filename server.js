
import express from 'express'
import path from 'path';
import WebSocket from 'ws'
// import translate from "translate";
const { Translate } = require('@google-cloud/translate').v2;
const translate = new Translate({
    credentials: {
        "type": "service_account",
        "project_id": "third-light-292100",
        "private_key_id": "1295e61fc46ab6f172773d263a20c624405d1f58",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDNthQA0TyJawLk\nSsu3K8XjiyO52fcv1kBb9Pzp04ohV16jzJH3F2YdORT7aDUy7ty+fby1iMma2njR\n5xo3jo9ywarEKsCjCk0Ily8QMZVQ2oY2UJMqmDwBMQjOA835b3FshueHPpIRgRXN\n7gbQzSr+mDx7DyNtsiXp+bc/QPM6SU/3Jb9ILwO0zR0PKOQGctucUwqnMkQNTnH+\nDhkZHp4r9qblQvZ0di3NDT0saP6S12dIS27+XYvt1hizz20jI3un7vyhV0Brebrm\nEiJv5CU+1UZKSGbg/MU3/HPeD1cgHeplwR2wX+ArGFvCJ/5M84ofQGhiX86hkeQx\n3YhICa33AgMBAAECggEABlMDi2uOB7rX/xUY7TvgchiW08G9OpBvhcQ4OvzAwY9S\nPrPtMDeycSc48L++lEnJVJFAtM4Mm1ZTIj+PdpzLO9/ItGOMwkEbUYPLCR2VIG66\nHepdPpEpQG91p1Zw8IBkxXg3nwNP8fonevTHQIfGO3HfuM15goetvbiVJycuiHX8\nFKeQ5ApKq8tVvOHdyTAOXwkc6wonrE0ChiP1/NTsRFI8qS0SLOnvfxhPnBrHPFMn\nByDEEuFJuEcb7hHqxKF96L96Q4xUAe2j6FaEuKlnAgmpMQ1e9NIMA82QCApsVqaw\nhGoPp4rNRhV4PY/eFQls6vA+18n4ncU/ezdskxhaDQKBgQDwf3GFKCdYnO2IPMLP\n+RWv+GsTt30h7X4bm79tAhaSrO2lWeuMZ2tlCQGc0bkSBegmRG345aTkRBZYpHXu\nTSuuUneGh4mxsbvBWNEIz7OxQOe8xy0Zs3QSTTXI9kNzD5uw7RMmyAsSm5HL1Uq8\nhG/o3MuAwFp6dLCozMPRKdD8GwKBgQDa+JtGkDLcvZ6Lf3WO2Lf3g4eTeSHeHJfM\nQNRc6sNg/wYrsjZ7m6Z2Yt7rHgKd00EIxxKxqwZLr6hjOLnufgLUcJYvxWdf+mVJ\nypyCs2FkHgfkxqapVXjWbXdXVKthJK+lu4XpUgcRK3qpi2W4QWiX9ZZT3Ed5b5+d\n+Zm7M997VQKBgGXbxEu+VvPL+zqhaW1GNO5Dy64dH8131dqBm5DiuobC4SAQNphP\n0QeIyfsORFEi2VEj2GP7d1wKjmBav2v/mUmKuf7rduEgwsHACUCvH48qSzwEK9Df\n1YBO3UHRM34PFUTZFCxvu2jVJOns22t+uBsrMLHGRkvpEk1b9G+pQ08TAoGBAKDr\nBiFrIxW5e+QEPT5G4ZtR27Zy1ILH/H4sPmQyWnbTs5M1GnjoQALMUgnzOfUGJMrw\nkTpj9vJ0GokgTPOJQ0cfnh9pMLkF6J27+hzK+o16zE5B9oSGvZDHTWauYGu5bCOd\nlaGLmInzq+cg/BXWa6kQ3/Ks9RG3CFQt893xFxEpAoGAfbTjNnrtL/0IG61e0ois\nCOulPOl0aAx5f0jXitx0UusivzLvvs6ciVHyBmsU+uunp+NpPUDt3hwXGTkS5UIx\naga7A4bYpUhUtqtGj6OUMtT6f9fh3J4NYbqLxsgvf0KFrQjgQ9kfVZ/ggLaG0khE\n/SixvjizAIpEGyFcHaZCmvg=\n-----END PRIVATE KEY-----\n",
        "client_email": "translaate@third-light-292100.iam.gserviceaccount.com",
        "client_id": "114581235917904126765",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/translaate%40third-light-292100.iam.gserviceaccount.com"
    },
    projectId: "third-light-292100"
}
);
// translate.engine = "google"; // Or "yandex", "libre", "deepl"
// translate.key = ``


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
            case "TRANSLATE_TEXT_MESSAGE":
                const language = messageData.language || "ka";
                const messageString = messageData.data.message || ""
                const [translated] = (await translate.translate(messageString, { to: language }));
                SENT({
                    type: "CATCH_TRANSLATED_TEXT_MESSAGE",
                    author: messageData.data.author,
                    translatedMessage: translated,
                    originalMessage: messageString,
                });
                break;
            case "CATCH_TEXT_MESSAGE":
                const sendData = {
                    type: "CATCH_TEXT_MESSAGE",
                    author: messageData.author,
                    message: messageData.data?.message || "",
                }
                if (paraClient) {
                    SENT(sendData, paraClient);
                }
                SENT(sendData);
                break;
        }
    });

});

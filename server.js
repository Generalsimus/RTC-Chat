
import express from 'express'
import path from 'path';
import WebSocket from 'ws'


export const globalRootDir = path.join(__dirname, '../');


const app = express();



app.use("/", express.static(path.join(globalRootDir, "public")));


const server = app.listen(Number(process.env.PORT || 80), () => console.log(`Example app listening on port ${port}!`))


const webSocketServer = new WebSocket.Server({ server: server, path: "/sw" });
const clientsByName = new Map();
webSocketServer.on('connection', (client) => {
    const SENT = (data, netClient) => (netClient || client).send(JSON.stringify({ data }))
    client.on('message', (dataString) => {

        const messageData = JSON.parse(dataString);
        console.log("🚀 --> file: server.js --> line 23 --> client.on --> data", messageData);
        const paraClient = clientsByName.get(messageData.connectToName);
        switch (messageData.data.type) {
            case 'INIT_CLIENT_CONNECT':
                clientsByName.set(messageData.author, client);
                client.on('disconnect', () => clientsByName.delete(messageData.author));
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
                console.log("🚀 --> file: server.js --> line 40 --> client.on --> messageData", messageData);
                break;
            case "SEND_ANSWER_FOR_OFFER_CREATOR":
                if (paraClient) {
                    SENT({ type: "CATCH_ANSWER", answer: messageData.data.answer }, paraClient);
                }
                break;
            case "ADD_ICE_CANDIDATE_FOR_MY_PEAR":
                // SENT({ type: "ADD_ICE_CANDIDATE", candidate: messageData.data.candidate });
                SENT({ type: "ADD_ICE_CANDIDATE", candidate: messageData.data.candidate }, paraClient);
            // 
            // webSockState.sendData({
            //     type: "SEND_ANSWER_FOR_OFFER_CREATOR",
            //     answer: answer
            // });
            // 
            // SEND_CREATED_OFFER
            //     case "GET_MY_OFFER_OR_TAKE_MAIN":
            //         client.on('disconnect', function (data) {
            //             clientMap.delete(messageData.author)
            //         });
            //         clientMap.set(messageData.author, {
            //             connect: client,
            //             ...messageData
            //         });
            //         const clientData = clientMap.get(messageData.connectToName)
            //         if (clientData) {
            //             client.send(JSON.stringify({
            //                 data: {
            //                     type: "TAKE_OFFER_AND_ANSWER",
            //                     offerData: clientData.data.offer
            //                 }
            //             }))
            //         }
            //         break;
            //     case "TAKE_MY_ANSWER_FOR_OFFER":
            //         const answerForClient = clientMap.get(messageData.connectToName);
            //         console.log("🚀 --> file: server.js --> line 43 --> client.on --> answerForClient", !!answerForClient);
            //         if (answerForClient) {
            //             answerForClient.connect.send(JSON.stringify({
            //                 data: {
            //                     type: "CATCH_ANSWER_FOR_FOR_OFFER",
            //                     answer: messageData.data.answer
            //                     // offerData: clientData.data.offer
            //                 }
            //             }));
            //         }
            //         break;
            //     case "ADD_CANDIDATE_FOR_MY_PEAR":
            //         const addCandidateForClient = clientMap.get(messageData.connectToName);
            //         console.log("🚀 --> file: server.js --> line 55 --> client.on --> addCandidateForClient", !!addCandidateForClient);
            //         if (addCandidateForClient) {
            //             addCandidateForClient.connect.send(JSON.stringify({
            //                 data: {
            //                     type: "ADD_ICE_CANDIDATE",
            //                     iceCandidate: messageData.data.iceCandidate
            //                 }
            //             }));
            //         }
            //         break;
        }
    });

});

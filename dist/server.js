"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalRootDir = void 0;
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const ws_1 = __importDefault(require("ws"));
exports.globalRootDir = path_1.default.join(__dirname, '../');
const app = (0, express_1.default)();
app.use("/", express_1.default.static(path_1.default.join(exports.globalRootDir, "public")));
const port = Number(process.env.PORT || 3000);
const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));
const webSocketServer = new ws_1.default.Server({ server: server, path: "/sw" });
const clientsByName = new Map();
webSocketServer.on('connection', (client) => {
    const SENT = (data, netClient) => (netClient || client).send(JSON.stringify({ data }));
    client.on('message', (dataString) => {
        const messageData = JSON.parse(dataString);
        const paraClient = clientsByName.get(messageData.connectToName);
        switch (messageData.data.type) {
            case 'INIT_CLIENT_CONNECT':
                clientsByName.set(messageData.author, client);
                client.on('disconnect', () => {
                    if (clientsByName.has(messageData.author)) {
                        clientsByName.delete(messageData.author);
                    }
                });
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
                if (paraClient) {
                    SENT({ type: "CATCH_TEXT_MESSAGE", message: messageData.data.message }, paraClient);
                }
                break;
        }
    });
});

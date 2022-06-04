
import express from 'express'
import path from 'path';
import WebSocket from 'ws'


export const globalRootDir = path.join(__dirname, '../');


const app = express();



app.use("/", express.static(path.join(globalRootDir, "public")));


const server = app.listen(3000);

const webSocketServer = new WebSocket.Server({ server: server, path: "/sw" });
webSocketServer.on('connection', (client) => {
    // console.log("🚀 --> file: server.js --> line 9 --> this.webSocketServer.on --> client", client);
});

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMediaStream = void 0;
const createMediaStream = (peerConnection) => __awaiter(void 0, void 0, void 0, function* () {
    const localVideoTag = document.querySelector('.local-video');
    const remoteVideoTag = document.querySelector('.remote-video');
    const localStream = yield navigator.mediaDevices.getUserMedia({ video: true, audio: false });
    const remoteStream = new MediaStream();
    // Push tracks from local stream to peer connection
    localStream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, localStream);
    });
    // Pull tracks from remote stream, add to video stream
    peerConnection.ontrack = (event) => {
        console.log("🚀 --> file: createMediaStream.js --> line 15 --> createMediaStream --> event", event);
        event.streams[0].getTracks().forEach((track) => {
            remoteStream.addTrack(track);
        });
    };
    localVideoTag.srcObject = localStream;
    remoteVideoTag.srcObject = remoteStream;
    return {
        localStream,
        remoteStream
    };
});
exports.createMediaStream = createMediaStream;

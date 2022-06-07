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
const createAudioTagController_js_1 = require("./createAudioTagController.js");
const createMediaStream = (peerConnection) => __awaiter(void 0, void 0, void 0, function* () {
    const localVideoTag = document.querySelector('.local-video');
    const remoteVideoTag = document.querySelector('.remote-video');
    const audioTagController = (0, createAudioTagController_js_1.createAudioTagController)();
    const localStream = yield navigator.mediaDevices.getUserMedia({
        audio: true,
        video: {
            width: { min: 1024, ideal: 1280, max: 1920 },
            height: { min: 576, ideal: 720, max: 1080 }
        }
    });
    audioTagController.addEventListener("click", () => {
        audioTagController.toggleStatus();
        const tracks = localStream.getAudioTracks();
        tracks.forEach(el => {
            el.enabled = audioTagController.status;
        });
    });
    // setAudioStatusVisual
    const remoteStream = new MediaStream();
    // Push tracks from local stream to peer connection
    localStream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, localStream);
    });
    // Pull tracks from remote stream, add to video stream
    peerConnection.ontrack = (event) => {
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

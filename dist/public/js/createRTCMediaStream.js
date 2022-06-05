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
exports.createRTCMediaStream = void 0;
const createMediaStream_js_1 = require("./createMediaStream.js");
const servers = {
    iceServers: [
        {
            urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
        },
        { urls: "stun:stun.l.google.com:19302" },
        { urls: "stun:stun.services.mozilla.com" },
        { urls: "stun:stun.stunprotocol.org:3478" },
        { url: "stun:stun.l.google.com:19302" },
        { url: "stun:stun.services.mozilla.com" },
        { url: "stun:stun.stunprotocol.org:3478" },
    ],
    iceCandidatePoolSize: 10,
};
const createRTCMediaStream = () => __awaiter(void 0, void 0, void 0, function* () {
    // const peerConnection = new RTCPeerConnection(servers);
    const peerConnection = new RTCPeerConnection({
        iceServers: [
            {
                urls: "turn:openrelay.metered.ca:80",
                username: "openrelayproject",
                credential: "openrelayproject",
            },
            {
                urls: "turn:openrelay.metered.ca:443",
                username: "openrelayproject",
                credential: "openrelayproject",
            },
        ],
    });
    const {} = (0, createMediaStream_js_1.createMediaStream)(peerConnection);
    return {
        createOffer() {
            return __awaiter(this, void 0, void 0, function* () {
                const offerDescription = yield peerConnection.createOffer();
                yield peerConnection.setLocalDescription(offerDescription);
                return offerDescription;
            });
        },
        createAnswer() {
            return __awaiter(this, void 0, void 0, function* () {
                const answerDescription = yield peerConnection.createAnswer();
                yield peerConnection.setLocalDescription(answerDescription);
                return answerDescription;
            });
        },
        addIceCandidate(iceCandidate) {
            return __awaiter(this, void 0, void 0, function* () {
                // const candidate = new RTCIceCandidate(iceCandidate);
                // const candidate = new RTCIceCandidate(change.doc.data());
                // pc.addIceCandidate(candidate);
                // ⟷⟷⟷⟷⟷⟷⟷⟷⟷⟷⟷⟷⟷⟷
                peerConnection.addIceCandidate(new RTCIceCandidate(iceCandidate));
                return iceCandidate;
            });
        },
        catchOffer(offer) {
            return __awaiter(this, void 0, void 0, function* () {
                yield peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
                return offer;
            });
        },
        catchAnswer(answer) {
            return __awaiter(this, void 0, void 0, function* () {
                const answerDescription = new RTCSessionDescription(answer);
                yield peerConnection.setRemoteDescription(answerDescription);
                return answer;
            });
        },
        addIceCandidateListener(callBack) {
            return __awaiter(this, void 0, void 0, function* () {
                peerConnection.onicecandidate = callBack;
                // peerConnection.addEventListener("icecandidate", callBack)
            });
        }
    };
});
exports.createRTCMediaStream = createRTCMediaStream;

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
            url: 'turn:numb.viagenie.ca',
            credential: 'muazkh',
            username: 'webrtc@live.com'
        },
        {
            url: 'turn:192.158.29.39:3478?transport=udp',
            credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
            username: '28224511:1379330808'
        },
        {
            url: 'turn:192.158.29.39:3478?transport=tcp',
            credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
            username: '28224511:1379330808'
        },
        {
            url: 'turn:turn.bistri.com:80',
            credential: 'homeo',
            username: 'homeo'
        },
        { urls: "stun:stun.l.google.com:19302" },
        { urls: "stun:stun.services.mozilla.com" },
        { urls: "stun:stun.stunprotocol.org:3478" },
        { url: "stun:stun.l.google.com:19302" },
        { url: "stun:stun.services.mozilla.com" },
        { url: "stun:stun.stunprotocol.org:3478" },
        {
            url: 'turn:turn.anyfirewall.com:443?transport=tcp',
            credential: 'webrtc',
            username: 'webrtc'
        },
    ]
};
const coolServers = {
    bundlePolicy: "balanced",
    iceServers: [
        { urls: 'turn:23.106.248.8:443?transport=udp', username: '1654437114:1654436994027393760', credential: '1Oob+EAN5WilAHdUhduosxVwaA4=' },
        { urls: 'turn:35.181.43.222:443?transport=udp', username: '1654437114:1654436994027393760', credential: '1Oob+EAN5WilAHdUhduosxVwaA4=' },
        { urls: 'turn:35.181.43.222:443?transport=tcp', username: '1654437114:1654436994027393760', credential: '1Oob+EAN5WilAHdUhduosxVwaA4=' }
    ],
    iceTransportPolicy: "all",
    rtcpMuxPolicy: "require"
};
const talkyIoServers = {
    bundlePolicy: "balanced",
    iceServers: [
        {
            credential: "H2sv4iA6rHn/XSR1I0eNJdQ/m1I=",
            urls: ['turn:ice.simplewebrtc.com:3478'],
            username: "1654550683:talky/001b6704-22c6-482a-9d8b-543b6a655a9a"
        },
        {
            credential: "H2sv4iA6rHn/XSR1I0eNJdQ/m1I=",
            urls: ['turn:ice.simplewebrtc.com:3478?transport=tcp'],
            username: "1654550683:talky/001b6704-22c6-482a-9d8b-543b6a655a9a"
        },
        {
            credential: "H2sv4iA6rHn/XSR1I0eNJdQ/m1I=",
            urls: ['turns:ice.simplewebrtc.com:443?transport=tcp'],
            username: "1654550683:talky/001b6704-22c6-482a-9d8b-543b6a655a9a"
        }
    ],
    iceTransportPolicy: "all",
    rtcpMuxPolicy: "require",
    sdpSemantics: undefined
};
const createRTCMediaStream = () => __awaiter(void 0, void 0, void 0, function* () {
    // const peerConnection = new RTCPeerConnection(servers);
    const peerConnection = new RTCPeerConnection(talkyIoServers);
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

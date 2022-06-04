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
const localVideoTag = document.querySelector('.local-video');
const remoteVideoTag = document.querySelector('.remote-video');
console.log("🚀 --> file: main.js --> line 4 --> remoteVideoTag", remoteVideoTag);
// const callButton = document.getElementById('callButton');
// const callInput = document.getElementById('callInput');
// const answerButton = document.getElementById('answerButton');
// const remoteVideo = document.getElementById('remoteVideo');
// const hangupButton = document.getElementById('hangupButton');
// setInterval(() => {
//   window.location.reload();
// }, 4000)
const createMedia = (pc) => __awaiter(void 0, void 0, void 0, function* () {
    const localStream = yield navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    const remoteStream = new MediaStream();
    // Push tracks from local stream to peer connection
    localStream.getTracks().forEach((track) => {
        pc.addTrack(track, localStream);
    });
    // Pull tracks from remote stream, add to video stream
    pc.ontrack = (event) => {
        console.log("🚀 --> file: m.js --> line 25 --> createMedia --> event", event);
        event.streams[0].getTracks().forEach((track) => {
            // console.log("🚀 --> file: m.js --> line 27 --> event.streams[0].getTracks --> track", track);
            remoteStream.addTrack(track);
        });
    };
    return {
        localStream,
        remoteStream
    };
});
const createConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    const servers = {
        iceServers: [
            {
                urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
            },
        ],
        iceCandidatePoolSize: 10,
    };
    const pc = new RTCPeerConnection(servers);
    const dataChannel = pc.createDataChannel('sendDataChannel');
    dataChannel.binaryType = 'arraybuffer';
    dataChannel.addEventListener('message', (e) => {
        console.log("🚀 --> file: m.js --> line 57 --> dataChannel.addEventListener --> e", e);
    });
    pc.addEventListener('datachannel', (event) => {
        const channel = event.channel;
        channel.binaryType = 'arraybuffer';
        channel.addEventListener('message', (e) => {
            console.log("🚀 --> file: m.js --> line 57 --> dataChannel.addEventListener --> e", e);
        });
    });
    const { localStream, remoteStream } = yield createMedia(pc);
    return {
        peerConnection: pc,
        dataChannel,
        localStream,
        remoteStream,
        createOffer() {
            return __awaiter(this, void 0, void 0, function* () {
                const offerDescription = yield pc.createOffer();
                yield pc.setLocalDescription(offerDescription);
                return offerDescription;
            });
        },
        createAnswer() {
            return __awaiter(this, void 0, void 0, function* () {
                const answerDescription = yield pc.createAnswer();
                yield pc.setLocalDescription(answerDescription);
                return answerDescription;
            });
        },
        answerCall(answer) {
            return __awaiter(this, void 0, void 0, function* () {
                const answerDescription = new RTCSessionDescription(answer);
                pc.setRemoteDescription(answerDescription);
                return answerDescription;
            });
        },
        addIceCandidate(iceCandidate) {
            return __awaiter(this, void 0, void 0, function* () {
                // const candidate = new RTCIceCandidate(iceCandidate);
                pc.addIceCandidate(iceCandidate);
                return iceCandidate;
            });
        },
        catchOffer(offer) {
            return __awaiter(this, void 0, void 0, function* () {
                yield pc.setRemoteDescription(offer);
                return offer;
            });
        },
        catchAnswer(answer) {
            return __awaiter(this, void 0, void 0, function* () {
                pc.setRemoteDescription(answer);
                return answer;
            });
        },
        addIceCandidateListener(callBack) {
            return __awaiter(this, void 0, void 0, function* () {
                pc.onicecandidate = callBack;
            });
        }
    };
});
const person_1_ = await createConnection();
const person_2_ = await createConnection();
localVideoTag.srcObject = person_1_.localStream;
remoteVideoTag.srcObject = person_1_.remoteStream;
const person_1_Offer = await person_1_.createOffer();
await person_2_.catchOffer(person_1_Offer);
const person_2_Answer = await person_2_.createAnswer();
await person_1_.catchAnswer(person_2_Answer);
//////////////////////////
// await person_1_.addIceCandidateListener((event) => {
//     if (event.candidate) {
//         person_2_.addIceCandidate(event.candidate);
//     }
// })
await person_2_.addIceCandidateListener((event) => {
    if (event.candidate) {
        person_1_.addIceCandidate(event.candidate);
    }
});
//////////////////////////
person_2_.dataChannel.onopen = () => {
    person_2_.dataChannel.send('Hello');
    console.log("🚀 --> file: m.js --> line 140 --> Hello", "Hello");
};

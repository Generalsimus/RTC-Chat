import { createMediaStream } from "./createMediaStream.js";

const servers = {
    iceServers: [
        {
            urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
        },
    ],
    iceCandidatePoolSize: 10,
};

export const createRTCMediaStream = async () => {
    const peerConnection = new RTCPeerConnection(servers);
    const { } = createMediaStream();
    return {
        async createOffer() {
            const offerDescription = await peerConnection.createOffer();
            await peerConnection.setLocalDescription(offerDescription);
            return offerDescription
        },
        async createAnswer() {
            const answerDescription = await peerConnection.createAnswer();
            await peerConnection.setLocalDescription(answerDescription);
            return answerDescription
        },
        async answerCall(answer) {
            const answerDescription = new RTCSessionDescription(answer);
            pc.setRemoteDescription(answerDescription);
            return answerDescription
        },
        async addIceCandidate(iceCandidate) {
            // const candidate = new RTCIceCandidate(iceCandidate);
            pc.addIceCandidate(iceCandidate);
            return iceCandidate
        },
        async catchOffer(offer) {
            await pc.setRemoteDescription(offer);
            return offer
        },
        async catchAnswer(answer) {
            pc.setRemoteDescription(answer);
            return answer
        },
        async addIceCandidateListener(callBack) {
            pc.onicecandidate = callBack

        }
    }
}
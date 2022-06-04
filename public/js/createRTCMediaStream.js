import { createMediaStream } from "./createMediaStream.js";

const servers = {
    iceServers: [
        {
            urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
        },
    ],
    iceCandidatePoolSize: 10,
};
// {urls: "stun:stun.l.google.com:19302"},
// {urls: "stun:stun.services.mozilla.com"},
// {urls: "stun:stun.stunprotocol.org:3478"},
// {url: "stun:stun.l.google.com:19302"},
// {url: "stun:stun.services.mozilla.com"},
// {url: "stun:stun.stunprotocol.org:3478"},

export const createRTCMediaStream = async () => {
    const peerConnection = new RTCPeerConnection(servers);
    const { } = createMediaStream(peerConnection);
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
        async addIceCandidate(iceCandidate) {
            // const candidate = new RTCIceCandidate(iceCandidate);

            // const candidate = new RTCIceCandidate(change.doc.data());
            // pc.addIceCandidate(candidate);
            peerConnection.addIceCandidate(new RTCIceCandidate(iceCandidate));
            return iceCandidate
        },
        async catchOffer(offer) {
            await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
            return offer
        },
        async catchAnswer(answer) {
            const answerDescription = new RTCSessionDescription(answer);
            await peerConnection.setRemoteDescription(answerDescription);
            return answer
        },
        async addIceCandidateListener(callBack) {
            peerConnection.onicecandidate = callBack
            // peerConnection.addEventListener("icecandidate", callBack)

        }
    }
}
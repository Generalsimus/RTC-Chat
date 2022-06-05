import { createMediaStream } from "./createMediaStream.js";

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
}
const coolServers = {
    bundlePolicy: "balanced",
    iceServers: [
        { urls: 'turn:23.106.248.8:443?transport=udp', username: '1654437114:1654436994027393760', credential: '1Oob+EAN5WilAHdUhduosxVwaA4=' },
        { urls: 'turn:35.181.43.222:443?transport=udp', username: '1654437114:1654436994027393760', credential: '1Oob+EAN5WilAHdUhduosxVwaA4=' },
        { urls: 'turn:35.181.43.222:443?transport=tcp', username: '1654437114:1654436994027393760', credential: '1Oob+EAN5WilAHdUhduosxVwaA4=' }
    ],
    iceTransportPolicy: "all",
    rtcpMuxPolicy: "require"
}
export const createRTCMediaStream = async () => {
    // const peerConnection = new RTCPeerConnection(servers);
    const peerConnection = new RTCPeerConnection(coolServers);
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
            // ⟷⟷⟷⟷⟷⟷⟷⟷⟷⟷⟷⟷⟷⟷
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
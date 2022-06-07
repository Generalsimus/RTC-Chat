import { createAudioTagController } from "./createAudioTagController.js";

export const createMediaStream = async (peerConnection) => {
    const localVideoTag = document.querySelector('.local-video');
    const remoteVideoTag = document.querySelector('.remote-video');
    const audioTagController = createAudioTagController()

    const localStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true
    });
    audioTagController.addEventListener("click", () => {
        audioTagController.toggleStatus();
        const tracks = localStream.getAudioTracks();
        tracks.forEach(el => {
            el.enabled = audioTagController.status;
        });
    })
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
    remoteVideoTag.srcObject = localStream;

    return {
        localStream,
        remoteStream
    }
}
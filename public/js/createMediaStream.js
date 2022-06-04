export const createMediaStream = async (peerConnection) => {
    const localVideoTag = document.querySelector('.local-video');
    const remoteVideoTag = document.querySelector('.remote-video');

    const localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
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
    }
}
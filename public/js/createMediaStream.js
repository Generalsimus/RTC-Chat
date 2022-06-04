export const createMediaStream = async (peerConnection) => {
    const localVideoTag = document.querySelector('.local-video');
    const remoteVideoTag = document.querySelector('.remote-video');

    const localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    const remoteStream = new MediaStream();

    // Push tracks from local stream to peer connection
    localStream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, localStream);
    });

    // Pull tracks from remote stream, add to video stream
    peerConnection.ontrack = (event) => {
        console.log("🚀 --> file: m.js --> line 25 --> createMedia --> event", event);
        event.streams[0].getTracks().forEach((track) => {
            // console.log("🚀 --> file: m.js --> line 27 --> event.streams[0].getTracks --> track", track);
            remoteStream.addTrack(track);
        });
    };



    return {
        localStream,
        remoteStream
    }
}
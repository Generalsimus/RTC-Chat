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
        console.log("🚀 --> file: createMediaStream.js --> line 15 --> createMediaStream --> event", event);
        event.streams[0].getTracks().forEach((track) => {
            remoteStream.addTrack(track);
        });
    };
    peerConnection.onaddstream = function (event) {
        console.log("this function is called")
        // var video2 = document.getElementById("video2")
        // remoteVideoTag.srcObject = event.stream;
        // video2.src = window.URL.createObjectURL(event.stream)
        // video2.play()
    }

    localVideoTag.srcObject = localStream;
    remoteVideoTag.srcObject = remoteStream;

    return {
        localStream,
        remoteStream
    }
}
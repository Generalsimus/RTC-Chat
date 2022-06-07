export const getIceServers = async () => {
    const response = await fetch(`https://sig.simplewebrtc.com/config/guest/talky`, {
        method: 'POST',
        body: {
            clientVersion: "1.30.5",
            token: ""
        },
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    const iceServers = (await response?.json())?.iceServers

    return iceServers || {
        bundlePolicy: "balanced",
        iceServers: [{
            "urls": [
                "turn:numb.viagenie.ca"
            ],
            credential: 'muazkh',
            username: 'webrtc@live.com'
        }],
        iceTransportPolicy: "all",
        rtcpMuxPolicy: "require",
        sdpSemantics: undefined
    }

}
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
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
    const iceServers = (await response?.json())?.iceServers || [{
        "urls": [
            "turn:numb.viagenie.ca"
        ],
        credential: 'muazkh',
        username: 'webrtc@live.com'
    }];

    return {
        bundlePolicy: "balanced",
        iceServers: iceServers,
        iceTransportPolicy: "all",
        rtcpMuxPolicy: "require",
        sdpSemantics: undefined
    }

}
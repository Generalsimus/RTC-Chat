import { addLoader } from "./addLoader.js";

export const getIceServers = async () => {
    const loader = addLoader();
    loader.start("Loading servers...");
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
    if (iceServers) {
        try {
            loader.end();
            return {
                bundlePolicy: "balanced",
                iceServers: iceServers.map((el) => {
                    const url = `${el.type}:${el.host}${typeof el.port === "number" ? `:${el.port}` : ""}${el.transport ? `?transport=${el.transport}` : ""}`
                    return {
                        credential: el.password,
                        urls: [url],
                        username: el.username
                    }
                }),
                iceTransportPolicy: "all",
                rtcpMuxPolicy: "require",
                sdpSemantics: undefined
            }
        } catch (e) { console.log("🚀 --> file: getIceServers.js --> line 39 --> getIceServers --> e", e); }
    }

    loader.end();
    return {
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
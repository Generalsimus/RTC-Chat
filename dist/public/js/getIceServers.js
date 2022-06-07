"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIceServers = void 0;
const getIceServers = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const response = yield fetch(`https://sig.simplewebrtc.com/config/guest/talky`, {
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
    });
    const iceServers = ((_a = (yield (response === null || response === void 0 ? void 0 : response.json()))) === null || _a === void 0 ? void 0 : _a.iceServers) || [{
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
    };
});
exports.getIceServers = getIceServers;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addLoader = void 0;
const loaderTag = document.querySelector(".loading-progress-on");
const loaderMessageTag = document.querySelector(".loading-progress-on .loading-text");
const addLoader = () => {
    return {
        setMessage(message = "Processing...") {
            loaderMessageTag.innerHTML = message;
        },
        start(message = "Processing...") {
            this.setMessage(message);
            loaderTag.style.display = "flex";
        },
        end() {
            loaderTag.style.display = "none";
        }
    };
};
exports.addLoader = addLoader;

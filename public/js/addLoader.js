const loaderTag = document.querySelector(".loading-progress-on");
const loaderMessageTag = document.querySelector(".loading-progress-on .loading-text");


export const addLoader = () => {
    return {
        setMessage(message = "Processing...") {
            loaderMessageTag.innerHTML = message;
        },
        start(message = "Processing...") {
            this.setMessage(message);
            loaderTag.style.display = "flex"

        },
        end() {
            loaderTag.style.display = "none"
        }
    }
}
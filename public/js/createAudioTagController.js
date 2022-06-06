

const audioStatusTag = document.querySelector('.mute-video-cam')

const onSVg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" enable-background="new 0 0 50 50" height="50px" id="Layer_1" version="1.1" viewBox="0 0 50 50" width="50px" xml:space="preserve" style="fill: #fff !important;color: antiquewhite;stroke: #fff;stroke-width: 0;width: 25px;height: 25px;"><rect fill="none" height="50" width="50"></rect><path d="M10,33H3  c-1.103,0-2-0.898-2-2V19c0-1.102,0.897-2,2-2h7" fill="none" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2.08"></path><path d="M9.604,32.43  C9.256,32.129,9,31.391,9,30.754V19.247c0-0.637,0.256-1.388,0.604-1.689L22.274,4.926C23.905,3.27,26,3.898,26,6.327v36.988  c0,2.614-1.896,3.604-3.785,1.686L9.604,32.43z" fill="none" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.9797"></path><path d="  M30.688,19.417C33.167,20.064,35,22.32,35,25s-1.833,4.936-4.312,5.584" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"></path><path d="  M34.92,13.142C39.136,15.417,42,19.873,42,25c0,5.111-2.85,9.557-7.045,11.835" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"></path><path d="  M38.498,7.82c6.276,3.167,10.579,9.668,10.579,17.18c0,7.512-4.303,14.014-10.579,17.18" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"></path></svg>`
const offSVg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" enable-background="new 0 0 50 50" height="50px" id="Layer_1" version="1.1" viewBox="0 0 50 50" width="50px" xml:space="preserve" style="stroke: #fff;stroke-width: 0;width: 25px;height: 25px;"><line fill="none" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" x1="32" x2="42" y1="20" y2="30"></line><line fill="none" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" x1="42" x2="32" y1="20" y2="30"></line><rect fill="none" height="50" width="50"></rect><rect fill="none" height="50" width="50"></rect><path d="M10,33H3  c-1.103,0-2-0.898-2-2V19c0-1.102,0.897-2,2-2h7" fill="none" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2.08"></path><path d="M9.604,32.43  C9.256,32.129,9,31.391,9,30.754V19.247c0-0.637,0.256-1.388,0.604-1.689L22.274,4.926C23.905,3.27,26,3.898,26,6.327v36.988  c0,2.614-1.896,3.604-3.785,1.686L9.604,32.43z" fill="none" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.9797"></path></svg>`

export const createAudioTagController = () => {
    let status = true
    const controllerState = {
        get status() {
            return status
        },
        setStatus(status) {
            const svgString = status ? onSVg : offSVg
            audioStatusTag.innerHTML = svgString
        },
        toggleStatus() {
            this.setStatus(status = !status)
        },
        addEventListener(event, callBack) {
            audioStatusTag.addEventListener(event, callBack)
        }
    }
    controllerState.setStatus(status);

    return controllerState
}
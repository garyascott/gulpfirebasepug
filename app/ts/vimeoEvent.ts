//google tag manager
//if iframe appears on page
//loop through iframes an each one that contains player.vimeo add ga click event 

let iframeElement = document.getElementsByTagName('iframe'),
    iframeElementLength = iframeElement.length,
    iframeCurrent: any,
    parentP: any;
const vimeoplayer: string = 'player.vimeo';
const pageURL = window.location.href;


    if (iframeElementLength > 0) {
        for (let i = 0; i < iframeElementLength; i++) {
            iframeCurrent = iframeElement[i];
            parentP = iframeCurrent.parentElement;
            console.log(`${i} ${iframeCurrent} ${parentP}`);

            let attrCreation = (domevent: string) => {
                parentP.setAttribute(domevent, `ga(‘send’, ‘event’, ‘Vimeo Video Played’, ‘Played Video’, ‘${iframeCurrent.getAttribute('src')}’, ‘${pageURL}’);`); 
            };

            if (iframeCurrent.getAttribute('src').includes(vimeoplayer)) {
                console.log(iframeCurrent);
                iframeCurrent.setAttribute("class", `vimeoVideo`);
                 attrCreation('onkeydown');
                 attrCreation('onclick');
                 attrCreation('ontouchstart');
               
            }
        }
    }
// window.onload = function () {}

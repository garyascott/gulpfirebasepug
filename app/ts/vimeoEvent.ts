//google tag manager
//if iframe appears on page
//loop through iframes an each one that contains player.vimeo add ga click event 

let iframeElement = document.getElementsByTagName('iframe'),
iframeElementLength = iframeElement.length,
iframeCurrent;
const vimeoplayer:string = 'player.vimeo';
const pageURL = window.location.href;

if(iframeElementLength > 0){
    for(let i = 0; i < iframeElementLength; i++ ){
        iframeCurrent = iframeElement[i];
        console.log(`${i} ${iframeCurrent}`);

        if(iframeCurrent.getAttribute('src').includes(vimeoplayer)){
             console.log(iframeCurrent); 
             iframeCurrent.setAttribute("class", `democlass`);
             iframeCurrent.setAttribute("onclick", `ga(‘send’, ‘event’, ‘Vimeo Video Played’, ‘Played Video’, ‘${iframeCurrent.getAttribute('src')}’, ‘${pageURL}’);`);
             

        }
    }
    
    
}
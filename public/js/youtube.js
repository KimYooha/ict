// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
player = new YT.Player('player', {
    height: '400',
    width: '100%',
    videoId: 'vG07DHeNH9c',
    //events: {
    //    'onReady': onPlayerReady,
        
    //    },
    playerVars:{
    'autoplay' : 1,
    'controls' : 1,
    'loop' : 1,
    'origin': 'https://localhost:5000' 
        },
    });
}
// 4. The API will call this function when the video player is ready.
/*function onPlayerReady(event) {
    event.target.playVideo();
} */
function onPlayerReady(event){
  event.target.playVideo();}
socket.on('youtube', (play) => {
  console.log('재생하나요?',play)
  onPlayerReady
  })


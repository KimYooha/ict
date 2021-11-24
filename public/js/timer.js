//import time from "C:\Users\김가연\Desktop\Webspeech-AI-Bot-master\app.js"
//settime = time.slice(0,str.length-1)
// const {time} = require("C:\Users\김가연\Desktop\Webspeech-AI-Bot-master\app.js")
// const time = time.slice(0,str.length-1)
//console.log(time)

//var startingMinutes = 20
//var startingMinutes;
let toggle = true;


const countdownEl = document.getElementById('countdown');
let interval = setInterval(updateCountdown, 1000);
//time 받는 부분
/*
socket.on('gettime', (settime) => {
    console.log("get time");
    console.log(settime);
    
    //startingMinutes = settime.slice(0,startingMinutes.length-1);
    stopCountdown()
  });
*/
var time
socket.on('gettime', (settime) => {
    console.log(settime);
    startingMinutes = settime.substring(0,settime.length-1);
    console.log(startingMinutes)
    time = startingMinutes * 60;
    stopCountdown()
  });


//startingMinutes = startingMinutes.slice(0,startingMinutes.length-1)





function updateCountdown() {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;

    seconds = seconds < 10 ? '0' + seconds : seconds;

    countdownEl.innerHTML = `${minutes}m ${seconds}s`;
    time--;
    time = time < 0 ? 0 : time; 

}


//let toggle = true;

function stopCountdown() {
    
    if(toggle){
        clearInterval(interval)
        toggle = false;
    }
    
    else{
        interval = setInterval(updateCountdown, 1000)
        toggle = true;
    }
}
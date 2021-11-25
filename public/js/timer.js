
let toggle = true;

socket.on('qbtn', (qbtn) => {
    console.log('전송:',qbtn)
    //text = qbtn
    
    //socket.emit("chat message", qbtn);
  })
const countdownEl = document.getElementById('countdown');
let interval = setInterval(updateCountdown, 1000);
let startingMinutes = 0
let time = startingMinutes * 60;
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
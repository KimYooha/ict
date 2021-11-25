
 
  
function myOnClick1() {
    var qbtn = document.getElementById('ingredient').value
    console.log(qbtn)
    socket.emit('qbtn', {msg:'재료 뭐였어'});

}

function SendMessage(){
    var message = document.getElementById("messagebox");
    alert(message.value + " has been send");
    console.log(message.value);
   var p =  document.createElement("p");
   p.innerHTML = message;
   document.getElementById("SendedMessage").appendChild(p)

  }

function GoToSwitch(){
    window.location.href = "ChatSwitch.html"
 
}


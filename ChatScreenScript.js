
function SendMessage(){
    var message = document.getElementById("messagebox");
    alert(message.value + " has been send");
    console.log(message.value);
   var p =  document.createElement("p");
   p.innerHTML = message;
   document.getElementById("SendedMessage").appendChild(p)

  }

const api_url = "https://api.agify.io/?name=bella"

async function GetMessage(url){
    const message = await fetch(url);
    var data = await message.json();
    console.log(data);
}
GetMessage(api_url);

function NewGetMessage(){
    fetch("https://api.agify.io/?name=bella");
}

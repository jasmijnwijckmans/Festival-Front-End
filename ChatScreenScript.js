
function SendMessage(){
    var message = document.getElementById("messagebox");
    alert(message.value + " has been send");
    console.log(message.value);
   //var p =  document.createElement("p");
   //p.innerHTML = message;
   //document.getElementById("SendedMessage").appendChild(p)

  }

//const api_url = "https://rickandmortyapi.com/api/character/"

//async function GetMessage(url){
   // const message = await fetch(url);
    //var data = await message.json();
    //console.log(data);
//}
//GetMessage(api_url);

function GetMessage(){
fetch("")
  .then((response) => response.json())
  .then((data) => {
    appendData(data);
  })
  .catch(error => {
    console.error(error);
});
}
function appendData(data){
    var MessageData = document.getElementById("myData");
    for (var i=0; i<data.length; i++) {
        var p = document.createElement("p");
        p.innerHTML = 'User ID: '+ data[i].userID + ',  ' + data[i].messageText;
        MessageData.appendChild(p);
    }
}

GetMessage();




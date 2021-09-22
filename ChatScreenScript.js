
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
    fetch("https://api.genderize.io/?name=luc") //API list of messages
    .then((response) => response.json())  //What's the difference 
    .then(function(data) {
        console.log(data);
        appendData(data); 
  })
  .catch(error => {
    console.error(error);
});
}
function appendData(data){
    var MessageData = document.getElementById("myData"); // if API contains more messages --> need a for loop
     var p = document.createElement("p");
        p.innerHTML = data.gender + " ;by User: " + data.name;
        MessageData.appendChild(p);
    
}

GetMessage();






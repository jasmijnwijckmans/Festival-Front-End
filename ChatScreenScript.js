
function SendMessage(){
    var message = document.getElementById("messagebox");
    //alert(message.value + " has been send");
    console.log(message.value);
    let dataReceived = "";
    var myJSON = "{\"messageText\": \" " + document.getElementById("messagebox").value + "\",\"userID\": 1 }"
    fetch(" ", {
            method: "post",
            headers: {
                "accept" : "text/plain",
                "Content-Type": "application/json"
                },
            body: myJSON
            })
    .then(response => response.json())
    .then(json => {
        if(json.succes==false){
            console.log(json.errorMessage);
        }
        else{
            NewGetMessage();
        }
    })       
    .catch(error => {
        console.log("Error");
    });
   //var p =  document.createElement("p");
   //p.innerHTML = message;
   //document.getElementById("SendedMessage").appendChild(p)

}

//const api_url = "ttps://api.genderize.io/?name=luc"

//async function GetMessage(url){
   // const message = await fetch(url);
    //var data = await message.json();
    //console.log(data);
//}
//GetMessage(api_url);

//function GetMessage(){
    //fetch("https://api.genderize.io/?name=luc") //API list of messages
    //.then((response) => response.json())  //What's the difference 
    //.then(function(data) {
        //console.log(data);
        //appendData(data); 
  //})
  //.catch(error => {
   // console.error(error);
//});
//}
//function appendData(data){
  // if API contains more messages --> need a for loop
     //var p = document.createElement("p");
        //p.innerHTML = data.gender + " ;by User: " + data.name;
        //document.getElementById("myData").appendChild(p);
    
//}
var LastUpdated = new Date();
LastUpdated.setMonth(LastUpdated.getMonth() - 3);

function NewGetMessage(){
    var Json = "{\"stageID\": 1 \", \"lastUpdated\": " + LastUpdated.toISOString() +"\"}"
    fetch(" ", {
        method: "put",
            headers: {
                "accept" : "text/plain",
                "Content-Type": "application/json"
                },
            body: Json
             })
    .then(response => response.json())
    .then(function(returndata){
        LastUpdated = new Date();
        for(var i=0;i<returndata.data.length;i++){
        var temp = "";
        returndata.data.forEach((itemData) => {
              temp += "<tr>";
              temp += "<td>" + itemData[i].messageText + "</td>";
              temp += "<td>" + itemData[i].timestamp + "</td>";
              temp += "<td>" + itemData[i].userName + "</td>";
              temp += "<td>" + itemData[i].userRole + "</td></tr>";
      
            });
        document.getElementById("myData").innerHTML = temp;
        //var p = document.createElement("p");
        //p.innerHTML = returndata.data[i].messageText + " ;by User: " + returndata.data[i].userName;
        //document.getElementById("myData").appendChild(p);
        }
    })
    .catch(error => {
        console.error("Error");
    });

}









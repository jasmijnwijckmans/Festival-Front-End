
function SendMessage(){
    var message = document.getElementById("messagebox");
    //alert(message.value + " has been send");
    console.log(message.value);
    let dataReceived = "";
    var myJSON = "{\"messageText\": \"" + document.getElementById("messagebox").value + "\",\"userID\": 1 }"
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
    var Json = "{\"stageID\":" +localStorage.getItem('current-StageID') +"\", \"lastUpdated\":" + LastUpdated.toISOString() + "\"}"
    fetch("https://api.genderize.io/?name=luc", {
       method: "put",
         headers: {
                "accept" : "text/plain",
               "Content-Type": "application/json"
               },
           body: Json
           })
    .then(response => response.json())
    .then(function(data){
        LastUpdated = new Date();

        for(var i=0;i<returndata.data.length;i++){
            var temp = "";
            if(returndata.data[i].gender =="Admin"){
                temp += "<tr style=\"color:red\">";
            } 
            else {
                temp += "<tr>";
            }
            temp += "<td style = \" font-weight: bold\">" + returndata.data[i].userName + ":" + "</td>";
            temp += "<td style=\"text-align:left\">" + returndata.data[i].messageText + "</td>";
            temp += "<td style=\"font-weight: lighter\">" + returndata.data[i].timestamp + "</td>";
            document.getElementById("myData").innerHTML += temp;

        }
    })
    .catch(error => {
        console.error("Error");
    });


}


function LoadPage(){
    document.getElementById("stageName").innerHTML = "Stage " + localStorage.getItem('current-StageID')
    NewGetMessage();
}


function UpdateActivity(){
    var Json = "{\"stageID\":" +localStorage.getItem('current-StageID') +"\", \"userID\": 1 }"
    fetch("", {
       method: "put",
         headers: {
                "accept" : "text/plain",
               "Content-Type": "application/json"
               },
           body: Json
           })
    .then(response => response.json())
    .then(json => {
        if(json.succes==false){
            console.log(json.errorMessage);
        }
    })       
    .catch(error => {
        console.error("Error");
    });


}

if(localStorage.getItem("UserRole")=="artist"){
    $("div.DjBooth").show();
}



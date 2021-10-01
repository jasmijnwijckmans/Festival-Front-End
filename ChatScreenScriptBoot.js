function SendMessage() {
    var mijnMessage = {}
    mijnMessage.messageText = document.getElementById("messagebox").value;
    mijnMessage.userID = 1;
    fetch("https://1a63a4ab-7d00-4b50-aac3-f73fb23a4d1f.mock.pstmn.io/api/Message", {
            method: "post",
            headers: {
                "accept": "text/plain",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(mijnMessage)
        })
        .then(response => response.json())
        .then(json => {
            if (json.succes == false) {
                console.log(json.errorMessage);
            } else {
                NewGetMessage();
            }
        })
        .catch(error => {
            console.log("Error", error);
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
//+ LastUpdated.toISOString() +
function NewGetMessage() {
    var mijnMessage = {}
    mijnMessage.stageID = 1;
    // mijnMessage.stageID = localStorage.getItem('current-StageID');
    mijnMessage.lastUpdated = LastUpdated.toISOString();
    fetch("https://1a63a4ab-7d00-4b50-aac3-f73fb23a4d1f.mock.pstmn.io/api/Message", {
            method: "put",
            headers: {
                "accept": "text/plain",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(mijnMessage)
        })
        .then(response => response.json())
        .then(function (returndata) {
            LastUpdated = new Date();

            if (returndata.success) {
                returndata.data.forEach(function (message) {

                    var div = document.createElement("div");
                    div.innerHTML = message.userName+ ": " +message.messageText;
        
                    if(localStorage.getItem("UserName")==message.userName){
                        div.className="text-right border"
                    }
                    else{
                        div.className="text-left border"
                    }
                    document.getElementById("messages").appendChild(div);


                });
            } else {
                console.log("error")

            }

            // for (var i = 0; i < returndata.data.length; i++) {
            //     var temp = "";
            //     if (returndata.data[i].userRole == "Admin") {
            //         temp += "<tr style=\"color:red\">";
            //     } else {
            //         temp += "<tr>";
            //     }
            //     temp += "<td style = \" font-weight: bold\">" + returndata.data[i].userName + ":" + "</td>";
            //     temp += "<td style=\"text-align:left\">" + returndata.data[i].messageText + "</td>";
            //     temp += "<td style=\"font-weight: lighter\">" + new Date(returndata.data[i].timestamp + "Z").toLocaleTimeString() + "</td>";
            //     document.getElementById("myData").innerHTML += temp;

            // }
        })
        .catch(error => {
            console.error("Error", error);
        });


}


function LoadPage() {

    document.getElementById("stageName").innerHTML = "Stage " + localStorage.getItem('current-StageID');
    NewGetMessage();
    if (localStorage.getItem("UserRole") == "artist") {
        $(".DjBooth").show();
    } else {
        $(".DjBooth").hide();
    }


}


function GetActiveUsersStage(StageID) {
    fetch("https://1a63a4ab-7d00-4b50-aac3-f73fb23a4d1f.mock.pstmn.io/api/User") //API list of messages
        .then((response) => response.json()) //What's the difference 
        .then(function (returndata) {
            console.log(returndata);

        })
        .catch(error => {
            console.error(error);
        });

}
function SendMessage() { //post method if user sends a message. The message is posted to back-end and if message is distributed correctly, the function NewGetMessage will run
    var mijnMessage = {}
    mijnMessage.messageText = document.getElementById("messagebox").value;
    mijnMessage.userID = localStorage.getItem("UserID");
    fetch(baseurl + "/api/Messages", {
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
        })

}

var LastUpdated = new Date();
LastUpdated.setMonth(LastUpdated.getMonth() - 3);

function NewGetMessage() { //Every time the user sends a message or loads the page all new sended messages are fetched and displayed on the page. 
    var mijnMessage = {}
    //mijnMessage.stageID = 1;
    mijnMessage.stageID = localStorage.getItem('current-StageID');
    mijnMessage.lastUpdated = LastUpdated.toISOString();
    fetch(baseurl + "/api/Messages", {
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

                console.log(returndata)
                returndata.data.forEach(function (message) {
                    
                    var p = document.createElement("p");
                    var p2 = document.createElement("p");
                    var p3 = document.createElement("p");

                    // var div = document.createElement("div");
                    // div.className = "messagebox";

                    p.innerHTML = message.userName;
                    p2.innerHTML = message.messageText;
                    p3.innerHTML = new Date(message.timestamp).toLocaleTimeString();


                    if (localStorage.getItem("UserName") == message.userName) {
                        p.className = "text-right"
                        p2.className = "text-right"
                        p3.className = "text-right"
                    } else {
                        p.className = "text-left"
                        p2.className = "text-left"
                        p3.className = "text-left"
                    }
                    //$(".chatbox").append(div);
                    $(".chatbox").append(p);
                    $(".chatbox").append(p2);
                    $(".chatbox").append(p3);
                });
            

                
            } else {
                console.log("error")

            }
        })
        .catch(error => {
            console.error("Error", error);
        });


}


function LoadPage() {
    document.getElementById("stageName").innerHTML = "Stage " + localStorage.getItem('current-StageID'); //get name of stage from local storage
    NewGetMessage(); //if the pages is loaded all sended messages are fetched via NewGetMessage 
    if (localStorage.getItem("UserRole") == "artist") { //if user is an artist DJ booth appears on the page
        $(".DjBooth").show();
    } else {
        $(".DjBooth").hide();
    }


}


function GetActiveUsersStage(StageID) {
    fetch(baseurl + "/api/User") //API list of messages
        .then((response) => response.json())
        .then(function (returndata) {
            console.log(returndata);

        })
        .catch(error => {
            console.error(error);
        });

}
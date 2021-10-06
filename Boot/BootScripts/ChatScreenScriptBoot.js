function SendMessage() { //post method if user sends a message. The message is posted to back-end and if message is distributed correctly, the function NewGetMessage will run
    var mijnMessage = {}
    mijnMessage.messageText = document.getElementById("messagebox").value;
    mijnMessage.userID = localStorage.getItem("UserID");
    fetch(baseurl + "/api/Messages", {
            method: "post",
            headers: {
                "Authorization": localStorage.getItem('AuthenticationKey'),
                "accept": "text/plain",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(mijnMessage)
        })
        .then(response => response.json())
        .then(json => {
            if (json.succes==false) {
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
LastUpdated.setMonth(LastUpdated.getMonth() - 2);

function NewGetMessage() {
    //Every time the user sends a message or loads the page all new sended messages are fetched and displayed on the page. 
    var mijnMessage = {}
    //mijnMessage.stageID = 1;
    mijnMessage.stageID = localStorage.getItem('current-StageID');
    mijnMessage.lastUpdated = LastUpdated.toISOString();
    fetch(baseurl + "/api/Messages", {
            method: "put",
            headers: {
                "Authorization": localStorage.getItem('AuthenticationKey'),
                "accept": "text/plain",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(mijnMessage)
        })
        .then(response => response.json())
        .then(function (returndata) {
            LastUpdated = new Date();

            if (returndata.success == true) {

                returndata.data.forEach(function (message) {
                    var div = document.createElement("div");
                    div.id = message.messageID;

                    console.log(returndata);
                    var divText = document.createElement("div");
                    var divName = document.createElement("div");
                    var pTime = document.createElement("p");

                    var icon = document.createElement("div");

                    divText.className = "font-weight-light";
                    divName.className = "font-weight-bold";

                    divName.innerHTML = message.userName;
                    divText.innerHTML = message.messageText;
                    pTime.innerHTML = new Date(message.timestamp + "Z").toLocaleTimeString([], {
                        year: 'numeric',
                        month: 'numeric',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit'
                    });

                    if (localStorage.getItem("UserName") == message.userName) {

                        div.className = "text-right";
                        pTime.className = "time-right";
                        $(".chatbox").append(div);
                        $("#" + message.messageID).append(divText);
                        $("#" + message.messageID).append(pTime);

                        if (message.userRole == "admin") {
                            icon.className = "bi bi-person-circle";
                            $("#" + message.messageID).prepend(icon);
                        } else if (message.userRole == "artist") {
                            icon.className = "bi bi-disc"
                            $("#" + message.messageID).prepend(icon);
                        }



                    } else {
                        div.className = "text-left";
                        pTime.className = "time-left";
                        $(".chatbox").append(div);
                        $("#" + message.messageID).append(divName);
                        $("#" + message.messageID).append(divText);
                        $("#" + message.messageID).append(pTime);

                        if (message.userRole == "admin") {
                            icon.className = "bi bi-person-circle";
                            $("#" + message.messageID).prepend(icon);
                        } else if (message.userRole == "artist") {
                            icon.className = "bi bi-disc"
                            $("#" + message.messageID).prepend(icon);
                        }

                    }

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
    if (localStorage.getItem("UserRole") == "artist") {
        //if user is an artist DJ booth appears on the page
        $("#DjBooth").show();
    } else {
        $("#chat").removeClass("col-sm-9").addClass("col-sm-12")
        $("#DjBooth").hide();
    }


}


function GetActiveUsersStage(StageID) {
    fetch(baseurl + "/api/User/"+localStorage.getItem('AuthenticationKey')) //API list of messages
        .then((response) => response.json())
        .then(function (returndata) {
            console.log(returndata);

        })
        .catch(error => {
            console.error(error);
        });

}
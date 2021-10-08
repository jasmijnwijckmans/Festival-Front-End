// Open a new websocket
var webSocket = new WebSocket("wss://festivalapplication20211001092547.azurewebsites.net/ws/"+localStorage.getItem("UserID"));

var AuthKey = localStorage.getItem('AuthenticationKey');

// Manually open a new websocket
function OpenSocket() {
    webSocket = new WebSocket("wss://festivalapplication20211001092547.azurewebsites.net/ws/"+localStorage.getItem("UserID"));
}

// OnOpen change a field in the html page to indicate that the socket is open
webSocket.onopen = function () {
    //Send the authentication key in a JSON object as the first message
    var msg = {
        AuthenticationKey: localStorage.getItem('AuthenticationKey'),
    };
    webSocket.send(JSON.stringify(msg));
}

// Listen for incoming messages
webSocket.onmessage = function (event) {
    // Convert the incoming message
    try {
        var socketmessage = JSON.parse(event.data);
        // Check what type of message you are receiving
        switch (socketmessage.MessageType) {
            case "IncomingMessage":
                // In case of an incoming message, add the message to the screen
                DisplayNewMessage(socketmessage.Message, false);
                break;
            case "InteractionUpdate":
                // In case of an update of the interactions, process the interaction counts into the page
                console.log(socketmessage.Message)
                break;
            case "MessageResponse":
                if (socketmessage.Message.Success) {
                    // In case of a response for a posted message, add the message if successful
                    DisplayNewMessage(socketmessage.Message.Data, true);
                    document.getElementById("NewMessageBtn").disabled = false;
                    document.getElementById("MessageSending").hidden = true;
                } else {
                    // In case of a response for a posted message, show an alert if unsuccessful
                    alert("Failed to post message, error code(s): " + socketmessage.Message.ErrorMessage.toString())
                    document.getElementById("NewMessageBtn").disabled = false;
                    document.getElementById("MessageSending").hidden = true;
                }
                break;
            case "InteractionResponse":
                if (!socketmessage.Message.Success) {
                    console.log("Failed to post interaction, error code(s): " + socketmessage.Message.ErrorMessage.toString())
                }
                break;
            default:

                break;
        }
    } catch {
        if (event.data == "Authorization passed, connection now open") {
            document.getElementById("socketstatus").innerHTML = "DEBUG: SOCKET OPEN";
        }
        console.log(event.data);
    }
}
function DisplayNewMessage(Message, OwnMessage) {
                    var div = document.createElement("div");
                    div.id = Message.MessageID;

                    var divText = document.createElement("div");
                    var divName = document.createElement("div");
                    var pTime = document.createElement("p");

                    var icon = document.createElement("div");

                    divText.className = "font-weight-light";
                    divName.className = "font-weight-bold";

                    divName.innerHTML = Message.UserName;
                    divText.innerHTML = Message.MessageText;
                    pTime.innerHTML = new Date(Message.Timestamp).toLocaleTimeString([], {
                        year: 'numeric',
                        month: 'numeric',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit'
                    });

                    if (OwnMessage) {

                        div.className = "text-right";
                        pTime.className = "time-right";
                        $(".chatbox").append(div);
                        $("#" + Message.MessageID).append(divText);
                        $("#" + Message.MessageID).append(pTime);

                        if (Message.UserRole == "admin") {
                            icon.className = "bi bi-person-circle";
                            $("#" + Message.MessageID).prepend(icon);
                        } else if (Message.UserRole == "artist") {
                            icon.className = "bi bi-disc"
                            $("#" + Message.MessageID).prepend(icon);
                        }



                    } else {
                        div.className = "text-left";
                        pTime.className = "time-left";
                        $(".chatbox").append(div);
                        $("#" + Message.MessageID).append(divName);
                        $("#" + Message.MessageID).append(divText);
                        $("#" + Message.MessageID).append(pTime);

                        if (Message.UserRole == "admin") {
                            icon.className = "bi bi-person-circle";
                            $("#" + Message.MessageID).prepend(icon);
                        } else if (Message.UserRole == "artist") {
                            icon.className = "bi bi-disc"
                            $("#" + Message.MessageID).prepend(icon);
                        }

                    }
}

// Send new messages
function SendMessage() {
    // Create an object with the required parameters
    var msg = {
        messageType: "PostMessage",
        messageText: document.getElementById("SendField").value,
        userID: localStorage.getItem("UserID"),
    };
    // Send the object as a string through the websocket
    webSocket.send(JSON.stringify(msg));
    // Handle the message to post it on the screen
    document.getElementById("NewMessageBtn").disabled = true;
    document.getElementById("MessageSending").hidden = false;
}

// Send new messages
function InteractWithMessage(MessageID, InteractionType) {
    // Create an object with the required parameters
    var msg = {
        messageType: "PostInteraction",
        messageID: MessageID,
        userID: document.getElementById("UserField").value,
        InteractionType: InteractionType
    };
    // Send the object as a string through the websocket
    webSocket.send(JSON.stringify(msg));
}

// Close the websocket
function Close() {
    webSocket.send("Closing connection");
    webSocket.close();
    document.getElementById("socketstatus").innerHTML = "DEBUG: SOCKET CLOSED";
}

function LoadPage() {
    document.getElementById("stageName").innerHTML = "Stage " + localStorage.getItem('current-StageID'); //get name of stage from local storage
     //if the pages is loaded all sended messages are fetched via NewGetMessage 
    if (localStorage.getItem("UserRole") == "artist") {
        //if user is an artist DJ booth appears on the page
        $("#DjBooth").show();
    } else {
        $("#chat").removeClass("col-sm-9").addClass("col-sm-12")
        $("#DjBooth").hide();
    }


}

function GoToHome() {
    window.location.href = 'index.html';
}

function GoToLogin() {
    window.location.href = 'LoginPage.html' ;
}
 
function GoToHelp(){
    window.location.href = 'Help.html';
}

function GoToCreateStage() {
    window.location.href = 'CreateStage.html';
}
function UpdateActivity() {
    var Json = "{\"stageID\":" + localStorage.getItem('current-StageID') + "\", \"userID\": 1 }"
    fetch("", {
        method: "put",
        headers: {
            "accept": "text/plain",
            "Content-Type": "application/json"
        },
        body: Json
    })
        .then(response => response.json())
        .then(json => {
            if (json.succes == false) {
                console.log(json.errorMessage);
            }
        })
        .catch(error => {
            console.error("Error");
        });


}
var StageID;

function GoToStage(StageID) {
    localStorage.setItem('current-StageID', StageID)
    window.location.href = 'ChatScreen.html';
    UpdateActivity();
}

function GoToSwitch(StageID) {
    localStorage.setItem('current-StageID', StageID)
    window.location.href = 'ChatSwitch.html';
    UpdateActivity();
}

function Login() {
    let dataReceived = "";
    var myJSON = "{\"Username\": \"" + document.getElementById("Username").value + "\",\"Password\":\"" + document.getElementById("Password").value + "\"}"
    fetch("https://localhost:44372/api/Login", { 
        method: "post",
        headers: {
            "success": true,
            "Content-Type": "application/json"
        },
        body: myJSON
    })
        .then(response => response.json())
        .then(json => {
            if (json.success) {
                localStorage.setItem('AuthenticationKey', json.data.authenticationKey);
                localStorage.setItem('UserID', json.data.userID);
                localStorage.setItem('UserName', json.data.userName);
                localStorage.setItem('UserRole', json.data.userRole);
                GoToSwitch();
            } else {
                document.getElementById("ErrorMessage").innerHTML = json.responseMessage[0];
            }
        })
}



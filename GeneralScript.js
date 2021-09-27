
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
    fetch("https://localhost:44374/api/login", { //Which localhost?
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
                GoToSwitch();
            } else {
                document.getElementById("ErrorMessage").innerHTML = json.responseMessage + " (" + json.errorCodes + ")";
            }
        })
        .catch(error => {
            document.getElementById("errorMessage").innerHTML = "";
        });
}




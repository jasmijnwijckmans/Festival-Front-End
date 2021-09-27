
function GoToHome() {
    window.location.href = 'index.html';
}

function GoToLogin() {
    window.location.href = 'LoginPage.html' ;
}

function GoToRegister() {
    window.location.href = 'RegisterPage.html';
}


    
function GoToHelp(){
    window.location.href = 'Help.html';

}

function showDiv() {
    document.getElementById('welcomeDiv').style.display = "block";
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
                localStorage.setItem('AuthenticationKey', json.data);
                GoToSwitch();
            } else {
                document.getElementById("LoginErrorMessage").innerHTML = json.responseMessage + " (" + json.errorCodes + ")";
            }
        })
        .catch(error => {
            document.getElementById("errorMessage").innerHTML = "";
        });
}




//Local API
//1) const baseurl = "https://localhost:44372";

//2) Mock API
const baseurl = "https://festivalapplication20211001092547.azurewebsites.net";

//!!IMPORTANT!!: Use only API 1 or 2!

function GoToHome() {
    window.location.href = 'indexBoot.html';
}

function GoToLogin() {
    window.location.href = 'LoginPageBoot.html' ;
}
 
function GoToHelp(){
    window.location.href = 'HelpBoot.html';
}

function GoToCreateStage() {
    window.location.href = 'CreateStageBoot.html';
}

var StageID;

function GoToStage(StageID) {
    localStorage.setItem('current-StageID', StageID)
    window.location.href = 'ChatScreenBoot.html';
    UpdateActivity();
}

function GoToSwitch(StageID) {
    localStorage.setItem('current-StageID', StageID)
    window.location.href = 'ChatSwitchBoot.html';
    UpdateActivity();
}

function Logout() {
    window.location.href = 'indexBoot.html';
}

function Login() {
    let dataReceived = "";
    var myJSON = "{\"Username\": \"" + document.getElementById("Username").value + "\",\"Password\":\"" + document.getElementById("Password").value + "\"}"
    fetch(baseurl + "/api/Login", {
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

// script to register new user
function Register() {
    // create request body
    myJson = {}
    myJson.Username = document.getElementById("Username").value;
    myJson.Password = document.getElementById("Password").value;
    fetch(baseurl +"/api/User", {
        method: "post",
        headers: {
            "success": true,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(myJson)
    })
    // response as Json
        .then(response => response.json())
        .then(json => {
            if (json.success) {
                // if response is is true, log the returning user ID
               console.log(json.data)
               //create alert to notify if regiter was succesful to do!!!
                //GoToSwitch();
            } else {
                // errormessage
                document.getElementById("ErrorMessage").innerHTML = json.responseMessage[0];
            }
        })
}

function UpdateActivity() {
    var Json = "{\"stageID\":" + localStorage.getItem('current-StageID') + ", \"userID\": "+localStorage.getItem("UserID")+" }"
    fetch(baseurl + "/api/UserActivity", {
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




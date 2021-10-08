//Local API
//1) const baseurl = "https://localhost:44372";

//2) Mock API
const baseurl = "https://festivalapplication20211001092547.azurewebsites.net";

//!!IMPORTANT!!: Use only API 1 or 2!

function GoToHome() {

    window.location.href = 'indexBoot.html';
}

function GoToLogin() {
    window.location.href = 'LoginPageBoot.html';
}

function GoToHelp() {
    window.location.href = 'HelpBoot.html';
}

function GoToCreateStage() {
    window.location.href = 'CreateStageBoot.html';
}
function GoToSwitch() {
    window.location.href = 'ChatSwitchBoot.html';
}
function GoToStage() {
    window.location.href = 'ChatScreenWeb.html';
}
function GoToManageUsers() {
    window.location.href = "ManageUserBoot.html";
}


function Login() {
    //let dataReceived = "";
    mijnlogin = {}
    mijnlogin.Username = document.getElementById("Username").value;
    mijnlogin.Password = document.getElementById("Password").value;

    //var myJSON = "{\"Username\": \"" + document.getElementById("Username").value + "\",\"Password\":\"" + document.getElementById("Password").value + "\"}"

    fetch(baseurl + "/api/Login", {
        method: "post",
        headers: {
            "success": true,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(mijnlogin)
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
    fetch(baseurl + "/api/User", {
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
                alert("You have been registered succesfully!, click Login to proceed");
                //GoToSwitch();
            } else {
                // errormessage
                document.getElementById("ErrorMessage").innerHTML = json.responseMessage[0];
                alert("something went wrong, try agian!")
            }
        })
}

var StageID;

function UpdateActivity(StageID) {
    update = {}
    update.stageID = StageID;
    update.userID = localStorage.getItem('UserID');
    console.log(update);
    fetch(baseurl + "/api/UserActivity", {
        method: "put",
        headers: {
            "Authorization": localStorage.getItem('AuthenticationKey'),
            "accept": "text/plain",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(update)
    })
        .then(response => response.json())
        .then(function (returndata) {
            console.log(returndata);

            if (returndata.success) {
                if (StageID == 0) {
                    localStorage.setItem('current-StageID', StageID);
                    GoToSwitch();

                }
                else {
                    localStorage.setItem('current-StageID', StageID);
                    GoToStage();
                }
            }
        })
        .catch(error => {
            console.error("Error", error);
        });
}


function Logout() {
    DeleteAuthenticationKey();
    localStorage.clear();
    UpdateActivity(0);
    GoToHome();

}

function DeleteAuthenticationKey() {
    fetch(baseurl + "/api/login/" + localStorage.getItem("UserID"), {
        method: "delete",
        headers: {
            "Authorization": localStorage.getItem('AuthenticationKey'),
            "accept": "text/plain",
            "Content-Type": "application/json"
        },
    })
        .then(response => response.json())
        .then(json => {
            if (json.success == false) {
                ProcessErrors(json.errorCodes, json.responseMessage);
            }
        })
        .catch(error => {
            console.log("Failed to send request");
        });
}
function ButtonCreateStage() {
    let dataReceived = "";
    var myJSON = "{\"StageName\": \"" + document.getElementById("stagenamefield").value + "\",\"StageActive\":\"" + document.getElementById("IDK").value + "\"}" //Hoe geef ik aan of active is?
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
                localStorage.setItem('AuthenticationKey', json.data.AuthenticationKey);
                GoToSwitch();
            } else {
                document.getElementById("ErrorMessage").innerHTML = json.responseMessage + " (" + json.errorCodes + ")";
            }
        })
        .catch(error => {
            document.getElementById("errorMessage").innerHTML = "";
        });
}

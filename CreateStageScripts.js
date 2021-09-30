function ButtonCreateStage() {
    localStorage.setItem('UserRole', "admin") //deze lijn is tijdelijk om te laten werken
    if (localStorage.getItem('UserRole') == "admin") {
    let dataReceived = "";
    var myJSON = "{\"StageName\": \"" + document.getElementById("stagenamefield").value + "\",\"StageActive\": true}" 
    fetch("https://1a63a4ab-7d00-4b50-aac3-f73fb23a4d1f.mock.pstmn.io/api/Stage", { 
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
                

                GoToSwitch();

            } else {
                document.getElementById("ErrorMessage").innerHTML = json.responseMessage + " (" + json.errorCodes + ")";
            }
        })
        .catch(error => {
            document.getElementById("errorMessage").innerHTML = "";
        });
    }
    else {
        document.getElementById("RoleError").innerHTML;

    }
}




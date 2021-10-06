function CreateStage() {
    //localStorage.setItem('UserRole', "admin") //deze lijn is tijdelijk om te laten werken
    if (localStorage.getItem('UserRole') == "admin") {
    let dataReceived = "";
    var myJSON = "{\"stageName\": \"" + document.getElementById("stagenamefield").value + "\",\"stageActive\":"+ $('#activeStage').is(':checked') +"}"
    console.log(myJSON);
    fetch(baseurl + "/api/Stage", { 
        method: "post",
        headers: {
           "Authorization": localStorage.getItem('AuthenticationKey'),
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
                console.log("error")
            }
        })
        .catch(error => {
            console.error("Error", error);
        });
    }
    else {
        //document.getElementById("RoleError").innerHTML;

    }
}

function EditStage() {
    //localStorage.setItem('UserRole', "admin") //deze lijn is tijdelijk om te laten werken
    if (localStorage.getItem('UserRole') == "admin") {
    let dataReceived = "";
    var myEdit = "{\"stageID\": " + document.getElementById("stageIDfield").value + ",\"stageActive\":"+ $('#activeStageEdit').is(':checked') +"}"
    console.log(myEdit);
    fetch(baseurl + "/api/Stage", { 
        method: "put",
        headers: {
           "Authorization": localStorage.getItem('AuthenticationKey'),
            "success": true,
            "Content-Type": "application/json"
        },
        body: myEdit
    })
        .then(response => response.json())
        .then(json => {
            console.log(json)
            if (json.success) {
                
                GoToSwitch();

            } else {
                console.log("error",error)
            }
        })
        .catch(error => {
            console.error("Error", error);
        });
    }
    else {
        //document.getElementById("RoleError").innerHTML;

    }
}






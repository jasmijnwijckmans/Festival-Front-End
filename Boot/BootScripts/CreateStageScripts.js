function CreateStage() {
    //localStorage.setItem('UserRole', "admin") //deze lijn is tijdelijk om te laten werken
    if (localStorage.getItem('UserRole') == "admin") {
        let dataReceived = "";
        var myJSON = "{\"stageName\": \"" + document.getElementById("stagenamefield").value + "\",\"stageActive\":" + $('#activeStage').is(':checked') + "}"
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
        var myEdit = "{\"stageID\": " + document.getElementById("stageIDfield").value + ",\"stageActive\":" + $('#activeStageEdit').is(':checked') + "}"
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
                    console.log("error", error)
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

function GetActiveStages() {
    fetch(baseurl + "/api/Stage")
        .then((response) => response.json()) //What's the difference 
        .then(function (returndata) {
            console.log(returndata);
            // if loading is correct, a card with data will be provided
            if (returndata.success) {
                var row = "";
                returndata.data.forEach(function (stage) {
                    row += "<tr>";
                    row += "<td style = \" font-weight: bold\">" + stage.stageID + ":" + "</td>";
                    temp += "<td style=\"text-align:left\">" + stage.stageName + "</td>";
                    temp += "<td style=\"font-weight: lighter\">" + stage.currentSong + "</td>";
                    temp += "<td style=\"font-weight: lighter\">" + stage.numberOfUsers + "</td>";
                    temp += "<td style=\"font-weight: lighter\"> <input class='form-check-input' type='checkbox' value='' id='activeStageEdit'></td>";

                    document.getElementById("myStages").innerHTML += row;
                });

            }
            else {
                console.log(error)
            }
        }) // if loading failed, error message is shown on screen
        .catch(error => {
            console.error("Error", error);

        });
}



function CreateStage() {
    if (localStorage.getItem('UserRole') == "admin") {
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
                console.log(json);
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
        alert("This user is not an admin")
    }
}

function EditStage() {
    if (localStorage.getItem('UserRole') == "admin") {
        var myEdit = {}
        myEdit.stageID = document.getElementById("stageIDfield").value
        myEdit.stageActive = $('#activeStageEdit').is(':checked');
        console.log(myEdit);
        fetch(baseurl + "/api/Stage", {
            method: "put",
            headers: {
                "Authorization": localStorage.getItem('AuthenticationKey'),
                "success": true,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(myEdit)
        })
            .then(response => response.json())
            .then(json => {
                console.log(json)
                if (json.success) {
                    onload;
                } else {
                    console.log("error", error)
                }
            })
            .catch(error => {
                console.error("Error", error);
            });
    }

    else {
        alert("This user is not an admin")
    }
}


function GetActiveStages() {
    fetch(baseurl + "/api/Stage/api/Stage/all", {
        headers: {
            "Authorization": localStorage.getItem('AuthenticationKey')
        }
    })
        .then((response) => response.json()) //What's the difference 
        .then(function (returndata) {
            console.log(returndata);
            // if loading is correct, a card with data will be provided
            if (returndata.success) {
                var row = "";
                returndata.data.forEach(function (stage) {
                    
                    row += "<tr>";
                    row += "<td style = \" font-weight: bold\"> <div id ='stageID'>" + stage.stageID + "</div></td>";
                    row += "<td style=\"text-align:left\">" + stage.stageName + "</td>";
                    row += "<td style=\"font-weight: lighter\">" + stage.currentSong + "</td>";
                    row += "<td class = \"text-center\" style=\"font-weight: lighter\"> <div id ='numberOfUsers'>" + stage.numberOfUsers + "</div></td>";
                    if(stage.stageActive==true){
                    row +=   "<td>  <input id='stageIDfield' type='number' placeholder='Enter stage ID'></td>";
                    row += "<td style=\"font-weight: lighter\"> <label class='switch'> <input id = 'activeStageEdit'  onclick ='EditStage()' type='checkbox' checked ><span class='slider round'></span></label></td>";

                    }
                    else{
                    row +=   "<td>  <input id='stageIDfield' type='number' placeholder='Enter stage ID'></td>";
                     row += "<td style=\"font-weight: lighter\"> <label class='switch'> <input id = 'activeStageEdit'  onclick ='EditStage()' type='checkbox'><span class='slider round'></span></label></td>";
                     }
                    row += "<td style=\"font-weight: lighter\"> <button class='btn' onclick='DeleteStage(" + stage.stageID + ")'> Delete</button></td>";
    
                    

                });
                document.getElementById("myStages").innerHTML += row;

            }
            else {
                console.log(error)
            }
        }) // if loading failed, error message is shown on screen
        .catch(error => {
            console.error("Error", error);

        });
}


function DeleteStage(stageID) {
    if (localStorage.getItem('UserRole') == "admin") {
        var myDelete = {}
        myDelete.stageID = stageID;
        console.log(myDelete);
        fetch(baseurl + "/api/Stage", {
            method: "put",
            headers: {
                "Authorization": localStorage.getItem('AuthenticationKey'),
                "success": true,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(myDelete)
        })
            .then(response => response.json())
            .then(json => {
                console.log(json)
                if (json.success) {
                    onload;

                } else {
                    console.log("error", error)
                }
            })
            .catch(error => {
                console.error("Error", error);
            });
    }
    else {
        alert("This user is not an admin")
    }

}


function GetStage(stageID) {
    if (localStorage.getItem('UserRole') == "admin") {
    fetch(baseurl + "/api/User", {
        headers: {
            "Authorization": localStorage.getItem('AuthenticationKey')
        }
    })
        .then(response => response.json())
        .then(function (returndata) {
            console.log(returndata);
            if (returndata.success) {
                var temp = "";

                returndata.data.forEach(function (stageuser) {
                    temp += "<tr>";
                    temp += "<td style = \" font-weight: bold\">" + stageuser.userName + ":" + "</td>";
                    temp += "<td style=\"font-weight: lighter\">" + stageuser.userRole + "</td></tr>";

                });
                document.getElementById("stageUsers").innerHTML += temp;

            } else { }

        })
        .catch(error => {
            console.error("Error", error);
        });
    }
    else{
        alert("This user is not an admin")

    }

}



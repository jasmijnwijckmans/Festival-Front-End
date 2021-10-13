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

                    GetStages();

                } else {
                    ProcessErrors(json.errorMessage)
                }
            })
            .catch(error => {
                ProcessErrors(json.errorMessage)
            });
    }
    else {
        alert("This user is not an admin")
    }
}

function EditStage(StageID, Status) {
    if (localStorage.getItem('UserRole') == "admin") {
        var myEdit = {}
        myEdit.stageID = StageID;
        myEdit.stageActive = Status;
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
                console.log(json);
                if (json.success) {
                    GetStages();
                } else {
                    ProcessErrors(json.errorMessage)
                }
            })
            .catch(error => {
                ProcessErrors(json.errorMessage)
            });
    }

    else {
        alert("This user is not an admin")
    }
}


function GetStages() {
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
                    //row +=   "<td>  <input id='IDfield' type='text' placeholder='Enter stage ID'></td>";
                    row += "<td style=\"font-weight: lighter\"> <label class='switch'> <input id = 'activeStageEdit'  onclick ='EditStage(" + stage.stageID + ","+ false + ")' type='checkbox' checked ><span class='slider round'></span></label></td>";

                    }
                   else{
                     //row +=   "<td>  <input id='IDfield' type='text' placeholder='Enter stage ID'></td>";
                    row += "<td style=\"font-weight: lighter\"> <label class='switch'> <input id = 'activeStageEdit'  onclick ='EditStage(" + stage.stageID + ","+ true +  ")' type='checkbox'><span class='slider round'></span></label></td>";
                   }
                    row += "<td style=\"font-weight: lighter\"> <button class='btn' onclick='DeleteStage(" + stage.stageID + ")'> Delete</button></td>";
    
                    

                });
                document.getElementById("myStages").innerHTML += row;

            }
            else {
                ProcessErrors(returndata.errorMessage)
            }
        }) // if loading failed, error message is shown on screen
        .catch(error => {
            ProcessErrors(returndata.errorMessage)

        });
}


function DeleteStage(stageID) {
    if (localStorage.getItem('UserRole') == "admin") {
        fetch(baseurl + "/api/Stage/"+stageID, {
            method: "delete",
            headers: {
                "Authorization": localStorage.getItem('AuthenticationKey')
            }
        })
            .then(response => response.json())
            .then(json => {
                console.log(json);
                if (json.success) {
                    GetStages();

                } else {
                    //alert("This stage can not be deleted, because there are active users in the stage");
                    ProcessErrors(json.errorMessage)
                
                }
            })
            .catch(error => {
                ProcessErrors(json.errorMessage)
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

            } else { 
                ProcessErrors(returndata.errorMessage)
            }

        })
        .catch(error => {
            ProcessErrors(returndata.errorMessage)
        });
    }
    else{
        alert("This user is not an admin")

    }

}



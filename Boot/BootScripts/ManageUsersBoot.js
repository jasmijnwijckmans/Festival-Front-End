// fucntion for loading the info of the stages
function GetUsers() {
    fetch(baseurl + "/api/User")
        .then((response) => response.json()) //What's the difference 
        .then(function (returndata) {
            console.log(returndata);
            // if loading is correct, a card with data will be provided
            if (returndata.success) {
                var temp = "";
                returndata.data.forEach(function (user) {
                    temp += "<tr>";
                
                temp += "<td style = \" font-weight: bold\">" + user.userName + ":" + "</td>";
                temp += "<td style=\"text-align:left\">" + user.userRole + "</td>";
                temp += "<td style=\"font-weight: lighter\">" + user.userID + "</td>";
                document.getElementById("myUsers").innerHTML += temp;    
                });
                
            } else {}
        }) // if loading failed, error message is shown on screen
        .catch(error => {
            console.error("Error", error);

        });  
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
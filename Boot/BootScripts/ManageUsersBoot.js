// fucntion for loading the info of the stages
function GetUsers() {
    fetch(baseurl + "/api/User", {
            headers: {
                "Authorization": localStorage.getItem('AuthenticationKey')
            }
        })
        .then((response) => response.json()) //What's the difference 
        .then(function (returndata) {
            console.log(returndata);
            // if loading is correct, a card with data will be provided
            if (returndata.success) {
                var temp = "";
                returndata.data.forEach(function (user) {
                    temp += "<tr>";

                    temp += "<td style = \" font-weight: bold\">" + user.userName + ":" + "</td>";
                    temp += "<td style=\"text-align:left\">" + user.userID + "</td>";
                    temp += "<td style=\"font-weight: lighter\">" + user.userRole + "</td></tr>";

                });
                document.getElementById("myUsers").innerHTML += temp;

            } else {
                ProcessErrors(json.errorMessage)
            }
        }) // if loading failed, error message is shown on screen
        .catch(error => {
            console.error("Error", error);

        });
}

function EditUser() {
    //localStorage.setItem('UserRole', "admin") //deze lijn is tijdelijk om te laten werken
    if (localStorage.getItem('UserRole') == "admin") {
        var myEdit = {}
        myEdit.userID = document.getElementById("userID").value
        myEdit.userRole = document.getElementById("userRole").value

        //var myEdit = "{\"UserID\": " + document.getElementById("userID").value+ ",\"UserRole\": \"+ document.getElementById("userRole").value + \" }";
        console.log(myEdit);
        fetch(baseurl + "/api/User", {
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
                    console.log(json);
                    onload
                } else {
                    ProcessErrors(json.errorMessage)
                }
            })
            .catch(error => {
                console.error("Error", error);
            });

    } else {
        console.log(error)
    }

}

function DeleteUser() {
    //var myDelete = {}
    //myDelete.userID = document.getElementById("userID").value;
    fetch(baseurl + "/api/user/" + document.getElementById("userID").value, {
            method: "delete",
            headers: {
                "Authorization": localStorage.getItem('AuthenticationKey'),
                "accept": "text/plain",
                "Content-Type": "application/json"
            }
            //body: JSON.stringify(myDelete)
        })
        .then(response => response.json())
        .then(json => {
            if (json.success == false) {
                ProcessErrors(json.errorMessage)
            } else {

                console.log(json);
                onload
            }
        })
        .catch(error => {
            console.log("Failed to send request");
        });

  // function reload() {
   // reload = location.reload();
//}

}
// fucntion for loading the info of the stages
function GetInfo() {
    fetch(baseurl + "/api/Stage", {
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
                    //specific rows and the info for the card
                    row += " <div class='col-6'>"
                    row += " <div class='card mt-3'>"
                    row += "<img class=\"card-img-top\" src=\"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIM3la9vbgy48Y6C_mJHPnQu_CRp1EvjnIfw&usqp=CAU\" alt=\"Card image cap\">"
                    row += "<div>" + stage.stageName + "<br>" + stage.currentSong + "<br>" + stage.numberOfUsers + "<br> <a><button class='btn' value='Join'  onclick='UpdateActivity(" + stage.stageID + ")'> Join<i class=''></i></button></a></div>"
                    row += "</div>"
                    row += "</div>"
                    //console.log(row);
                    
                    onclick='UpdateActivity(" + stage.stageID + ")'
                });
                document.getElementById("stages").innerHTML += row;
                if (localStorage.getItem("UserRole") == "admin") { // when userID is admin, show this table.
                    row += " <div class='col-6'>"
                    row += " <div class='card mt-3'>"
                    row += "<img class=\"card-img-top\" src=\"https://s3.envato.com/files/30191147/Preview%20(0.00.00.00).jpg\" alt=\"Card image cap\">"
                    row += "<div>" + "Create Stage" + "<br><button class='btn btn-primary' onclick='GoToCreateStage()'>Create</button></div>"
                    row += "<div>" + "ManageUsers" + "<br><button class='btn btn-primary' onclick='GoToManageUsers()'>Manage users</button></div>"
                    row += "</div>"
                    row += "</div>"
                    document.getElementById("stages").innerHTML += row;
                } 

            } else {}
        }) // if loading failed, error message is shown on screen
        .catch(error => {
            console.error("Error", error);

        });  
}
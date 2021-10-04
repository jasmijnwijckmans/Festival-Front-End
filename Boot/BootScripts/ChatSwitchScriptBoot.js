// fucntion for loading the info of the stages
function GetInfo() {
    fetch(baseurl + "/api/Stage")
        .then((response) => response.json()) //What's the difference 
        .then(function (returndata) {
            console.log(returndata);
            // if loading is correct, a card with data will be provided
            if (returndata.success) {
                var row = "";
                returndata.data.forEach(function (stage) {
                    //specific rows and the info for the card
                    row += "<tr onclick='GoToStage(" + stage.stageid + ")'>";
                    row += " <div class='col-6'>"
                    row += " <div class='card mt-3'>"
                    row += " <div id='mydata', button= oncclick'GoToStage></div>"
                    row += "<div class='card-body'>" + "Stage:<br><br>" + stage.stageName + "</div>"
                    row += "<div class='card-body'>" + "Genre:  Pop<br><br>" + "</div>"
                    row += " <div class='card-body''>" + "Current song:<br><br>" + stage.currentSong + "</div>"
                    row += " <div class='card-body''>" + "Number of Users:<br><br>" + stage.numberOfUsers + "</div>"
                    row += " <div class= 'card-body'><button class='btn btn-primary' onclick='GoToStage(" + stage.stageID + ")'>Join</button></div>"
                    row += "</div>"
                    row += "</div>"
                    console.log(row);



                });
                document.getElementById("stages").innerHTML = row;

            } else {

            }


        }) // if loading failed, error message is shown on screen
        .catch(error => {
            console.error("Error", error);

        });
   
   
        // show the create stage button only when the user is a admin
    if (localStorage.getItem("UserRole") == "admin") {
       
        $("div.gotocreatestage").show();
        console.log(row);



    }
}

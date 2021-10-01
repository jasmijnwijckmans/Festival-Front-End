function GetInfo() {
    fetch(baseurl + "/api/Stage")
        .then((response) => response.json()) //What's the difference 
        .then(function (returndata) {
            console.log(returndata);
            if (returndata.success) {
                var row = "";
                returndata.data.forEach(function (stage) {
                    row += "<tr onclick='GoToStage(" + stage.stageid + ")'>";

                    // row += "<td>" + stage.stageName + "</td>";
                    //row += "<td>" + stage.currentSong + "</td>";
                    //row += "<td>" + stage.users + "</td>";
                    //row += "</tr>";
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


        })
        .catch(error => {
            console.error("Error", error);

        });
    if (localStorage.getItem("UserRole") == "admin") {
        $("div.gotocreatestage").show();
        console.log("hallo");
    }
}
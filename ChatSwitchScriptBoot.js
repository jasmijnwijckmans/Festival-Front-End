if (localStorage.getItem("UserRole") == "admin") {
    $("div.gotocreatestage").show();
}

function GetInfo() {
    fetch('https://1a63a4ab-7d00-4b50-aac3-f73fb23a4d1f.mock.pstmn.io/api/Stage')
        .then((response) => response.json()) //What's the difference 
        .then(function (returndata){
            console.log(returndata);
            if (returndata.success) {
                var row = "";
                returndata.data.forEach(function (stage) {
                    row += "<tr onclick='GoToStage("+stage.stageid+")'>";
                    
                   // row += "<td>" + stage.stageName + "</td>";
                    //row += "<td>" + stage.currentSong + "</td>";
                    //row += "<td>" + stage.users + "</td>";
                    //row += "</tr>";
                    row+=" <div class='col-6'>"
                    row+=" <div class='card mt-3'>"
                   
        row+=" <div id='mydata', button= oncclick'GoToStage></div>"
        row +="<div class='card-body'>" + "Stage:<br><br>"+ stage.stageName + "</div>"
        row +="<div class='card-body'>" + "Genre:  Pop<br><br>"+ "</div>"
        row +=" <div class='card-body''>" + "Current song:<br><br>" + stage.currentSong + "</div>"
        row+=" <div class='card-body''>" + "Number of Users:<br><br>" + stage.users + "</div>"
        row+=" <div class= 'card-body'><button class='btn btn-primary' onclick='GoToStage("+stage.stageid+")'>Join</button></div>"
      row+="</div>"
      row+="</div>"
                    console.log(row);



                }); document.getElementById("stages").innerHTML = row;

            } else {

            }


        })
        .catch(error => {
            console.error("Error", error);

        });
}
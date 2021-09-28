if (localStorage.getItem("UserRole") == "admin") {
    $("div.gotocreatestage").show();
}

function GetInfo() {
    fetch('https://localhost:44372/api/Stage')
         .then((response) => response.json())  //What's the difference 
        .then(function(returndata) {
            console.log(returndata);
        if(returndata.success){
            var row="";
         returndata.data.forEach(function(stage){
                row +="<tr onclick = "gotostage(/" + returndata.stage");
                row += "<td>"+ stage.stageName+ "</td>";
                row += "<td>"+ stage.currentSong+ "</td>";
                row += "<td>"+ stage.users+ "</td>";
                row += "<td>"+ stage.JoinStage+ "</td>";
                row += "</tr>"
                console.log(row)
                


            })
            document.getElementById("myData").innerHTML = row;

        }
        else{

        }
            

        })
        .catch(error => {
                console.error("Error");

            });
}


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
                    
                    row += "<td>" + stage.stageName + "</td>";
                    row += "<td>" + stage.currentSong + "</td>";
                    row += "<td>" + stage.users + "</td>";
                    row += "</tr>";
                    console.log(row);



                }); document.getElementById("myData").innerHTML = row;

            } else {

            }


        })
        .catch(error => {
            console.error("Error", error);

        });
}
if (localStorage.getItem("UserRole") == "admin") {
    $("div.gotocreatestage").show();
}

function GetInfo() {
    fetch('https://1a63a4ab-7d00-4b50-aac3-f73fb23a4d1f.mock.pstmn.io/api/Stage')
         .then((response) => response.json())  //What's the difference 
        .then(function(data) {
            console.log(data);

        })
        .catch(error => {
                console.error("Error");

            });
}

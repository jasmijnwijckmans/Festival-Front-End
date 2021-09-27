
function GoToCreateStage() {
    window.location.href = "CreateScreen.html"
    if (localStorage.getItem("UserRole") == "admin") {
        $("div.createStage").show();
    }
}


    
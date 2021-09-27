var StageID;

function GoToStage(StageID){
    localStorage.setItem('current-StageID', StageID)
    window.location.href = 'ChatScreen.html';
}
<<<<<<< HEAD
    


function GoToInfo() {
    localStorage.getItem("stages", StageID)
    window.location.href = 'Info.html';
    LoadPage(){
        document.getElementById("stageName").innerHTML = "Stage " + localStorage.getItem('current-StageID')
        NewGetMessage();
=======
>>>>>>> master

var StageID;

function GoToStage(StageID){
    localStorage.setItem('current-StageID', StageID)
    window.location.href = 'ChatScreen.html';
}
    


function GoToHelp(){
    window.location.href = 'Help.html';

}

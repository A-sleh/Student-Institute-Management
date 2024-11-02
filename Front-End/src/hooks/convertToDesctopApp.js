
const entirePage = document.getElementById("root")


function openFullScreen() {

    if(entirePage.requestFullscreen) {
        
        entirePage.requestFullscreen()
        return 
    }

    if(entirePage.webkitRequestFullscreen) {
        entirePage.webkitRequestFullscreen()
        return 
    }

    if(entirePage.msRequestFullscreen) {
        entirePage.msRequestFullscreen()
    }
}


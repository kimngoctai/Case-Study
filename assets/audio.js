function play(){
    let audio1 = document.getElementById('audio').autoplay;
    
}
var audio = document.getElementById('audio');
var playPauseBTN = document.getElementById('playPauseBTN');
var count = 0;

function playPause(){
	if(count == 0){
		count = 1;
		audio.play();
		playPauseBTN.innerHTML = "Pause ⏸";
        drop();
	}else{
		count = 0;
		audio.pause();
        clearInterval(interval);

		playPauseBTN.innerHTML = "Play ►";
	}

}

function stop(){
	playPause();
    randomPiece();
	audio.pause();
	audio.currentTime = 0;
	playPauseBTN.innerHTML = "Play ►";
}


var result  
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

var commands = [ 'play','pause','previous','forward'];
var grammar = '#JSGF V1.0; grammar commands; public <commands> = ' + commands.join(' | ') + ' ;'

var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();

speechRecognitionList.addFromString(grammar, 1);

recognition.grammars = speechRecognitionList;
//recognition.continuous = false;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;




$('.fa-microphone').on('click',function() {
	$('.fa-microphone').removeClass("active");
  recognition.start();
  console.log('Ready to receive a commands.');
})

recognition.onresult = function(event) {
	
	
  var speechResult = event.results.length - 1;
  result = event.results[speechResult][0].transcript;
  
  
    if(result == "play"){
		$('.fa-microphone').addClass("active") ;
  var song = document.querySelector('audio');

		console.log('Playing');
		$('.play-icon').removeClass('fa-play').addClass('fa-pause');		
		song.play();
		
		}
		
	if(result == "pause"){
		$('.fa-microphone').addClass("active") ;
  var song = document.querySelector('audio');

		console.log('Pausing');
		$('.play-icon').removeClass('fa-pause').addClass('fa-play');		
		song.pause();
		
		}
		
		
		if(result == "previous"){


             $('.fa-microphone').addClass("active");
        if (shuffle == 1) {
            var audio = document.querySelector('audio');
            var nextSongNumber = randomExcluded(0, 3, Playingnumber); // Calling our function from Stackoverflow

            var nextSongObj = songs[nextSongNumber];
            audio.src = nextSongObj.fileName;
            toggleSong();
            changeCurrentSongDetails(nextSongObj);
            Playingnumber = nextSongNumber;


        }

		else {

            if (Playingnumber == 0) {
                Playingnumber = songs.length - 1;
                changeSong();
            } else {
                console.log("two");
                console.log(Playingnumber);
                Playingnumber--;
                changeSong();
            }

        }

    }

if (result == "forward") {
        $('.fa-microphone').addClass("active");
        if (shuffle == 1) {
            var audio = document.querySelector('audio');
            var nextSongNumber = randomExcluded(0, 3, Playingnumber); // Calling our function from Stackoverflow

            var nextSongObj = songs[nextSongNumber];
            audio.src = nextSongObj.fileName;
            toggleSong();
            changeCurrentSongDetails(nextSongObj);
            Playingnumber = nextSongNumber;


        } else {

            if (Playingnumber == songs.length - 1) {
                Playingnumber = 0;
                changeSong();
            } else {
                console.log("two");
                console.log(Playingnumber);
                Playingnumber++;
                changeSong();
            }

        }



    }
	
	
    if (result == "shuffle between songs"||result == "shuffle between song")
     {
        $('.fa-microphone').addClass("active");

        $(".fa-random").toggleClass("active");
        if (shuffle == 0)
        {

            shuffle = 1;
        }

        else
        {
            shuffle = 0;
        }



    }

    if (result == "loop through song"||result == "loop through songs")
     {
        $('.fa-microphone').addClass("active");
        $(".fa-repeat").toggleClass("active");
        if (loop == 0) {

            loop = 1;

        }
        else {

            loop = 0;

        }


    }
}
		

 
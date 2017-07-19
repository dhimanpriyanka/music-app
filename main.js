		var currentSongNumber = 1;
		var willLoop = 0;
		var willShuffle = 0;
		var Playingnumber = 0  ;
         var shuffle=0;
		
	
	
function changeSong() 
{
var music =  songs[Playingnumber].fileName;
var song = document.querySelector("audio");
song.src = music;
toggleSong();
changeCurrentSongDetails(songs[Playingnumber])
}
	
	
	function toggleSong() {							
	var song = document.querySelector('audio');
		if(song.paused == true) {
		console.log('Playing');
		$('.play-icon').removeClass('fa-play').addClass('fa-pause');		
		song.play();
		}
		else {
		console.log('Pausing');
		$('.play-icon').removeClass('fa-pause').addClass('fa-play');
		song.pause();
		}
		}
//--------------------------details of songss--------------------------------		
						function changeCurrentSongDetails(songobj) {			
							$('.current-song-image').attr('src','img/' + songobj.image);
							$('.current-song-name').text(songobj.name);
							$('.current-song-album').text(songobj.album);
						}
						
						
						function UpdateTimer() {
						var song = document.querySelector('audio');
						var ct = song.currentTime;
						var td = song.duration;
						var percentage = (ct/td)*100;
						$('.progress-filled').css('width', percentage+ "%");
						}
						
	//------------------add fancy time------------------------					
		
					function fancyTimeFormat(time)
			{   
				// Hours, minutes and seconds
				var hrs = ~~(time / 3600);
				var mins = ~~((time % 3600) / 60);
				var secs = time % 60;

				// Output like "1:01" or "4:03:59" or "123:03:59"
				var ret = "";

				if (hrs > 0) {
					ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
				}

				ret += "" + mins + ":" + (secs < 10 ? "0" : "");
				ret += "" + secs;
				return ret;
			}
				
	//--------------------end----------------------------------	
		
	//----------------------function(current time and duration time)----------
				function updateCurrentTime() {
					var song = document.querySelector('audio');
					var currentTime = Math.floor(song.currentTime);
					currentTime = fancyTimeFormat(currentTime);
					var duration = Math.floor(song.duration);
					duration = fancyTimeFormat(duration);
					$('.time-elapsed').text(currentTime);
					$('.song-duration').text(duration);
					
				}
	//---------------------------add timejump to end of the song by -5 and play next--------------
				function timeJump() {
				var song = document.querySelector('audio')
				song.currentTime = song.duration - 5;
				}
	//----------when window is loading.....update the first song detail------------			
			window.onload = function() {
						changeCurrentSongDetails(songs[0]);   
					updateCurrentTime(); 
					setInterval(function() {
					updateCurrentTime();
					UpdateTimer();
					},1000);
					
					$('#songs').DataTable({
						paging: false
					});
									
					}
						function addSongNameClickEvent(songobj,position) {
							var songName = songobj.fileName;
							var id = '#song' + position;
						$(id).click(function() {
						var audio = document.querySelector('audio');
						var currentSong = audio.src;
						if(currentSong.search(songName) != -1)
						{
						toggleSong();
						}
						else {
							
						audio.src = songName;
						toggleSong();
						console.log(obj);
						changeCurrentSongDetails(songobj);
						}
						});
						}
						
				 var songlist=[ 'My Worlds (The Collection) CD 2','NBA2K16' ,'Unknown', 'Unknown'];
				 //-------------array of object------------
						var songs = [{
							'name': 'Baby',
							'artist': 'Justin Bieber ',
							'album': 'My Worlds (The Collection) CD 2',
							'duration': '3:35',
						   'fileName': 'song1.mp3',
						   'image': 'song1.jpg'
						},
						{
							'name': 'Lean On',
							'artist': 'Major Lazer, DJ Snake',
							'album': 'NBA2K16',
							'duration': '2:59',
							'fileName': 'song2.mp3',
						    'image': 'song2.jpg'
						},
						{
							'name': 'Shape Of you',
							'artist': 'Ed Sheeran',
							'album': 'Unknown',
							'duration': '4:23',
							'fileName': 'song3.mp3',
						    'image': 'song3.jpg'
						},
						{
							'name': 'Heart Attack',
							'artist': 'Enrique Iglesias',
							'album': 'Unknown',
							'duration': '2:44',
							'fileName': 'song4.mp3',
						    'image': 'song4.jpg'
						}]


								
					for(var i =0; i < songlist.length;i++) {
						var obj = songs[i];
							var name = '#song' + (i+1);
							var song = $(name);
							song.find('.song-name').text(obj.name);
							song.find('.song-artist').text(obj.artist);
							song.find('.song-album').text(obj.album);
							song.find('.song-length').text(obj.duration); 
							 addSongNameClickEvent(obj,i+1)
						}
						
							$('.fa-repeat').on('click',function() {
							$('.fa-repeat').toggleClass('disabled')
							willLoop = 1 - willLoop;
							});	
												
							$('.fa-random').on('click',function() {
							$('.fa-random').toggleClass('disabled');
							willShuffle = 1 - willShuffle;
							});	
							
							$('audio').on('ended',function() {
								var audio = document.querySelector('audio');
								if (willShuffle == 1) {
									var nextSongNumber = randomExcluded(1,4,currentSongNumber); //calling our function for stackoverflow 
									var nextSongobj = songs[nextSongNumber-1];
									audio.src = nextSongobj.fileName;
									toggleSong();
									changeCurrentSongDetails(nextSongobj);
									currentSongNumber = nextSongNumber;
								}
								else if(currentSongNumber < 4) {
									var nextSongobj = songs[currentSongNumber];
									audio.src = nextSongobj.fileName;
									toggleSong();
									changeCurrentSongDetails(nextSongobj);
									currentSongNumber = currentSongNumber + 1;
								}
								else if(willLoop == 1) {
									var nextSongobj = songs[0];
									audio.src = nextSongobj.fileName;
									toggleSong();
									changeCurrentSongDetails(nextSongobj);
									currentSongNumber =  1;
								}
								else {
									$('.play-icon').removeClass('fa-pause').addClass('fa-play');
									audio.currentTime = 0;
								}
							});
							
	//------ welcome screen----------------					
		$('.welcome-screen button').on('click', function() {
        var name = $('#name-input').val();
        if (name.length > 2) {
            var message = "Welcome to Music app, " + name;
            $('.main .user-name').text(message);
            $('.welcome-screen').addClass('hidden');
            $('.main').removeClass('hidden');
        } else {
            $('#name-input').addClass('error');
        }
    });
	//---------------song play and pause by press keyboard-------------
    $('.play-icon').on('click', function() {
        toggleSong();
    });
			$('body').on('keypress',function(event) {
			var target = event.target;
			if (event.keyCode == 32 && target.tagName !='INPUT')     
				{
				toggleSong();
			}
		});
	$('.main button').on('click', function() {
				$('.main').addClass('hidden');
            $('.welcome-screen').removeClass('hidden');
			
			
			
				});

	
			
			
			
//-----------------------forward function------------------------
		

					$(".fa-step-forward").click(function(){

					if(shuffle==1)
					{
					var audio = document.querySelector('audio');
					var nextSongNumber = randomExcluded(0,3,Playingnumber); // Calling our function from Stackoverflow

					var nextSongObj = songs[nextSongNumber];
					audio.src = nextSongobj.fileName;
					toggleSong();
					changeCurrentSongDetails(nextSongobj);
					Playingnumber = nextSongNumber;
					}
                   else {

					if(Playingnumber == songs.length-1){
					Playingnumber = 0;
					changeSong();
					}

					else {
					console.log("two");
					console.log(Playingnumber);
					Playingnumber++;
					changeSong();
					}}
					})

                   $(".fa-step-backward").click(function(){

					if(Playingnumber == 0){
					console.log("one");
					Playingnumber = (songs.length-1);
					changeSong();
					}
                    else {
					console.log("two");
					console.log(Playingnumber);
					Playingnumber--;
					changeSong();
					}
                      })
					  
					  
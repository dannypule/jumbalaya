$(document).ready(function(){

	// GAME WORDS
	var wordList = [
		{
			originalWord: "WALES",
			jumbleOne: "SBWLE",
			jumbleTwo: "WESEL",
			jumbleThree: "SWEAL",
			jumbleFour: "SWSLA",
			correctAnswer: "SWEAL"
		},
		{
			originalWord: "AMERICA",
			jumbleOne: "RCIAEMA",
			jumbleTwo: "COMARE",
			jumbleThree: "RICEAEM",
			jumbleFour: "EEMCIAR",
			correctAnswer: "RCIAEMA"
		},
		{
			originalWord: "RUSSIA",
			jumbleOne: "ISIRAS",
			jumbleTwo: "RUIASS",
			jumbleThree: "SUSIRU",
			jumbleFour: "TISSAU",
			correctAnswer: "RUIASS"
		},
		{
			originalWord: "ZIMBABWE",
			jumbleOne: "EBOZMBWI",
			jumbleTwo: "WEBAZIBM",
			jumbleThree: "WBZMIEBB",
			jumbleFour: "BZIAIBWM",
			correctAnswer: "WEBAZIBM"
		}
	];

	var currentWord = 0; // start with word at array position 0

	// get words from word list starting at position 0
	var mainWord = wordList[currentWord].originalWord;
	var jumbleOne = wordList[currentWord].jumbleOne;
	var jumbleTwo = wordList[currentWord].jumbleTwo;
	var jumbleThree = wordList[currentWord].jumbleThree;
	var jumbleFour = wordList[currentWord].jumbleFour;
	var correctAnswer = wordList[currentWord].correctAnswer;

	// GAME MECHANICS 
	// set time modes
	var easyTime = 10;
	var mediumTime = 80;
	var hardTime = 60;
	var extremeHardTime = 30;

	var gameTimeMode = extremeHardTime;

	var tries;

	function initTries () { // create function to encapsulate tries code
		tries = 3;
		$('#triesText').text(tries); // show initial tries count on page
	}

	initTries(); // use function to set up tries

	// set initial time countdown
	var currentTime = gameTimeMode;
	$("#timerText").text(currentTime);
	currentTime--;	

	// setup variables
	/*$("#timerText") 
	$("#jumbles")
	$("#result")

	$("#tryAgain")
	$("#continue") */

	function decreaseTime(){
		if (currentTime > 0) {
			$("#timerText").text(currentTime);
			currentTime--;	
		} else {
			$("#timerText").text(currentTime);
			clearInterval(intervalHandleTime);

			$("#jumbles").hide();
			$("#result").removeClass("green-text");
			$("#result").addClass("red-text text-accent-2");
			$("#result").text("Time ran out");
			$("#tryAgain").show();
			$("#continue").hide();
		}
	}

	// decreaseTime function runs every x number of seconds
	intervalHandleTime = setInterval(decreaseTime, 100);

	// display words on screen
	$("#mainWord").text(mainWord); // this is the main word
	$("#jumbleOne").text(jumbleOne);
	$("#jumbleTwo").text(jumbleTwo);
	$("#jumbleThree").text(jumbleThree);
	$("#jumbleFour").text(jumbleFour);

	// check if any tries are left
	function checkTries (num) {
		if (num <= 0) {
			return false;
		} else {
			return true;
		}
	}

	// func to determine if selected word is correct
	function determineIfCorrect (){
		clearInterval(intervalHandleTime);
		if ($(this).text() == correctAnswer) {
			$("#jumbles").hide();
			$("#result").show();
			$("#result").removeClass("red-text text-accent-2");
			$("#result").addClass("green-text");
			$("#result").text(correctAnswer + " is correct");
			$("#continue").show();
			//alert(correctAnswer + "  is correct!");
		} else {
			tries--; // if answer if wrong, reduce tries
			$('#triesText').text(tries); // update triesText on view
		} 

		if (!(checkTries(tries))) { // check if there are any tries left
			$("#jumbles").hide();
			$("#result").show();
			$("#result").html($(this).text() + " is incorrect <br> You've run out of tries");
			$("#startAgain").show();
		} else {
			$("#jumbles").hide();
			$("#result").show();
			$("#result").removeClass("green-text");
			$("#result").addClass("red-text text-accent-2");
			$("#result").text($(this).text() + " is incorrect");
			$("#tryAgain").show();
			$('#triesText').text(tries);
			//alert($(this).text() + " is incorrect.");
		}
	}

	// start current word again
	function startAgain() {
		$("#jumbles").show();
		$("#result").hide();
		$("#tryAgain").hide();
		$("#continue").hide();
		$("#result").removeClass("greenText");
		$("#result").removeClass("redText");
		currentTime = gameTimeMode;
		intervalHandleTime = setInterval(decreaseTime, 100);
	}

	// continue to next word
	function nextWord() {
		// increase position in array
			currentWord++;

		// checks if we've completed all the words
		if (currentWord <= (wordList.length - 1)) {
			//alert((wordList.length - 1));

			// show and hide stuff
			$("#jumbles").show();
			$("#result").hide();
			$("#tryAgain").hide();
			$("#continue").hide();
			$("#result").removeClass("greenText");
			$("#result").removeClass("redText");

			// set timings
			currentTime = gameTimeMode;
			intervalHandleTime = setInterval(decreaseTime, 100);

			// assign variables
			mainWord = wordList[currentWord].originalWord;
			jumbleOne = wordList[currentWord].jumbleOne;
			jumbleTwo = wordList[currentWord].jumbleTwo;
			jumbleThree = wordList[currentWord].jumbleThree;
			jumbleFour = wordList[currentWord].jumbleFour;
			correctAnswer = wordList[currentWord].correctAnswer;

			// display new words on screen
			$("#mainWord").text(mainWord);
			$("#jumbleOne").text(jumbleOne);
			$("#jumbleTwo").text(jumbleTwo);
			$("#jumbleThree").text(jumbleThree);
			$("#jumbleFour").text(jumbleFour);
		} else {
			$("#mainWord").text("");
			$("#timer").hide();
			$("#result").text("Fin");
			$("#continue").hide();
			$("#startAgain").show();
		}
	}

	// click on word
	$(".jumbleButton").click(determineIfCorrect);

	// try again and continue buttons
	$("#tryAgain").click(startAgain);
	$("#continue").click(nextWord);
	$("#startAgain").click(function(){
		currentWord = 0; // start from first word again
		$("#startAgain").hide(); // hide the start again button 
		initTries(); // reset tries
		nextWord(); // shows words from word 0
	});

	$('#tryAgain').keypress(function(e){
      if(e.keyCode==13)
      $('#tryAgain').click();
    });
});
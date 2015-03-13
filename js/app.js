$(document).ready(function(){

	//var ml = moment().milliseconds(999);

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

	var currentWord = 0;

	var mainWord = wordList[currentWord].originalWord;
	var jumbleOne = wordList[currentWord].jumbleOne;
	var jumbleTwo = wordList[currentWord].jumbleTwo;
	var jumbleThree = wordList[currentWord].jumbleThree;
	var jumbleFour = wordList[currentWord].jumbleFour;
	var correctAnswer = wordList[currentWord].correctAnswer;

	// GAME MECHANICS 
	// set time
	var easyTime = 1000;
	var mediumTime = 800;
	var hardTime = 600;
	var extremeHardTime = 300;

	var gameTimeMode = mediumTime;

	// set initial time countdown
	var currentTime = gameTimeMode;
	$("#timerText").text(currentTime);
	currentTime--;	

	function decreaseTime(){
		if (currentTime > 0) {
			$("#timerText").text(currentTime);
			currentTime--;	
		} else {
			$("#timerText").text(currentTime);
			clearInterval(intervalHandleTime);

			$("#jumbles").hide();
			$("#result").hide();
			$("#tryAgain").show();
			$("#continue").hide();
		}
	}

	intervalHandleTime = setInterval(decreaseTime, 10);

	// display words on screen
	$("#mainWord").text(mainWord);
	$("#jumbleOne").text(jumbleOne);
	$("#jumbleTwo").text(jumbleTwo);
	$("#jumbleThree").text(jumbleThree);
	$("#jumbleFour").text(jumbleFour);

	// func to determine if selected word is correct
	function determineIfCorrect (){
		clearInterval(intervalHandleTime);
		if ($(this).find(".jumbledWord").text() == correctAnswer) {
			$("#jumbles").hide();
			$("#result").show();
			$("#result").addClass("greenText");
			$("#result").text(correctAnswer + " is correct!");
			$("#continue").show();
			//alert(correctAnswer + "  is correct!");
		} else {
			$("#jumbles").hide();
			$("#result").show();
			$("#result").addClass("red-text text-accent-2");
			$("#result").text($(this).text() + " is incorrect!");
			$("#tryAgain").show();
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
		intervalHandleTime = setInterval(decreaseTime, 10);
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
			intervalHandleTime = setInterval(decreaseTime, 10);

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
		currentWord = 0;
		$("#startAgain").hide();
		nextWord();
	});
});
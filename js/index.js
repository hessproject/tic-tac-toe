var gameEnd = true;
var openSquares = false;
var numberOfPlayers;
var currentPlayer;
var currentMarker;
var Xs = [];
var Os = [];
var remainingSquares = [];

//Starting a new game
function resetGame(){	$(".s1,.s2,.s3,.s4,.s5,.s6,.s7,.s8,.s9").html("");
	numberOfPlayers = $("#players :selected").val();
	currentPlayer = 1;
	currentMarker = "X";
	$("#status").html("X's turn");
	openSquares = true;
	remainingSquares = [1,2,3,4,5,6,7,8,9];
	Xs = [];
	Os = [];
	gameEnd = false;
}

//Taking a turn: if selected sqaure is empty- place marker, remove square from available choices, check for win, and add to turn counter
function takeTurn(squareDiv,squareNumber){
	if(!gameEnd){	
		if($(squareDiv).html() == ""){
			$(squareDiv).html(currentMarker);
			if(currentMarker == "X"){
				Xs.push(squareNumber);
			} else {
				Os.push(squareNumber);
			}
			removeSquareChoice(squareNumber);
			switchPlayer();
			gameEnd = checkForEnd();
			if(numberOfPlayers==1){
				computerTurn();
			}
		} else {
			console.log("Marker already placed at that position");
		}
	}
}
//remove selected square from remainingSquares
function removeSquareChoice(squarePosition){
	var index = remainingSquares.indexOf(squarePosition);
	if(index>-1){
		remainingSquares.splice(index,1);
	}
	if(remainingSquares.length == 0){
		openSquares = false;
	}
}

//TODO: Make actual computer player logic, not just random positions
function computerTurn(){
	if(currentPlayer===2&&!gameEnd){
		computerGuess = remainingSquares[Math.floor(Math.random() * remainingSquares.length)];
		var squareDiv = ".s"+ computerGuess;
		takeTurn(squareDiv,computerGuess);
	}
}

//Change from player 1 to player 2
function switchPlayer(){
	if(currentPlayer === 1){
		currentPlayer = 2;
		currentMarker = "O";
		$("#status").html("O's turn");
	} else {
		currentPlayer = 1;
		currentMarker = "X";
		$("#status").html("X's turn");
	}
}

//Checking for wins or tie
function checkRows(){
	if((Xs.indexOf(1)>=0&&Xs.indexOf(2)>=0&&Xs.indexOf(3)>=0)||
		 (Os.indexOf(1)>=0&&Os.indexOf(2)>=0&&Os.indexOf(3)>=0)||
		 (Xs.indexOf(4)>=0&&Xs.indexOf(5)>=0&&Xs.indexOf(6)>=0)||
		 (Os.indexOf(4)>=0&&Os.indexOf(5)>=0&&Os.indexOf(6)>=0)||
		 (Xs.indexOf(7)>=0&&Xs.indexOf(8)>=0&&Xs.indexOf(9)>=0)||
		 (Os.indexOf(7)>=0&&Os.indexOf(8)>=0&&Os.indexOf(9)>=0)){
		$("#status").html("Row Win")
		return true;
	} else {
		return false;
	}
}

function checkColumns(){
	if((Xs.indexOf(1)>=0&&Xs.indexOf(4)>=0&&Xs.indexOf(7)>=0)||
		 (Os.indexOf(1)>=0&&Os.indexOf(4)>=0&&Os.indexOf(7)>=0)||
		 (Xs.indexOf(2)>=0&&Xs.indexOf(5)>=0&&Xs.indexOf(8)>=0)||
		 (Os.indexOf(2)>=0&&Os.indexOf(5)>=0&&Os.indexOf(8)>=0)||
		 (Xs.indexOf(3)>=0&&Xs.indexOf(6)>=0&&Xs.indexOf(9)>=0)||
		 (Os.indexOf(3)>=0&&Os.indexOf(7)>=0&&Os.indexOf(9)>=0)){
		$("#status").html("Column Win");
		return true;
	} else {
		return false;
	}
}

function checkDiagonal(){
	if((Xs.indexOf(1)>=0&&Xs.indexOf(5)>=0&&Xs.indexOf(9)>=0)||
		 (Os.indexOf(1)>=0&&Os.indexOf(5)>=0&&Os.indexOf(9)>=0)||
		 (Xs.indexOf(3)>=0&&Xs.indexOf(5)>=0&&Xs.indexOf(7)>=0)||
		 (Os.indexOf(3)>=0&&Os.indexOf(5)>=0&&Os.indexOf(7)>=0)){
		$("#status").html("Diagonal Win");		
		return true;
	}else{
		return false;
	}
}
	
function checkForEnd(){
	if (checkRows()||checkColumns()||checkDiagonal()){
		return true;
	} else if(!openSquares) {
		$("#status").html("Tie Game");
		return true;
	} else {
		return false;
	}
}
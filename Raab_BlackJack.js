// Meredith Raab 
// Black Jack Assignment 
// 9/16/14

var prompt = require('sync-prompt').prompt;

var suits = ['♠', '♥', '♦', '♣'];
var faces = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];


// Function generateCards() creates a deck of 52 card objects and stores in a deck array
// by continuously pushing card objects into the deck array. 

function generateCards(){

	var deck = [];

	for(var i = 0 ; i < suits.length; i ++){
		for (var j = 0; j < faces.length; j++){
			var card = {suit: suits[i], face: faces[j]};
			deck.push(card);
		}
	} 
	return deck;
};

// Function shuffle() takes a deck as input and returns an array of shuffled cards by 
// choosing a random card, grabbing the card from the last index and swapping the 2 until 
// there are no more cards left to shuffle. 

function shuffle(deck){

	var shuffledCards = deck;

	var i = shuffledCards.length; 

	while(i > 0){
		var random_index = Math.floor(Math.random() * i);
		i--;
		var random_card = shuffledCards[random_index]; 
		var last_card = shuffledCards[i]; 
		shuffledCards[random_index] = last_card;
		shuffledCards[i] = random_card;
	}
	return shuffledCards;
}

// Function calculateHand() takes the shuffled deck as input and computes the total 
// value of the hand based on the face of the card and returns the total.

function calculateHand(deck){
	var total = 0;

	for(var i=0; i< deck.length; i++){
		var face = deck[i].face;

		if(face === 'J' || face === 'Q' || face === 'K'){
			total = total + 10;
		}
		else if(face === 'A'){
			total = total + 11;
			if(total > 21){
				total = total - 10;
			}
		}
		else{
			face = face *1; 
			total = total + face;
		}
	}

	return total;
}

// Function determineWinner() takes both the player's total and the computer's
// total as input and goes through every conditional scenario comparing the 2
// hands in order to calculate who is the winner. This function returns 
// the winner, whether it is the player, computer, both bust, or a tie. 

function determineWinner(playerTotal, computerTotal){

	if(playerTotal <= 21 && computerTotal <= 21){
		if(playerTotal > computerTotal){
			return "Player Wins!";
		}
		else if(playerTotal < computerTotal){
			return "Computer Wins!";
		}
		else{
			return "Tie!";
		}
	}
	else if (playerTotal > 21 && computerTotal > 21){
		return "Both Bust!";
	}
	else if(playerTotal > 21 && computerTotal <= 21){
		return "Computer Wins!";
	}
	else if(playerTotal <= 21 && computerTotal > 21){
		return "Player Wins!";
	}
	else if(playerTotal == 21 && computerTotal == 21) {
		return "Tie!";
	}
}

// Function prettyPrint() takes a deck as input and creates a new array
// with the face and suit of the hand to print to the console. 

function prettyPrint(deck){
	var readable = [];
	for(var i =0; i< deck.length; i++){
		readable.push(deck[i].face + deck[i].suit);
	}
	return readable.toString();
}

// This is the interactive part of the program. Both a player hand and a computer
// hand are generated and while there are more than half of the cards in the deck, 
// hands are dealt and the player is provided with the option to hit or stay. 
// While the computer has less than 17, a card is automatically dealt to the computer's
// hand. The winner of each hand is generated using the determineWinner() function and displayed
// to the console. 

var deck = shuffle(generateCards());

while (deck.length > 26) {

	var playerHand = [deck.pop(), deck.pop()];
	var playerTotal = calculateHand(playerHand);

	var computerHand = [deck.pop(), deck.pop()];
	var computerTotal = calculateHand(computerHand);

	console.log("Your hand is:", prettyPrint(playerHand), "...for a total of", playerTotal);

	//console.log("Your hand is:", playerHand, "...for a total of", playerTotal);

	while(calculateHand(playerHand) < 21) {

		var continue_game = prompt("(h)it or (s)tay ");

		if(continue_game === 'h'){
			playerHand.push(deck.pop()); 
			playerTotal = calculateHand(playerHand); 
			console.log("Your hand is:", prettyPrint(playerHand), "(",playerTotal, ")");
		}
		else{
			break;
		}

	}

	while(calculateHand(computerHand) < 17){
			computerHand.push(deck.pop());

	}

	console.log("Your hand:", prettyPrint(playerHand), "," ,"(",playerTotal,")");
	console.log("Computer hand:", prettyPrint(computerHand), ",", "(",calculateHand(computerHand),")");
	var winner = determineWinner(calculateHand(playerHand), calculateHand(computerHand));
	console.log(winner);

	console.log("There are", deck.length, "cards left in the deck.");
	console.log("-------------------------------------------------");
}


if(deck.length < 26){
	console.log("Less than 26 cards left. Game over!");
}


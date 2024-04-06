function $(e){return document.getElementById(e)}
let playerHand = [];
let dealerHand = [];
let deck = [];
let gameStarted = false;

let audio = new Audio('bass-of-ace.mp3')
function startMusic(){
	$('introActions').classList.remove('hidden')
	$('warning').classList.add('hidden')
	audio.play()
}
function fadeOut() {
	let volume = 1; // Start at maximum volume
	const fadeOutInterval = setInterval(() => {
		if (volume > 0.2) {
			volume -= 0.05;
			audio.volume = volume;
		} else {
			clearInterval(fadeOutInterval);
			audio.volume = 0.2; // Set the final volume to 20%
		}
	}, 50); // Adjust the volume every 50 milliseconds
} 
function fadeIn() {
	let volume = 0.2; // Start at 20% volume
	const fadeInInterval = setInterval(() => {
		if (volume < 0.8) {
			volume += 0.05;
			audio.volume = volume;
		} else {
			clearInterval(fadeInInterval);
			audio.volume = 0.8; // Set the final volume to 80%
		}
	}, 50); // Adjust the volume every 50 milliseconds
}

// Create a deck of cards
function createDeck() {
	const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
	const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

	for (let suit of suits) {
		for (let value of values) {
			deck.push({ suit, value });
		}
	}
	return deck;
}

// Get a random card from the deck
function getRandomCard() {
	const randomIndex = Math.floor(Math.random() * deck.length);
	return deck.splice(randomIndex, 1)[0];
}

// Calculate the value of a hand
function calculateHandValue(hand) {
	let value = 0;
	let hasAce = false;

	for (let card of hand) {
		if (card.value === 'A') {
			hasAce = true;
			value += 11;
		} else if (['K', 'Q', 'J'].includes(card.value)) {
			value += 10;
		} else {
			value += parseInt(card.value);
		}
	}

	if (hasAce && value > 21) {
		value -= 10;
	}

	return value;
}

// Start a new game

function startGame() {
	document.body.classList.remove('intro')
	document.body.classList.add('game')
	gameStarted = true;
	playerHand = [getRandomCard(), getRandomCard()];
	dealerHand = [getRandomCard(), getRandomCard()];

	// Update the UI with the initial cards
	setTimeout(() => {
		updateUI();
	}, 500);
	fadeOut()
}
function settings(){
	alert('i havent written code for the game yet')
	return;
}

// Update the game UI
function updateUI() {
	$('gameboard').classList.remove('hidden')
	// Update player hand
	const playerHandElement = $('player-hand');
	playerHandElement.innerHTML = '';
	for (let card of playerHand) {
		const cardElement = document.createElement('div');
		cardElement.classList.add('card');
		cardElement.textContent = `${card.value} of ${card.suit}`;
		playerHandElement.appendChild(cardElement);
	}

	// Update dealer hand
	const dealerHandElement = $('dealer-hand');
	dealerHandElement.innerHTML = '';
	for (let i = 0; i < dealerHand.length; i++) {
		const cardElement = document.createElement('div');
		cardElement.classList.add('card');
		if (i === 0 && gameStarted) {
			cardElement.textContent = 'Hidden';
		} else {
			cardElement.textContent = `${dealerHand[i].value} of ${dealerHand[i].suit}`;
		}
		dealerHandElement.appendChild(cardElement);
	}

	// Update hand values
	const playerValueElement = $('player-value');
	const dealerValueElement = $('dealer-value');
	playerValueElement.textContent = `Player Value: ${calculateHandValue(playerHand)}`;
	dealerValueElement.textContent = `Dealer Value: ${gameStarted ? '?' : calculateHandValue(dealerHand)}`;
	if (gameStarted) {
		$('hit').classList.remove('hidden')
		$('stand').classList.remove('hidden')
		$('close').classList.add('hidden')
	} else {
		$('hit').classList.add('hidden')
		$('stand').classList.add('hidden')
		$('close').classList.remove('hidden')
	}
}

function returnToMenu(){
	document.body.classList.add('intro')
	document.body.classList.remove('game')
	$('gameboard').classList.add('hidden')
	gameStarted = false;
	fadeIn()
}

// Handle player actions
function hitMe() {
	if (!gameStarted) return;
	playerHand.push(getRandomCard());
	updateUI();

	const playerValue = calculateHandValue(playerHand);
	if (playerValue > 21) {
		alert('Bust! Dealer wins.');
		gameStarted = false;
		updateUI()
	}
}

function stand() {
	if (!gameStarted) return;
	gameStarted = false;

	let playerValue = calculateHandValue(playerHand);
	let dealerValue = calculateHandValue(dealerHand);

	// Dealer draws cards until their hand value is at least 17
	while (dealerValue < 17) {
		dealerHand.push(getRandomCard());
		dealerValue = calculateHandValue(dealerHand);
	}

	updateUI();
	if (dealerValue > 21) {
		alert('Dealer busts! You win!');
	} else if (playerValue > dealerValue) {
		alert('You win!');
	} else if (playerValue === dealerValue) {
		alert('Push!');
	} else {
		alert('Dealer wins!');
	}
}

// Create the initial deck
createDeck();
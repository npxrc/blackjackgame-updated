// script.js
let playerHand = [];
let dealerHand = [];
let deck = [];
let gameStarted = false;

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
let startClicked=false;
function startGame() {
	alert('i havent wrote the code for the game yet idiot')
	startClicked=true;
	return;
	gameStarted = true;
	playerHand = [getRandomCard(), getRandomCard()];
	dealerHand = [getRandomCard(), getRandomCard()];

	// Update the UI with the initial cards
	updateUI();
}
function settings(){
	if (startClicked){
		alert('you foolish mortal, you think that if theres no game that there could possibly be settings???')
		return;
	}
	alert('i havent written code for the game yet')
	return;
}

// Update the game UI
function updateUI() {
	// Update player hand
	const playerHandElement = document.getElementById('player-hand');
	playerHandElement.innerHTML = '';
	for (let card of playerHand) {
		const cardElement = document.createElement('div');
		cardElement.classList.add('card');
		cardElement.textContent = `${card.value} of ${card.suit}`;
		playerHandElement.appendChild(cardElement);
	}

	// Update dealer hand
	const dealerHandElement = document.getElementById('dealer-hand');
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
	const playerValueElement = document.getElementById('player-value');
	const dealerValueElement = document.getElementById('dealer-value');
	playerValueElement.textContent = `Player Value: ${calculateHandValue(playerHand)}`;
	dealerValueElement.textContent = `Dealer Value: ${gameStarted ? '?' : calculateHandValue(dealerHand)}`;
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
	}
}

function stand() {
	if (!gameStarted) return;
	gameStarted = false;

	const playerValue = calculateHandValue(playerHand);
	const dealerValue = calculateHandValue(dealerHand);

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
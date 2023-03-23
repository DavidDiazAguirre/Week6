const faceValues = {'Ace': 14, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'Jack': 11, 'Queen': 12, 'King': 13};

class Deck {
    constructor() { //a constructor is called every time an instance of a class is called. so any object born from this class will have the following constructor
        this.deck = [];
        const suits = ['Diamonds', 'Hearts', 'Clubs', 'Spades'];


        for (let i = 0; i < suits.length; i++) {
            const faceValueKeys = Object.keys(faceValues); //Object.keys takes the keys from the specified object and puts them into a new array with just the keys. Necessary for creating the strings for the cards
            for (let x = 0; x < faceValueKeys.length; x++) { //REALLY think about how this nested for loop works, it's really cool and a conceptual key, the way it stays on one suit before looping to the next
                const card = `${faceValueKeys[x]} of ${suits[i]}`
                this.deck.push(card); //returns "Ace of Diamonds" "2 of Diamonds" etc.
            }
        }
    }

    shuffle() {  //this method uses something called the Fisher-Yates algorithm for shuffling in a truly random way. 
        for (let i = this.deck.length - 1; i > 0; i--) { //first, it sets i to the last index of the deck array, 51. It will iterate backwards as long as i > 0 
            const x = Math.floor(Math.random() * (i+1)); //for every loop, it will set x to the result of i+1 (to account for the zero based indexing) times a random number between 0 and 1. it will then round that value down. this is x, our index we will shuffle with
            [this.deck[i], this.deck[x]] = [this.deck[x], this.deck[i]]; //this is called a destructuring assignment. the array elements on the left are assigned to the array elements on the right, whicha are reversed, or shuffled, to code the actual shuffle between i and x
        }   
    }

    deal() { //this simply uses the .shift() method to return the 0th index of the deck array, and then deleting that index and shifting everything down, effectively dealing a card and removing it from the deck.
        return this.deck.shift();
    }
}

class Players extends Deck{
    constructor(name, points) {
        super();
        this.hand = [];
        this.name = name;
        this.points = points;
        this.faceValue = 0;
    }
    
    returnCard() {
        return this.hand.shift();
    }


}


let player1 = new Players('Steve', 0);

let player2 = new Players('Mike', 0);


let fullDeck = new Deck();
fullDeck.shuffle();
console.log(fullDeck);


function runGame() {

    while(fullDeck.deck.length > 0) {
        player1.hand.push(fullDeck.deal());
        player2.hand.push(fullDeck.deal()); 

        console.log(`${player1.name} draws ${player1.hand}.`);
        console.log(`${player2.name} draws ${player2.hand}.`);

        player1.faceValue = faceValues[player1.hand[0].split(' ')[0]];
        player2.faceValue = faceValues[player2.hand[0].split(' ')[0]];
        

        if(player1.faceValue > player2.faceValue) {
            player1.points += 1;
            console.log('Player 1 wins this round!');
        } else if(player2.faceValue > player1.faceValue) {
            player2.points += 1;
            console.log('Player 2 wins this round!');
        } else {
            console.log('Tie! No points awarded.');
        }
        player1.returnCard();
        player2.returnCard();
    }
    console.log(`Final score: ${player1.name} ${player1.points} - ${player2.points} ${player2.name}`);
    return [player1.points, player2.points];   
}

console.log(runGame());


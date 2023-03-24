const faceValues = {'Ace': 14, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'Jack': 11, 'Queen': 12, 'King': 13}; //this object represents the 13 ranks as key:value pairs

class Deck {
    constructor() { //any objects of this class will have an array 'deck', and a couple of for loops to loop through the 'suits' array, and through an array of the keys from faceValues to build a 52 card deck
        this.deck = [];
        const suits = ['Diamonds', 'Hearts', 'Clubs', 'Spades'];


        for (let i = 0; i < suits.length; i++) {
            const faceValueKeys = Object.keys(faceValues); //Object.keys takes the keys from the specified object and puts them into a new array with just the keys. Necessary for plugging into the template literal below
            for (let x = 0; x < faceValueKeys.length; x++) { //this loops through the faceValueKeys from our faceValues object, so that we can use that code for the below template literal, 52 of which make a full deck
                const card = `${faceValueKeys[x]} of ${suits[i]}`
                this.deck.push(card); //pushes "Ace of Diamonds" "2 of Diamonds" etc. to our deck
            }
        }
    }

    shuffle() {  //this method uses something called the Fisher-Yates algorithm for shuffling in a random way. 
        for (let i = this.deck.length - 1; i > 0; i--) { //first, it sets i to the last index of the deck array, 51. It will iterate backwards as long as i > 0 
            const x = Math.floor(Math.random() * (i+1)); //for every loop, it will set x to the result of i+1 (to account for the zero based indexing) times a random number between 0 and 1. it will then round that value down. this is x, our index we will shuffle with
            [this.deck[i], this.deck[x]] = [this.deck[x], this.deck[i]]; //this is called a destructuring assignment. the array elements on the left are assigned to the array elements on the right, which are reversed, or shuffled, to code the actual shuffle between i and x
        }   //it was very cool learning about this algorithm, and the crazy setups some companies have to generate truly random values from natural sources, such as Cloudflare's wall of lava lamps.
    }

    deal() { //this simply uses the .shift() method to return the 0th index of the deck array, and then deleting that index and shifting everything down, effectively dealing a card and removing it from the deck.
        return this.deck.shift();
    }
}

class Players { //this class allows any player objects made to have a name, a holder for their points, a holder for their hand, and a faceValue holder for use in the if statements that determine who wins each round
    constructor(name, points) {
        
        this.hand = []; //holds the player's drawn card
        this.name = name; //holds the player's name
        this.points = points; //holder for points earned, starts at 0
        this.faceValue = 0; //this is to measure the face value of the player's currently held card, the values of each rank are held in the faceValues const at the top
    }
    
    returnCard() {
        return this.hand.shift(); //removes a players card from their hand before moving to the next round
    }


}
//here are our two players, Steve and Mike, who start at 0 points
let player1 = new Players('Steve', 0);
let player2 = new Players('Mike', 0);

//instantiating our deck into the fullDeck object
let fullDeck = new Deck();
fullDeck.shuffle(); //using our Fisher-Yates shuffle to shuffle the deck
console.log(fullDeck); //just checking the deck loaded correctly


function runGame() { //this is where the game is run, where the game exists inside a while loop that runs as long as there are cards left to deal()

    while(fullDeck.deck.length > 0) {
        player1.hand.push(fullDeck.deal()); //using the deal() method to push() 1 card into each player's hand
        player2.hand.push(fullDeck.deal()); 

        console.log(`${player1.name} draws ${player1.hand}.`); //string interpolation to show what each player drew from fullDeck
        console.log(`${player2.name} draws ${player2.hand}.`);

        player1.faceValue = faceValues[player1.hand[0].split(' ')[0]]; //this is where the numeric value of the ranks drawn are determined. the faceValue is assigned by going into the faceValues object at the top.
        player2.faceValue = faceValues[player2.hand[0].split(' ')[0]]; //it then uses the .split() method to break the card string into an array that would, for example, look like ['Ace', 'of', 'Hearts']. it would 
                                                                       //then take the 0th index, so in this case 'Ace', which is the key to 14 as shown on the faceValues object, and use that to access 14 by passing
                                                                       //index 0, or 'Ace', as a key to faceValues by using [] notation. this was the hardest part of this project for me, figuring out how to extract the numerical value from the faceValues object
        if(player1.faceValue > player2.faceValue) { //if/elseif statements to award one point and deliver a victory message based on which player had the higher ranking card
            player1.points += 1;
            console.log('Player 1 wins this round!');
        } else if(player2.faceValue > player1.faceValue) {
            player2.points += 1;
            console.log('Player 2 wins this round!');
        } else {
            console.log('Tie! No points awarded.'); //no points awarded if tie.
        }
        player1.returnCard(); //using the returnCard() method from the Players class to empty each player's hand
        player2.returnCard();
    }
    console.log(`Final score: ${player1.name} ${player1.points} - ${player2.points} ${player2.name}`); //logs the final standings
    return [player1.points, player2.points];   
}

console.log(runGame()); //runs the game in the console!
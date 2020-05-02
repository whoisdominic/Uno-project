//////////////////////////
// Player Class
//////////////////////////

class Player {
    constructor(name){
        this.name = name || 'Player One'
        this.hand = []
    }
    playCard(choice){
        this.hand[choice].effect()
        console.log(`${this.name} plays ${this.hand[choice].color}`);

    }
    drawCard(){
        this.hand.push(cardPile.shift())
        console.log(`${this.name} draws a card`);
    }
}


//////////////////////////
// Card Classes
//////////////////////////

class Card {
    constructor(color,value,type){
        this.color = color
        this.value = value
        this.type = type
    }
}

class Numbered extends Card {
    constructor(color,value,type){
        super(color,value,type)  
    }
}

class Skip extends Card {
    constructor(color,type){
        super(color,type)  
    }
    effect() {
        // skips the next player (changes the player orders)
    }
}

class Reverse extends Card {
    constructor(color,type){
        super(color,type)  
    }
    effect() {
        // reverses the order of the next player to play
    }
}
class DrawTw0 extends Card {
    constructor(color,type){
        super(color,type)  
    }
    effect(target) {
        // makes target player draw 2
    }
}
class DrawFour extends Card {
    constructor(color,type){
        super(type)
        this.color = 'wild'  
    }
    effect(target) {
        // makes target player draw 2
    }
}

//////////////////////////
// Card Factory
//////////////////////////

class CardFactory {
    constructor(type){
        this.type = type
    }
    makeCards(amount){
        
    }
}


//////////////////////////
// Card Piles
//////////////////////////

const cardPile = []

const cardInPlay = []

const playerOrder = []

//////////////////////////
// Game Board
//////////////////////////

const displayCard = (player) => {
    // loops through the players hand & appends their cards to the DOM
}

//////////////////////////
// Event Listeners
//////////////////////////

// Draw button

// im thinking the event listeners for the 
// cards will be added when they are appended to the DOM



//////////////////////////
// Game Start & Game Functions
//////////////////////////

/* a function to make all the cards in the deck and distribute them between the
players, (will have to have a math randomizer) */

// start turn function

// end turn function

//////////////////////////
// Notes
//////////////////////////
/**
im thinking that when a player plays a card an 'end turn' function runs. then that function will check who is next to play and run a 'start turn' function with the next to play as a parameter
will be called. 

 */


//////////////////////////
// Node Test Area
//////////////////////////

const dominic = new Player('Dominic');
console.log(dominic);

const cardBlue = new Numbered('blue','9','number');
const cardRed = new Numbered('red','5','number');
const cardGreen = new Numbered('green','7','number');
const cardYellow = new Numbered('yellow','3','number');

cardPile.push(cardRed)
cardPile.push(cardYellow)
cardPile.push(cardBlue)
cardPile.push(cardGreen)

console.log(cardPile);

dominic.drawCard()

console.log(cardPile);


console.log(cardPile);
console.log(dominic);



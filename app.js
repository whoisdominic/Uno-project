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
        this.hand.push(cardPile.pop())
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

class Wild extends Card{
    constructor(color,value,type){
        super(color,value,type)
        this.type = 'wild'
        this.value = 'wild'
        this.color = 'wild'
    }
}

class Numbered extends Card {
    constructor(color,value,type){
        super(color,value,type)  
    }
}

class Skip extends Card {
    constructor(color, value, type){
        super(color, value, type)
        this.type = 'action'
        this.value = 'Skip'
    }
    effect() {
        // skips the next player (changes the player orders)
    }
}

class Reverse extends Card {
    constructor(color, value, type){
        super(color,value,type)  
        this.type = 'action'
        this.color = color 
        this.value = 'Reverse'
    }
    effect() {
        // reverses the order of the next player to play
    }
}
class DrawTw0 extends Card {
    constructor(color, value, type){
        super(color, value,type) 
        this.type = 'action'
        this.color = color 
        this.value = 'Draw Two'
    }
    effect(target) {
        // makes target player draw 2
    }
}
class DrawFour extends Card {
    constructor(color, value, type){
        super(color, value,type)
        this.type = 'action'  
        this.color = 'wild'
        this.value = 'Draw Four'
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
    makeNumbered(amount,color){
        for (let i = 0; i < amount; i++) {
        const numbered = new Numbered(color, i, this.type);
            cardPile.push(numbered)
        }
    }
    makeWild(amount){
        for (let i = 0; i < amount; i++) {
            const wild = new Wild();
                cardPile.push(wild)
        }
    }
    makeSkip(color){
        const skip = new Skip(color, 'action');
        cardPile.push(skip)
}
    makeReverse(color){
        const reverse = new Reverse(color, 'action');
        cardPile.push(reverse)
    }
    makeDrawTwo(color){
            const drawTwo = new DrawTw0(color, 'action');
            cardPile.push(drawTwo)
    }
    makeDrawFour(amount){
        for (let i = 0; i < amount; i++) {
            const drawFour = new DrawFour();
                cardPile.push(drawFour)
        }
    }
}

//////////////////////////
// Card Piles
//////////////////////////

const cardPile = []

const cardInPlay = []

const playerOrder = []

const makeDeck = () => {
    // Numbered Cards --------------
    new CardFactory('numbered').makeNumbered(10,'blue')
    new CardFactory('numbered').makeNumbered(10,'yellow')
    new CardFactory('numbered').makeNumbered(10,'red')
    new CardFactory('numbered').makeNumbered(10,'green')
    // Numbered Wild --------------
    new CardFactory('wild').makeWild(4)
    // Draw Two --------------
    new CardFactory('action').makeDrawTwo('blue')
    new CardFactory('action').makeDrawTwo('yellow')
    new CardFactory('action').makeDrawTwo('green')
    new CardFactory('action').makeDrawTwo('red')  
    // Reverse --------------
    new CardFactory('action').makeSkip('blue')
    new CardFactory('action').makeSkip('yellow')
    new CardFactory('action').makeSkip('green')
    new CardFactory('action').makeSkip('red')  
    // Skip Cards --------------
    new CardFactory('action').makeSkip('blue')
    new CardFactory('action').makeSkip('yellow')
    new CardFactory('action').makeSkip('green')
    new CardFactory('action').makeSkip('red')  
    // Draw 4 --------------
    new CardFactory('wild').makeDrawFour(4)
}

//////////////////////////
// Players 
//////////////////////////

const dominic = new Player('Dominic');

//////////////////////////
// Game Board
//////////////////////////

const displayCards = (player) => {
    // Removes cards first
    $('.current-hand').children().remove()
    // loops through the players hand & appends their cards to the DOM
    for (let i = 0; i < player.hand.length; i++) {
        const $card = $('<div>').addClass(`uno-card ${player.hand[i].color} `).html(`
        <h3>${player.hand[i].color}</h3>
        <h2>${player.hand[i].value}</h2>
        <h2>${player.hand[i].type}</h2>
        `)
        $('.current-hand').append($card)
    }
}

//////////////////////////
// Event Listeners
//////////////////////////

// Draw button

const $drawButton = $('.draw').on('click', () => {
    dominic.drawCard()
    displayCards(dominic)
})

// im thinking the event listeners for the 
// cards will be added when they are appended to the DOM



//////////////////////////
// Game Start & Game Functions
//////////////////////////

makeDeck()

/* a function to make all the cards in the deck and distribute them between the
players, (will have to have a math randomizer) */

const shuffle = () => {
    cardPile.sort(() => Math.random() - 0.5);
    cardPile.sort(() => Math.random() - 0.5);
    cardPile.sort(() => Math.random() - 0.5);
}

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
shuffle()


console.log(dominic);

console.log(cardPile);

// const cardBlue = new Numbered('blue','9','number');
// const cardRed = new Numbered('red','5','number');
// const cardGreen = new Numbered('green','7','number');
// const cardYellow = new Numbered('yellow','3','number');

// cardPile.push(cardRed)
// cardPile.push(cardYellow)
// cardPile.push(cardBlue)
// cardPile.push(cardGreen)

// console.log(cardPile);

// console.log(cardPile);

// console.log(cardPile.length);
// console.log(cardPile);
// console.log(dominic);



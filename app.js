//////////////////////////
// Player Class
//////////////////////////

class Player {
    constructor(name){
        this.name = name || 'Player One'
        this.hand = []
    }
    playCard(choice){
        // console.log(`${this.name} plays ${this.hand[choice]}`);
        cardInPlay.push(this.hand[choice])
        // console.log(cardInPlay);
    }
    drawCard(amount){
        for (let i = 0; i < amount; i++) {
            this.hand.push(cardPile.pop())
        }


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

const addPlayer = (nameInput) =>{
    const newPlayer = new Player(`${nameInput}`)
    playerOrder.push(newPlayer)
} 

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
        $card.on('click', (event) => {


            player.playCard([i])
            player.hand.splice([i], 1)
            displayCards(playerOrder[0])
            displayCardsInPlay()


            
        })
        $('.current-hand').append($card)
    }
}

const displayCardsInPlay = () =>{
    $('.cards-in-play').children().remove()
    let inPlayCard = cardInPlay.length -1 
    console.log(cardInPlay);
        const $card = $('<div>').addClass(`uno-card ${cardInPlay.color} `).html(`
        <h3>${cardInPlay[inPlayCard].color}</h3>
        <h2>${cardInPlay[inPlayCard].value}</h2>
        <h2>${cardInPlay[inPlayCard].type}</h2>
        `)
        
    $('.cards-in-play').append($card)    
}


const displayStats = () => {
    $('div.flex-one > div').children().remove()
    for (let i = 0; i < playerOrder.length; i++) {
        let $playerStats = $('<div>').addClass('stats__player').html(`
        <h4>Player: ${playerOrder[i].name}</h4>
        <h4>Cards Remaining: ${playerOrder[i].hand.length}</h4>
        <br>
        `)
        $playerStats.appendTo('div.flex-one > div')
    }
}
//////////////////////////
// Event Listeners
//////////////////////////

// Draw button

const $drawButton = $('.draw').on('click', () => {
    playerOrder[0].drawCard(1)
    displayCards(playerOrder[0])
    displayStats()
})

//////////////////////////
// Game Functions
//////////////////////////

const shuffle = () => {
    cardPile.sort(() => Math.random() - 0.5);
    cardPile.sort(() => Math.random() - 0.5);
    cardPile.sort(() => Math.random() - 0.5);
}

/* I tried to do this shuffle a few diffrerent ways, i found this function that randomizes an array on the interent and modified it.
https://javascript.info/task/shuffle
*/

const rotateActivePlayer = () => {
    let stage = []
    stage[0] = playerOrder.shift()
    playerOrder.push(stage.pop())
}

// start turn function

// end turn function

//////////////////////////
//  Game Start + calls
//////////////////////////

displayStats()

makeDeck()

shuffle()


addPlayer('Dominic')
addPlayer('Franz')

let hasGameStarted = false

const gameStart = () => {
    hasGameStarted = true
    for (let i = 0; i < playerOrder.length; i++) {
        playerOrder[i].drawCard(5)
    }
    displayCards(playerOrder[0])
    displayStats()
}

$('#game-start').on('click', () => {
    if (hasGameStarted === false) {
        gameStart()
    }
})

$('#quit').on('click', () => {
    location.reload()
})





//////////////////////////
// Notes
//////////////////////////
/**
im thinking that when a player plays a card an 'end turn' function runs. then that function will check who is next to play and run a 'start turn' function with the next to play as a parameter
will be called. 

 */


//////////////////////////
// Gameplay Test Area
//////////////////////////

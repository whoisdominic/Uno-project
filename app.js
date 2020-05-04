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
        if (this.hand[choice].type === 'action'){
            this.hand[choice].effect()
        }
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
        console.log('effect call test');
        rotateActivePlayer()
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
        console.log('effect call test');
        rotateActivePlayer()
    }
}
class DrawTw0 extends Card {
    constructor(color, value, type){
        super(color, value,type) 
        this.type = 'action'
        this.color = color 
        this.value = 'Draw Two'
    }
    effect() {
        // makes target player draw 2
        // console.log('effect call test');
        let otherPlayer = playerOrder[1]
        console.log(otherPlayer); 
        otherPlayer.drawCard(2)
    }
}
class DrawFour extends Card {
    constructor(color, value, type){
        super(color, value,type)
        this.type = 'action'  
        this.color = 'wild'
        this.value = 'Draw Four'
    }
    effect() {
        // makes target player draw 2
        console.log('effect call test');
        let otherPlayer = playerOrder[1]
        console.log(otherPlayer); 
        otherPlayer.drawCard(4)
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
            let compare = cardInPlay.length -1 

                // Uno Logic
            if (cardInPlay[compare] == undefined || NaN) {
                player.playCard([i])
                console.log('went at undefined');
                // barrier
                player.hand.splice([i], 1)
                displayCards(playerOrder[0])
                displayCardsInPlay()
                // update score
                displayStats()
                // end turn/ rotate
                rotateActivePlayer()
            } else if (cardInPlay[compare].color === player.hand[i].color) {
                player.playCard([i])
                console.log('went at color');
                // barrier
                player.hand.splice([i], 1)
                displayCards(playerOrder[0])
                displayCardsInPlay()
                // update score
                displayStats()
                // end turn/ rotate
                rotateActivePlayer()
            } else if (cardInPlay[compare].value === player.hand[i].value) {
                player.playCard([i])
                console.log('went at value');
                // barrier
                player.hand.splice([i], 1)
                displayCards(playerOrder[0])
                displayCardsInPlay()
                // update score
                displayStats()
                // end turn/ rotate
                rotateActivePlayer()
            } else if (cardInPlay[compare].type && player.hand[i].type === 'action' && cardInPlay[compare].color === player.hand[i].color){
                player.playCard([i])
                console.log('went at type/action');
                // barrier
                player.hand.splice([i], 1)
                displayCards(playerOrder[0])
                displayCardsInPlay()
                // update score
                displayStats()
                // end turn/ rotate
                rotateActivePlayer()

            } else if (player.hand[i].color === 'wild'){
                player.playCard([i])
                console.log('went at wild');
                // barrier
                player.hand.splice([i], 1)
                displayCards(playerOrder[0])
                // Wild Prompt
                wildPrompt()
                // creates wild prompt card before it displays so it's the last one
                displayCardsInPlay()

                // update score
                displayStats()

                // end turn/ rotate
                rotateActivePlayer()

            } else if (cardInPlay[compare].color === 'wild') {
                player.playCard([i])
                console.log('went at wild (in play)');
                // barrier
                player.hand.splice([i], 1)
                displayCards(playerOrder[0])
                // Wild Prompt
                wildPrompt()
                // creates wild prompt card before it displays so it's the last one
                displayCardsInPlay()
                // update score
                displayStats()
                // end turn/ rotate
                rotateActivePlayer()
            } else if (cardInPlay[compare].type === 'any' || cardInPlay[compare].value === 'any') {

            }else {
                console.log('Cant Not Play');
            }
            // player.playCard([i])
            
            // player.hand[i].effect()
            // cardInPlay[compare].color
            // After Effects

            // player.hand.splice([i], 1)
            // displayCards(playerOrder[0])
            // displayCardsInPlay()
        })
        $('.current-hand').append($card)
    }
}

const displayCardsInPlay = () =>{
    $('.cards-in-play').children().remove()
    let inPlayCard = cardInPlay.length -1 
    console.log(cardInPlay);
        const $card = $('<div>').addClass(`uno-card ${cardInPlay[inPlayCard].color} `).html(`
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
        // display who's turn it is
        displayCurrentPlayer()
    }
}
//////////////////////////
// Event Listeners
//////////////////////////

// Draw button

const $drawButton = $('.draw').on('click', () => {
    if (hasGameStarted === true) {
    playerOrder[0].drawCard(1)
    displayCards(playerOrder[0])
    displayStats()
    }
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
    checkForW()
    let stage = []
    stage[0] = playerOrder.shift()
    playerOrder.push(stage.pop())
    displayCurrentPlayer()
    displayCards(playerOrder[0])
}

const displayCurrentPlayer = () => {
    $('#whos-turn').children().remove()
    let $displayTurn = $('<div>').addClass('current-player').html(`
    <h3>It's ${playerOrder[0].name}'s turn</h3>
    `)
    $displayTurn.appendTo('#whos-turn')
}
// start turn function

// end turn function

//////////////////////////
//  Game Start + calls
//////////////////////////

displayStats()

makeDeck()

shuffle()



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
// Wild Prompt
//////////////////////////

const wildPrompt = () => {
    let colorChoice = prompt(`-----Choose Color----- \n\n 1. Blue \n 2. Red \n 3. Yellow \n 4. Green`);
    switch (colorChoice) {
        case '1':
            const colorCardBlue = new Card('blue','any','any');
            cardInPlay.push(colorCardBlue)
            break;
        case '2':
            const colorCardRed = new Card('red','any','any');
            cardInPlay.push(colorCardRed)
                break;
        case '3':
            const colorCardYellow = new Card('yellow','any','any');
            cardInPlay.push(colorCardYellow)
                break;
        case '4':
            const colorCardGreen = new Card('green','any','any');
            cardInPlay.push(colorCardGreen)
                break;        
        default:
            alert('Please Enter a Number')
            wildPrompt()
            break;
    }
}



//////////////////////////
// Win Condition
//////////////////////////
const checkForW = () => {
    if (playerOrder[0].hand.length === 0){
        alert(`${playerOrder[0].name} Wins!`)
    } else if (playerOrder[0].hand.length === 1){
        alert('UNO!')
    }
}

//////////////////////////
//  Play Name Prompts
//////////////////////////

const addPlayerNames = () => {
    const playerOneName = prompt(`-----PlayOne----- \n\n Welcome to Uno Island! \n\n--- What is your name?`)
    addPlayer(`${playerOneName}`)
    const playerTwoName = prompt(`-----PlayOne----- \n\n Welcome to Uno Island! \n\n --- What is your name?`)
    addPlayer(`${playerTwoName}`)
}
addPlayerNames()
//////////////////////////
// End
//////////////////////////
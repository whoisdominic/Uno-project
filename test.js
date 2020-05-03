let playerOrder = ['jeff','brian','louis','mararet']





const rotateActivePlayer = () => {
    let stage = []
    stage[0] = playerOrder.shift()
    playerOrder.push(stage.pop())
}

console.log(playerOrder);
rotateActivePlayer()
rotateActivePlayer()
console.log(playerOrder);


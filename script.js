const gameBoard = (() => {
    let gameBoard = []
    for(let i = 0; i < 3; i++){
        gameBoard.push(["", "", ""])
    }

    return gameBoard
})()

console.log(gameBoard)
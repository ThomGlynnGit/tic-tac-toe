const createBoard = (() => {
    let gameArr = []
    for(let i = 0; i < 3; i++){
        gameArr.push(["_", "_", "_"])
    }

    return gameArr
})()

function displayBoard (board) {
    let row = ""
    for(let i = 0; i < board.length; i++){
        for(let j = 0; j < board.length; j++){
            row += (board[i][j] + " ")
        }
        console.log((i+1) + ": " + row)
        row = ""
    }
}

function createPlayer(name, marker) {
    return {name, marker}
}

function createGame(gameBoard, p1Name, p2Name){
    const player1 = createPlayer(p1Name, "O")
    const player2 = createPlayer(p2Name, "X")

    return { gameBoard, player1, player2 }
}

const game = createGame(createBoard, "Ben", "Test")
displayBoard(game.gameBoard)
console.log(game)

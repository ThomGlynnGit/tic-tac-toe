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
    let complete = false 

    return { gameBoard, player1, player2, complete }
}

function createTurnController(game) {
    let turn = game.player1
    function changeTurn(player){
        if (player === game.player1){
            turn = game.player2
        }
        else if (player === game.player2) {
            turn = game.player1
        }
    }
    return {
        player2Turn() {
            changeTurn(game.player1)
        },

        player1Turn() {
            changeTurn(game.player2)
        },

        currentPlayer() {
            return turn
        },
    }
}

function completeController(game) {
    if(game.gameBoard[0][0] === game.gameBoard[0][1] && game.gameBoard[0][0] === game.gameBoard[0][2]){
        game.complete = true
    }
    else if(game.gameBoard[1][0] === game.gameBoard[1][1] && game.gameBoard[1][0] === game.gameBoard[1][2]){
        game.complete = true
    }
    else if(game.gameBoard[2][0] === game.gameBoard[2][1] && game.gameBoard[2][0] === game.gameBoard[2][2]){
        game.complete = true
    }
    else if(game.gameBoard[0][0] === game.gameBoard[1][0] && game.gameBoard[0][0] === game.gameBoard[2][0]){
        game.complete = true
    }
    else if(game.gameBoard[0][1] === game.gameBoard[1][1] && game.gameBoard[0][1] === game.gameBoard[2][1]){
        game.complete = true
    }
    else if(game.gameBoard[0][2] === game.gameBoard[1][2] && game.gameBoard[0][2] === game.gameBoard[2][2]){
        game.complete = true
    }
    else if(game.gameBoard[0][0] === game.gameBoard[1][1] && game.gameBoard[0][0] === game.gameBoard[2][2]){
        game.complete = true
    }
    else if(game.gameBoard[0][2] === game.gameBoard[1][1] && game.gameBoard[0][2] === game.gameBoard[2][0]){
        game.complete = true
    }  
}



const newGame = createGame(createBoard, "Ben", "Test")
const newGameFlow = createTurnController(newGame)

console.log(newGameFlow.currentPlayer())
newGameFlow.player2Turn()
console.log(newGameFlow.currentPlayer())
newGameFlow.player1Turn()
console.log(newGameFlow.currentPlayer())

displayBoard(newGame.gameBoard)
console.log(newGame)

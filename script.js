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
    
    return {
        switchTurn(){
            turn = (turn === game.player1) ? game.player2 : game.player1
        },
        currentPlayer() {
            return turn
        },
    }
}

function completeController(game) {
    if(game.gameBoard[0][0] !== "_" && game.gameBoard[0][0] === game.gameBoard[0][1] && game.gameBoard[0][0] === game.gameBoard[0][2]){
        game.complete = true
    }
    else if(game.gameBoard[1][0] !== "_" && game.gameBoard[1][0] === game.gameBoard[1][1] && game.gameBoard[1][0] === game.gameBoard[1][2]){
        game.complete = true
    }
    else if(game.gameBoard[2][0] !== "_" && game.gameBoard[2][0] === game.gameBoard[2][1] && game.gameBoard[2][0] === game.gameBoard[2][2]){
        game.complete = true
    }
    else if(game.gameBoard[0][0] !== "_" && game.gameBoard[0][0] === game.gameBoard[1][0] && game.gameBoard[0][0] === game.gameBoard[2][0]){
        game.complete = true
    }
    else if(game.gameBoard[0][1] !== "_" && game.gameBoard[0][1] === game.gameBoard[1][1] && game.gameBoard[0][1] === game.gameBoard[2][1]){
        game.complete = true
    }
    else if(game.gameBoard[0][2] !== "_" && game.gameBoard[0][2] === game.gameBoard[1][2] && game.gameBoard[0][2] === game.gameBoard[2][2]){
        game.complete = true
    }
    else if(game.gameBoard[0][0] !== "_" && game.gameBoard[0][0] === game.gameBoard[1][1] && game.gameBoard[0][0] === game.gameBoard[2][2]){
        game.complete = true
    }
    else if(game.gameBoard[0][2] !== "_" && game.gameBoard[0][2] === game.gameBoard[1][1] && game.gameBoard[0][2] === game.gameBoard[2][0]){
        game.complete = true
    }  
}

function makeMove(game, flowController){
    let inpR = prompt("Row: ")
    let inpC = prompt("Col: ") 
    let rowNum = parseInt(inpR)
    let colNum = parseInt(inpC)

    game.gameBoard[rowNum][colNum] = flowController.currentPlayer().marker

}

function createPlayGame(){
    const fName = prompt("Player 1 name: ")
    const sName = prompt("Player 2 name: ")
    const newGame = createGame(createBoard, fName, sName)
    const newGameFlow = createTurnController(newGame)
    displayBoard(newGame.gameBoard)

    while (newGame.complete !== true) {
        console.log(`${newGameFlow.currentPlayer().name}'s turn`)
        makeMove(newGame, newGameFlow)

        completeController(newGame)

        if (newGame.complete) break
        
        newGameFlow.switchTurn()

        displayBoard(newGame.gameBoard)

    }
    console.log(`${newGameFlow.currentPlayer().name} wins!`)
    displayBoard(newGame.gameBoard)

}

createPlayGame()


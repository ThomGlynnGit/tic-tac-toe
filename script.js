const createBoard = (() => {
    let gameArr = []
    for(let i = 0; i < 3; i++){
        gameArr.push(["_", "_", "_"])
    }

    return gameArr
})()

//loops through gameboard array and displays in console
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

//logic checks if start of row/col/diag is empty, and if not checks if all are equal
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

//More precisise solution to win logic. Not included in solution as it's not my code
/*
function completeController(game) {
    const b = game.gameBoard
    const lines = [
        // Rows
        [b[0][0], b[0][1], b[0][2]],
        [b[1][0], b[1][1], b[1][2]],
        [b[2][0], b[2][1], b[2][2]],
        // Columns
        [b[0][0], b[1][0], b[2][0]],
        [b[0][1], b[1][1], b[2][1]],
        [b[0][2], b[1][2], b[2][2]],
        // Diagonals
        [b[0][0], b[1][1], b[2][2]],
        [b[0][2], b[1][1], b[2][0]],
    ]

    for (const line of lines) {
        if (line[0] !== "_" && line.every(cell => cell === line[0])) {
            game.complete = true
            return
        }
    }
}*/

//takes input for row and column and places current player's marker
function makeMove(game, flowController, domBoard, row, col){

    let rowNum = parseInt(row)
    let colNum = parseInt(col)
    
    //input validation - type & range checks
    if (
        Number.isNaN(rowNum) || Number.isNaN(colNum) ||
        rowNum < 0 || rowNum > 2 ||
        colNum < 0 || colNum > 2
    ){
        console.log("Invalid coordinatens! Try again")
        return makeMove(game, flowController)
    }
    //checking if space is already taken
    else if (game.gameBoard[rowNum][colNum] !== "_" ){
        console.log("You can't move there! Try again")
        return makeMove(game, flowController)
    } 
    else {
        game.gameBoard[rowNum][colNum] = flowController.currentPlayer().marker
        domBoard.update(rowNum,colNum,flowController.currentPlayer().marker)
    }

    
}

function createPlayGame(){
    const fName = prompt("Player 1 name: ")
    const sName = prompt("Player 2 name: ")
    const newGame = createGame(createBoard, fName, sName)
    const newGameFlow = createTurnController(newGame)
    const domBoard = createDomBoard(newGame.gameBoard, newGameFlow)

    displayBoard(newGame.gameBoard)
    domBoard.boardToDom()
    
    const squareList = document.querySelectorAll(".square")
    
    let moveCounter = 0

    for(const square of squareList){
        square.addEventListener("click", () => {
            if(!newGame.complete){
                moveCounter++

                makeMove(newGame, newGameFlow, domBoard, square.dataset.row, square.dataset.col)

                completeController(newGame)

                if(newGame.complete === true){
                    console.log(`${newGameFlow.currentPlayer().name} wins!`)
                    displayBoard(newGame.gameBoard) 
                }   
                else if(newGame.complete === false && moveCounter === 9){
                    console.log("It's a draw!")
                }
                else {
                    newGameFlow.switchTurn()
                }   
            }       
        })
    }

    

}

function playChoice(){
    const choice = prompt("Do you want to play?")
    if (choice.toUpperCase() === "Y"){
        createPlayGame()
    }
}

function createDomBoard(board, turnController){
    const gameContainer = document.createElement("div")
    gameContainer.className = "game-container"
    document.querySelector("body").appendChild(gameContainer)

    function boardToDom(){
        gameContainer.innerHTML = ""

        const boardContainer = document.createElement("div")
        boardContainer.className = "board-container"
        gameContainer.appendChild(boardContainer)

        for(let i = 0; i < board.length; i++){
            for(let j = 0; j < board.length; j++){
                const temp = document.createElement("div")
                temp.className = "square"
                temp.textContent = board[i][j]
                temp.dataset.row = i
                temp.dataset.col = j
                boardContainer.appendChild(temp)
            }
        }

        const playerText = document.createElement("div")
        playerText.className = "player"
        playerText.textContent = turnController.currentPlayer().name
        gameContainer.appendChild(playerText)

    }

    function clear(){
        const domBoard = document.querySelectorAll(".square")

        for(const square of domBoard){
            square.innerHTML = ""
        }
    }

    function update(row, col, marker){
        const domBoard = document.querySelectorAll(".square")

        for(const square of domBoard){
            if (square.dataset.row == row && 
            square.dataset.col == col)
            

            square.textContent = marker
        }

        const playerText = document.querySelector(".player")

        playerText.textContent = turnController.currentPlayer().name

    }
    
    return { boardToDom, clear, update }
}


playChoice()


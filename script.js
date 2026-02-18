function createBoard () {
    let gameArr = []
    for(let i = 0; i < 3; i++){
        gameArr.push(["_", "_", "_"])
    }

    return gameArr
}

/* kept only for debugging purposes
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
}*/

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

//takes input for row and column and places current player's marker
function makeMove(game, flowController, domBoard, row, col){

    let valid = false

    const errorText = document.querySelector(".error")
    
    let rowNum = parseInt(row)
    let colNum = parseInt(col)
    
    //input validation - type & range checks
    if (
        Number.isNaN(rowNum) || Number.isNaN(colNum) ||
        rowNum < 0 || rowNum > 2 ||
        colNum < 0 || colNum > 2
    ){

        errorText.textContent = "Invalid coordinatens! Try again"
        valid = false
    }
    //checking if space is already taken
    else if (game.gameBoard[rowNum][colNum] !== "_" ){

        errorText.textContent = "You can't move there! Try again"
        valid = false

    } 
    else {
        errorText.textContent = ""

        game.gameBoard[rowNum][colNum] = flowController.currentPlayer().marker
        completeController(game)
        domBoard.update(rowNum,colNum,flowController.currentPlayer().marker, game.complete)
        valid = true
    }

    return valid
    
}

//dynamically create name entry form for new game
function nameEntry(){
    const entryError = document.createElement("p")
    entryError.className = "error name"

    const nameForm = document.createElement("form")
    nameForm.setAttribute("method","post")
    nameForm.setAttribute("action","#")

    const fNameContainer = document.createElement("div")
    fNameContainer.className = "name-container"
    const fNameInput = document.createElement("input")
    fNameInput.setAttribute("type","text")
    fNameInput.setAttribute("name","fName")
    fNameInput.setAttribute("id","fName")
    fNameInput.className = "name-input"
    const fNameLabel = document.createElement("label")
    fNameLabel.setAttribute("for","fname")
    fNameLabel.textContent = "Player 1's name:"
    fNameLabel.className = "name-label"

    fNameContainer.appendChild(fNameLabel)
    fNameContainer.appendChild(fNameInput)

    const sNameContainer = document.createElement("div")
    sNameContainer.className = "name-container"
    const sNameInput = document.createElement("input")
    sNameInput.setAttribute("type","text")
    sNameInput.setAttribute("name","sName")
    sNameInput.setAttribute("id","sName")
    sNameInput.className = "name-input"
    const sNameLabel = document.createElement("label")
    sNameLabel.setAttribute("for","sName")
    sNameLabel.textContent = "Player 2's name:"
    sNameLabel.className = "name-label"
    sNameContainer.appendChild(sNameLabel)
    sNameContainer.appendChild(sNameInput)

    const fBtn = document.createElement("button")
    fBtn.setAttribute("type","button")
    fBtn.textContent = "Start game"
    fBtn.className = "button posi"

    //if both names are entered, start a new game
    fBtn.addEventListener("click", () => {
        if(sNameInput.value !== "" && 
            fNameInput.value !== ""){
                createPlayGame(fNameInput.value, sNameInput.value)
                nameForm.remove()
                entryError.remove()
        }
        else {
            entryError.textContent = "Please enter a name for each player"
        }
    })

    sNameContainer.appendChild(sNameLabel)
    sNameContainer.appendChild(sNameInput)
    fNameContainer.appendChild(fNameLabel)
    fNameContainer.appendChild(fNameInput)
    
    nameForm.appendChild(fNameContainer)
    nameForm.appendChild(sNameContainer)
    nameForm.appendChild(fBtn)
    nameForm.appendChild(entryError)


    document.querySelector("body").appendChild(nameForm)


}

function createPlayGame(fName, sName){
    const newGame = createGame(createBoard(), fName, sName)
    const newGameFlow = createTurnController(newGame)
    const domBoard = createDomBoard(newGame.gameBoard, newGameFlow, newGame)
    const winContainer = document.createElement("div")
    const winText = document.createElement("p")

    domBoard.boardToDom()
    
    const squareList = document.querySelectorAll(".square")
    
    let moveCounter = 0

    for(const square of squareList){
        square.addEventListener("click", () => {
            if(!newGame.complete){

                const move = makeMove(newGame, newGameFlow, domBoard, square.dataset.row, square.dataset.col)

                move

                if(move !== false){
                    moveCounter++
                }

                if(newGame.complete === true){
                    winText.textContent = `${newGameFlow.currentPlayer().name} wins!`

                    winContainer.appendChild(winText)

                    document.querySelector(".game-container").appendChild(winContainer)
                }   
                else if(newGame.complete === false && moveCounter === 9){
                    winText.textContent = "It's a draw!"

                    winContainer.appendChild(winText)

                    document.querySelector(".game-container").appendChild(winContainer)
                }
                
            }       
        })
    }
}

function playChoice(){
    const playContainer = document.createElement("div")
    playContainer.className = "play-container"
    const playText = document.createElement("p")
    playText.className = "info"
    const buttonContainer = document.createElement("div")
    buttonContainer.className = "button-container"
    const yesBtn = document.createElement("button")
    yesBtn.className = "button posi"
    const noBtn = document.createElement("button")
    noBtn.className = "button neg"

    playText.textContent = "Would you like to play noughts & crosses?"
    yesBtn.textContent = "Yes"
    noBtn.textContent = "No"

    yesBtn.addEventListener("click", () => {
        nameEntry()

        playContainer.remove()
    })

    noBtn.addEventListener("click", () => {
        playContainer.innerHTML = "Fair enough"
    })

    buttonContainer.appendChild(yesBtn)
    buttonContainer.appendChild(noBtn)

    playContainer.appendChild(playText)
    playContainer.appendChild(buttonContainer)

    document.querySelector("body").appendChild(playContainer)

}

function createDomBoard(board, turnController, game){
    const gameContainer = document.createElement("div")
    gameContainer.className = "game-container"
    document.querySelector("body").appendChild(gameContainer)

    const moveError = document.createElement("p")
    moveError.className = "error"

    const clearBtn = document.createElement("button")
    clearBtn.className = "button"
    clearBtn.id = "clear"
    clearBtn.textContent = "Clear board"
    clearBtn.addEventListener("click", () => {
        clear()

        createPlayGame(game.player1.name, game.player2.name)
    })

    const newPlayersBtn = document.createElement("button")
    newPlayersBtn.className = "button"
    newPlayersBtn.id = "new-players-btn"
    newPlayersBtn.textContent = "New players"
    newPlayersBtn.addEventListener("click", () => {
        clear()

        nameEntry()
    })

    const controlsContainer = document.createElement("div")
    controlsContainer.className = "button-container"

    controlsContainer.appendChild(clearBtn)
    controlsContainer.appendChild(newPlayersBtn)

    function boardToDom(){
        gameContainer.innerHTML = ""

        const boardContainer = document.createElement("div")
        boardContainer.className = "board-container"
        gameContainer.appendChild(boardContainer)

        for(let i = 0; i < board.length; i++){
            for(let j = 0; j < board.length; j++){
                const temp = document.createElement("div")
                temp.className = "square"
                temp.dataset.row = i
                temp.dataset.col = j
                boardContainer.appendChild(temp)
            }
        }

        const playerText = document.createElement("div")
        playerText.className = "player"
        playerText.textContent = turnController.currentPlayer().name
        gameContainer.appendChild(playerText)
        gameContainer.appendChild(moveError)
        gameContainer.appendChild(controlsContainer)
    }

    function clear(){
        gameContainer.remove()
    }

    function update(row, col, marker, complete){
        const domBoard = document.querySelectorAll(".square")

        for(const square of domBoard){
            if (square.dataset.row == row && 
            square.dataset.col == col)
            
            square.textContent = marker
        }

        const playerText = document.querySelector(".player")

        if (!complete) turnController.switchTurn()

        playerText.textContent = turnController.currentPlayer().name

    }
    
    return { boardToDom, clear, update }
}


playChoice()


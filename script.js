const gameBoard = (() => {
    let gameArr = []
    for(let i = 0; i < 3; i++){
        gameArr.push(["", "", ""])
    }

    return gameArr
})()

console.log(gameBoard)
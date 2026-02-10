const gameBoard = (() => {
    let gameArr = []
    for(let i = 0; i < 3; i++){
        gameArr.push(["", "", ""])
    }

    return gameArr
})()

function createPlayer(name, marker) {
    return {name, marker}
}



console.log(gameBoard)
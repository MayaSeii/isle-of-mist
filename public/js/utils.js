function getRandomFloat(min, max, decimals) {

    const str = (Math.random() * (max - min) + min).toFixed(decimals);
    return parseFloat(str);

}

function getRandomInt(min, max) {

    return Math.random() * (max - min) + min;

}

function isMouseOver(x, y) {

    let centerWidth = window.innerWidth / 2 - Tile.size * (GameManager.boardSize / 2);   
    let centerHeight = window.innerHeight / 2 - Tile.size * (GameManager.boardSize / 2);

    let posX = centerWidth + x;
    let posY = centerHeight + y;

    // Compensates for the centred board.
    let xCheck = mouseX >= posX && mouseX < posX + Tile.size;
    let yCheck = mouseY >= posY && mouseY < posY + Tile.size;

    return xCheck && yCheck;

}
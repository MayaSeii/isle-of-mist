function getRandomFloat(min, max, decimals) {

    const str = (Math.random() * (max - min) + min).toFixed(decimals);
    return parseFloat(str);

}

function getRandomInt(min, max) {

    min = Math.ceil(min);
    max = Math.floor(max);
    
    return Math.floor(Math.random() * (max - min + 1)) + min;

}

function getDistance(x1, x2, y1, y2) {

    var a = x1 - x2;
    var b = y1 - y2;

    console.log(Math.sqrt(a * a + b * b))
    return Math.sqrt(a * a + b * b);

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
let canvas;

async function setup() {

    // Sets up the game and UI managers.
    await GameManager.setup(25);
    UIManager.setup();

    // Creates the canvas.
    canvas = createCanvas(window.innerWidth, window.innerHeight);

    // Loads each player's characters.
    await GameManager.loadPlayerCharacters(GameManager.match.m_playeroneid);
    await GameManager.loadPlayerCharacters(GameManager.match.m_playertwoid);

}

function draw() {

    // Checks if the board is ready.
    if (!GameManager.isReady()) return;

    GameManager.draw();
    UIManager.draw();

}

function mouseClicked() {

    if (!GameManager.isReady()) return;
    GameManager.clickHandler(mouseX, mouseY);

}

function windowResized() {
    
    resizeCanvas(window.innerWidth, window.innerHeight);
    
}
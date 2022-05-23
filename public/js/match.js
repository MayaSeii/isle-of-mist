let canvas;

function preload() {

    AudioManager.preload();

}

async function setup() {

    // Sets up the game and UI managers.
    await GameManager.setup(25);
    UIManager.setup();

    // Creates the canvas.
    canvas = createCanvas(window.innerWidth, window.innerHeight);

    let canvasElement = canvas.elt;
    let context = canvasElement.getContext('2d');
    context.webkitImageSmoothingEnabled = false;
    context.msImageSmoothingEnabled = false;
    context.imageSmoothingEnabled = false;

    // Loads each player's characters.
    await GameManager.loadPlayerCharacters(GameManager.match.m_playeroneid);
    await GameManager.loadPlayerCharacters(GameManager.match.m_playertwoid);

}

function draw() {

    clear();

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
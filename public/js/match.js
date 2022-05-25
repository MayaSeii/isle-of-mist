let canvas;

function preload() {

    UIManager.preload();
    AudioManager.preload();

}

async function setup() {

    let TEST_DELETE_LATER = 24;

    // Sets up the game and UI managers.
    await GameManager.setup(25, TEST_DELETE_LATER);

    // Creates the canvas.
    canvas = createCanvas(window.innerWidth, window.innerHeight);
    this.setupCanvas();

    // Loads each player's characters.
    await GameManager.loadPlayerCharacters(GameManager.match.m_playeroneid);
    await GameManager.loadPlayerCharacters(GameManager.match.m_playertwoid);
    
    UIManager.setup();

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
    GameManager.clickHandler();

}

function windowResized() {
    
    resizeCanvas(window.innerWidth, window.innerHeight);
    GameManager.windowResized();

}

function setupCanvas() {

    let canvasElement = canvas.elt;
    let context = canvasElement.getContext('2d');
    context.webkitImageSmoothingEnabled = false;
    context.msImageSmoothingEnabled = false;
    context.imageSmoothingEnabled = false;

}
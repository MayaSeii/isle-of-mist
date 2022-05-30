let canvas;

function preload() {

    UIManager.preload();
    AudioManager.preload();

}

async function setup() {

    const playerID = await getCurrentPlayerID();
    const match = await getPlayerMatch(playerID);

    // Sets up the game and UI managers.
    await GameManager.setup(match.m_id, playerID);

    // Creates the canvas.
    canvas = createCanvas(window.innerWidth, window.innerHeight);
    this.setupCanvas();

    // Loads each player's characters.
    await GameManager.loadPlayerCharacters(GameManager.match.m_playeroneid);
    await GameManager.loadPlayerCharacters(GameManager.match.m_playertwoid);
    
    UIManager.setup();

    setInterval(GameManager.refresh, 1000)

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
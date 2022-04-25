let historyX = [];
let historyY = [];
let historyAP = [0];
let historySkills = [0];

const MatchID = 25;

const boardSize = 18;
const tileSize = 24.6;

var currentChar;
var enemyChar;

var currentPlayer;
var enemyPlayer;

var match;
var arena;

var guardian;

var board = Array.from(Array(boardSize), () => new Array(boardSize));

let canAttack = false;
let hasAttacked = false;

async function updateData() {

    if (enemyChar == undefined) return;

    match = await getMatch(MatchID);
    if (match.activeplayer != currentPlayer) return;

    resetButtons();
    checkAttackRange();

    enemyChar = await getPlayerCharacters(enemyPlayer);
    enemyChar = enemyChar[0];

    currentChar = await getPlayerCharacters(currentPlayer);
    currentChar = currentChar[0];

    $('#round-number').text(`Round ${match.round}`);
    $('#turn-number').text(`${match.activeplayer}'s turn`);
    $('#hp').text(`${currentChar.hp}`);

}

function setup() {

    var myCanvas = createCanvas(boardSize * tileSize, boardSize * tileSize);
    myCanvas.parent('board');

    setInterval(updateData, 500);

}

function draw() {

    // Default background colour: green.
    background('#a5d188');
    
    // Sets a thin white stroke.
    strokeWeight(.5);
    stroke(255);

    // Awaits until the enemy character is defined.
    if (enemyChar == undefined) return;

    // Creates a temporary arena string to parse.
    let tempArena = arena.replace(/(?:\r\n|\r|\n)/g, '');

    // Creates the board from the arena string.
    for (let y = 0; y < boardSize; y++) {

        for (let x = 0; x < boardSize; x++) {

            switch (tempArena.charAt(0)) {

                case 'G': fill('#a5d188'); break;
                case 'L': fill('#e06d5e'); break;
                case 'F': fill('#46734d'); break;
                case 'W': fill('#88b1d1'); break;

            }

            board[y][x] = tempArena.charAt(0);
            rect(x * tileSize, y * tileSize, tileSize, tileSize);
            tempArena = tempArena.substring(1);

        }

    }

    ellipseMode(CORNER);
    noStroke();

    // Draws the player character.
    fill('white');
    circle((parseInt($('#xpos').text()) - 1) * tileSize, (18 - parseInt($('#ypos').text())) * tileSize, tileSize);

    // Draws the enemy character.
    fill('red');
    circle((enemyChar.positionx - 1) * tileSize, (18 - enemyChar.positiony) * tileSize, tileSize);

    // Draws the Guardian.
    fill('purple');
    circle((guardian.positionx - 2) * tileSize, (18 - guardian.positiony - 1) * tileSize, tileSize * 3);

}

$(document).ready(async () => {

    // Gets the test match and the associated arena and guardian.
    match = await getMatch(MatchID);
    arena = await getMatchArena(MatchID);
    guardian = await getMatchGuardian(MatchID);

    // Gets both players IDs.
    let player1 = match.playeroneid;
    let player2 = match.playertwoid;

    // Sets the current and enemy player for player 1.
    $('#sel-p1').click(async () => { 

        currentPlayer = player1;
        enemyPlayer = player2;

        loadPage(); 
    
    });

    // Sets the current and enemy player for player 2.
    $('#sel-p2').click(async () => { 

        currentPlayer = player2;
        enemyPlayer = player1;

        loadPage();
    
    });

    async function loadPage() {
        
        currentChar = await getPlayerCharacters(currentPlayer);
        enemyChar = await getPlayerCharacters(enemyPlayer);

        currentChar = currentChar[0];
        enemyChar = enemyChar[0];

        checkAttackRange();
        resetButtons();

        let skills = await getCharacterSkills(currentChar.characterid);

        $('#charname').text(currentChar.firstname);
        $('#chartitle').text(`${currentChar.firstname}${currentChar.lastname}, ${currentChar.title}`);

        $('#hp').text(currentChar.hp);
        $('#pow').text(currentChar.baseatk);
        $('#def').text(currentChar.basedef);
        $('#acc').text(currentChar.baseacc);

        $('#xpos').text(currentChar.positionx);
        $('#ypos').text(currentChar.positiony);
        
        $('#skill1').html(`<strong>${skills[0].name}</strong> | ${skills[0].cost} AP`);
        $('#skill2').html(`<strong>${skills[1].name}</strong> | ${skills[1].cost} AP`);

        $('#skill1').parent().attr('title', skills[0].description);
        $('#skill2').parent().attr('title', skills[1].description);

        $('#skill1').data('cost', skills[0].cost);
        $('#skill2').data('cost', skills[1].cost);

        $('#round-number').text(`Round ${match.round}`);
        $('#turn-number').text(`${match.activeplayer}'s turn`);

        historyX = [currentChar.positionx];
        historyY = [currentChar.positiony];

        $('#player-selection').hide();
        $('#mini-sheets').show();
        $('#counter').show();

        if (match.activeplayer != currentPlayer) $(':button').prop('disabled', true);
        else $(':button').prop('disabled', false);

    }

    $('#up').click(() => {

        let value = parseInt($('#ypos').text()) + 1;
        $('#ypos').text(value);

        if (parseInt($('#ypos').text()) == boardSize) toggleDisable('up', true);
        toggleDisable('down', false);

        reduceAP();
        updateHistory();

        checkAttackRange();

    });

    $('#down').click(() => {

        let value = parseInt($('#ypos').text()) - 1;
        $('#ypos').text(value);

        if (parseInt($('#ypos').text()) == 1) toggleDisable('down', true);
        toggleDisable('up', false);

        reduceAP();
        updateHistory();

        checkAttackRange();

    });

    $('#left').click(() => {

        let value = parseInt($('#xpos').text()) - 1;
        $('#xpos').text(value);

        if (parseInt($('#xpos').text()) == 1) toggleDisable('left', true);
        toggleDisable('right', false);

        reduceAP();
        updateHistory();

        checkAttackRange();

    });

    $('#right').click(() => {

        let value = parseInt($('#xpos').text()) + 1;
        $('#xpos').text(value);

        if (parseInt($('#xpos').text()) == boardSize) toggleDisable('right', true);
        toggleDisable('left', false);

        reduceAP();
        updateHistory();

        checkAttackRange();

    });

    $('#btn-undo').click(() => {

        historyX.pop();
        historyY.pop();

        let toRestore = historyAP.pop();
        let prevSkill = historySkills.pop();

        if (prevSkill == 3) {
            hasAttacked = false;
        }

        if (prevSkill != 0) {
            toggleDisable(`btn-skill${prevSkill}`, false);
        }

        $('#xpos').text(historyX[historyX.length - 1]);
        $('#ypos').text(historyY[historyY.length - 1]);
        $('#ap').text(parseInt($('#ap').text()) + toRestore);

        if (historyX.length <= 1) {

            toggleDisable('btn-undo', true);
            toggleDisable('btn-undoall', true);

        }

        resetButtons();

    })

    $('#btn-undoall').click(() => {

        historyX.length = 1;
        historyY.length = 1;

        $('#xpos').text(historyX[0]);
        $('#ypos').text(historyY[0]);
        $('#ap').text(6);

        hasAttacked = false;

        resetButtons();

    });

    $('#btn-skill1').click(() => {

        let apCost = parseInt($('#skill1').data('cost'));
        reduceAP(apCost);

        toggleDisable('btn-skill1', true);
        updateHistory(1);

        historyAP.push(apCost);

    });

    $('#btn-skill2').click(() => {

        let apCost = parseInt($('#skill2').data('cost'));
        reduceAP(apCost);

        toggleDisable('btn-skill2', true);
        updateHistory(2);

        historyAP.push(apCost);

    });

    $('#btn-skill3').click(() => {

        reduceAP();
        hasAttacked = true;
        toggleDisable('btn-skill3', true);
        historyAP.push(1);
        updateHistory(3);

    })

    $('#btn-skill4').click(() => {

        reduceAP();

        toggleDisable('btn-skill4', true);
        historyAP.push(1);
        updateHistory(4);

    })

    $('#btn-end').click(async () => {

        currentChar.positionx = $('#xpos').text();
        currentChar.positiony = $('#ypos').text();

        if (hasAttacked) enemyChar.hp -= 1;

        await updateMatchCharacter(currentChar.mcid, currentChar);
        await updateMatchCharacter(enemyChar.mcid, enemyChar);

        historyX[0] = historyX[historyX.length - 1];
        historyX.length = 1;

        historyY[0] = historyX[historyX.length - 1];
        historyX.length = 1;

        historyAP[0] = 0;
        historyAP.length = 1;

        historySkills[0] = 0;
        historySkills.length = 1;

        toggleDisable('up', false);
        toggleDisable('down', false);
        toggleDisable('left', false);
        toggleDisable('right', false);
        toggleDisable('btn-skill1', false);
        toggleDisable('btn-skill2', false);
        toggleDisable('btn-skill3', false);
        toggleDisable('btn-skill4', false);

        toggleDisable('btn-undo', true);
        toggleDisable('btn-undoall', true);

        $('#ap').text(6);

        if (parseInt($('#xpos').text()) == 1) toggleDisable('left', true);
        if (parseInt($('#ypos').text()) == 1) toggleDisable('down', true);
        if (parseInt($('#xpos').text()) == boardSize) toggleDisable('right', true);
        if (parseInt($('#ypos').text()) == boardSize) toggleDisable('up', true);

        let tempMatch = await newTurn(match.id);
        match = tempMatch;
            
        $('#round-number').text(`Round ${match.round}`);
        $('#turn-number').text(`${match.activeplayer}'s turn`);

        if (match.activeplayer != currentPlayer) $(':button').prop('disabled', true);
        else $(':button').prop('disabled', false);

        hasAttacked = false

    })

});

function reduceAP(val = 1) {

    let apVal = parseInt($('#ap').text()) - val;
    $('#ap').text(apVal);

    resetButtons();

    historyAP.push(val);
}

function updateHistory(skillId) {

    historyX.push(parseInt($('#xpos').text()));
    historyY.push(parseInt($('#ypos').text()));
    historySkills.push(skillId);

}

function toggleDisable(id, bool) {
    $(`#${id}`).attr('disabled', bool);
}

function checkAttackRange() {

    if (match.activeplayer != currentPlayer) return canAttack = false;

    let xPos = parseInt($('#xpos').text());
    let yPos = parseInt($('#ypos').text());

    let xPosEnemy = enemyChar.positionx;
    let yPosEnemy = enemyChar.positiony;

    canAttack = (xPos == xPosEnemy && (yPos == yPosEnemy + 1 || yPos == yPosEnemy - 1)) ||
                (yPos == yPosEnemy && (xPos == xPosEnemy + 1 || xPos == xPosEnemy - 1));

    $('#btn-skill3').attr('disabled', !canAttack || hasAttacked);

}

function resetButtons() {

    let currentTurn = match.activeplayer != currentPlayer;
    let apVal = parseInt($('#ap').text());

    checkAttackRange();

    toggleDisable('btn-skill1', apVal < parseInt($('#skill1').data('cost'))  && currentTurn);
    toggleDisable('btn-skill2', apVal < parseInt($('#skill2').data('cost')));

    toggleDisable('btn-end', currentTurn);

    toggleDisable('btn-undo', apVal >= 6 && currentTurn);
    toggleDisable('btn-undoall', apVal >= 6 && currentTurn);

    toggleDisable('up', apVal <= 0 && currentTurn);
    toggleDisable('down', apVal <= 0 && currentTurn);
    toggleDisable('left', apVal <= 0 && currentTurn);
    toggleDisable('right', apVal <= 0 && currentTurn);
    toggleDisable('btn-skill3', (apVal <= 0 && !canAttack && currentTurn) || hasAttacked);
    toggleDisable('btn-skill4', apVal <= 0 && currentTurn);

    if (apVal >= 6) {

        toggleDisable('btn-undo', true);
        toggleDisable('btn-undoall', true);

    }

}
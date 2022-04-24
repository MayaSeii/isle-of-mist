let historyX = [];
let historyY = [];
let historyAP = [0];
let historySkills = [0];

const MatchID = 25;

const boardSize = 18;
const tileSize = 24.6;

var currentChar;
var enemyChar;

var match;
var arena;

var guardian;

var board = Array.from(Array(boardSize), () => new Array(boardSize));

function setup() {
    var myCanvas = createCanvas(boardSize * tileSize, boardSize * tileSize);
    myCanvas.parent('board');
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

    $('#sel-p1').click(async () => { 
        
        currentChar = await getPlayerCharacters(player1);
        enemyChar = await getPlayerCharacters(player2);

        loadPage(); 
    
    });

    $('#sel-p2').click(async () => { 
        
        currentChar = await getPlayerCharacters(player2);
        enemyChar = await getPlayerCharacters(player1);

        loadPage();
    
    });

    async function loadPage() {

        currentChar = currentChar[0];
        enemyChar = enemyChar[0];

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

        historyX = [currentChar.positionx];
        historyY = [currentChar.positiony];

        $('#player-selection').hide();
        $('#mini-sheets').show();
        $('#counter').show();

    }

    $('#up').click(() => {

        board.forEach((x) => {
            console.log(x);
        })

        let value = parseInt($('#ypos').text()) + 1;
        $('#ypos').text(value);

        if (parseInt($('#ypos').text()) == boardSize) toggleDisable('up', true);
        toggleDisable('down', false);

        reduceAP();
        updateHistory();

    });

    $('#down').click(() => {

        let value = parseInt($('#ypos').text()) - 1;
        $('#ypos').text(value);

        if (parseInt($('#ypos').text()) == 1) toggleDisable('down', true);
        toggleDisable('up', false);

        reduceAP();
        updateHistory();

    });

    $('#left').click(() => {

        let value = parseInt($('#xpos').text()) - 1;
        $('#xpos').text(value);

        if (parseInt($('#xpos').text()) == 1) toggleDisable('left', true);
        toggleDisable('right', false);

        reduceAP();
        updateHistory();

    });

    $('#right').click(() => {

        let value = parseInt($('#xpos').text()) + 1;
        $('#xpos').text(value);

        if (parseInt($('#xpos').text()) == boardSize) toggleDisable('right', true);
        toggleDisable('left', false);

        reduceAP();
        updateHistory();

    });

    $('#btn-undo').click(() => {

        historyX.pop();
        historyY.pop();

        let toRestore = historyAP.pop();
        let prevSkill = historySkills.pop();

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

        toggleDisable('up', false);
        toggleDisable('down', false);
        toggleDisable('left', false);
        toggleDisable('right', false);
        toggleDisable('btn-skill3', false);
        toggleDisable('btn-skill4', false);

        if (parseInt($('#ap').text()) >= parseInt($('#skill1').data('cost')))
            toggleDisable('btn-skill1', false);

        if (parseInt($('#ap').text()) >= parseInt($('#skill2').data('cost')))
            toggleDisable('btn-skill2', false);

    })

    $('#btn-undoall').click(() => {

        historyX.length = 1;
        historyY.length = 1;

        $('#xpos').text(historyX[0]);
        $('#ypos').text(historyY[0]);
        $('#ap').text(6);

        toggleDisable('btn-undo', true);
        toggleDisable('btn-undoall', true);

        toggleDisable('btn-skill1', false);
        toggleDisable('btn-skill2', false);
        toggleDisable('btn-skill3', false);
        toggleDisable('btn-skill4', false);

        toggleDisable('up', false);
        toggleDisable('down', false);
        toggleDisable('left', false);
        toggleDisable('right', false);

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

    $('#btn-end').click(() => {

        console.log(currentChar);

        updateCharacter(currentChar.mcid, $('#xpos').text(), $('#ypos').text());

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

    })

});

function reduceAP(val = 1) {

    let apVal = parseInt($('#ap').text()) - val;
    $('#ap').text(apVal);

    toggleDisable('btn-undo', false);
    toggleDisable('btn-undoall', false);

    if (apVal <= 0) {

        toggleDisable('up', true);
        toggleDisable('down', true);
        toggleDisable('left', true);
        toggleDisable('right', true);
        toggleDisable('btn-skill3', true);
        toggleDisable('btn-skill4', true);

    }

    if (apVal < parseInt($('#skill1').data('cost'))) toggleDisable('btn-skill1', true);
    if (apVal < parseInt($('#skill2').data('cost'))) toggleDisable('btn-skill2', true);

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
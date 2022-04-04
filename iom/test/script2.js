let xHistory = [0];
let yHistory = [0];

$('#up').click(() => {

    let ypos = parseInt($('#ypos').html());
    $('#ypos').html(ypos + 1);

    updateHistory();
    toggleButton(false);

});

$('#down').click(() => {

    let ypos = parseInt($('#ypos').html());
    $('#ypos').html(ypos - 1);

    updateHistory();
    toggleButton(false);

});

$('#left').click(() => {

    let xpos = parseInt($('#xpos').html());
    $('#xpos').html(xpos - 1);

    updateHistory();
    toggleButton(false);

});

$('#right').click(() => {

    let xpos = parseInt($('#xpos').html());
    $('#xpos').html(xpos + 1);

    updateHistory();
    toggleButton(false);

});

$('#undo').click(() => {

    xHistory.pop();
    yHistory.pop();

    if (xHistory.length <= 1) toggleButton(true);

    $('#xpos').html(xHistory[xHistory.length - 1]);
    $('#ypos').html(yHistory[yHistory.length - 1]);

});

$('#undo-all').click(() => {

    xHistory.length = 1;
    yHistory.length = 1;

    $('#xpos').html(xHistory[0]);
    $('#ypos').html(yHistory[0]);

    toggleButton(true)

});

$('#end-turn').click(() => {

    xHistory[0] = xHistory[xHistory.length - 1];
    yHistory[0] = yHistory[yHistory.length - 1];

    xHistory.length = 1;
    yHistory.length = 1;

    toggleButton(true);

});

function toggleButton(state) {

    $('#undo').attr('disabled', state);
    $('#undo-all').attr('disabled', state);

}

function updateHistory() {

    xHistory.push(parseInt($('#xpos').html()));
    yHistory.push(parseInt($('#ypos').html()));

}
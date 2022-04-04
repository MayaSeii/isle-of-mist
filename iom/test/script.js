/*
    -------------- HTML ELEMENTS --------------

    #xpos -> x position text;
    #ypos -> y position text;

    #undo -> undo button;
    #undo-all -> undo all button;
    #end -> end turn button;

    #up -> up button;
    #down -> down button;
    #left -> left button;
    #right -> right button;

    ----------- JAVASCRIPT VARIABLES ----------

    xHistory -> list of moves on the x axis;
    yHistory -> list of moves on the y axis;
*/

let xHistory = [0];
let yHistory = [0];

// Updating the numbers.
function update() {

    xHistory.push(parseInt($('#xpos').html()));
    yHistory.push(parseInt($('#ypos').html()));

    alert('xHistory: ' + xHistory + '\nyHistory: ' + yHistory);

    $('#undo').attr('disabled', false);
    $('#undo-all').attr('disabled', false);

}

// Ending the turn and starting the next one.
$('#end').click(() => {

    // Overriding the first element of each array with the last action taken.
    xHistory[0] = $('#xpos').html();
    yHistory[0] = $('#ypos').html();

    // Sets the size of all arrays to 1, removing all elements except the first one.
    xHistory.length = 1;
    yHistory.length = 1;

    // Disables the undo buttons since there's no history.
    $('#undo').attr('disabled', true);
    $('#undo-all').attr('disabled', true);

});

// Going UP.
$('#up').click(() => {

    $('#ypos').html(parseInt($('#ypos').html()) + 1);
    update();

});

// Going DOWN.
$('#down').click(() => {

    $('#ypos').html(parseInt($('#ypos').html()) - 1);
    update();

});

// Going LEFT.
$('#left').click(() => {

    $('#xpos').html(parseInt($('#xpos').html()) - 1);
    update();

});

// Going RIGHT.
$('#right').click(() => {

    $('#xpos').html(parseInt($('#xpos').html()) + 1);
    update();

});

// Undoes the last movement.
$('#undo').click(() => {

    if (xHistory.length <= 1) return; // Does nothing if no history.

    xHistory.pop(); // Removes the last entry on the x history.
    yHistory.pop(); // Removes the last entry on the y history.

    // Updates the x and y texts to show the new last element of the x and y arrays.
    $('#xpos').html(xHistory[xHistory.length - 1]);
    $('#ypos').html(yHistory[yHistory.length - 1]);

    // Disables the undo buttons if there's only one action in the history.
    if (xHistory.length <= 1) {

        $('#undo').attr('disabled', true);
        $('#undo-all').attr('disabled', true);

    }

    alert('xHistory: ' + xHistory + '\nyHistory: ' + yHistory);

})

// Undoes all the movement.
$('#undo-all').click(() => {

    if (xHistory.length <= 1) return; // Does nothing if no history.

    // Deletes every element from the arrays except the first one.
    // This is done by setting the length of the array to only 1 element.
    xHistory.length = 1;
    yHistory.length = 1;

    // Updates the x and y texts to show the first and only element of the x and y arrays.
    $('#xpos').html(xHistory[0]);
    $('#ypos').html(yHistory[0]);

    // Since this undoes all actions, the undo buttons always get disabled.
    $('#undo').attr('disabled', true);
    $('#undo-all').attr('disabled', true);

    alert('xHistory: ' + xHistory + '\nyHistory: ' + yHistory);

});
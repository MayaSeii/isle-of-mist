let currentTeam = 0;

function addToTeam(e) {

    let $element = $(e);
    let $image = $element.find('img');

    let $team = $(`#team${currentTeam}`);

    $team.children('img').each(function () {

        let $img = $(this);

        if (this.src.length == 0) {

            $img.attr('src', $image.attr('src'));
            $img.css('background', 'none');
            $img.data('id', $element.data('id'));

            $element.attr('disabled', true);

            return false;

        }

    });

    currentTeam = Math.abs(currentTeam - 1);

    let enable = true;
    
    $('.small-avatar').each(function(i, obj) {
        if (obj.src.length == 0) enable = false;
    });

    if (enable) { $('#btn-play').attr('disabled', false); }

}

$(document).ready(async () => {

    $('#btn-play').attr('disabled', true);
    $('#player1-name').html(sessionStorage.getItem('currentAccount'));

    // Gets all the database characters.
    let characters = await getCharacters();

    // Loads the name, picture, and icon of each character.
    $('.charname').each((i, obj) => {

        let name = characters.rows[i].firstname;
        let icon = characters.rows[i].icon;
        let id = characters.rows[i].id;

        $(obj).siblings('img').attr('src', `./img/portraits/${name}.png`);
        $(obj).siblings('img').attr('alt', name);
        $(obj).siblings('i').addClass(`fa-${icon}`);
        $(obj).html(name);

        // Stores the character ID on the button.
        $(obj).parent().data('id', id);

    });

    $('#container').fadeIn(200);
    $('#details').fadeIn(200);

});
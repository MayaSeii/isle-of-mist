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

$(document).ready(() => {

    $('#btn-play').attr('disabled', true);

});
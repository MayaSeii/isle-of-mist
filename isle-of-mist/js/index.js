var buttonIndex = 0;

function charChosen(e) {

    let $element = $(e);
    $element.prop('disabled', true);

    $(`#player${buttonIndex} td`).each((td) => {

        $span = $(`#player${buttonIndex}${td}`);

        if ($span.html() == '?') {

            $span.html($element.text());
            $(`#sheet${buttonIndex}${td}`).html($element.text());
            $(`#control${buttonIndex}${td}`).html($element.text());

            if (buttonIndex == 1 && td == 2) $('#confirm').attr('disabled', false);
            return false;

        }

    });

    buttonIndex = Math.abs(buttonIndex - 1);

}

function start() {

    $('#character-container').hide();
    $('#p1sheet').show();
    $('#p2sheet').show();
    $('#counter').show();

    setInterval(setTime, 1000);

}

var minutesLabel = $('#minutes');
var secondsLabel = $('#seconds');
var totalSeconds = 0;

function setTime() {
  ++totalSeconds;
  secondsLabel.html(pad(totalSeconds % 60));
  minutesLabel.html(pad(parseInt(totalSeconds / 60)));
}

function pad(val) {
  var valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}
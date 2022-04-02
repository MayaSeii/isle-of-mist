function move(e, direction) {

    let $element = $(e);

    let $xSpan = $(`#${$element.attr('id').slice(0, -1)}x`);
    let $ySpan = $(`#${$element.attr('id').slice(0, -1)}y`);

    let x = $xSpan.html();
    let y = $ySpan.html();

    switch (direction) {

        default:
        case 0: y++; break;
        case 1: x++; break;
        case 2: y--; break;
        case 3: x--; break;

    }

    $xSpan.html(x);
    $ySpan.html(y);

}
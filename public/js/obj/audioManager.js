class AudioManager {

    static notAllowed;
    static characterClick;
    static characterMove;
    static tileSelect;
    static impact;
    static damage;

    static preload() {

        AudioManager.characterClick = loadSound('../audio/char_click.wav');
        AudioManager.notAllowed = loadSound('../audio/not_allowed.wav');
        AudioManager.characterMove = loadSound('../audio/char_move.wav');
        AudioManager.tileSelect = loadSound('../audio/tile_select.wav');
        AudioManager.impact = loadSound('../audio/impact.wav');

        AudioManager.damage = new Object();
        AudioManager.damage['seii'] = loadSound('../audio/seii_damage.wav');
        AudioManager.damage['alessia'] = loadSound('../audio/alessia_damage.wav');
        AudioManager.damage['scarlet'] = loadSound('../audio/scarlet_damage.wav');
        AudioManager.damage['zodan'] = loadSound('../audio/zodan_damage.wav');
        AudioManager.damage['shinsuke'] = loadSound('../audio/shinsuke_damage.wav');
        AudioManager.damage['gobbo'] = loadSound('../audio/gobbo_damage.wav');

    }

    static playRandom(clip) {

        clip.rate(getRandomFloat(0.9, 1.1, 2));
        clip.play();

    }

}
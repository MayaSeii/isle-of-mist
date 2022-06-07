class AudioManager {

    static notAllowed;
    static characterClick;
    static characterMove;
    static tileSelect;
    static impact;
    static damage;

    static audioContext;

    static preload() {
 
        AudioManager.characterClick = new Howl({ src: '../audio/char_click.wav' });
        AudioManager.notAllowed = new Howl({ src: '../audio/not_allowed.wav' });
        AudioManager.characterMove = new Howl({ src: '../audio/char_move.wav' });
        AudioManager.tileSelect = new Howl({ src: '../audio/tile_select.wav' });
        AudioManager.impact = new Howl({ src: '../audio/impact.wav' });
        AudioManager.cancel = new Howl({ src: '../audio/cancel.wav' });
        AudioManager.endTurn = new Howl({ src: '../audio/end_turn.wav' });

        AudioManager.guardianAttack = new Howl({ src: '../audio/guardian_attack.wav' });
        AudioManager.guardianDamage = new Howl({ src: '../audio/guardian_roar.wav' });
        AudioManager.guardianBreath = new Howl({ src: '../audio/guardian_breath.wav' });

        AudioManager.eggIdle = new Howl({ src: '../audio/egg_idle.wav' });

        AudioManager.damage = new Object();
        AudioManager.damage['seii'] = new Howl({ src: '../audio/seii_damage.wav' });
        AudioManager.damage['alessia'] = new Howl({ src: '../audio/alessia_damage.wav' });
        AudioManager.damage['scarlet'] = new Howl({ src: '../audio/scarlet_damage.wav' });
        AudioManager.damage['zodan'] = new Howl({ src: '../audio/zodan_damage.wav' });
        AudioManager.damage['shinsuke'] = new Howl({ src: '../audio/shinsuke_damage.wav' });
        AudioManager.damage['gobbo'] = new Howl({ src: '../audio/gobbo_damage.wav' });

        AudioManager.skill = new Object();
        AudioManager.skill['attack'] = new Howl({ src: '../audio/skill_attack.wav' });
        AudioManager.skill['guard'] = new Howl({ src: '../audio/skill_guard.wav' });
        AudioManager.skill['unique'] = new Howl({ src: '../audio/skill_unique.wav' });

    }

    static playRandom(clip) {

        clip.stop();
        clip.rate(getRandomFloat(0.9, 1.1, 2));
        clip.play();

    }

}
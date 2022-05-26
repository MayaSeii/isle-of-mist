class Character {

    static selected;
    static attacking;
    static haveAttacked = [];

    /**
     * Creates a new character.
     * @param {Object} data 
     */
    constructor(data) {

        this.data = data;

        // Loads the character's full art and portrait based on their first name.
        //this.art = loadImage(`../img/art/${this.data.chr_firstname}.png`);
        //this.portrait = loadImage(`../img/portraits/${this.data.chr_firstname}.png`);
        this.sprite = loadImage(`../img/sprites/${this.data.chr_firstname.toLowerCase()}.png`);

        // Creates a div for HTML-related styling.
        this.div = createDiv();
        this.div.style('width', '48px');
        this.div.style('height', '48px');
        this.div.addClass(this.data.mch_ply_id == GameManager.player.ply_id ? 'char' : 'not-allowed');

        this.tintTimer = 0;
        this.skills = [];

        this.getFirstPosition();

    }

    /** Loads the character's skills. */
    async loadSkills() {
        
        let skills = await getMatchCharacterSkills(this.data.mch_id);
        skills.forEach(skill => this.skills.push(new Skill(skill)));

    }

    /** Draws the character on the board. */
    draw() {

        // Tile positions start at 0, meaning subtracting 1 is necessary.
        const px = this.data.mch_positionx - 1;
        const py = 18 - this.data.mch_positiony;
    
        // Gets the tile underneath the player for precise positioning.
        const tile = GameManager.board.tileArray.find(t => { 
            return t.absolutePos.x == px && t.absolutePos.y == py;
        });

        // Lerps the values for smooth animation.
        const x = lerp(this.div.position().x, tile.div.position().x, 0.3);
        const y = lerp(this.div.position().y, tile.div.position().y, 0.3);

        this.updateHurtTint();

        image(this.sprite, x, y, Tile.size, Tile.size);
        this.div.position(x, y);

        noTint();

    }

    clicked() {

        if (Character.attacking != undefined) {

            if (this.isAdjacent(Character.attacking) && Character.attacking != this) this.getAttacked();
            else AudioManager.playRandom(AudioManager.notAllowed);
            return;

        }

        if (this.data.mch_ply_id != GameManager.player.ply_id)
            return AudioManager.playRandom(AudioManager.notAllowed);

        if (this.data.mch_ap <= 0)
            return AudioManager.playRandom(AudioManager.notAllowed);

        // Unselects a character if already selected.
        if (Character.selected == this) {

            AudioManager.playRandom(AudioManager.cancel);
            Character.selected = undefined;
            return GameManager.board.tileArray.forEach(tile => tile.highlight(false));

        }

        // Plays the sound effect.
        AudioManager.playRandom(AudioManager.characterClick);

        this.validateMovementTiles();

        Character.selected = this;

    }

    async move(tile) {

        AudioManager.playRandom(AudioManager.characterMove);

        const px = this.data.mch_positionx - 1;
        const py = 18 - this.data.mch_positiony;
        
        this.reduceAP(Math.abs(px - tile.absolutePos.x) + Math.abs(py - tile.absolutePos.y));

        this.data.mch_positionx = tile.absolutePos.x + 1;
        this.data.mch_positiony = 18 - tile.absolutePos.y;
        this.data = await moveMatchCharacter(this.data.mch_id, tile.absolutePos.x + 1, 18 - tile.absolutePos.y);

        if (tile.type == "L" && this.data.chr_tile != "L") setTimeout(() => { this.hurt(1); }, 180);

        Character.selected = undefined;

    }

    reduceAP(value) {

        if (this.data.mch_ap <= 0) return;

        this.data.mch_ap = Math.max(0, this.data.mch_ap - value);

        if (this.data.mch_ap <= 0) {
            
            this.sprite = loadImage(`../img/sprites/${this.data.chr_firstname.toLowerCase()}_inactive.png`);
            this.div.addClass('not-allowed');

        }

    }

    validateMovementTiles() {

        GameManager.board.tileArray.forEach(tile => {

            // Highlights only if within valid distance, based on AP.
            let condition = tile.isWithinReach(this) && !tile.isOccupied() && !tile.isOccupiedByGuardian();

            if (this.data.chr_tile != 'W') condition &= tile.type != 'W';

            tile.highlight(condition);

        });

    }

    /**
     * Hurts the character, reducing their HP by a certain amount.
     * @param {number} value - The HP to deduct from the player.
     */
    hurt(value = 0) {

        if (this.data.mch_hp <= 0) return;

        this.tintTimer = 1;
        this.data.mch_hp = Math.max(0, this.data.mch_hp - value);
        AudioManager.playRandom(AudioManager.impact);
        AudioManager.damage[this.data.chr_firstname.toLowerCase()].stop();
        AudioManager.damage[this.data.chr_firstname.toLowerCase()].play();

    }

    /** Tints the image red when hurt. */
    updateHurtTint() {

        if (this.tintTimer > 0) {
            
            // Little hop animation.
            this.div.position(this.div.position().x, this.div.position().y + 5);
            setTimeout(() => { this.div.position(this.div.position().x, this.div.position().y - 5); }, 50);

            tint(255, 255 * (1 - this.tintTimer), 255 * (1 - this.tintTimer));
            this.tintTimer -= 0.1;

        }

    }

    /** Avoids lerping the when loading the page. */
    getFirstPosition() {

        const px = this.data.mch_positionx - 1;
        const py = 18 - this.data.mch_positiony;

        // Gets the tile underneath the player for precise positioning.
        const tile = GameManager.board.tileArray.find(t => { 
            return t.absolutePos.x == px && t.absolutePos.y == py;
        });

        this.div.position(tile.div.position().x, tile.div.position().y);

    }

    /** Validates the attack before attacking. */
    attack() {

        let skill = this.skills.find(s => s.data.skl_name == 'Attack');

        // Checks if the attack can be used.
        if (skill.hasBeenUsed() || this.data.mch_ap < skill.data.skl_cost)
            return AudioManager.playRandom(AudioManager.notAllowed);

        if (Character.attacking != this) this.initiateAttack();
        else this.cancelAttack();

    }

    guard() {

        let skill = this.skills.find(s => s.data.skl_name == 'Guard');

        if (skill.hasBeenUsed() || this.data.mch_ap <= skill.data.skl_cost)
            return AudioManager.playRandom(AudioManager.notAllowed);

        skill.markAsUsed();
        this.data.mch_isguarding = true;
        this.reduceAP(skill.data.skl_cost);

        AudioManager.playRandom(AudioManager.characterClick);
        AudioManager.playRandom(AudioManager.skill['guard']);

    }

    initiateAttack() {

        Character.attacking = this;
        AudioManager.playRandom(AudioManager.skill['attack']);
        AudioManager.playRandom(AudioManager.characterClick);

        $('body > *').addClass('aim');

        GameManager.characters.forEach(char => {

            if (this.isAdjacent(char)) {

                if (char.data.mch_ply_id == this.data.mch_ply_id) char.div.addClass('aim-ally');
                else char.div.addClass('aim-enemy');

            }

        });

    }

    isAdjacent(char) {

        return (char.data.mch_positionx == this.data.mch_positionx + 1) && (char.data.mch_positiony == this.data.mch_positiony) ||
               (char.data.mch_positionx == this.data.mch_positionx - 1) && (char.data.mch_positiony == this.data.mch_positiony) ||
               (char.data.mch_positiony == this.data.mch_positiony + 1) && (char.data.mch_positionx == this.data.mch_positionx) ||
               (char.data.mch_positiony == this.data.mch_positiony - 1) && (char.data.mch_positionx == this.data.mch_positionx);

    }

    cancelAttack() {

        Character.attacking = undefined;
        AudioManager.playRandom(AudioManager.cancel);

        // Clears all aiming cursors.
        $('body > *').removeClass('aim');
        $('body > *').removeClass('aim-ally');
        $('body > *').removeClass('aim-enemy');

    }

    async getAttacked() {

        this.hurt();

        let skill = Character.attacking.skills.find(s => s.data.skl_name == 'Attack');
        this.data = await hurtMatchCharacter(this.data.mch_id, skill.data.skl_id, Character.attacking.data.chr_baseatk);

        skill.markAsUsed();
        Character.attacking.cancelAttack();

    }

    /** Resets the character's AP to 6 or 7, depending on the Boon. */
    async resetAP(activePlayer) {

        this.data = await resetMatchCharacterAP(this.data.mch_id, activePlayer);

    }

}
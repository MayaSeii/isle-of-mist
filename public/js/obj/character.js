class Character {

    static selected;
    static attacking;
    static isSkill;

    /**
     * Creates a new character.
     * @param {Object} data 
     */
    constructor(data) {

        this.data = data;

        this.sprite = loadImage(`../img/sprites/${this.data.chr_firstname.toLowerCase()}.png`);
        this.inactiveSprite = loadImage(`../img/sprites/${this.data.chr_firstname.toLowerCase()}_inactive.png`);

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

        if (this.skills.length < 4) skills.forEach(skill => this.skills.push(new Skill(skill)));
        else skills.forEach(skill => this.skills.find(s => s.data.skl_id == skill.skl_id).data = skill);

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

        image(this.data.mch_ap <= 0 ? this.inactiveSprite : this.sprite, x, y, Tile.size, Tile.size);
        this.div.position(x, y);

        noTint();

    }

    clicked() {

        if (this.isDead()) return;

        if (Character.attacking != undefined) {

            if (!Character.isSkill && this.isAdjacent(Character.attacking) && Character.attacking != this) this.getAttacked();

            if (Character.isSkill) {

                let c = Character.attacking;
                let s = c.skills.find(sk => sk.data.skl_name == `${c.data.chr_firstname} Skill`);

                let valid = getDistance(this.data.mch_positionx, c.data.mch_positionx, this.data.mch_positiony, c.data.mch_positiony) <= s.data.skl_range;
                if (valid) this.getAttacked();

            } 

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

        if (this.isDead()) return;

        AudioManager.playRandom(AudioManager.characterMove);

        const px = this.data.mch_positionx - 1;
        const py = 18 - this.data.mch_positiony;
        
        await this.reduceAP(Math.abs(px - tile.absolutePos.x) + Math.abs(py - tile.absolutePos.y));

        this.data.mch_positionx = tile.absolutePos.x + 1;
        this.data.mch_positiony = 18 - tile.absolutePos.y;
        this.data = await moveMatchCharacter(this.data.mch_id, tile.absolutePos.x + 1, 18 - tile.absolutePos.y);

        if (this.hasEgg()) GameManager.guardian.moveEgg(this.data.mch_positionx, this.data.mch_positiony);

        if (tile.type == "L" && this.data.chr_tile != "L") setTimeout(() => { this.hurt(); }, 180);
        if (!this.hasEgg() && tile.hasEgg()) await this.collectEgg();

        if (this.hasEgg() && tile.type == 'E')
            GameManager.match = await setWinner(GameManager.match.m_id, this.data.mch_ply_id);

        Character.selected = undefined;

    }

    hasEgg() {

        return this.data.mch_hasegg;

    }

    async collectEgg() {

        await this.reduceAP(6);
        this.data = await grabEgg(this.data.mch_id);

    }

    async dropEgg() {

        this.data = await releaseEgg(this.data.mch_id);

    }

    async reduceAP(value) {

        if (this.isDead()) return;
        if (this.data.mch_ap <= 0) return;

        this.data.mch_ap = Math.max(0, this.data.mch_ap - value);
        if (this.data.mch_ap <= 0) this.div.addClass('not-allowed');

        this.data = await reduceMatchCharacterAP(this.data.mch_id, value);

    }

    validateMovementTiles() {

        if (this.isDead()) return;

        GameManager.board.tileArray.forEach(tile => {

            // Highlights only if within valid distance, based on AP.
            let condition = tile.isWithinReach(this) && !tile.isOccupied() && !tile.isOccupiedByGuardian();

            if (this.data.chr_tile != 'W') condition &= tile.type != 'W';

            tile.highlight(condition);

        });

    }

    /** Shows the character being hurt; this DOES NOT affect the database (actual HP). */
    hurt() {

        if (this.isDead()) return;

        this.tintTimer = 1;
        AudioManager.playRandom(AudioManager.impact);
        AudioManager.damage[this.data.chr_firstname.toLowerCase()].stop();
        AudioManager.damage[this.data.chr_firstname.toLowerCase()].play();

    }

    /** Tints the image red when hurt. */
    updateHurtTint() {

        if (this.isDead()) return;

        if (this.tintTimer > 0) {
            
            // Little hop animation.
            this.div.position(this.div.position().x, this.div.position().y + 5);
            setTimeout(() => { this.div.position(this.div.position().x, this.div.position().y - 5); }, 50);

            tint(255, 255 * (1 - this.tintTimer), 255 * (1 - this.tintTimer));
            this.tintTimer -= 0.1;

        }

    }

    /** Avoids lerping when loading the page. */
    getFirstPosition() {

        if (this.isDead()) return;

        const px = this.data.mch_positionx - 1;
        const py = 18 - this.data.mch_positiony;

        // Gets the tile underneath the player for precise positioning.
        const tile = GameManager.board.tileArray.find(t => { 
            return t.absolutePos.x == px && t.absolutePos.y == py;
        });

        this.div.position(tile.div.position().x, tile.div.position().y);

    }

    /** Validates the attack before attacking. */
    attack(isSkill = false) {

        if (this.isDead()) return;

        let skill = isSkill ? this.skills[1] : this.skills.find(s => s.data.skl_name == 'Attack');

        // Checks if the attack can be used.
        if (skill.hasBeenUsed() || this.data.mch_ap < skill.data.skl_cost)
            return AudioManager.playRandom(AudioManager.notAllowed);

        if (Character.attacking != this) this.initiateAttack(isSkill);
        else this.cancelAttack();

    }

    async guard() {

        if (this.isDead()) return;

        let skill = this.skills.find(s => s.data.skl_name == 'Guard');

        if (skill.hasBeenUsed() || this.data.mch_ap <= skill.data.skl_cost)
            return AudioManager.playRandom(AudioManager.notAllowed);

        skill.markAsUsed();

        guardMatchCharacters(this.data.mch_id);
        await this.reduceAP(skill.data.skl_cost);

        AudioManager.playRandom(AudioManager.characterClick);
        AudioManager.playRandom(AudioManager.skill['guard']);

    }

    initiateAttack(isSkill = false) {

        if (this.isDead()) return;

        Character.attacking = this;

        if (!isSkill) AudioManager.playRandom(AudioManager.skill['attack']);
        else AudioManager.playRandom(AudioManager.skill['unique']);

        AudioManager.playRandom(AudioManager.characterClick);

        $('body > *').addClass('aim');

        if (isSkill) {

            let skill = this.skills.find(s => s.data.skl_name == `${this.data.chr_firstname} Skill`);
            Character.isSkill = true;

            GameManager.characters.filter(c => c.data.mch_id != this.data.mch_id).forEach(char => {
    
                if (getDistance(this.data.mch_positionx, char.data.mch_positionx, this.data.mch_positiony, char.data.mch_positiony) <= skill.data.skl_range) {
    
                    if (char.data.mch_ply_id == this.data.mch_ply_id) char.div.addClass('aim-ally');
                    else char.div.addClass('aim-enemy');
    
                }
    
            });

        } else {

            if (GameManager.guardian.isAdjacent(this) && !GameManager.guardian.isEgg())
                GameManager.guardian.div.addClass('aim-enemy');
    
            GameManager.characters.filter(c => c.data.mch_id != this.data.mch_id).forEach(char => {
    
                if (this.isAdjacent(char)) {
    
                    if (char.data.mch_ply_id == this.data.mch_ply_id) char.div.addClass('aim-ally');
                    else char.div.addClass('aim-enemy');
    
                }
    
            });

        }

    }

    isAdjacent(char) {

        if (this.isDead()) return;

        return (char.data.mch_positionx == this.data.mch_positionx + 1) && (char.data.mch_positiony == this.data.mch_positiony) ||
               (char.data.mch_positionx == this.data.mch_positionx - 1) && (char.data.mch_positiony == this.data.mch_positiony) ||
               (char.data.mch_positiony == this.data.mch_positiony + 1) && (char.data.mch_positionx == this.data.mch_positionx) ||
               (char.data.mch_positiony == this.data.mch_positiony - 1) && (char.data.mch_positionx == this.data.mch_positionx);

    }

    /**
     * Checks if the character is dead (HP equal to or below 0).
     * @returns {bool} - True if the character is dead, false otherwise.
     */
    isDead() {

        return this.data.mch_hp <= 0;

    }

    cancelAttack() {

        if (this.isDead()) return;

        Character.attacking = undefined;
        Character.isSkill = false;
        AudioManager.playRandom(AudioManager.cancel);

        // Clears all aiming cursors.
        $('body > *').removeClass('aim');
        $('body > *').removeClass('aim-ally');
        $('body > *').removeClass('aim-enemy');

    }

    async getAttacked() {

        if (this.isDead()) return;

        this.hurt();

        let skill = Character.isSkill ? Character.attacking.skills.find(s => s.data.skl_name == `${Character.attacking.data.chr_firstname} Skill`) : Character.attacking.skills.find(s => s.data.skl_name == 'Attack');
        this.data = await hurtMatchCharacter(this.data.mch_id, skill.data.skl_id, Character.attacking.data.chr_baseatk - (this.data.mch_isguarding ? 3 : 0));

        skill.markAsUsed();
        await Character.attacking.reduceAP(skill.data.skl_cost);
        Character.attacking.cancelAttack();

        if (this.isDead()) await this.kill();

    }

    async getAttackedByGuardian(closeRange) {

        if (this.isDead()) return;

        this.hurt();
        this.data = await hurtMatchCharacterByGuardian(this.data.mch_id, closeRange);

        if (this.isDead()) await this.kill();

    }

    /** Resets the character's AP to 6 or 7, depending on the Boon. */
    async resetAP(activePlayer) {

        if (this.isDead()) return;
        this.data = await resetMatchCharacterAP(this.data.mch_id, activePlayer);

    }

    async kill() {

        let tile;

        if (GameManager.match.m_playeroneid == this.data.mch_ply_id) {

            tile = GameManager.board.tileArray.find(t => t.absolutePos.x == 17 && t.absolutePos.y == 17);
            if (tile.isOccupied()) tile = GameManager.board.tileArray.find(t => t.absolutePos.x == 16 && t.absolutePos.y == 17);
            if (tile.isOccupied()) tile = GameManager.board.tileArray.find(t => t.absolutePos.x == 15 && t.absolutePos.y == 17);

        } else {

            tile = GameManager.board.tileArray.find(t => t.absolutePos.x == 0 && t.absolutePos.y == 0);
            if (tile.isOccupied()) tile = GameManager.board.tileArray.find(t => t.absolutePos.x == 1 && t.absolutePos.y == 0);
            if (tile.isOccupied()) tile = GameManager.board.tileArray.find(t => t.absolutePos.x == 2 && t.absolutePos.y == 0);

        }

        if (this.hasEgg()) this.data = await releaseEgg(this.data.mch_id);

        this.data.mch_positionx = tile.absolutePos.x + 1;
        this.data.mch_positiony = 18 - tile.absolutePos.y;

        this.data = await resetMatchCharacterOnDeath(this.data.mch_id, this.data.mch_positionx, this.data.mch_positiony);

    }

}
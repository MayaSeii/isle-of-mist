class Character {

    static selected;

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
        this.div.addClass('char');

        this.tintTimer = 0;

        this.getFirstPosition();

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

        if (this.data.mch_ap <= 0) {

            // Plays the "not allowed" sound effect.
            return AudioManager.playRandom(AudioManager.notAllowed);

        }

        // Plays the sound effect.
        AudioManager.playRandom(AudioManager.characterClick);

        // Unselects a character if already selected.
        if (Character.selected == this) {

            Character.selected = undefined;
            return GameManager.board.tileArray.forEach(tile => tile.highlight(false));

        }

        this.validateMovementTiles();

        Character.selected = this;

    }

    move(tile) {

        AudioManager.playRandom(AudioManager.characterMove);

        const px = this.data.mch_positionx - 1;
        const py = 18 - this.data.mch_positiony;
        
        this.reduceAP(Math.abs(px - tile.absolutePos.x) + Math.abs(py - tile.absolutePos.y));

        this.data.mch_positionx = tile.absolutePos.x + 1;
        this.data.mch_positiony = 18 - tile.absolutePos.y;

        if (tile.type == "L") setTimeout(() => { this.hurt(); }, 180);

        Character.selected = undefined;

    }

    reduceAP(value) {

        this.data.mch_ap -= value;

        if (this.data.mch_ap <= 0) {
            
            this.sprite = loadImage(`../img/sprites/${this.data.chr_firstname.toLowerCase()}_inactive.png`);
            this.div.addClass('not-allowed');

        }

    }

    validateMovementTiles() {

        GameManager.board.tileArray.forEach(tile => {

            // Highlights only if within valid distance, based on AP.
            let condition = tile.isWithinReach(this) && !tile.isOccupied();

            if (this.data.chr_firstname != 'Alessia') condition &= tile.type != 'W';

            tile.highlight(condition);

        });

    }

    hurt() {

        this.tintTimer = 1;
        AudioManager.playRandom(AudioManager.impact);
        AudioManager.damage[this.data.chr_firstname.toLowerCase()].play();

    }

    /** Tints the image red when hurt. */
    updateHurtTint() {

        if (this.tintTimer > 0) {
            
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

}
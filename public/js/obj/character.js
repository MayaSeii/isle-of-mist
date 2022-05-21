class Character {

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

    }

    /** Draws the character on the board. */
    draw() {

        // Tile positions start at 0, meaning subtracting 1 is necessary.
        let px = this.data.mch_positionx - 1;
        let py = 18 - this.data.mch_positiony;
    
        // Gets the tile underneath the player for precise positioning.
        const tile = GameManager.board.tileArray.find(tile => { 
            return tile.absolutePos.x == px && tile.absolutePos.y == py 
        });

        image(this.sprite, tile.div.position().x, tile.div.position().y, Tile.size, Tile.size);

    }

    clicked() {

        alert(`You've clicked on ${this.data.chr_firstname}!`)

    }

}
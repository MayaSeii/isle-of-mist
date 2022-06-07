class Tile {

    static size = 48;

    constructor(position, type, boardSize) {

        this.position = { x: position.x * Tile.size, y: position.y * Tile.size };
        this.absolutePos = { x: position.x, y: position.y };
        this.type = type;
        this.boardSize = boardSize;

        this.selected = false;
        this.highlighted = false;

        this.createTileDiv();
        
    }

    createTileDiv() {

        const cx = this.position.x + (window.innerWidth / 2 - Tile.size * (this.boardSize / 2));   
        const cy = this.position.y + (window.innerHeight / 2 - Tile.size * (this.boardSize / 2)); 

        const random = this.type == 'G' ? Math.floor(Math.random() * 4) : '';

        // Creates a div with the appropriate position.
        this.div = createDiv();
        this.div.position(cx, cy);

        // Sets the CSS style for each tile.
        this.div.style('width', `${Tile.size}px`);
        this.div.style('height', `${Tile.size}px`);
        this.div.style('background-image', `url(../img/tiles/${this.type}${random}.png)`); 
        this.div.style('background-size', `cover`); 
        this.div.style('outline', `2px solid #00000055`); 
        this.div.style('outline-offset', `-1.5px`);
        this.div.style('z-index', this.type == 'G' ? '-2' : '-1');
        
    }

    draw() {

        const cx = this.position.x + (window.innerWidth / 2 - Tile.size * (this.boardSize / 2));
        const cy = this.position.y + (window.innerHeight / 2 - Tile.size * (this.boardSize / 2));

        this.div.position(cx, cy);
    }

    async clicked() {

        if (Character.attacking != undefined)
            return AudioManager.playRandom(AudioManager.notAllowed);

        if (Character.selected != undefined) {

            if (!this.highlighted) {
                
                Character.selected = undefined;
                AudioManager.playRandom(AudioManager.cancel);

            } else await Character.selected.move(this);
            
            GameManager.board.tileArray.forEach(tile => tile.highlight(false));

        } else {
            
            this.select(!this.selected);
            AudioManager.playRandom(AudioManager.tileSelect);
            
        }

    }

    /**
     * Toggles tile selection (used to show tile details).
     * @param {boolean} selected - Whether to select the tile.
     */
    select(selected) {

        this.highlighted = false;
        this.selected = selected;

        if (selected) this.div.style('filter', 'sepia(100%) saturate(300%)');
        else this.div.style('filter', 'sepia(0%) saturate(100%)');

    }

    /**
     * Toggles tile highlighting (used to show ranges).
     * @param {boolean} highlighted - Whether to highlight the tile.
     */
    highlight(highlighted) {

        this.selected = false;
        this.highlighted = highlighted;

        if (highlighted) this.div.style('filter', 'sepia(100%) hue-rotate(190deg) saturate(300%)');
        else this.div.style('filter', 'sepia(0%) hue-rotate(0deg) saturate(100%)');

    }

    /** 
     * Checks if the tile is occupied by a character.
     * @returns {boolean} - True if the the tile is occupied, false otherwise.
     */
    isOccupied() {

        let occupied = false;

        GameManager.characters.forEach(char => {

            const cx = char.data.mch_positionx - 1;
            const cy = 18 - char.data.mch_positiony;

            if ((cx == this.absolutePos.x) && (cy == this.absolutePos.y) && (!char.isDead())) occupied = true;

        });

        return occupied;

    }

    /**
     * Checks if the tile is occupied by the Guardian.
     * Since the Guardian occupies a 3x3 square of tiles, adjacent tiles are checked.
     * @returns {boolean} - True if the Guardian occupies the tile, false otherwise.
     */
    isOccupiedByGuardian() {

        if (GameManager.guardian.isEgg()) return false;

        const gx = GameManager.guardian.data.grd_positionx - 1;
        const gy = 18 - GameManager.guardian.data.grd_positiony;

        return (gx == this.absolutePos.x) && (gy == this.absolutePos.y) ||
               (gx == this.absolutePos.x + 1) && (gy == this.absolutePos.y) ||
               (gx == this.absolutePos.x - 1) && (gy == this.absolutePos.y) ||
               (gx == this.absolutePos.x) && (gy == this.absolutePos.y + 1) ||
               (gx == this.absolutePos.x + 1) && (gy == this.absolutePos.y + 1) ||
               (gx == this.absolutePos.x - 1) && (gy == this.absolutePos.y + 1) ||
               (gx == this.absolutePos.x) && (gy == this.absolutePos.y - 1) ||
               (gx == this.absolutePos.x + 1) && (gy == this.absolutePos.y - 1) ||
               (gx == this.absolutePos.x - 1) && (gy == this.absolutePos.y - 1);

    }

    hasEgg() {

        const gx = GameManager.guardian.data.grd_positionx - 1;
        const gy = 18 - GameManager.guardian.data.grd_positiony;

        if (GameManager.guardian.isEgg()) return (gx == this.absolutePos.x) && (gy == this.absolutePos.y);
        else return false;

    }

    /**
     * Checks whether any character occupies a potential tile for the Guardian.
     * @returns {boolean} - True if any character occupies a potential Guardian character, false otherwise.
     */
    isOccupiedFromGuardian() {

        let occupied = false;

        GameManager.characters.forEach(c => {

            const gx = GameManager.guardian.data.grd_positionx - 1;
            const gy = 18 - GameManager.guardian.data.grd_positiony;

            if (getDistance(c.data.mch_positionx, gx, c.data.mch_positiony, gy) <= 1.25)
                occupied = true;

        })

        return occupied;

    }

    /**
     * Returns whether the tile is within a character's AP reach.
     * @param {Character} char - The character object to compare the tile to.
     * @returns {boolean} - True if the character is within the character's AP reach, false otherwise.
     */
    isWithinReach(char) {

        const ap = char.data.mch_ap;
        const px = char.data.mch_positionx - 1;
        const py = 18 - char.data.mch_positiony;

        return (Math.abs(px - this.absolutePos.x) + Math.abs(py - this.absolutePos.y)) <= ap;

    } 

}
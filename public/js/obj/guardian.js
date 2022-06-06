class Guardian {

    /**
     * Creates a new Guardian object.
     * @param {Object} data - The data that comes from the database.
     */
    constructor(data) {

        this.data = data;
        this.sprite = loadImage('../img/sprites/guardian.png');

        this.div = createDiv();
        this.div.style('width', '48px');
        this.div.style('height', '48px');

        this.getFirstPosition();

    }

    /** Draws the Guardian. */
    draw() {

        // Tile positions start at 0, meaning subtracting 1 is necessary.
        const px = this.data.grd_positionx - 1;
        const py = 18 - this.data.grd_positiony;
    
        // Gets the tile underneath the player for precise positioning.
        const tile = GameManager.board.tileArray.find(t => { 
            return t.absolutePos.x == px && t.absolutePos.y == py;
        });

        // Lerps the values for smooth animation.
        const x = lerp(this.div.position().x, tile.div.position().x - Tile.size, 0.3);
        const y = lerp(this.div.position().y, tile.div.position().y - Tile.size, 0.3);

        //this.updateHurtTint();

        image(this.sprite, x, y, Tile.size * 3, Tile.size * 3);
        this.div.position(x, y);

        noTint();

    }

    /** Avoids lerping when loading the page. */
    getFirstPosition() {

        const px = this.data.grd_positionx - 1;
        const py = 18 - this.data.grd_positiony;

        // Gets the tile underneath the player for precise positioning.
        const tile = GameManager.board.tileArray.find(t => { 
            return t.absolutePos.x == px && t.absolutePos.y == py;
        });

        this.div.position(tile.div.position().x - Tile.size, tile.div.position().y - Tile.size);

    }

    async followChecklist() {

        this.moveInRandomDirection();

        setTimeout(async () => { 

            await this.attackLongRange();
            await this.attackCloseRange();
        
        }, 200);

    }

    /** Moves the Guardian one tile in a random direction. */
    moveInRandomDirection() {

        let tile = undefined;

        let ax = 0;
        let ay = 0;

        // A do-while loop checks whether a tile in the selected direction exists.
        do {

            const direction = getRandomInt(1, 4);

            const px = this.data.grd_positionx - 1;
            const py = 18 - this.data.grd_positiony;

            ax = 0;
            ay = 0;

            // Randomly decides the direction.
            switch (direction) {

                case 1: ax = 1; break;
                case 2: ax = -1; break;
                case 3: ay = 1; break;
                case 4: ay = -1; break;

            }

            tile = GameManager.board.tileArray.find(t => { 
                return t.absolutePos.x == px + ax && t.absolutePos.y == py + ay;
            });

        } while (!tile)

        this.data.grd_positionx += ax;
        this.data.grd_positiony += ay;

    }

    /** Attacks characters within a long range. */
    async attackLongRange() {

        const px = this.data.grd_positionx;
        const py = this.data.grd_positiony;

        const chars = GameManager.characters.filter(c => getDistance(px, c.data.mch_positionx, py, c.data.mch_positiony) <= 5.5);

        if (!chars || chars.length <= 0) return;

        // Little hop animation.
        this.div.position(this.div.position().x, this.div.position().y + 10);
        setTimeout(() => { this.div.position(this.div.position().x, this.div.position().y - 10); }, 100);

        chars.forEach(async (c) => { await c.getAttackedByGuardian(false); });

    }

    /** Attacks characters within a close range. */
    async attackCloseRange() {

        const px = this.data.grd_positionx;
        const py = this.data.grd_positiony;

        const chars = GameManager.characters.filter(c => getDistance(px, c.data.mch_positionx, py, c.data.mch_positiony) <= 2.5);

        if (!chars || chars.length <= 0) return;

        // Little hop animation.
        this.div.position(this.div.position().x, this.div.position().y + 10);
        setTimeout(() => { this.div.position(this.div.position().x, this.div.position().y - 10); }, 100);

        chars.forEach(async (c) => { await c.getAttackedByGuardian(true); });

    }

}
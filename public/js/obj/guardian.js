class Guardian {

    constructor(data) {

        this.data = data;
        this.sprite = loadImage('../img/sprites/guardian.png');

    }

    draw() {

        // Tile positions start at 0, meaning subtracting 1 is necessary.
        let px = this.data.grd_positionx - 1;
        let py = 18 - this.data.grd_positiony;
    
        // Gets the tile underneath the player for precise positioning.
        const tile = GameManager.board.tileArray.find(t => { 
            return t.absolutePos.x == px && t.absolutePos.y == py 
        });

        // Repurposes the position variables for the final positions.
        px = tile.div.position().x - Tile.size;
        py = tile.div.position().y - Tile.size;

        image(this.sprite, px, py, Tile.size * 3, Tile.size * 3);

    }

}
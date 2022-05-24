class Board {

    async init(size, matchID) {

        this.size = size;
        this.getArena(matchID).then((arena) => {

            this.arena = arena;
            this.tileArray = this.readBoard();

        });

    }

    static async create(size, matchID) {

        const obj = new Board();
        await obj.init(size, matchID);
        return obj;

    }

    async getArena(matchID) {

        let arena = await getMatchArena(matchID);
        return Promise.resolve(arena);

    }

    readBoard() {
        
        let tempArena = this.arena.replace(/(?:\r\n|\r|\n)/g, '');
        let tileArray = new Array();

        // Creates the board from the arena string.
        for (let y = 0; y < this.size; y++) {

            for (let x = 0; x < this.size; x++) {

                let isGuardianArea = (x < this.size / 2 + 3 && x >= this.size / 2 - 3) && (y < this.size / 2 + 3 && y >= this.size / 2 - 3)
                let type = isGuardianArea ? 'X' : tempArena.charAt(0);
                tileArray.push(new Tile({ x: x, y: y }, type, this.size));
                tempArena = tempArena.substring(1);

            }

        }

        return tileArray;

    }

    draw() {

        this.tileArray.forEach(tile => {

            tile.draw();

        });

    }

    clicked() {

        if (this.tileArray == undefined) return;
        
        this.tileArray.forEach(tile => {

            if (isMouseOver(tile.position.x, tile.position.y)) {

                this.tileArray.forEach(t => { if (t != tile) t.select(false); });
                tile.clicked();

            }

        });

    }

}
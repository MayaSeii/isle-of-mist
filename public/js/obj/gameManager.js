class GameManager {

    static board;
    static boardSize = 18;

    /**
     * Prepares and loads the necessary elements for the game to work.
     * @param {number} matchID - The database ID of the match to initialise.
     */
    static async setup(matchID) {

        // Creates the match and board.
        this.match = await getMatch(matchID);
        this.board = await Board.create(this.boardSize, matchID);

        // Retrieves the Guardian.
        let guardian = await getMatchGuardian(matchID);
        this.guardian = new Guardian(guardian);

        // Creates an empty array to store all match characters.
        this.characters = [];

    }

    /** Checks if the board is ready to be drawn. */
    static isReady() {

        return (this.board != undefined) &&
               (this.board.tileArray != undefined) &&
               (this.guardian != undefined);

    }

    /**
     * Loads all the characters from a specific player and adds them to the character list.
     * @param {number} playerID - The database ID of the player whose characters will be returned.
     */
    static async loadPlayerCharacters(playerID) {

        const chars = await getPlayerCharacters(playerID);
        chars.forEach(char => { this.characters.push(new Character(char)) });

    }

    /** Draws all the match elements. */
    static async draw() {

        this.board.draw();
        this.guardian.draw();
        this.characters.forEach(char => { char.draw() });

    }

    static clickHandler(mouseX, mouseY) {

        let charClicked = false;

        this.characters.forEach(char => {

            let centerWidth = window.innerWidth / 2 - Tile.size * (this.boardSize / 2);   
            let centerHeight = window.innerHeight / 2 - Tile.size * (this.boardSize / 2);

            let posX = centerWidth + (char.data.mch_positionx - 1) * Tile.size;
            let posY = centerHeight + (this.boardSize - char.data.mch_positiony) * Tile.size;

            // Compensates for the centred board.
            let xCheck = mouseX >= posX && mouseX < posX + Tile.size;
            let yCheck = mouseY >= posY && mouseY < posY + Tile.size;

            if (xCheck && yCheck) {

                char.clicked();
                return charClicked = true;

            }

        });

        if (charClicked) return;

        this.board.clicked(mouseX, mouseY);

    }

}
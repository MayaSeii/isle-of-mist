class GameManager {

    static player;
    static board;
    static boardSize = 18;

    /**
     * Prepares and loads the necessary elements for the game to work.
     * @param {number} matchID - The database ID of the match to initialise.
     */
    static async setup(matchID, playerID) {

        // Creates the match and board.
        this.match = await getMatch(matchID);
        this.board = await Board.create(this.boardSize, matchID);

        // Loads the player.
        this.player = await getPlayer(playerID);

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
               (this.guardian != undefined) &&
               (this.characters.length >= 6);

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

    /** Handles mouse click events. */
    static clickHandler() {
        
        let char = this.characters.find(c => 
            isMouseOver((c.data.mch_positionx - 1) * Tile.size, (GameManager.boardSize - c.data.mch_positiony) * Tile.size)
        );
        
        if (char != undefined) return char.clicked();

        this.board.clicked();

    }

    /** Handles window resizing. */
    static windowResized() {

        // Prevents character lerping on windows resize.
        this.characters.forEach(char => char.getFirstPosition());

    }

}
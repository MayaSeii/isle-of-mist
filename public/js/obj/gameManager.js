class GameManager {

    static player;
    static board;
    static boardSize = 18;

    static playerID;

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

        for (const char of chars) {

            let newChar = new Character(char);
            await newChar.loadSkills();
            this.characters.push(newChar);

        }

    }

    /** Draws all the match elements. */
    static async draw() {

        GameManager.board.draw();
        GameManager.guardian.draw();
        GameManager.characters.forEach(char => { char.draw() });

    }

    /** Handles mouse click events. */
    static clickHandler() {

        if (!GameManager.isPlayersTurn()) return AudioManager.playRandom(AudioManager.notAllowed);
        
        // Clicking characters.
        let char = GameManager.characters.find(c => isMouseOver((c.data.mch_positionx - 1) * Tile.size, (GameManager.boardSize - c.data.mch_positiony) * Tile.size));
        if (char) return char.clicked();

        // Clicking the Guardian.
        let overGuardian = isMouseOver((GameManager.guardian.data.grd_positionx - 2) * Tile.size, (GameManager.boardSize - GameManager.guardian.data.grd_positiony - 1) * Tile.size, Tile.size * 3);
        if (GameManager.guardian.isEgg()) overGuardian = isMouseOver((GameManager.guardian.data.grd_positionx - 1) * Tile.size, (GameManager.boardSize - GameManager.guardian.data.grd_positiony) * Tile.size);
        if (overGuardian && !(GameManager.guardian.isEgg() && Character.selected)) return GameManager.guardian.clicked();

        // Clicking the board.
        GameManager.board.clicked();

    }

    /** Handles window resizing. */
    static windowResized() {

        if (GameManager.characters == undefined || GameManager.characters.length < 6) return;

        // Prevents character lerping on windows resize.
        GameManager.characters.forEach(char => char.getFirstPosition());

    }

    static isPlayersTurn() {

        return GameManager.match.m_activeplayer == GameManager.player.ply_id;

    }

    /** Ends the turn. */
    static async endTurn() {

        if (!GameManager.isPlayersTurn()) return;

        AudioManager.playRandom(AudioManager.endTurn);

        for (const char of GameManager.characters.filter(c => c.data.mch_ply_id == GameManager.player.ply_id)) {

            await char.skills.forEach(s => s.markAsUnused());

        }

        // If both players have ended their turn, the Guardian moves.
        if (GameManager.match.m_activeplayer == GameManager.match.m_playertwoid)
            await GameManager.guardian.followChecklist();

        GameManager.match = await newTurn(GameManager.match.m_id);
        GameManager.characters.forEach(char => char.resetAP(GameManager.match.m_activeplayer));

    }

    static async checkLoss() {

        GameManager.match = await getMatch(GameManager.match.m_id);
        return GameManager.match.m_winnerid != null && GameManager.match.m_winnerid != GameManager.player.ply_id;

    }

    static async checkWin() {

        GameManager.match = await getMatch(GameManager.match.m_id);
        return GameManager.match.m_winnerid == GameManager.player.ply_id;

    }

    static async reloadPlayerCharacters(playerID) {

        const chars = await getPlayerCharacters(playerID);

        for (const char of chars) {

            let oldChar = GameManager.characters.find(c => c.data.mch_id == char.mch_id);
            if (playerID == GameManager.playerID && oldChar.data.mch_hp > char.mch_hp) oldChar.hurt();

            oldChar.data = char;
            await oldChar.loadSkills();

        }

    }

    static async refresh() {

        // Updates both players' characters.
        await GameManager.reloadPlayerCharacters(GameManager.match.m_playeroneid);
        await GameManager.reloadPlayerCharacters(GameManager.match.m_playertwoid);

        if (await GameManager.checkLoss()) {
            
            deleteMatch(GameManager.match);
            alert('You lose!');
            window.location.href = "/dashboard";

        }

        if (await GameManager.checkWin()) {

            alert('You win!');
            window.location.href = "/dashboard";

        }

        // Updates the active player.
        const activePlayer = await getMatchActivePlayer(GameManager.match.m_id);
        GameManager.match.m_activeplayer = activePlayer.m_activeplayer;

        // Updates the Guardian.
        const guardian = await getMatchGuardian(GameManager.match.m_id);
        GameManager.guardian.data = guardian;

    }

    static async cheats() {

        let cheatCode = -1;

        switch (keyCode) {

            case 49: cheatCode = 1; break;
            case 50: cheatCode = 2; break;
            case 51: cheatCode = 3; break;

        }

        if (cheatCode == -1) return;

        await cheat(

            cheatCode,
            GameManager.characters[0].data.mch_id,
            GameManager.characters[1].data.mch_id,
            GameManager.characters[2].data.mch_id,
            GameManager.characters[3].data.mch_id,
            GameManager.characters[4].data.mch_id,
            GameManager.characters[5].data.mch_id,
            GameManager.guardian.data.grd_id

        );

    }

    static async forfeit() {

        const winnerId = GameManager.match.m_playeroneid == GameManager.player.ply_id ? GameManager.match.m_playertwoid : GameManager.match.m_playeroneid;
        await setWinner(GameManager.match.m_id, winnerId);

    }

}
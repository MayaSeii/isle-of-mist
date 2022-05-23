class UIManager {

    static leftPaneWidth = 400;
    static rightPaneWidth = 400;

    static paneBG;

    static setup() {

        this.paneBG = loadImage('../img/pane-bg.png');

    }

    static draw() {

        const board = GameManager.board;

        const tileSize = Tile.size;
        const halfSize = tileSize / 2;

        fill("WHITE");

        // Left pane.
        let centerX = window.innerWidth / 2 - board.size * halfSize - this.leftPaneWidth - tileSize;
        let centerY = window.innerHeight / 2 - board.size * halfSize;
        image(this.paneBG, centerX, centerY);

        // Right pane.
        centerX = window.innerWidth / 2 + board.size * halfSize + tileSize;
        image(this.paneBG, centerX, centerY);

    }

}
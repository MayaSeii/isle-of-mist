class UIManager {

    static leftPaneWidth = 400;
    static rightPaneWidth = 400;

    static paneBG;

    static setup() {

        this.paneBG = loadImage('../img/pane-bg.png');

    }

    static draw() {

        const board = GameManager.board;

        fill("WHITE");

        // Left pane.
        let centerX = window.innerWidth / 2 - board.size * 16 - this.leftPaneWidth - 32;
        let centerY = window.innerHeight / 2 - board.size * 16;
        image(this.paneBG, centerX, centerY);

        // Right pane.
        centerX = window.innerWidth / 2 + board.size * 16 + 32;
        image(this.paneBG, centerX, centerY);

    }

}
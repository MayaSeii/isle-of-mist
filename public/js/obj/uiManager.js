class UIManager {

    static leftPaneWidth = 400;
    static rightPaneWidth = 400;

    static paneBG;

    static font;

    static preload() {

        this.font = loadFont('../fonts/font.ttf');

    }

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

        this.drawCharacterInfo();

    }

    static drawCharacterInfo() {

        const tileSize = Tile.size;
        const halfSize = tileSize / 2;

        const px = (window.innerWidth / 2 - GameManager.board.size * halfSize - this.leftPaneWidth - tileSize) + 32;
        const py = (window.innerHeight / 2 - GameManager.board.size * halfSize) + 48;

        textFont(this.font);
        textSize(20);

        let i = 0;

        GameManager.characters.forEach(char => {

            let spacing = 80;
            let maxSize = 260;

            image(char.sprite, px, py - 12 + spacing * i, tileSize, tileSize);
            this.shadedText(char.data.chr_firstname, px + 64, py + spacing * i);
            noStroke();

            this.drawHealthBar(char, px + 64, py + 20 + spacing * i);
            this.drawAPBar(char, px + 64, py + 30 + spacing * i);

            fill('#3d6dcc');
            rect(px + 64, py + 30 + spacing * i, 260 * (char.data.mch_ap / 6), 10)
            fill('#ffffff');
            i++;

        })

    }

    static drawHealthBar(char, x, y) {

        fill('rgba(255, 0, 0, 0.15)');
        rect(x, y, 260, 10);
        fill('#cc3d55');
        rect(x, y, 260 * (char.data.mch_hp / char.data.chr_basehp), 10);

    }

    static drawAPBar(char, x, y) {

        fill('rgba(0, 0, 255, 0.15)');
        rect(x, y, 260, 10);
        fill('#3d6dcc');
        rect(x, y, 260 * (char.data.mch_ap / 6), 10)

    }

    static shadedText(txt, x, y) {

        fill('rgba(0, 0, 0, 0.7)')
        text(txt, x, y + 4);

        fill('#ffffff')
        text(txt, x, y);

    }

}
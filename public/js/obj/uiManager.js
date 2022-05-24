class UIManager {

    static leftPaneWidth = 400;
    static rightPaneWidth = 400;

    static paneBG;

    static font;

    static attackSprite;
    static attackSpriteInactive;

    static guardSprite;
    static guardSpriteInactive;

    static buttonNextTurn;

    static preload() {

        this.font = loadFont('../fonts/font.ttf');

    }

    static setup() {

        this.paneBG = loadImage('../img/pane-bg.png');
        this.attackSprite = loadImage('../img/skills/attack.png');
        this.guardSprite = loadImage('../img/skills/guard.png');
        this.attackSpriteInactive = loadImage('../img/skills/attack_inactive.png');
        this.guardSpriteInactive = loadImage('../img/skills/guard_inactive.png');
        this.buttonNextTurn = loadImage('../img/btn-turn.png');
        this.createCharacterInfoDivs();

    }

    /** Creates the divs needed for the character information UI. */
    static createCharacterInfoDivs() {

        const halfSize = Tile.size / 2;

        const px = (window.innerWidth / 2 - GameManager.board.size * halfSize - this.leftPaneWidth - Tile.size) + 32;
        const py = (window.innerHeight / 2 - GameManager.board.size * halfSize) + 48;

        const spacing = 144;

        for (let i = 0; i < GameManager.characters.length; i++) {

            if (GameManager.characters[i].data.mch_ply_id != GameManager.player.ply_id)
                return;

            let id = GameManager.characters[i].data.mch_id;

            this.createSkillDiv(px, py + 48 + spacing * i, () => { this.attackClick(id) });
            this.createSkillDiv(px + 48, py + 48 + spacing * i, () => { this.guardClick(id)});

        }

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

        const spacing = 144;

        textFont(this.font);
        textSize(20);

        let i = 0;

        GameManager.characters.forEach(char => {

            if (char.data.mch_ply_id != GameManager.player.ply_id)
                return this.drawSmallHealthBar(char);

            // Draws the character sprite and name.
            image(char.sprite, px, py - 12 + spacing * i, tileSize, tileSize);
            this.shadedText(char.data.chr_firstname, px + 64, py + spacing * i);

            // Draws the health and AP bars.
            this.drawHealthBar(char, px + 64, py + 20 + spacing * i);
            this.drawAPBar(char, px + 64, py + 30 + spacing * i);

            // Draws the skill icons.
            image(Character.haveAttacked.includes(char) ? this.attackSpriteInactive : this.attackSprite, px, py + 48 + spacing * i, Tile.size, Tile.size);
            image(char.data.mch_isguarding ? this.guardSpriteInactive : this.guardSprite, px + 48, py + 48 + spacing * i, Tile.size, Tile.size);

            i++;

        });

    }

    static createSkillDiv(x, y, event) {

        const div = createDiv();
        div.position(x, y);
        div.style('width', `${Tile.size}px`);
        div.style('height', `${Tile.size}px`);
        div.style('backdrop-filter', 'grayscale(100%)')
        div.addClass('skill');
        div.mousePressed(event);
        return div;

    }

    static attackClick(id) {

        GameManager.characters.find(char => char.data.mch_id == id).attack();

    }

    static guardClick(id) {

        GameManager.characters.find(char => char.data.mch_id == id).guard();

    }

    /**
     * Draws a small health bar above characters' heads for enemy characters.
     * @param {Character} char - The character to draw the health of.
     */
    static drawSmallHealthBar(char) {

        noStroke();

        fill(Colours.healthBarEmpty);
        rect(char.div.position().x, char.div.position().y - 12, Tile.size, 6);
        fill(Colours.healthBar);
        rect(char.div.position().x, char.div.position().y - 12, Tile.size * (char.data.mch_hp / char.data.chr_basehp), 6);

        fill(Colours.white);
        
    }

    /**
     * Draws a health bar.
     * @param {Character} char - The character to draw the health of.
     * @param {number} x - The x position of the health bar.
     * @param {number} y - The y position of the health bar.
     */
    static drawHealthBar(char, x, y) {

        noStroke();

        fill(Colours.healthBarEmpty);
        rect(x, y, 260, 10);
        fill(Colours.healthBar);
        rect(x, y, 260 * (char.data.mch_hp / char.data.chr_basehp), 10);

        fill(Colours.white);

    }

    /**
     * 
     * @param {Character} char - The character to draw the AP of.
     * @param {number} x - The x position of the AP bar.
     * @param {number} y - The y position of the AP bar.
     */
    static drawAPBar(char, x, y) {

        noStroke();

        fill(Colours.apBarEmpty);
        rect(x, y, 260, 10);
        fill(Colours.apBar);
        rect(x, y, 260 * (char.data.mch_ap / 6), 10);

        fill(Colours.white);

    }

    /**
     * Draws text with shadow underneath it.
     * @param {string} txt - The text to draw.
     * @param {number} x - The x position of the text.
     * @param {number} y - The y position of the text.
     */
    static shadedText(txt, x, y) {

        fill(Colours.textShadow);
        text(txt, x, y + 4);

        fill(Colours.white);
        text(txt, x, y);

    }

}
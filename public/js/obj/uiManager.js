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
    static buttonForfeit;

    static nextTurnDiv;
    static forfeitDiv;
    static attackDivs = [];
    static guardDivs = [];
    static uniqueDivs = [];

    static preload() {

        this.font = loadFont('../fonts/font.ttf');

    }

    static setup() {

        this.paneBG = loadImage('../img/pane-bg-new.png');
        this.attackSprite = loadImage('../img/skills/attack.png');
        this.guardSprite = loadImage('../img/skills/guard.png');
        this.attackSpriteInactive = loadImage('../img/skills/attack_inactive.png');
        this.guardSpriteInactive = loadImage('../img/skills/guard_inactive.png');
        this.buttonNextTurn = loadImage('../img/btn-turn.png');
        this.buttonForfeit = loadImage('../img/btn-forfeit.png');

        this.skills = new Object();
        this.skills.seii = loadImage('../img/skills/seii_skill.png');
        this.skills.alessia = loadImage('../img/skills/alessia_skill.png');
        this.skills.scarlet = loadImage('../img/skills/scarlet_skill.png');
        this.skills.shinsuke = loadImage('../img/skills/shinsuke_skill.png');
        this.skills.zodan = loadImage('../img/skills/zodan_skill.png');
        this.skills.gobbo = loadImage('../img/skills/gobbo_skill.png');
        
        this.inactiveSkills = new Object();
        this.inactiveSkills.seii = loadImage('../img/skills/seii_skill_inactive.png');
        this.inactiveSkills.alessia = loadImage('../img/skills/alessia_skill_inactive.png');
        this.inactiveSkills.scarlet = loadImage('../img/skills/scarlet_skill_inactive.png');
        this.inactiveSkills.shinsuke = loadImage('../img/skills/shinsuke_skill_inactive.png');
        this.inactiveSkills.zodan = loadImage('../img/skills/zodan_skill_inactive.png');
        this.inactiveSkills.gobbo = loadImage('../img/skills/gobbo_skill_inactive.png');

        this.createCharacterInfoDivs();
        this.createNextTurnDiv();
        this.createForfeitDiv();

    }

    static createNextTurnDiv() {

        this.nextTurnDiv = createDiv();
        this.nextTurnDiv.style('width', '400px');
        this.nextTurnDiv.style('height', '64px');
        this.nextTurnDiv.mousePressed(GameManager.endTurn);
        this.nextTurnDiv.addClass('end-turn');

    }

    static createForfeitDiv() {

        this.forfeitDiv = createDiv();
        this.forfeitDiv.style('width', '400px');
        this.forfeitDiv.style('height', '64px');
        this.forfeitDiv.mousePressed(GameManager.forfeit);
        this.forfeitDiv.addClass('not-allowed');

    }

    /** Creates the divs needed for the character information UI. */
    static createCharacterInfoDivs() {

        const halfSize = Tile.size / 2;

        const px = (window.innerWidth / 2 - GameManager.board.size * halfSize - this.leftPaneWidth - Tile.size) + 32;
        const py = (window.innerHeight / 2 - GameManager.board.size * halfSize) + 48;

        const spacing = 144;

        let i = 0;

        GameManager.characters.forEach(char => {

            if (char.data.mch_ply_id == GameManager.player.ply_id) {
                
                let id = char.data.mch_id;

                this.attackDivs[char.data.chr_name] = this.createSkillDiv(px, py + 48 + spacing * i, () => { this.attackClick(id) });
                this.guardDivs[char.data.chr_name] = this.createSkillDiv(px + 48, py + 48 + spacing * i, () => { this.guardClick(id)});
                this.uniqueDivs[char.data.chr_name] = this.createSkillDiv(px + 96, py + 48 + spacing * i, () => { this.uniqueClick(id)});

                i++;

            }

        })

    }

    static draw() {

        const board = GameManager.board;

        const tileSize = Tile.size;
        const halfSize = tileSize / 2;

        fill(Colours.white);

        // Left pane.
        let centerX = window.innerWidth / 2 - board.size * halfSize - this.leftPaneWidth - tileSize;
        let centerY = window.innerHeight / 2 - board.size * halfSize;
        image(this.paneBG, centerX, centerY);

        // Next turn button.
        image(this.buttonNextTurn, centerX, this.paneBG.height + centerY + 16)
        image(this.buttonForfeit, centerX, this.paneBG.height + centerY + 96)

        // Corrects the turn button div's position.
        if (this.nextTurnDiv.position().y !=  this.paneBG.height + centerY + 16 || this.nextTurnDiv.position().x != centerX)
            this.nextTurnDiv.position(centerX, this.paneBG.height + centerY + 16);

        // Corrects the forfeit button div's position.
        if (this.forfeitDiv.position().y !=  this.paneBG.height + centerY + 96 || this.forfeitDiv.position().x != centerX)
            this.forfeitDiv.position(centerX, this.paneBG.height + centerY + 96);

        this.drawCharacterInfo();
        this.drawGuardianHealthBar();

    }

    static drawGuardianHealthBar() {

        const guardian = GameManager.guardian;
        if (guardian.isEgg()) return;

        strokeWeight(6);
        stroke(Colours.stroke);

        fill(Colours.healthBarEmpty);
        rect(guardian.div.position().x + 8, guardian.div.position().y - 12, Tile.size * 3 - 16, 6);

        noStroke();

        fill(Colours.healthBar);
        rect(guardian.div.position().x + 8, guardian.div.position().y - 12, (Tile.size * 3 - 16) * (guardian.data.grd_hp / 50), 6);

        fill(Colours.white);

    }

    /** Draws info regarding all characters. */
    static drawCharacterInfo() {

        const tileSize = Tile.size;
        const halfSize = tileSize / 2;

        const px = (window.innerWidth / 2 - GameManager.board.size * halfSize - this.leftPaneWidth - tileSize) + 32;
        const py = (window.innerHeight / 2 - GameManager.board.size * halfSize) + 48;

        const spacing = 144;

        textFont(this.font);
        textSize(20);

        let i = 0;

        GameManager.characters.forEach(async (char) => {

            // Enemy characters only get a small health bar.
            if (char.data.mch_ply_id != GameManager.player.ply_id)
                return this.drawSmallHealthBar(char);

            // Draws the character sprite and name.
            image(char.sprite, px, py - 12 + spacing * i, tileSize, tileSize);
            this.shadedText(char.data.chr_firstname, px + 64, py + spacing * i);

            // Draws the health and AP bars.
            this.drawHealthBar(char, px + 64, py + 20 + spacing * i);
            this.drawAPBar(char, px + 64, py + 30 + spacing * i);

            if (char.skills.length >= 4) {

                const skillAttack = char.skills.find(s => s.data.skl_name == 'Attack');
                const skillGuard = char.skills.find(s => s.data.skl_name == 'Guard');
                const uniqueSkill = char.skills.find(s => s.data.skl_name == `${char.data.chr_firstname} Skill`);

                // Draws the skill icons.
                image(skillAttack.hasBeenUsed() || char.data.mch_ap < skillAttack.data.skl_cost ? this.attackSpriteInactive : this.attackSprite, px, py + 48 + spacing * i, Tile.size, Tile.size);
                image(skillGuard.hasBeenUsed() || char.data.mch_ap < skillGuard.data.skl_cost ? this.guardSpriteInactive : this.guardSprite, px + 48, py + 48 + spacing * i, Tile.size, Tile.size);
                image(uniqueSkill.hasBeenUsed() || char.data.mch_ap < uniqueSkill.data.skl_cost ? this.inactiveSkills[char.data.chr_firstname.toLowerCase()] : this.skills[char.data.chr_firstname.toLowerCase()], px + 96, py + 48 + spacing * i, Tile.size, Tile.size);

                // Updates the div's position.
                this.attackDivs[char.data.chr_name].position(px, py + 48 + spacing * i);
                this.guardDivs[char.data.chr_name].position(px + 48, py + 48 + spacing * i);
                this.uniqueDivs[char.data.chr_name].position(px + 96, py + 48 + spacing * i);

            }

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

        if (!GameManager.isPlayersTurn()) return;
        GameManager.characters.find(char => char.data.mch_id == id).attack();

    }

    static guardClick(id) {

        if (!GameManager.isPlayersTurn()) return;
        GameManager.characters.find(char => char.data.mch_id == id).guard();

    }

    static uniqueClick(id) {

        if (!GameManager.isPlayersTurn()) return;
        GameManager.characters.find(char => char.data.mch_id == id).attack(true);

    }

    /**
     * Draws a small health bar above characters' heads for enemy characters.
     * @param {Character} char - The character to draw the health of.
     */
    static drawSmallHealthBar(char) {

        strokeWeight(6);
        stroke(Colours.stroke);

        fill(Colours.healthBarEmpty);
        rect(char.div.position().x + 8, char.div.position().y - 12, Tile.size - 16, 6);

        noStroke();

        fill(Colours.healthBar);
        rect(char.div.position().x + 8, char.div.position().y - 12, (Tile.size - 16) * (char.data.mch_hp / char.data.chr_basehp), 6);

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

        fill(Colours.white);
        text(txt, x, y + 4);

        fill(Colours.textShadow);
        text(txt, x, y);

    }

}
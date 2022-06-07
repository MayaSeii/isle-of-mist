class Guardian {

    /**
     * Creates a new Guardian object.
     * @param {Object} data - The data that comes from the database.
     */
    constructor(data) {

        this.data = data;
        this.sprite = loadImage('../img/sprites/guardian.png');
        this.eggSprite = loadImage('../img/sprites/egg.png');

        this.div = createDiv();
        this.div.style('width', this.isEgg() ? '48px' : '144px');
        this.div.style('height', this.isEgg() ? '48px' : '144px');

        this.tintTimer = 0;

        this.getFirstPosition();

    }

    /** Draws the Guardian. */
    draw() {

        // Tile positions start at 0, meaning subtracting 1 is necessary.
        const px = this.data.grd_positionx - 1;
        const py = 18 - this.data.grd_positiony;
    
        // Gets the tile underneath the player for precise positioning.
        const tile = GameManager.board.tileArray.find(t => { 
            return t.absolutePos.x == px && t.absolutePos.y == py;
        });

        const nx = this.isEgg() ? tile.div.position().x : tile.div.position().x - Tile.size;
        const ny = this.isEgg() ? tile.div.position().y : tile.div.position().y - Tile.size;
        const size = this.isEgg() ? Tile.size : Tile.size * 3;

        // Lerps position.
        this.div.position(lerp(this.div.position().x, nx, 0.3), lerp(this.div.position().y, ny, 0.3));

        this.updateHurtTint();
        image(this.isEgg() ? this.eggSprite : this.sprite, this.div.position().x, this.div.position().y, size, size);
        noTint();

    }

    /** Handles click events. */
    clicked() {

        if (this.isEgg()) {

            if (Character.selected) return;

            AudioManager.playRandom(AudioManager.eggIdle);
            this.div.position(this.div.position().x, this.div.position().y - 16);

        } else {

            if (Character.attacking != undefined) {
    
                if (this.isAdjacent(Character.attacking)) this.getAttacked();
                else AudioManager.playRandom(AudioManager.notAllowed);
                return;
    
            }
    
            AudioManager.playRandom(AudioManager.guardianBreath);

        }

    }

    /** Tints the image red when hurt. */
    updateHurtTint() {

        if (this.isEgg()) return;

        if (this.tintTimer > 0) {
            
            // Little hop animation.
            this.div.position(this.div.position().x, this.div.position().y - 5);
            setTimeout(() => { this.div.position(this.div.position().x, this.div.position().y + 5); }, 100);

            tint(255, 255 * (1 - this.tintTimer), 255 * (1 - this.tintTimer));
            this.tintTimer -= 0.1;

        }

    }

    /** Shows the Guardian being hurt; this DOES NOT affect the database (actual HP). */
    hurt() {

        if (this.isEgg()) return;

        this.tintTimer = 1;
        AudioManager.playRandom(AudioManager.impact);
        AudioManager.guardianDamage.stop();
        AudioManager.guardianDamage.play();

    }

    /** Reduces the Guardian's HP based on the attacker. */
    async getAttacked() {

        if (this.isEgg()) return;

        this.hurt();

        let skill = Character.attacking.skills.find(s => s.data.skl_name == 'Attack');
        this.data = await hurtGuardian(this.data.grd_id, skill.data.skl_id, Character.attacking.data.chr_baseatk);

        if (this.data.grd_hp <= 0) await this.spawnEgg();

        skill.markAsUsed();
        Character.attacking.reduceAP(skill.data.skl_cost);
        Character.attacking.cancelAttack();

    }

    /** Avoids lerping when loading the page. */
    getFirstPosition() {

        // Tile positions start at 0, meaning subtracting 1 is necessary.
        const px = this.data.grd_positionx - 1;
        const py = 18 - this.data.grd_positiony;
    
        // Gets the tile underneath the player for precise positioning.
        const tile = GameManager.board.tileArray.find(t => { 
            return t.absolutePos.x == px && t.absolutePos.y == py;
        });

        const nx = this.isEgg() ? tile.div.position().x : tile.div.position().x - Tile.size;
        const ny = this.isEgg() ? tile.div.position().y : tile.div.position().y - Tile.size;
        
        this.div.position(nx, ny);

    }

    /** Follows the AI checklist on the Guardian's turn. */
    async followChecklist() {

        if (this.isEgg()) return;

        this.moveInRandomDirection();

        setTimeout(async () => { 

            await this.attackLongRange();
            await this.attackCloseRange();
        
        }, 200);

    }

    /** Moves the Guardian one tile in a random direction. */
    async moveInRandomDirection() {

        if (this.isEgg()) return;

        let tile = undefined;

        let ax = 0;
        let ay = 0;

        // Variable to avoid infinite loops by limiting the filtering.
        let limit = 0;

        // A do-while loop checks whether a tile in the selected direction exists.
        do {

            const direction = getRandomInt(1, 4);

            const px = this.data.grd_positionx - 1;
            const py = 18 - this.data.grd_positiony;

            ax = 0;
            ay = 0;

            // Randomly decides the direction.
            switch (direction) {

                case 1: ax = 1; break;
                case 2: ax = -1; break;
                case 3: ay = 1; break;
                case 4: ay = -1; break;

            }

            // Makes sure the tile is valid.
            tile = GameManager.board.tileArray.find(t => { 

                return t.absolutePos.x == px + ax && t.absolutePos.y == py + ay && !t.isOccupied() && !t.isOccupiedFromGuardian() &&
                       t.absolutePos.x >= 3 && t.absolutePos.x <= 16 && t.absolutePos.y >= 3 && t.absolutePos.y <= 16;

            });

            limit++;

        } while (!tile && limit <= 100)

        if (!tile) return;

        // Client-side movement.
        this.data.grd_positionx += ax;
        this.data.grd_positiony += ay;

        // Server-side movement.
        await moveGuardian(this.data.grd_id, this.data.grd_positionx, this.data.grd_positiony);

    }

    /** Moves the Egg when being carried. */
    async moveEgg(x, y) {

        if (!this.isEgg()) return;

        // Client-side movement.
        this.data.grd_positionx = x;
        this.data.grd_positiony = y;

        // Server-side movement.
        await moveGuardian(this.data.grd_id, this.data.grd_positionx, this.data.grd_positiony);

    }

    /** Attacks characters within a long range. */
    async attackLongRange() {

        if (this.isEgg()) return;

        const px = this.data.grd_positionx;
        const py = this.data.grd_positiony;

        const chars = GameManager.characters.filter(c => getDistance(px, c.data.mch_positionx, py, c.data.mch_positiony) < 6);

        if (!chars || chars.length <= 0) return;

        // Little hop animation.
        this.div.position(this.div.position().x, this.div.position().y + 10);
        setTimeout(() => { this.div.position(this.div.position().x, this.div.position().y - 10); }, 100);

        AudioManager.playRandom(AudioManager.guardianAttack);
        chars.forEach(async (c) => { await c.getAttackedByGuardian(false); });

    }

    /** Attacks characters within a close range. */
    async attackCloseRange() {

        if (this.isEgg()) return;

        const px = this.data.grd_positionx;
        const py = this.data.grd_positiony;

        const chars = GameManager.characters.filter(c => getDistance(px, c.data.mch_positionx, py, c.data.mch_positiony) < 3);

        if (!chars || chars.length <= 0) return;

        // Little hop animation.
        this.div.position(this.div.position().x, this.div.position().y + 10);
        setTimeout(() => { this.div.position(this.div.position().x, this.div.position().y - 10); }, 100);

        AudioManager.playRandom(AudioManager.guardianAttack);
        chars.forEach(async (c) => { await c.getAttackedByGuardian(true); });

    }

    /** Spawns the Guardian's Egg. */
    async spawnEgg() {

        this.data = await spawnGuardianEgg(this.data.grd_id);

        // Little animation.
        this.getFirstPosition();
        this.div.position().y += 16;

        this.div.style('width', '48px');
        this.div.style('height', '48px');

    }

    /**
     * Returns whether the Guardian is adjacent to the specified character.
     * @param {Object} char - The character to check adjacency to.
     * @returns {boolean} - True if the Guardian and the character are adjacent, false otherwise.
     */
    isAdjacent(char) {

        if (!this.isEgg())
            return getDistance(char.data.mch_positionx, this.data.grd_positionx, char.data.mch_positiony, this.data.grd_positiony) <= 2.5;
        else    
            return getDistance(char.data.mch_positionx, this.data.grd_positionx, char.data.mch_positiony, this.data.grd_positiony) == 1;

    }

    /**
     * Checks whether the Guardian has been defeated (the Egg was dropped).
     * @returns {boolean} - True if the Egg is on the arena, false otherwise.
     */
    isEgg() {

        return this.data.grd_isegg;

    }

}
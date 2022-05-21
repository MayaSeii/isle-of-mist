class Tile {

    static size = 32;

    constructor(position, type, boardSize) {

        this.position = { x: position.x * Tile.size, y: position.y * Tile.size };
        this.absolutePos = { x: position.x, y: position.y };
        this.type = type;
        this.boardSize = boardSize;
        this.selected = false;

        this.createTileDiv();
        
    }

    createTileDiv() {

        const cx = this.position.x + (window.innerWidth / 2 - Tile.size * (this.boardSize / 2));   
        const cy = this.position.y + (window.innerHeight / 2 - Tile.size * (this.boardSize / 2)); 

        // Creates a div with the appropriate position.
        this.div = createDiv();
        this.div.position(cx, cy);

        // Sets the CSS style for each tile.
        this.div.style('width', `${Tile.size - 2}px`);
        this.div.style('height', `${Tile.size - 2}px`);
        this.div.style('background-image', `url(../img/tiles/${this.type}.png)`); 
        this.div.style('border', '1px solid #00000050'); 
        
        // Prioritises special tiles.
        if (this.type == 'G') this.div.style('z-index', `-3`);  
        else this.div.style('z-index', `-2`);

        this.drawBorderTiles();
        
    }

    drawBorderTiles() {

        let border = undefined;

        // Border tiles.
        if (this.absolutePos.x == 0) border = 'left';
        else if (this.absolutePos.y == 0) border = 'top';
        else if (this.absolutePos.x >= GameManager.boardSize - 1) border = 'right';
        else if (this.absolutePos.y >= GameManager.boardSize - 1) border = 'bottom';

        // Corner tiles.
        if (this.absolutePos.x == 0 && this.absolutePos.y == 0) border = 'topleft';
        else if (this.absolutePos.x == 0 && this.absolutePos.y == GameManager.boardSize - 1) border = 'bottomleft';
        else if (this.absolutePos.x == GameManager.boardSize - 1 && this.absolutePos.y == GameManager.boardSize - 1) border = 'bottomright';
        else if (this.absolutePos.x == GameManager.boardSize - 1 && this.absolutePos.y == 0) border = 'topright';

        if (border != undefined) this.div.style('mask', `url(../img/mask_${border}.png)`);

    }

    draw() {

        const cx = this.position.x + (window.innerWidth / 2 - Tile.size * (this.boardSize / 2));
        const cy = this.position.y + (window.innerHeight / 2 - Tile.size * (this.boardSize / 2));

        this.div.position(cx, cy);
    }

    clicked() {

        this.select(true);  

    }

    select(selected) {

        if (selected) this.div.style('filter', 'sepia(100%)');
        else this.div.style('filter', 'sepia(0%)');

        this.selected = selected;

    }

}
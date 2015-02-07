window.Art = window.Art || {};
window.Art.Tri = (function() {

    /**
     * @param {number[]} colour The colour of the triangle.
     * @param {object} position The position of the triangle.
     * @param {number} position.x The x pos of the triangle.
     * @param {number} position.y The y pos of the triangle.
     * @param {number} size The size of the triangle.
     * @param {object} ctx The context of the canvas, for drawing.
     */
    var Tri = function(colour, position, size, ctx) {
        if (!colour || !position || !ctx) throw "Missing param to new Tri";
        this.colour = colour;
        this.position = position;
        this.size = size;
        this.ctx = ctx;
    };
    var tri = Tri.prototype;

    tri.render = function() {
        this.ctx.fillStyle = this.getColour();
        this.ctx.beginPath();
        this.draw();
        this.ctx.fill();
    };

    tri.getColour = function() {
        return 'rgb(' + 
            this.colour.r + ', ' + 
            this.colour.g + ', '  + 
            this.colour.b + ')';
    };

    return Tri;
}());

window.Art = window.Art || {};
window.Art.Tri = (function() {

    /**
     * @param {object} position The position of the triangle.
     * @param {number} position.x The x pos of the triangle.
     * @param {number} position.y The y pos of the triangle.
     * @param {number} size The size of the triangle.
     * @param {object} ctx The context of the canvas, for drawing.
     */
    function Tri(position, size, ctx) {
        if (!position || !ctx) throw "Missing param to new Tri";
        this.position = position;
        this.size = size;
        this.ctx = ctx;
        this.rendered = false;
    };
    var tri = Tri.prototype;

    tri.render = function(colour) {
        var x = (this.position.x * (this.size * 2)) - (this.size * 2),
            y = (this.position.y * this.size);
        this.ctx.fillStyle = this.getColour(colour);
        this.ctx.beginPath();
        this.draw(x, y);
        this.ctx.fill();
        this.rendered = true;
    };

    tri.getColour = function(colour) {
        return 'rgb(' + 
            colour.r + ', ' + 
            colour.g + ', '  + 
            colour.b + ')';
    };

    return Tri;
}());

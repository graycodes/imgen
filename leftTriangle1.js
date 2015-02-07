window.Art = window.Art || {};
window.Art.LeftTri1 = (function() {
    var LeftTri1 = function() {
        window.Art.Tri.apply(this, arguments);
    };
    LeftTri1.prototype = Object.create(window.Art.Tri);
    var ltri1 = LeftTri1.prototype;

    ltri1.render = window.Art.Tri.prototype.render;
    ltri1.getColour = window.Art.Tri.prototype.getColour;

    ltri1.draw = function() {
        var x = this.position.x,
            y = this.position.y;
        this.ctx.moveTo(x, y);
        this.ctx.lineTo(x + (this.size * 2), y - this.size);
        this.ctx.lineTo(x + (this.size * 2), y + this.size);
    };

    return LeftTri1;

}());


window.Art = window.Art || {};
window.Art.LeftTri2 = (function() {
    var LeftTri2 = function() {
        window.Art.Tri.apply(this, arguments);
    };
    LeftTri2.prototype = Object.create(window.Art.Tri);
    var ltri2 = LeftTri2.prototype;

    ltri2.render = window.Art.Tri.prototype.render;
    ltri2.getColour = window.Art.Tri.prototype.getColour;

    ltri2.draw = function() {
        var x = this.position.x,
            y = this.position.y;
        this.ctx.moveTo(x + (this.size * 2), y);
        this.ctx.lineTo(x + (this.size * 4), y - this.size);
        this.ctx.lineTo(x + (this.size * 4), y + this.size);
    };

    return LeftTri2;

}());


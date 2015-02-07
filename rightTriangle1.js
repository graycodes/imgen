window.Art = window.Art || {};
window.Art.RightTri1 = (function() {
    var RightTri1 = function() {
        window.Art.Tri.apply(this, arguments);
    };
    RightTri1.prototype = Object.create(window.Art.Tri);
    var rtri1 = RightTri1.prototype;

    rtri1.render = window.Art.Tri.prototype.render;
    rtri1.getColour = window.Art.Tri.prototype.getColour;

    rtri1.draw = function() {
        var x = this.position.x,
            y = this.position.y;
        this.ctx.moveTo(x, y - this.size);
        this.ctx.lineTo(x + (this.size * 2), y);
        this.ctx.lineTo(x, y + this.size);
    };

    return RightTri1;

}());


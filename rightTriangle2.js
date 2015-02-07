window.Art = window.Art || {};
window.Art.RightTri2 = (function() {
    var RightTri2 = function() {
        window.Art.Tri.apply(this, arguments);
    };
    RightTri2.prototype = Object.create(window.Art.Tri);
    var rtri2 = RightTri2.prototype;

    rtri2.render = window.Art.Tri.prototype.render;
    rtri2.getColour = window.Art.Tri.prototype.getColour;

    rtri2.draw = function() {
        var x = this.position.x,
            y = this.position.y;
        this.ctx.moveTo(x + (this.size * 2), y - this.size);
        this.ctx.lineTo(x + (this.size * 4), y);
        this.ctx.lineTo(x + (this.size * 2), y + this.size);
    };

    return RightTri2;

}());


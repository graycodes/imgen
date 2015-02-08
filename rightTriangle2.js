window.Art = window.Art || {};
window.Art.RightTri2 = (function() {
    function RightTri2() {
        window.Art.Tri.apply(this, arguments);
    };
    RightTri2.prototype = Object.create(window.Art.Tri);
    var rtri2 = RightTri2.prototype;

    rtri2.render = window.Art.Tri.prototype.render;
    rtri2.getColour = window.Art.Tri.prototype.getColour;

    rtri2.draw = function(x, y) {
        this.ctx.moveTo(x + (this.size * 2), y - this.size);
        this.ctx.lineTo(x + (this.size * 4), y);
        this.ctx.lineTo(x + (this.size * 2), y + this.size);
    };

    rtri2.below = function() {
        return {
            x: this.position.x + 1,
            y: this.position.y + 1
        };
    };

    rtri2.above = function() {
        return {
            x: this.position.x + 1,
            y: this.position.y - 1
        };
    };

    rtri2.aside = function() {
        return {
            x: this.position.x - 1,
            y: this.position.y
        };
    };

    return RightTri2;

}());


window.Art = window.Art || {};
window.Art.LeftTri1 = (function() {
    function LeftTri1() {
        window.Art.Tri.apply(this, arguments);
    };
    LeftTri1.prototype = Object.create(window.Art.Tri);
    var ltri1 = LeftTri1.prototype;

    ltri1.render = window.Art.Tri.prototype.render;
    ltri1.getColour = window.Art.Tri.prototype.getColour;

    ltri1.draw = function(x, y) {
        this.ctx.moveTo(x, y);
        this.ctx.lineTo(x + (this.size * 2), y - this.size);
        this.ctx.lineTo(x + (this.size * 2), y + this.size);
    };

    ltri1.below = function() {
        return {
            x: this.position.x - 1,
            y: this.position.y + 1
        };
    };

    ltri1.above = function() {
        return {
            x: this.position.x - 1,
            y: this.position.y - 1
        };
    };

    ltri1.aside = function() {
        return {
            x: this.position.x + 1,
            y: this.position.y
        };
    };

    return LeftTri1;

}());


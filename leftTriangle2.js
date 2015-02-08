window.Art = window.Art || {};
window.Art.LeftTri2 = (function() {
    function LeftTri2() {
        window.Art.Tri.apply(this, arguments);
    };
    LeftTri2.prototype = Object.create(window.Art.Tri);
    var ltri2 = LeftTri2.prototype;

    ltri2.render = window.Art.Tri.prototype.render;
    ltri2.getColour = window.Art.Tri.prototype.getColour;
    ltri2.below = window.Art.Tri.prototype.below;

    ltri2.draw = function(x, y) {
        this.ctx.moveTo(x + (this.size * 2), y);
        this.ctx.lineTo(x + (this.size * 4), y - this.size);
        this.ctx.lineTo(x + (this.size * 4), y + this.size);
    };

    ltri2.below = function() {
        return {
            x: this.position.x + 1,
            y: this.position.y + 1
        };
    };

    ltri2.above = function() {
        return {
            x: this.position.x + 1,
            y: this.position.y - 1
        };
    };

    ltri2.aside = function() {
        return {
            x: this.position.x + 1,
            y: this.position.y
        };
    };


    return LeftTri2;

}());


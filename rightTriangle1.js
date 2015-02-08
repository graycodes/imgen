window.Art = window.Art || {};
window.Art.RightTri1 = (function() {
    function RightTri1() {
        window.Art.Tri.apply(this, arguments);
    };
    RightTri1.prototype = Object.create(window.Art.Tri);
    var rtri1 = RightTri1.prototype;

    rtri1.render = window.Art.Tri.prototype.render;
    rtri1.getColour = window.Art.Tri.prototype.getColour;

    rtri1.draw = function(x, y) {
        this.ctx.moveTo(x, y - this.size);
        this.ctx.lineTo(x + (this.size * 2), y);
        this.ctx.lineTo(x, y + this.size);
    };

    rtri1.below = function() {
        return {
            x: this.position.x - 1,
            y: this.position.y + 1
        };
    };

    rtri1.above = function() {
        return {
            x: this.position.x - 1,
            y: this.position.y - 1
        };
    };

    rtri1.aside = function() {
        return {
            x: this.position.x - 1,
            y: this.position.y
        };
    };


    return RightTri1;

}());


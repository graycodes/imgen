window.art = (function($) {
    var art = {};

    art.init = function() {
        this.cellSize = 20;
        this.width = 800;
        this.height = 600;
        this.colours = {
            primary:   [200, 60, 0],
            secondary: [60, 140, 170],
            tertiary:  [220, 170, 30]
        };
        this.same = 0;
        this.pri = 0;
        this.sec = 0;
        this.ter = 0;

        this.createCanvas();
        this.drawGridDots();
        this.drawTriangles();
        console.log (this.same, this.pri, this.sec, this.ter);
    };

    art.createCanvas = function() {
        this.c = $('<canvas id="cnv" width="' + this.width + '" height="' + this.height + 
                  '" />')[0];
        $('body').append(this.c);

        this.ctx = this.c.getContext('2d');
        this.ctx.fillStyle="#000000";
    };

    art.drawGridDots = function() {
        var x, y;

        for (x = this.width; x >= 0; x -= this.cellSize) {
            for (y = this.height; y >= 0; y -= this.cellSize) {
                this.ctx.fillRect(x, y, 1, 1);
            }
        }
    };

    art.drawTriangles = function() {
        var i = 0,
            j = 0;
        for (var x = (this.cellSize * -2); x < this.width; x += (this.cellSize * 2)) {
            for (var y = 0; y < this.height + (this.cellSize * 2); y += this.cellSize) {

                this.ctx.fillStyle = this.getStyle();

                if (i % 2 === 0) {
                    if (j % 2 === 0) {
                        this.drawTriL1(x, y);
                    } else {
                        this.drawTriL2(x, y);
                    }
                } else {
                    if (j % 2 === 0) {
                        this.drawTriR1(x, y);
                    } else {
                        this.drawTriR2(x, y);
                    }
                }
                j++;
            }
            i++;
        }
    };

    art.drawTriangle = function(drawFn, x, y) {
        this.ctx.beginPath();
        drawFn.call(this, x, y);
        this.ctx.fill();
    };
    
    art.drawTriL1 = function(x, y) {
        this.drawTriangle(this.triangleLeft1, x, y);
    };
    
    art.drawTriL2 = function(x, y) {
        this.drawTriangle(this.triangleLeft2, x, y);
    };
    
    art.drawTriR1 = function(x, y) {
        this.drawTriangle(this.triangleRight1, x, y);
    };
    
    art.drawTriR2 = function(x, y) {
        this.drawTriangle(this.triangleRight2, x, y);
    };

    // <|
    art.triangleLeft1 = function(x, y) {
        this.ctx.moveTo(x, y);
        this.ctx.lineTo(x + (this.cellSize * 2), y - this.cellSize);
        this.ctx.lineTo(x + (this.cellSize * 2), y + this.cellSize);
    };

    //   <|
    art.triangleLeft2 = function(x, y) {
        this.ctx.moveTo(x + (this.cellSize * 2), y);
        this.ctx.lineTo(x + (this.cellSize * 4), y - this.cellSize);
        this.ctx.lineTo(x + (this.cellSize * 4), y + this.cellSize);
    };

    // |>
    art.triangleRight1 = function(x, y) {
        this.ctx.moveTo(x, y - this.cellSize);
        this.ctx.lineTo(x + (this.cellSize * 2), y);
        this.ctx.lineTo(x, y + this.cellSize);
    };

    //   |>
    art.triangleRight2 = function(x, y) {
        this.ctx.moveTo(x + (this.cellSize * 2), y - this.cellSize);
        this.ctx.lineTo(x + (this.cellSize * 4), y);
        this.ctx.lineTo(x + (this.cellSize * 2), y + this.cellSize);
    };

    art.getStyle = function() {

        var r, g, b, colourType,
            colourSelection = Math.floor(Math.random() * 14);

        if (this.colourType && colourSelection %2 === 0) {
            colourType = this.colourType;
            this.same++;
        } else if (colourSelection >= 2 && colourSelection <= 5) {
            colourType = this.colours.primary;
            this.pri++;
        } else if (colourSelection >= 6 && colourSelection <= 9) {
            colourType = this.colours.secondary;
            this.sec++;
        } else {
            colourType = this.colours.tertiary;
            this.ter++;
        }
        
        this.colourType = colourType;

        r = this.getColour(colourType[0]);
        g = this.getColour(colourType[1]);
        b = this.getColour(colourType[2]);

        return "rgb(" + r + ", "
            + g + ", "
            + b + ")";
    };

    art.getColour = function(startingShade) {
        return startingShade + (Math.floor(Math.random() * 40));
    };

    return art;

}(jQuery));

$(function() {
    window.art.init();
});

window.art = (function($) {
    var art = {};

    art.init = function() {
        art.cellSize = 20;
        art.width = 800;
        art.height = 600;
        art.colours = {
            primary:   [200, 60, 0],
            secondary: [60, 140, 170],
            tertiary:  [220, 170, 30]
        };
        art.same = 0;
        art.pri = 0;
        art.sec = 0;
        art.ter = 0;

        art.createCanvas();
        art.drawGridDots();
        art.drawTriangles();
        console.log (art.same, art.pri, art.sec, art.ter);
    };

    art.createCanvas = function() {
        art.c = $('<canvas id="cnv" width="' + art.width + '" height="' + art.height + 
                  '" />')[0];
        $('body').append(art.c);

        art.ctx = art.c.getContext('2d');
        art.ctx.fillStyle="#000000";
    };

    art.drawGridDots = function() {
        var x, y;

        for (x = art.width; x >= 0; x -= art.cellSize) {
            for (y = art.height; y >= 0; y -= art.cellSize) {
                art.ctx.fillRect(x, y, 1, 1);
            }
        }
    };

    art.drawTriangles = function() {
        var i = 0,
            j = 0;
        for (var x = (art.cellSize * -2); x < art.width; x += (art.cellSize * 2)) {
            for (var y = 0; y < art.height + (art.cellSize * 2); y += art.cellSize) {

                art.ctx.fillStyle = art.getStyle();

                if (i % 2 === 0) {
                    if (j % 2 === 0) {
                        art.drawTriL1(x, y);
                    } else {
                        art.drawTriL2(x, y);
                    }
                } else {
                    if (j % 2 === 0) {
                        art.drawTriR1(x, y);
                    } else {
                        art.drawTriR2(x, y);
                    }
                }
                j++;
            }
            i++;
        }
    };

    art.drawTriangle = function(drawFn, x, y) {
        art.ctx.beginPath();
        drawFn(x,y);
        art.ctx.fill();
    };
    
    art.drawTriL1 = function(x, y) {
        art.drawTriangle(art.triangleLeft1, x, y);
    };
    
    art.drawTriL2 = function(x, y) {
        art.drawTriangle(art.triangleLeft2, x, y);
    };
    
    art.drawTriR1 = function(x, y) {
        art.drawTriangle(art.triangleRight1, x, y);
    };
    
    art.drawTriR2 = function(x, y) {
        art.drawTriangle(art.triangleRight2, x, y);
    };

    // <|
    art.triangleLeft1 = function(x, y) {
        art.ctx.moveTo(x, y);
        art.ctx.lineTo(x + (art.cellSize * 2), y - art.cellSize);
        art.ctx.lineTo(x + (art.cellSize * 2), y + art.cellSize);
    };

    //   <|
    art.triangleLeft2 = function(x, y) {
        art.ctx.moveTo(x + (art.cellSize * 2), y);
        art.ctx.lineTo(x + (art.cellSize * 4), y - art.cellSize);
        art.ctx.lineTo(x + (art.cellSize * 4), y + art.cellSize);
    };

    // |>
    art.triangleRight1 = function(x, y) {
        art.ctx.moveTo(x, y - art.cellSize);
        art.ctx.lineTo(x + (art.cellSize * 2), y);
        art.ctx.lineTo(x, y + art.cellSize);
    };

    //   |>
    art.triangleRight2 = function(x, y) {
        art.ctx.moveTo(x + (art.cellSize * 2), y - art.cellSize);
        art.ctx.lineTo(x + (art.cellSize * 4), y);
        art.ctx.lineTo(x + (art.cellSize * 2), y + art.cellSize);
    };

    art.getStyle = function() {

        var r, g, b, colourType,
            colourSelection = Math.floor(Math.random() * 14);

        if (art.colourType && colourSelection %2 === 0) {
            colourType = art.colourType;
            art.same++;
        } else if (colourSelection >= 2 && colourSelection <= 5) {
            colourType = art.colours.primary;
            art.pri++;
        } else if (colourSelection >= 6 && colourSelection <= 9) {
            colourType = art.colours.secondary;
            art.sec++;
        } else {
            colourType = art.colours.tertiary;
            art.ter++;
        }
        
        art.colourType = colourType;

        r = art.getColour(colourType[0]);
        g = art.getColour(colourType[1]);
        b = art.getColour(colourType[2]);

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

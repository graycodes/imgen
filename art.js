window.art = (function($) {
    var art = {};

    art.init = function() {
        art.cellSize = 20;
        art.width = 800;
        art.height = 600;

        art.createCanvas();
        art.drawGridDots();
        art.drawTriangles();
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
        art.drawTriangle(art.drawTriangleLeft1, x, y);
    };
    
    art.drawTriL2 = function(x, y) {
        art.drawTriangle(art.drawTriangleLeft2, x, y);
    };
    
    art.drawTriR1 = function(x, y) {
        art.drawTriangle(art.drawTriangleRight1, x, y);
    };
    
    art.drawTriR2 = function(x, y) {
        art.drawTriangle(art.drawTriangleRight2, x, y);
    };

    // <|
    art.drawTriangleLeft1 = function(x, y) {
        art.ctx.moveTo(x, y);
        art.ctx.lineTo(x + (art.cellSize * 2), y - art.cellSize);
        art.ctx.lineTo(x + (art.cellSize * 2), y + art.cellSize);
    };

    //   <|
    art.drawTriangleLeft2 = function(x, y) {
        art.ctx.moveTo(x + (art.cellSize * 2), y);
        art.ctx.lineTo(x + (art.cellSize * 4), y - art.cellSize);
        art.ctx.lineTo(x + (art.cellSize * 4), y + art.cellSize);
    };

    // |>
    art.drawTriangleRight1 = function(x, y) {
        art.ctx.moveTo(x, y - art.cellSize);
        art.ctx.lineTo(x + (art.cellSize * 2), y);
        art.ctx.lineTo(x, y + art.cellSize);
    };

    //   |>
    art.drawTriangleRight2 = function(x, y) {
        art.ctx.moveTo(x + (art.cellSize * 2), y - art.cellSize);
        art.ctx.lineTo(x + (art.cellSize * 4), y);
        art.ctx.lineTo(x + (art.cellSize * 2), y + art.cellSize);
    };

    art.getStyle = function() {
        return "rgb(" + Math.floor(Math.random() * 255) + ", "
                + Math.floor(Math.random() * 255) + ", "
                + Math.floor(Math.random() * 255) + ")";
    };

    return art;

}(jQuery));

$(function() {
    window.art.init();
});

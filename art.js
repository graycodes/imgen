window.Art = window.Art || {};
window.Art.art = (function($) {
    var art = {};

    art.init = function() {
        this.cellSize = 15;
        this.shapeLengthMax = 10;
        this.width = 800;
        this.height = 600;
        this.colours = [
            [200, 60, 0],
            [60, 140, 170],
            [220, 170, 30]/*,
            [6, 128, 57]*/
        ];
        this.colourIndex = 0;
        this.colour = this.colours[this.colourIndex];
        this.same = 0;
        this.pri = 0;
        this.sec = 0;
        this.ter = 0;

        this.setInitialState();
    };

    art.setInitialState = function() {
        this.createCanvas();
        this.drawGridDots();
        this.drawTriangles();
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
            j = 0,
            x = (this.cellSize * -2),
            y = 0,
            tri, Type;
        this.triangles = [];
        
        for (; x < this.width; x += (this.cellSize * 2)) {
            j = 0;
            this.triangles[i] = [];
            for (y = 0; y < this.height + (this.cellSize * 2); y += this.cellSize) {
                Type = this.getTriangleType(i, j);
                this.triangles[i][j] = new Type({x: i, y: j}, 
                                                this.cellSize, this.ctx);
                j++;
            }
            i++;
        }
        this.trianglesLength = (i * j);
    };

    art.getTriangleType = function(i, j) {
        var type;
        if (i % 2 === 0) {
            if (j % 2 === 0) {
                type = window.Art.LeftTri1;
            } else {
                type = window.Art.LeftTri2;
            }
        } else {
            if (j % 2 === 0) {
                type = window.Art.RightTri1;
            } else {
                type = window.Art.RightTri2;
            }
        }
        return type;
    };

    art.makeShape = function() {

        if (this.interval) {
            clearInterval(this.interval);
        }
        this.lastTri = null;
        this.colour = this.getColour();
        var self = this;
        this.shapeLength = 0;
        this.interval = setInterval(function(){self.makeShapeStep.call(window.Art.art);}, 0); 

    };

    art.shapeFinished = function() {
        clearInterval(this.interval);
        if (this.trianglesLength) {
            this.makeShape();
        }
    };

    art.makeShapeStep = function() {
        var start, i, j, tri, dir, nextTri;

        if (this.lastTri) {
            nextTri = this.getNextDir(this.lastTri);
            if (!nextTri || this.shapeLength > this.shapeLengthMax) {
                return this.shapeFinished();
            }
            dir = nextTri.position;
            i = dir.x;
            j = dir.y;
        } else {
            start = this.getStartPoint();

            i = start.x;
            j = start.y;
        }
        tri = this.getTri(i, j);
        
        if (!tri) {
            return;
        }
        this.trianglesLength--;
        tri.render(this.getShades(this.colour));
        this.lastTri = tri;
        this.shapeLength++;
    };

    art.canvasCovered = function() {
        var x = this.triangles.length,
            y = this.triangles[0].length;
        for (x; x >= 0; x--) {
            for (y = this.triangles[0].length; y >= 0; y--) {
                this.triangles[x][y].rendered = false;
            }
        }
    };


    art.getStartPoint = function() {//TODO: Make this not shit.
        var i, j;
        i = ~~(Math.random() * this.triangles.length);
        j = ~~(Math.random() * this.triangles[i].length);
        if (!this.getTri(i, j) || this.getTri(i, j).rendered) {
            return this.getStartPoint();//FML, this causes stack overflows.
        }
        return {x: i, y: j};
    };

    art.getNextDir = function(tri) {
        var above = tri.above(),
            below = tri.below(),
            aside = tri.aside(),
            aboveTri = this.getTri(above.x, above.y),
            belowTri = this.getTri(below.x, below.y),
            asideTri = this.getTri(aside.x, aside.y),
            dirs = [],
            rand;

        if (aboveTri && !aboveTri.rendered) dirs.push(aboveTri);
        if (belowTri && !belowTri.rendered) dirs.push(belowTri);
        if (asideTri && !asideTri.rendered) dirs.push(asideTri);

        rand = ~~(Math.random() * dirs.length);
        return dirs[rand];

    };

    art.getTri = function(x, y) {
        if (!this.triangles[x] || !this.triangles[x][y]) {
            return;
        }
        return this.triangles[x][y];
    };

    art.getColour = function() {
        var newColour;
        this.colourIndex = (this.colourIndex === this.colours.length ? 0 : this.colourIndex);
        newColour = this.colours[this.colourIndex];
        this.colourIndex++;
        return newColour;
    };

    art.getShades = function(colour) {
        return {
            r: this.getShade(colour[0]),
            g: this.getShade(colour[1]),
            b: this.getShade(colour[2])
        };
    };

    art.getShade = function(startingShade) {
        return startingShade + (Math.floor(Math.random() * 40));
    };

    return art;

}(jQuery));

$(function() {
    window.Art.art.init();
});

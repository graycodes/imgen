window.Art = window.Art || {};
window.Art.art = (function($) {
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
        this.triangles = [];
        var tri,
            i = 0,
            j = 0;
        for (var x = (this.cellSize * -2); x < this.width; x += (this.cellSize * 2)) {
            j = 0;
            this.triangles[i] = [];
            for (var y = 0; y < this.height + (this.cellSize * 2); y += this.cellSize) {
                
                if (i % 2 === 0) {
                    if (j % 2 === 0) {
                        this.triangles[i][j] = new window.Art.LeftTri1(
                            this.getStyle(),
                            {x: i, y: j},
                            this.cellSize,
                            this.ctx
                        );
                    } else {
                        this.triangles[i][j] = new window.Art.LeftTri2(
                            this.getStyle(),
                            {x: i, y: j},
                            this.cellSize,
                            this.ctx
                        );
                    }
                } else {
                    if (j % 2 === 0) {
                        this.triangles[i][j] = new window.Art.RightTri1(
                            this.getStyle(),
                            {x: i, y: j},
                            this.cellSize,
                            this.ctx
                        );
                    } else {
                        this.triangles[i][j] = new window.Art.RightTri2(
                            this.getStyle(),
                            {x: i, y: j},
                            this.cellSize,
                            this.ctx
                        );
                    }
                }
                j++;
            }
            i++;
        }
    };

    art.makeShape = function() {
        var i = ~~(Math.random() * this.triangles.length),
            j = ~~(Math.random() * this.triangles[i].length),
            oldI, oldJ, tri, dir, nextTri;

        if (this.lastTri) {
            nextTri = this.getNextDir(this.lastTri);
            if (!nextTri) return;
            dir = nextTri.position;
            i = dir.x;
            j = dir.y;
        }
        tri = this.getTri(i, j);

        if (!tri) return;
        tri.render();
        this.lastTri = tri;

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

        return {
            r: r,
            g: g,
            b: b
        };

    };

    art.getColour = function(startingShade) {
        return startingShade + (Math.floor(Math.random() * 40));
    };

    return art;

}(jQuery));

$(function() {
    window.Art.art.init();
});

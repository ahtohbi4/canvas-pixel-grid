class Grid {
    constructor(canvas, density, width, height) {
        this.canvas = canvas;
        this.context = this.canvas.getContext('2d');

        this.density = density || 1;

        this.pixelSize = 4 * this.density;
        this.pixelsSpacing = 1 * this.density;

        this.width = width || Math.floor(this.canvas.width / (this.pixelSize + this.pixelsSpacing));
        this.height = height || Math.floor(this.canvas.width / (this.pixelSize + this.pixelsSpacing));

        this.PIXEL_NORMAL_COLOR = '#eee';
        this.PIXEL_ACTIVE_COLOR = '#16161d';

        this.matrix = [];
        for (let j = 0; j < this.height; j++) {
            let row = [];

            for (let i = 0; i < this.width; i++) {
                row.push(0);
            }

            this.matrix.push(row);
        }

        this.draw();

        this.setValue.bind(this);
    }

    setValue(x, y, active) {
        this.matrix[y][x] = Boolean(active);

        return this;
    }

    _drawPixel(x, y, active) {
        this.context.fillStyle = (active || 0) ? this.PIXEL_ACTIVE_COLOR : this.PIXEL_NORMAL_COLOR;

        this.context.fillRect(
            (this.pixelSize + this.pixelsSpacing) * x,
            (this.pixelSize + this.pixelsSpacing) * y,
            this.pixelSize,
            this.pixelSize
        );

        return this;
    }

    draw(fromX, fromY, toX, toY) {
        for (let j = 0; j < this.matrix.length; j++) {
            for (let i = 0; i < this.matrix[0].length; i++) {
                this._drawPixel(i, j, this.matrix[j][i]);
            }
        }

        return this;
    }
}

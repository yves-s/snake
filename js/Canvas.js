class Canvas {
    constructor(x, y, fieldSize, element) {
        this._x = x;
        this._y = y;
        this._element = element;
        this._element.width = x * fieldSize;
        this._element.height = y * fieldSize;
        this._context = element.getContext('2d');

        this.initMatrix();
    }

    /**
     * The matrix is a representation of the canvas.
     * It contains all fields, which are fillable by the snake or by the food.
     * The matrix is an object, because the keys will stay the same when deleting an matrix element.
     */
    initMatrix() {
        this._matrix = {};

        for (let i = 0; i < this._y; i++) {
            this._matrix[i] = {};
            for (let j = 0; j < this._x; j++) {
                this._matrix[i][j] = j;
            }
        }
    }

    getMatrix() {
        return this._matrix;
    }

    removeMatrixElement(x, y) {
        // Delete single element
        delete this._matrix[y][x];

        // If a row is empty, delete the whole row
        if (this._matrix[y].length === 0) {
            delete this._matrix[y];
        }
    }

    getX() {
        return this._x;
    }

    getY() {
        return this._y;
    }

    getContext() {
        return this._context;
    }

    reset() {
        this._context.clearRect(0, 0, this._element.height, this._element.height);
    }
}

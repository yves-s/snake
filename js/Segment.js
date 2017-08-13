class Segment {
    constructor(x, y, width, height, color) {
        this._x = x;
        this._y = y;
        this._width = width;
        this._height = height;
        this._color = color;
    }

    getX() {
        return this._x;
    }

    setX(x) {
        this._x = x;
    }

    getY() {
        return this._y;
    }

    setY(y) {
        this._y = y;
    }

    getWidth() {
        return this._width;
    }

    getHeight() {
        return this._height;
    }

    getColor() {
        return this._color;
    }

    setColor(color) {
        this._color = color;
    }
}

export default Segment;
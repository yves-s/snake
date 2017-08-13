class Snake {
    constructor(body, color = colorSnake) {
        this._body = body;
        this._color = color;
        this._stomach = [];
        this._direction = null;
        this._moveable = true;
    }

    getBody() {
        return this._body;
    }

    getColor() {
        return this._color;
    }

    getDirection() {
        return this._direction;
    }

    setDirection(direction) {
        this._direction = direction;
    }

    canMove() {
        return this._moveable;
    }

    setMovable(value) {
        this._moveable = value;
    }

    getHead() {
        return this._body[0];
    }

    eat(segment) {
        segment.setColor(this._color);
        this._stomach.push(segment);
    }

    move() {
        if (this._direction === null) {
            return;
        }

        let previousX = null;
        let previousY = null;

        this._body.forEach(function (segment) {
            if (previousX === null || previousY === null) {
                previousX = segment.getX();
                previousY = segment.getY();
                return;
            }

            const tempX = segment.getX();
            const tempY = segment.getY();

            segment.setX(previousX);
            segment.setY(previousY);

            previousX = tempX;
            previousY = tempY;
        });

        const head = this._body[0];
        switch (this._direction) {
            case 'left':
                head.setX(head.getX() - 1);
                break;
            case 'right':
                head.setX(head.getX() + 1);
                break;
            case 'up':
                head.setY(head.getY() - 1);
                break;
            case 'down':
                head.setY(head.getY() + 1);
                break;
        }

        this.maybeGrow();
        this._moveable = true;
    }

    bitesItself() {
        const head = this._body[0];
        const bodyWithoutHead = this._body.slice(1);

        return bodyWithoutHead.find(function (segment) {
            return segment.getX() === head.getX() && segment.getY() === head.getY();
        });
    }

    maybeGrow() {
        if (this._stomach.length === 0) {
            return;
        }

        this._body.push(this._stomach[0]);
        this._stomach.splice(0, 1);
    }
}

export default Snake;

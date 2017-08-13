import Segment from './Segment';
import Snake from './Snake';
import Canvas from './Canvas';

// Configuration
const snakeColor = '#696969';
const foodColor = '#FF0000';
const fieldsX = 13;
const fieldsY = 13;
const fieldSize = 20;

// Object instantiation
const canvas = new Canvas(fieldsX, fieldsY, fieldSize, document.getElementById('canvas'));
const food = new Segment(6, 6, fieldSize, fieldSize, foodColor);
const snake = new Snake([new Segment(6, 5, fieldSize, fieldSize, snakeColor)], snakeColor);

// Game options
let fps = 8;
let over = false;
let score = 0;

const keys = {
    up: [38],
    down: [40],
    left: [37],
    right: [39],
};

const oppositeDirections = {
    'up': 'down',
    'left': 'right',
    'right': 'left',
    'down': 'up',
};

const getKey = (value) => {
    for (const key in keys) {
        if (keys[key] instanceof Array && keys[key].indexOf(value) >= 0) {
            return key;
        }
    }

    return null;
};

const renderSegment = (segment) => {
    const context = canvas.getContext();

    context.fillStyle = segment.getColor();
    context.beginPath();
    context.rect(
        segment.getX() * segment.getWidth(),
        segment.getY() * segment.getHeight(),
        segment.getWidth(),
        segment.getHeight()
    );
    context.closePath();
    context.fill();
};

const renderSnake = () => {
    snake.getBody().forEach((segment) => {
        renderSegment(segment);
    });
};

const renderFood = () => {
    renderSegment(food);
};

const play = () => {
    snake.move();

    if (snakeHitsTheWall() || snake.bitesItself()) {
        stop();
    }

    if (snakeIsOnFood()) {
        // Clone food segment and feed this clone to the snake
        snake.eat(Object.assign(Object.create(food)));
        score++;
        repositionFood();
    }

    if (over === false) {
        canvas.reset();
        renderScore();
        renderSnake();
        renderFood();
    }
};

const snakeIsOnFood = () => {
    const head = snake.getHead();

    return head.getX() == food.getX() && head.getY() == food.getY();
};

const snakeHitsTheWall = () => {
    const head = snake.getHead();

    return head.getX() < 0 || head.getX() >= canvas.getX() || head.getY() < 0 || head.getY() >= canvas.getY();
};

const repositionFood = () => {
    canvas.initMatrix();

    // Delete all matrix elements which are occupied by the snake
    snake.getBody().forEach(function (segment) {
        canvas.removeMatrixElement(segment.getX(), segment.getY());
    });

    const matrix = canvas.getMatrix();
    const rows = Object.keys(matrix);

    // If no row is left, all matrix elements are filled by the snake - The game is over.
    if (rows.length === 0) {
        stop();
        return;
    }

    const y = rows[Math.floor(Math.random() * rows.length)];
    const columns = Object.keys(matrix[y]);
    const x = columns[Math.floor(Math.random() * columns.length)];

    food.setX(x);
    food.setY(y);
};

const renderScore = () => {
    document.querySelector('.score').innerHTML = `${score}`;
};

const stop = () => {
    over = true;
    snake.setDirection(null);
};

window.addEventListener('load', () => {
    window.setInterval(() => {
        play();
    }, 1000 / fps);
});

window.addEventListener('keydown', (e) => {
    if (!snake.canMove()) {
        return;
    }

    const key = getKey(e.keyCode);
    if (['up', 'down', 'left', 'right'].indexOf(key) >= 0 && key !== oppositeDirections[snake.getDirection()]) {
        snake.setDirection(key);
        snake.setMovable(false);
    }
}, false);

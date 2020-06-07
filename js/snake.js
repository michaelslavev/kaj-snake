let scl = 20;
const eatSound = new Audio('resources/eat.wav');

class Snake {
    constructor(hardDiff) {
        this._hardDiff = hardDiff;
        this._pos = createVector(0, 0);
        this._speed = createVector(1, 0);
        this._totalScore = 0;
        this._tail = [];
        this._food = new Food(this.pickFoodLocation());
        sessionStorage.setItem('currentScore', this._totalScore);
        if(this._hardDiff) {
            sessionStorage.setItem('gameMode', 'HARD');
        } else {
            sessionStorage.setItem('gameMode', 'EASY');
        }
    }

    // change direction of snake
    direction = (x, y) => {
        this._speed.x = x;
        this._speed.y = y;
    }

    // draw snake
    show = () => {
        fill(204);
        for (let i = 0; i < this._tail.length; i++) {
            rect(this._tail[i].x, this._tail[i].y, scl, scl);
        }
        fill(204, 51, 51);
        rect(this._pos.x, this._pos.y, scl, scl);
        fill(124, 252, 0);
        rect(this._food.pos().x, this._food.pos().y, scl, scl);
    }

    // update snake position on canvas
    update = () => {
        for (let i = 0; i < this._tail.length - 1; i++) {
            this._tail[i] = this._tail[i + 1];
        }
        if (this._totalScore >= 1) {
            this._tail[this._totalScore - 1] = createVector(this._pos.x, this._pos.y);
        }

        this._pos.x = this._pos.x + this._speed.x * scl;
        this._pos.y = this._pos.y + this._speed.y * scl;

        // difficulty logic for borders
        if(!this._hardDiff) {
            if(this._pos.x >= width) {
                this._pos.x = 0;
            } else if(this._pos.x <= -1) {
                this._pos.x = width;
            } else if(this._pos.y >= height) {
                this._pos.y= 0;
            } else if(this._pos.y <= -1) {
                this._pos.y = height;
            }
        }
    }

    // check death
    checkDeath = () => {
        // difficulty logic for borders
        if(this._hardDiff) {
            if(this._pos.x >= width - scl || this._pos.y >= height - scl || this._pos.x <= -1 || this._pos.y <= -1) {
                return true;
            }
        }
        // check colision with body
        for (let i = 0; i < this._tail.length; i++) {
            let body = this._tail[i];
            let d = dist(this._pos.x, this._pos.y, body.x, body.y);
            if (d < 1) {
                return true;
            }
        }
        return false;
    }

    // random food location
    pickFoodLocation = () => {
        let cols = floor(width / scl);
        let rows = floor(height / scl);
        let ranFoodPosition= createVector(floor(random(cols)), floor(random(rows)));
        ranFoodPosition.mult(scl);
        return ranFoodPosition;
    }

    // eat food and sessionStorage/score manage
    eat = () => {
        let d = dist(this._pos.x, this._pos.y, this._food.pos().x, this._food.pos().y);
        if (d < 1) {
            this._totalScore++;
            eatSound.play();
            sessionStorage.setItem('currentScore', this._totalScore);
            if(sessionStorage.getItem('highestScore') < this._totalScore) {
                sessionStorage.setItem('highestScore', this._totalScore);
                document.getElementById('header-highest').classList.add('score-info');
            }
            document.getElementById('header-current').classList.add('score-info');
            setTimeout( () => {(document.getElementById('header-current').classList.remove('score-info'))}, 250);
            setTimeout( () => {(document.getElementById('header-highest').classList.remove('score-info'))}, 250);
            this._food = new Food(this.pickFoodLocation());
        }
    }
}
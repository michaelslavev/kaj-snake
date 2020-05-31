let game;
let canvas;

function setup() {
    // --- | P5 SETUP
    canvas = createCanvas(500, 500);
    game = new Game();
    game.fetchAndRefreshData();
    canvas.parent('game-canvas');
    frameRate(10);

    // --- | Preventing scrolling on page with swiping, space and arrow keys
    window.addEventListener("keydown", (e) => {
        if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
            e.preventDefault();
        }
    }, false);  

    let hammer = new Hammer(document.body, () => {
        preventDefault: true
    });
    hammer.get('swipe').set({
        direction: Hammer.DIRECTION_ALL
    });
    hammer.on("swipe", swiped);
}

function draw() {
    if(game._state === 'init') {
        game.initGame();
    } else if(game._state === 'run') {
        game.runGame();
    } else if(game._state === 'end') {
        game.endGame();
    }
}

function keyPressed() {
    if (keyCode === UP_ARROW && game._snake._speed.y !== 1) {
        game._snake.direction(0, -1);
    } else if (keyCode === DOWN_ARROW && game._snake._speed.y !== -1) {
        game._snake.direction(0, 1);
    } else if (keyCode === RIGHT_ARROW && game._snake._speed.x !== -1) {
        game._snake.direction(1, 0);
    } else if (keyCode === LEFT_ARROW && game._snake._speed.x !== 1) {
        game._snake.direction(-1, 0);
    }
}

function swiped(event) {
    if (event.direction === 8 && game._snake._speed.y !== 1) {
        game._snake.direction(0, -1);
    } else if (event.direction === 16 && game._snake._speed.y !== -1) {
        game._snake.direction(0, 1);
    } else if (event.direction === 4 && game._snake._speed.x !== -1) {
        game._snake.direction(1, 0);
    } else if (event.direction === 2 && game._snake._speed.x !== 1) {
        game._snake.direction(-1, 0);
    }
  }
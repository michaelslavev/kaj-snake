let game;
let canvas;

// p5js setup function
function setup() {
    // --- | P5 SETUP
    if(window.innerWidth < 726) { // different size canvas for mobile devices
        canvas = createCanvas(300, 300);
    } else {
        canvas = createCanvas(500, 500);
    }
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

// p5js draw function called after setup
// continously called until noLoop fuction is called
function draw() {
    if(game._state === 'init') {
        game.initGame();
    } else if(game._state === 'run') {
        game.runGame();
    } else if(game._state === 'end') {
        game.endGame();
    }
}

// p5js function called every key press
function keyPressed() {
    // handles snake direction
    if(game._state === 'run') {
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
}

// hammerjs swipe function
function swiped(event) {
    // handling snake direction on swipe
    if(game._state === 'run') {
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
}


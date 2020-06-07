let soundState = true;
let modalVisible = false;

const deathSound = new Audio('resources/dead.wav');
const soundButton = document.querySelector('#sett-sound');
const soundIco = document.querySelector('#sound-ico');
const modalButtons = document.querySelectorAll('.modal-button');
const modal = document.querySelector('.modal');

// --| Sound
soundButton.addEventListener('click', () => {
    soundState = !soundState;
    if (soundState) {
        soundIco.classList.replace('fa-volume-off', 'fa-volume-up');
    } else {
        soundIco.classList.replace('fa-volume-up', 'fa-volume-off');
    }
});

// --| Modal
for (let i = 0; i < modalButtons.length; i++) {
    modalButtons[i].addEventListener('click', toggleModalState)
}
function toggleModalState () {
    modalVisible = !modalVisible;
    document.body.classList.toggle('modal-visible');
}


class Game {
    constructor() {
        this._state = 'init';
        this._diff = null;
        this._snake = null;
    }

    get state() {
        return this._state;
    }

    set state(state) {
        this._state = state;
    }

    // init game / menu
    initGame = () => {
        background(50, 50, 100);
        let easyB = createButton('EASY');
        let hardB = createButton('HARD');
        let chooseGame = 'CHOOSE GAME MODE';

        textSize(25);
        fill(255);
        text(chooseGame, width/2 - textWidth(chooseGame)/2, height/3+15);

        easyB.position(width/2 - 50, height/2-25);
        easyB.parent('game-canvas');
        easyB.addClass('btn btn-outline-light menu-btn');
        easyB.mousePressed (() => {
            this._diff = false;
            this.startGame(this._diff)
            easyB.remove();
            hardB.remove();
        });
        hardB.position(width/2 - 50, height/2+25);
        hardB.parent('game-canvas');
        hardB.addClass('btn btn-outline-light menu-btn');
        hardB.mousePressed (() => {
            this._diff = true;
            this.startGame(this._diff)
            easyB.remove();
            hardB.remove();
        });
        noLoop();
    }

    // start game - change game state to run and create new snake with selected difficulty
    startGame = (diff) => {
        this._state = 'run';
        this._snake = new Snake(diff);
        this.fetchAndRefreshData();
        loop();
    }

    // run game logic
    runGame = () => {
        background(52, 58, 64);

        this._snake.eat();
        if(this._snake.checkDeath()) {
            this._state = 'end';
            if(soundState) deathSound.play();
            return;
        }
        this._snake.update();
        this._snake.show();

        this.fetchAndRefreshData(); //score data fetch&refresh
    }

    // gameover screen
    endGame = () => {
        let retry = createButton('RETRY');
        let menu = createButton('MENU');
        let gameOver = 'GAME OVER';

        let currentScore = 'With score: ' + sessionStorage.getItem('currentScore');
        let gameMode = 'On game mode: ' + sessionStorage.getItem('gameMode');
        sessionStorage.setItem('currentScore', 'Start a game!');
        sessionStorage.setItem('gameMode', 'Start a game!');
        this.fetchAndRefreshData();

        textSize(30);
        fill(220, 20, 60);
        text(gameOver, width/2 - textWidth(gameOver)/2, height/5+15);

        textSize(15);
        fill(230);
        text(currentScore, width/2 - textWidth(currentScore)/2, height/5+45);
        text(gameMode, width/2 - textWidth(gameMode)/2, height/5+75);

        retry.position(width/2 - 50, height/2+10);
        retry.parent('game-canvas');
        retry.addClass('btn btn-outline-light menu-btn');
        retry.mousePressed (() => {
            this.startGame(this._diff)
            retry.remove();
            menu.remove();
        });
        menu.position(width/2 - 50, height/2+60);
        menu.parent('game-canvas');
        menu.addClass('btn btn-outline-light menu-btn');
        menu.mousePressed (() => {
            this.state = ('init');
            retry.remove();
            menu.remove();
            this.initGame();
        });

        noLoop();
    }

    // sessionStorage score fetch data and display
    fetchAndRefreshData = () => {
        let info_highest = document.getElementById('info-highest');
        let info_current = document.getElementById('info-current');
        let info_diff = document.getElementById('info-diff');

        info_highest.textContent = sessionStorage.getItem('highestScore')
            ? sessionStorage.getItem('highestScore') : 'No highest score yet!';
        info_current.textContent = sessionStorage.getItem('currentScore')
            ? sessionStorage.getItem('currentScore') : 'Start a game!';
        info_diff.textContent = sessionStorage.getItem('gameMode')
            ? sessionStorage.getItem('gameMode') : 'Start a game!';
    }
}
const selectFields = document.querySelectorAll('[data-cell]');
const gameInfo = document.querySelector('.game-info');
const selectModal = document.querySelector('.modal-start');
const startGame = document.querySelector('.start-game');
const restartGameBtn = document.querySelector('.restart-game');
const optionsSelector = document.querySelectorAll('[data-option]');
const playerOneScore = document.querySelector('.player-one-score');
const playerTwoScore = document.querySelector('.player-two-score');


function openModal(selectModal) {
    selectModal.classList.add('active');
}

function closeModal(selectModal) {
    selectModal.classList.remove('active');
}

function playerInfo (number, choice, score) {
    player = {};
    player.number = number;
    player.choice = choice;
    player.score = score;
    return player;
}

const playerOne = playerInfo('1', '', 0);
const playerTwo = playerInfo('2', '', 0);
let currentPlayer = [];
let oPlays = [];
let xPlays = [];
let currentWinner = []

function setPlayerOneChoice(selected) {
    playerOne.choice = selected;
}

function setPlayerTwoChoice(playerOne) {
    if(playerOne.choice == 'X') {
        playerTwo.choice = 'O';
    }
    else {
        playerTwo.choice = 'X';
    }
}

function switchPlayers(selectField) {
    if(currentPlayer == playerOne.choice) {
        currentPlayer = playerTwo.choice
        gameInfo.innerHTML = `It's player ${playerOne.number} turn (Choice: ${playerOne.choice})`
    }
    else {
        currentPlayer = playerOne.choice
        gameInfo.innerHTML = `It's player ${playerTwo.number} turn (Choice: ${playerTwo.choice})`
    }
    selectField.innerHTML = currentPlayer
}

const winConditions = [
    {a: 0, b: 1, c: 2},
    {a: 3, b: 4, c: 5},
    {a: 6, b: 7, c: 8},
    {a: 0, b: 3, c: 6},
    {a: 1, b: 4, c: 7},
    {a: 2, b: 5, c: 8},
    {a: 0, b: 4, c: 8},
    {a: 2, b: 4, c: 6}
];

function cellPlayed(field) {
    if(currentPlayer == 'O') {
        for(let i = 0; i < 1; i++) {
           oPlays.push(field[i])
        }
    }
    if(currentPlayer =='X') {
        for(let i = 0; i < field.length; i++) {
            xPlays.push(field[i])
        }
    }
}

function isWinner() {    
    for(i = 0; i < winConditions.length; i ++){
        let a = winConditions[i].a
        let b = winConditions[i].b
        let c = winConditions[i].c
    
        if(`${oPlays}`.includes(a) == true && `${oPlays}`.includes(b) == true && `${oPlays}`.includes(c) == true) {
            gameInfo.innerHTML = `${currentPlayer} won!`
            currentWinner = `${currentPlayer}`
        }
        if(`${xPlays}`.includes(a) == true && `${xPlays}`.includes(b) == true && `${xPlays}`.includes(c) == true) {
            gameInfo.innerHTML = `${currentPlayer} won!`
            currentWinner = `${currentPlayer}`
        }
        if(`${xPlays}`.length >= 9 || `${oPlays}`.length >= 9) {
            gameInfo.innerHTML = 'It\'s a draw.'
            currentWinner = 'It\'s a draw.'          
        }
    }
}

function setScores() {
    if(currentWinner == 'O') {
        for(i = 0; i < 1; i++) {
            playerOneScore.innerHTML++
        }
    }   
    if(currentWinner == 'X') {
        for(i = 0; i < 1; i++) {
            playerTwoScore.innerHTML++
        }
    }  
}

function endRound() {
    if(currentWinner != '') {
        selectFields.forEach(selectField => {
            selectField.innerHTML = ''
        })
    oPlays = [];
    xPlays = [];
    currentPlayer = [];
    currentWinner = [];
    }
}

function restartGame() {
    selectFields.forEach(selectField => {
        selectField.innerHTML = ''
    })
    gameInfo.innerHTML = 'Click Start Game to start playing!';
    oPlays = [];
    xPlays = [];
    currentPlayer = [];
    currentWinner = [];
    playerOneScore.innerHTML = 0;
    playerTwoScore.innerHTML = 0;
}

//Event Listeners
startGame.addEventListener('click', e => {
    openModal(selectModal);
});

optionsSelector.forEach(optionSelector => {
    optionSelector.addEventListener('click', e => {
        const selected = optionSelector.dataset.option;
        setPlayerOneChoice(selected);
        setPlayerTwoChoice(playerOne);
        closeModal(selectModal);
    })
});

selectFields.forEach(selectField => {
    selectField.addEventListener('click', e => {
        const field = selectField.dataset.cell;
        switchPlayers(selectField);
        cellPlayed(field);
        isWinner()
        setScores()
        setTimeout(endRound, 3000)
    })
});

restartGameBtn.addEventListener('click', e => {
    restartGame()
})

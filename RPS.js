let score = JSON.parse(localStorage.getItem('score')) || {
    win: 0,
    lose: 0,
    tie: 0
};

function game(yourMove) {
    const moves = ['rock', 'paper', 'scissors'];
    const emojis = {
        rock: '👊',
        paper: '🖐️',
        scissors: '✌️'
    };

    const randomNum = Math.floor(Math.random() * 3);
    const computerMove = moves[randomNum];

    let result = '';

    if (yourMove === computerMove) {
        score.tie++;
        result = 'Tie';
    } else if (
        (yourMove === 'rock' && computerMove === 'scissors') ||
        (yourMove === 'paper' && computerMove === 'rock') ||
        (yourMove === 'scissors' && computerMove === 'paper')
    ) {
        score.win++;
        result = 'You won';
    } else {
        score.lose++;
        result = 'You lost';
    }

    localStorage.setItem('score', JSON.stringify(score));

    const display = document.getElementById('score-display');
    display.innerHTML = `
        <p>Your move: ${emojis[yourMove]} | Computer move: ${emojis[computerMove]}</p>
        <p>Result: ${result}</p>
        <p>Score → Win: ${score.win} | Lose: ${score.lose} | Tie: ${score.tie}</p>
    `;
}

function reset() {
    score = {
        win: 0,
        lose: 0,
        tie: 0
    };
    localStorage.setItem('score', JSON.stringify(score));

    document.getElementById('score-display').innerHTML = '<p>Score reset.</p>';
}

let plays = null;

function autoPlay() {
    const moves = ['rock', 'paper', 'scissors']; 
    // const computerMove = moves[Math.floor(Math.random() * 3)]
    if (plays !== null) return;

    plays = setInterval(() => { 
       const yourMove = moves[Math.floor(Math.random() * 3)];
       game(yourMove)}, 1000)

    if (!document.getElementById('end-play')) {
      const endPlay = document.createElement('button');
      endPlay.textContent = 'End play';
      endPlay.classList.add('utility-button')
      endPlay.id = 'end-play';
      
      endPlay.onclick = () => {
        clearInterval(plays);
        plays = null
        document.getElementById('score-display').innerHTML =
        '<p>Auto play has been disabled</p>'};
      document.querySelector('.utility-section').appendChild(endPlay)
      }
}

const closeMenu = document.querySelector('.close-xtra-feat');
const utilityDisplay = document.querySelector('.extra-features');

closeMenu.addEventListener('click', () => {
    utilityDisplay.classList.remove('extra-features-mod')
})

const openMenu = document.querySelector('.open-xtra-feat')

openMenu.addEventListener('click', () => {
    utilityDisplay.classList.add('extra-features-mod')
})
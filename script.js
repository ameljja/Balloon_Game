const body = document.querySelector('body');
const scoreboard = body.querySelector('svg#score');
const heading = body.querySelector('h1');
const subheading = body.querySelector('h2'); // position whenever a click on a balloon is registered

let counter = 0;
const balloons = 15;
let score = 0;
const { offsetWidth: width, offsetHeight: height } = body;
const [min, max] = [width, height].sort((a, b) => (a > b ? 1 : -1));
const tenth = max / 10;
const randomInt = (cap = 10) => Math.floor(Math.random() * cap);

function popBalloon(e) {
    this.style.animation = 'pop 0.2s ease-out forwards';

    const { clientX: left, clientY: top } = e;
    subheading.style.left = `${left}px`;
    subheading.style.top = `${top}px`;
    subheading.style.opacity = 1;

    score += 1;
    scoreboard.querySelector('text').textContent = `${score}x`;

    this.removeEventListener('click', popBalloon);
}

function showScore() {
    subheading.style.opacity = 0;
    const timeoutID = setTimeout(() => {
        scoreboard.style.animation = 'showScore 1s ease-out forwards';
        scoreboard.querySelector('text').style.animation = 'highlightScore 0.5s 1.2s 5 step-end';
        clearTimeout(timeoutID);
    }, 3000);
}

function playGame() {
    const intervalID = setInterval(() => {
        const left = randomInt(width);
        const top = randomInt(height)

        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

        svg.setAttribute('viewBox', '0 0 100 100');
        svg.setAttribute('width', tenth);
        svg.setAttribute('height', tenth);
        svg.style.position = 'absolute';
        svg.style.top = `${top}px`;
        svg.style.left = `${left}px`;
        svg.classList.add('balloon');
        svg.style.animation = `appear 2s ${randomInt(5)}s ease-out forwards`;
        svg.addEventListener('click', popBalloon);

        // add to the SVG the path elements making up the balloon's shape
        svg.innerHTML = `<path d="M 50 0 a 50 45 0 0 1 50 45 a 50 50 0 0 1 -50 50 a 50 50 0 0 1 -50 -50 a 50 45 0 0 1 50 -45" fill="#FF1EAD" />
        <path d="M 50 94 a 6 6 0 0 1 6 6 h -12 a 6 6 0 0 1 6 -6" fill="#FF1EAD" />
        <path d="M 50 5 a 40 40 0 0 1 40 40 a 5 5 0 0 1 -5 5 a 40 40 0 0 0 -40 -40 a 5 5 0 0 1 5 -5" fill="#fff" opacity="0.3" />`;

        body.appendChild(svg);

        counter += 1;

        if (counter >= balloons - 1) {
            svg.addEventListener('animationend', showScore);
            clearInterval(intervalID);

        }
    }, 1000);
}

heading.addEventListener('animationend', playGame);
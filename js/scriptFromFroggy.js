window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

const recognition = new SpeechRecognition()
// recognition.interimResults = true
// recognition.continuous = true;
// recognition.onspeechend = function () {
//     console.log('Speech has ended.')
// }

const landing = document.querySelector('.landing')
const rules = document.querySelector('.rules') 
const game = document.querySelector('.game')
const frog = document.querySelector('.game__sprite')
const flag = document.querySelector('.game__level--flag')
console.dir(frog)
console.dir(flag)

function startGame() {
    frog.classList.remove('sprite-move')
    setTimeout(() => {
        frog.classList.add('sprite-move')
    }, 10000);
}

recognition.addEventListener('result', e => {
    const words = [...e.results]
        .map(result => result[0])
        .map(result => result.transcript)
        .join('')
    if (words.includes('start')) {
        landing.classList.add('hidden')
        game.classList.add('hidden')
        rules.classList.remove('hidden')
    }
    else if (words.includes('begin')) {
        rules.classList.add('hidden')
        landing.classList.add('hidden')
        game.classList.remove('hidden')
        startGame()
    }
    else if (words.includes('quit')) {
        rules.classList.add('hidden')
        game.classList.add('hidden')
        landing.classList.remove('hidden')
    }
    else if (words.includes('jump')) {
        frog.classList.add('sprite-jump')
        setTimeout(() => {
            frog.classList.remove('sprite-jump')
        }, 700);
    }
});

recognition.addEventListener('end', recognition.start)
recognition.start()
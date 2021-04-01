//card options
let level1Cards = [
    {
        name: 'pig',
        img: 'src/images/pig.jpg',
    },
    {
        name: 'octopus',
        img: 'src/images/octopus.jpg',
    },
    {
        name: 'cat',
        img: 'src/images/cat.jpg',
    },
    {
        name: 'bird',
        img: 'src/images/bird.jpg',
    },
    {
        name: 'dog',
        img: 'src/images/dog.jpg',
    },
    {
        name: 'monkey',
        img: 'src/images/monkey.jpg',
    },
    {
        name: 'pig',
        img: 'src/images/pig.jpg',
    },
    {
        name: 'octopus',
        img: 'src/images/octopus.jpg',
    },
    {
        name: 'cat',
        img: 'src/images/cat.jpg',
    },
    {
        name: 'bird',
        img: 'src/images/bird.jpg',
    },
    {
        name: 'dog',
        img: 'src/images/dog.jpg',
    },
    {
        name: 'monkey',
        img: 'src/images/monkey.jpg',
    },
]

let level2Cards = [
    {
        name: 'cheeta',
        img: 'src/images/cheeta.jpg',
    },
    {
        name: 'cheeta',
        img: 'src/images/cheeta.jpg',
    },
    {
        name: 'bunny',
        img: 'src/images/bunny.jpg',
    },
    {
        name: 'bunny',
        img: 'src/images/bunny.jpg',
    },
    {
        name: 'cow',
        img: 'src/images/cow.jpg',
    },
    {
        name: 'cow',
        img: 'src/images/cow.jpg',
    },
    {
        name: 'ladybug',
        img: 'src/images/ladybug.jpg',
    },
    {
        name: 'ladybug',
        img: 'src/images/ladybug.jpg',
    },
]
//global variables
let grid
let resultDisplay
let cardsChosen = []
let cardsChosenIds = []
let cardsWon = []
// listenerFunctions is a map of id: listener to help addEventListener and removeEventListener reference
// the same function for flipCard since it takes 2 variables
let listenerFunctions = {}
let level = 1
let levelBanner

//function to shuffle the memory cards randomly
function shuffle(cardArray) {
    for(let i = cardArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i)
    const temp = cardArray[i]
    cardArray[i] = cardArray[j]
    cardArray[j] = temp
    }   
}

//on the display - flip card from blank to animal
function flipCard(card, board) {
    let cardId = card.getAttribute('data-id')
    cardsChosen.push(board[cardId].name)
    cardsChosenIds.push(cardId)
    card.setAttribute('src', board[cardId].img)
    if (cardsChosen.length === 2) {
        setTimeout(function() { checkForMatch(board) }, 500)
    }
    console.log(cardsChosenIds)
}

//see if the data IDs match for chosen cards and if so, add points + white screen. If not, flip back over
function checkForMatch(board) {
    const cards = document.querySelectorAll('img')
    const optionOneId = cardsChosenIds[0] 
    const optionTwoId = cardsChosenIds[1]


    if (optionOneId === optionTwoId) {
    alert('You have clicked the same image!')
    cards[optionOneId].setAttribute('src', 'src/images/blank.png')
    cards[optionTwoId].setAttribute('src', 'src/images/blank.png')
    } else if(cardsChosen[0] === cardsChosen[1]){
        alert('You have found a match!')
    cards[optionOneId].setAttribute('src', 'src/images/white.png')
    cards[optionTwoId].setAttribute('src', 'src/images/white.png')  
    cards[optionOneId].removeEventListener('click', listenerFunctions[optionOneId])
    cards[optionTwoId].removeEventListener('click', listenerFunctions[optionTwoId])
    cardsWon.push(cardsChosen)
    } else {
        cards[optionOneId].setAttribute('src', 'src/images/blank.png')
        cards[optionTwoId].setAttribute('src', 'src/images/blank.png')
        alert('Try Again!')
    }
    cardsChosen = []
    cardsChosenIds = []
    resultDisplay.textContent = "Score: " + cardsWon.length
    if (cardsWon.length === board.length/2)
    {
        resultDisplay.textContent = 'Winner!'

        //button goes here - need to add onclick event
        level += 1
        if (level === 2) {
            let nextLevelButton = document.createElement('button')
            let body = document.querySelector('body')
            body.insertBefore(nextLevelButton, body.children[3])
            nextLevelButton.classList.add('nextLevelButton')
            nextLevelButton.textContent = 'Next Level'
            nextLevelButton.addEventListener('click', function() {
                startGame(level)
                body.removeChild(nextLevelButton)
            })
        } else {
            resultDisplay.textContent += " You've beaten all the levels!"
        }

    }

} 

function createBoard(board) {
    // clear your grid
    while (grid.firstChild) {
        grid.removeChild(grid.firstChild)
    }
    // clear your cardsWon
    cardsWon = []
    for(let i = 0; i < board.length; i++){
        const card = document.createElement('img')
        card.setAttribute('src', 'src/images/blank.png')
        card.setAttribute('data-id', i)
        listenerFunctions[i] = function() {
            flipCard(card, board)
        }
        card.addEventListener('click', listenerFunctions[i])
        grid.appendChild(card)
    }
}

function startGame(level) {
    resultDisplay.innerHTML = "Score: 0"
    levelBanner.innerHTML = "Level " + level
    let board = []
    if(level === 1) {
        board = [...level1Cards]
        grid.classList.add('grid1')
        grid.classList.remove('grid2')
    } else if(level === 2) {
        board = [...level1Cards, ...level2Cards]
        grid.classList.add('grid2')
        grid.classList.remove('grid1')
    }
    shuffle(board)
    createBoard(board)
}


document.addEventListener('DOMContentLoaded', () => {
    grid = document.querySelector('.grid')
    resultDisplay = document.querySelector('.scoreDisplay')
    levelBanner = document.querySelector('.levelBanner')
    startGame(level)
})

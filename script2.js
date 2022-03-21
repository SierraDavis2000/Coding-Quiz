const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const scoreText = document.querySelector('#score');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: "Which of the following is not a programing language?",
        choice1:"Python",
        choice2: "Java",
        choice3: "TypeScript",
        choice4: "Rattlesnake",
        answer: 4,

    },
    {
        question: "What does HTML stand for?",
        choice1:"HyperText Markup Language",
        choice2: "Home Tool Markup Language",
        choice3: "High Traffic Media Language",
        choice4: "High Text Markup Language",
        answer: 1,
    },
    {
        question: "Where is the JavaScript placed inside an HTML document or page?",
        choice1:"In the <body> and <head> sections",
        choice2: "In the <footer> section",
        choice3: "In the <meta> section",
        choice4: "In the <title> section",
        answer: 1,
      
    },
    {
        question: "In JavaScript, what element is used to store and manipulate text, usually in multiples?",
        choice1:"Arrays",
        choice2: "Strings",
        choice3: "Variables",
        choice4: "Recorders",
        answer: 2,
    
    },
    {
        question: "Which is the largest unit of storage?",
        choice1:"Megabyte",
        choice2: "Terabyte",
        choice3: "Gigabyte",
        choice4: "Kilobyte",
        answer: 2,
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 4

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('end.html')
    }

    questionCounter++

    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()
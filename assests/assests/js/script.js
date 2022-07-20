var start = document.querySelector("#startpage");
var startBtn = document.querySelector("#start_button");
var introPage =document.querySelector("#intro_page");

var quizPage = document.querySelector("#quiz_page");
var currentQuestion = document.querySelector("#current_question");

var reactButtons = document.querySelectorAll(".choices");
var answerBtn1 = document.querySelector("#answer_btn1");
var answerBtn2 = document.querySelector("#answer_btn2");
var answerBtn3 = document.querySelector("#answer_btn3");
var answerBtn4 = document.querySelector("#answer_btn4");

var checkLine = document.querySelector("#check_line");
var scoreBoard = document.querySelector("#submit_page");
var finalScore = document.querySelector("#final_score");
var userInitial =document.querySelector("#initial");

var submitBtn =document.querySelector("#submit_btn");
var highScorePage =document.querySelector("#highscore_page");
var scoreRecord =document.querySelector("#score_record");
var scoreCheck =document.querySelector("#final_score");
var finish =document.querySelector("#finish");

var backBtn =document.querySelector("#back_btn");
var clearBtn=document.querySelector("#clear_btn");


//


let questions = [
    {
        question: "Which of the following is not a programing language?",
        choices:["A. Python", "B. Java", "C. TypeScript", "D. Rattlesnake"],
        answer: ["D. Rattlesnake"],

    },
    {
        question: "What does HTML stand for?",
        choices:["A. HyperText Markup Language", "B. Home Tool Markup Language", "C. High Traffic Media Language", "D. High Text Markup Language"],
        answer: ["A. HyperText Markup Language"],
    },
    {
        question: "Where is the JavaScript placed inside an HTML document or page?",
        choices:["A. In the <body> and <head> sections", "B. In the <footer> section", "C. In the <meta> section", "D. In the <title> section"], 
        answer: ["A. In the <body> and <head> sections"],
      
    },
    {
        question: "In JavaScript, what element is used to store and manipulate text, usually in multiples?",
        choices:["A. Arrays", "B. Strings", "C. Variables", "D. Recorders"],
        answer: ["B. Strings"],
    
    },
    {
        question: "Which is the largest unit of storage?",
        choices:["A. Megabyte", "B. Terabyte", "C. Gigabyte", "D. Kilobyte"],
        answer: ["B. Terabyte"],
    }
]

var timeRemaining = document.getElementById("timer");

var secondsLeft = 60;
var questionNumber = 0;
var totalScore = 0;
var questionCount = 1;

function timer() {
        
    var timerInterval = setInterval(function () {

      secondsLeft--;
      timeRemaining.textContent = "Time left: " + secondsLeft + " s";

        if (secondsLeft <= 0){
            clearInterval(timerInterval);
            timeRemaining.textContent = "The Quiz is Now Over"; 
            finish.textContent = "The Quiz is Now Over";
            finishQuiz();

        } else  if(questionCount >= questions.length +1) {
            clearInterval(timerInterval);
            finishQuiz();
            } 
}, 1000);
}

function startQuiz () {
    introPage.style.display = "none";
    quizPage.style.display = "block";
    questionNumber = 0
    timer();
    showQuestion(questionNumber);
  
}

function showQuestion (n) {
    currentQuestion.textContent = questions[n].question;
    answerBtn1.textContent = questions[n].choices[0];
    answerBtn2.textContent = questions[n].choices[1];
    answerBtn3.textContent = questions[n].choices[2];
    answerBtn4.textContent = questions[n].choices[3];
    questionNumber = n;
}

function checkAnswer(event) {
    //event.preventDefault();
    checkLine.style.display = "block";
    setTimeout(function () {
        checkLine.style.display = 'none';
    }, 1000);

    if (questions[questionNumber].answer == event.target.value) {
        checkLine.textContent = "Correct!"; 
        totalScore = totalScore + 1;

    } else {
        secondsLeft = secondsLeft - 10;
        checkLine.textContent = "Incorrect! The correct answer is " + questions[questionNumber].answer + " .";
    }
    if (questionNumber < questions.length -1 ) {
        showQuestion(questionNumber +1);
    } else {
    finishQuiz();
    }
    questionCount++;
}

function finishQuiz() {

    quizPage.style.display = "none";
    scoreBoard.style.display = "block";
    console.log(scoreBoard);
    finalScore.textContent = "Your final score is :" + totalScore ; 
    timeRemaining.style.display = "none"; 
};

function getScore () {
var currentList =localStorage.getItem("ScoreList");
if (currentList !== null ){
    freshList = JSON.parse(currentList);
    return freshList;
} else {
    freshList = [];
}
return freshList;
};


// render score to the score board
function renderScore () {
    scoreRecord.innerHTML = "";
    scoreRecord.style.display ="block";
    var highScores = sort();   
};


function sort () {
    var unsortedList = getScore();
    if (getScore == null ){
        return;
    } else{
    unsortedList.sort(function(a,b){
        return b.score - a.score;
    })
    return unsortedList;
}};


function addItem (n) {
    var addedList = getScore();
    addedList.push(n);
    localStorage.setItem("ScoreList", JSON.stringify(addedList));
};

function saveScore () {
    var scoreItem ={
        user: userInitial.value,
        score: totalScore
    }
    addItem(scoreItem);
    renderScore();
}


startBtn.addEventListener("click", startQuiz);


reactButtons.forEach(function(event){

    event.addEventListener("click", checkAnswer);
});


submitBtn.addEventListener("click", function(event) {
    event.preventDefault();
    scoreBoard.style.display = "none";
    introPage.style.display = "none";
    highScorePage.style.display = "block";
    quizPage.style.display ="none";
    saveScore();
});


scoreCheck.addEventListener("click", function(event) {
    event.preventDefault();
    scoreBoard.style.display = "none";
    introPage.style.display = "none";
    highScorePage.style.display = "block";
    quizPage.style.display ="none";
    renderScore();
});

//go back to main page
backBtn.addEventListener("click",function(event){
        event.preventDefault();
        scoreBoard.style.display = "none";
        introPage.style.display = "block";
        highScorePage.style.display = "none";
        quizPage.style.display ="none";
        location.reload();
});

//clear local storage and clear page shows
clearBtn.addEventListener("click",function(event) {
    event.preventDefault();
    localStorage.clear();
    renderScore();
});
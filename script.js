var timeLeft = document.querySelector("#secondsLeft");
var currentScore = document.querySelector("#currentScore");
var beginButton = document.querySelector("#beginQuiz");
var beginSection = document.querySelector("#beginSection");
var quizSection = document.querySelector("#quizHolder");
var currentQuestion = document.querySelector("#currentQuestion");
var optionOne = document.querySelector("#answerA");
var optionTwo = document.querySelector("#answerB");
var optionThree = document.querySelector("#answerC");
var optionFour = document.querySelector("#answerD");
var finalResultScreen = document.querySelector("#finalResults");
var finalScore = document.querySelector("#finalScore");
var leaderboardView = document.querySelector("#leaderboardBox");
var saveScoreBtn = document.querySelector("#saveYourScore");
var nameInput = document.querySelector("#nameInput");
var seeScoresBtn = document.querySelector("#seeScores");
var leaderboardScores = document.querySelector("#leaderboard");
var clearScoresBtn = document.querySelector("#clearScores");
var retakeQuizBtn = document.querySelector("#retakeQuiz");


var answerButtons = [optionOne, optionTwo, optionThree, optionFour];
var score = 0;
var questionNumber = 0;
var timer = 60;
var timerIsRunning;

retakeQuizBtn.addEventListener("click", function () {
    beginSection.setAttribute("class", "container");
    quizSection.setAttribute("class", "container hide");
    finalResultScreen.setAttribute("class", "container hide");
    leaderboardView.setAttribute("class", "container hide");
});

initLocalStorage();

//initiates quiz
beginButton.addEventListener("click", function () {
    score = 0;
    questionNumber = 0;
    timer = 60;
    initiateTimer(timer);
    beginSection.setAttribute("class", "container hide");
    quizSection.setAttribute("class", "container");
    currentScore.innerHTML = score;
    timeLeft.innerHTML = timer;
    timerIsRunning = setInterval(function () {
        timer--;
        timeLeft.innerHTML = timer;
        if (timer <= 0) {
            quizSection.setAttribute("class", "container hide");
            finalResultScreen.setAttribute("class", "container");
            leaderboardView.setAttribute("class", "container");
            finalScore.innerHTML = " " + score;
            clearInterval(timerIsRunning);
        };
    }, 1000);
    displayQuestions(questionNumber);
    initLocalStorage();
    renderLearboard();
    displayLeaderboard();
});

//countdown timer
function initiateTimer(timer) {
    timer--;
    timeLeft.innerHTML = timer;
};

//load up each question and answers
function displayQuestions(currentQuestionIndex) {
    enableButtons();
    if (currentQuestionIndex >= 10) {
        quizSection.setAttribute("class", "container hide");
        finalResultScreen.setAttribute("class", "container");
        leaderboardView.setAttribute("class", "container");
        finalScore.innerHTML = " " + score + " points";
        clearInterval(timerIsRunning);
    } else if (currentQuestionIndex < 10) {
        currentQuestion.innerHTML = JSON.stringify(quizQuestions[currentQuestionIndex].question).replace(/"/g, "");
        optionOne.innerHTML = JSON.stringify(quizQuestions[currentQuestionIndex].answers[0].a).replace(/"/g, "");
        optionTwo.innerHTML = JSON.stringify(quizQuestions[currentQuestionIndex].answers[1].b).replace(/"/g, "");
        optionThree.innerHTML = JSON.stringify(quizQuestions[currentQuestionIndex].answers[2].c).replace(/"/g, "");
        optionFour.innerHTML = JSON.stringify(quizQuestions[currentQuestionIndex].answers[3].d).replace(/"/g, "");
        for (i = 0; i < answerButtons.length; i++) {
            answerButtons[i].setAttribute("class", "btn btn-light btn-lg btn-block text-left");
        };
    };
};

optionOne.addEventListener("click", function () {
    isCorrect = quizQuestions[questionNumber].answers[0].correct;
    wrongOrRight(optionOne);
    disableButtons();
    nextQuestion();
});

optionTwo.addEventListener("click", function () {
    isCorrect = quizQuestions[questionNumber].answers[1].correct;
    wrongOrRight(optionTwo);
    disableButtons();
    nextQuestion();
});

optionThree.addEventListener("click", function () {
    isCorrect = quizQuestions[questionNumber].answers[2].correct;
    wrongOrRight(optionThree);
    disableButtons();
    nextQuestion();
});

optionFour.addEventListener("click", function () {
    isCorrect = quizQuestions[questionNumber].answers[3].correct;
    wrongOrRight(optionFour);
    disableButtons();
    nextQuestion();
});

function wrongOrRight(whatsTheQuestion) {
    if (isCorrect) {
        whatsTheQuestion.setAttribute("class", "btn btn-success btn-lg btn-block text-left disabled");
        score += 100;
        timer += 0;
        currentScore.innerHTML = score;
    } else {
        whatsTheQuestion.setAttribute("class", "btn btn-danger btn-lg btn-block text-left disabled");
        score -= 25;
        timer -= 4;
        currentScore.innerHTML = score;
    };
};

//gets next question
function nextQuestion() {
    questionNumber++;
    setTimeout(function () {
        displayQuestions(questionNumber);
    }, 1000);
};

//disable buttons after user selects answer
function disableButtons() {
    for (i = 0; i < answerButtons.length; i++) {
        answerButtons[i].disabled = true;
    };
};

//enable buttons with new question
function enableButtons() {
    for (i = 0; i < answerButtons.length; i++) {
        answerButtons[i].disabled = false;
    };
};
//save scores
saveScoreBtn.addEventListener("click", function () {
    var playerName = nameInput.value;
    if (playerName === null || playerName === "") {
        alert("Please provide a name for your score.");
    } else {
        initLocalStorage();
        renderLearboard();
        var newScore = playerName + ": " + score;
        var currentLeaderboard = JSON.parse(localStorage.getItem("codeQuizLeaderScores"));
        currentLeaderboard.push(newScore);
        localStorage.setItem("codeQuizLeaderScores", JSON.stringify(currentLeaderboard));
        displayLeaderboard();
        finalResultScreen.setAttribute("class", "container hide");
    };
});

//see scores
seeScoresBtn.addEventListener("click", function (event) {
    initLocalStorage();
    renderLearboard();
    displayLeaderboard();
    event.preventDefault();
    leaderboardView.setAttribute("class", "container");
    finalResultScreen.setAttribute("class", "container hide");
    quizSection.setAttribute("class", "container hide");
    beginSection.setAttribute("class", "container hide");
});

//loops through scores saved in local storage and prepends them to Recent Scores
function displayLeaderboard() {
    var currentLeaderboard = JSON.parse(localStorage.getItem("codeQuizLeaderScores"));
    for (i = 0; i < currentLeaderboard.length; i++) {
        singleScore = currentLeaderboard[i];
        var para = document.createElement("p");
        para.classList.add("individualScore");
        para.textContent = singleScore + " points";
        leaderboardScores.prepend(para);
    };
};

//clear leaderboard
clearScoresBtn.addEventListener("click", function () {
    localStorage.removeItem("codeQuizLeaderScores");
    renderLearboard();
});

//empty leaderboard scores on page
function renderLearboard() {
    leaderboardScores.innerHTML = "";
};

//create leaderboard key in local storage
function initLocalStorage() {
    if (localStorage.getItem("codeQuizLeaderScores") === null) {
        localStorage.setItem("codeQuizLeaderScores", "[]");
    };
};

//quiz questions
var quizQuestions = [
    {
        question: "1. In which year was JavaScript created?",
        answers: [
            { a: "a. 1990", correct: false },
            { b: "b. 1995", correct: true },
            { c: "c. 2000", correct: false },
            { d: "d. 2005", correct: false },
        ]
    }, {
        question: "2. Select the array.",
        answers: [
            { a: "a. var greeting = 'Hello World'", correct: false },
            { b: "b. var greeting = ['Hello', 'World']", correct: true },
            { c: "c. var greeting = 'Hello', 'World'", correct: false },
            { d: "d. var greeting = 'Hello' + 'World'", correct: false }
        ]
    }, {
        question: "3. Which method would you use to remove whitespace from a string?",
        answers: [
            { a: "a. .trim()", correct: true },
            { b: "b. .parseFloat()", correct: false },
            { c: "c. .join()", correct: false },
            { d: "d. .concat()", correct: false }
        ]
    }, {
        question: "4. Which of the following is a boolean data type?",
        answers: [
            { a: "a. 15", correct: false },
            { b: "b. null", correct: false },
            { c: "c. undefined", correct: false },
            { d: "d. true", correct: true }
        ]
    }, {
        question: "5. Which method would you use to call a function at specified intervals?",
        answers: [
            { a: "a. clearInterval()", correct: false },
            { b: "b. setInterval()", correct: true },
            { c: "c. clearTimeout()", correct: false },
            { d: "d. setTimeout()", correct: false }
        ]
    }, {
        question: "6. Which method will round down to the nearest integer?",
        answers: [
            { a: "a. Math.min()", correct: false },
            { b: "b. Math.random()", correct: false },
            { c: "c. Math.floor()", correct: true },
            { d: "d. Math.ceil()", correct: false }
        ]
    }, {
        question: "7. Which of these would be a correct way to declare a variable in JavaScript?",
        answers: [
            { a: "a. variable currentWeather = 'sunny'", correct: false },
            { b: "b. v currentWeather = 'sunny'", correct: false },
            { c: "c. var currentWeather = 'sunny'", correct: true },
            { d: "d. my var currentWeather = 'sunny'", correct: false }
        ]
    }, {
        question: "8. JavaScript variables cannot start with a(n) _____.",
        answers: [
            { a: "a. number", correct: true },
            { b: "b. lowercase letter", correct: false },
            { c: "c. uppercase letter", correct: false },
            { d: "d. underscore (_)", correct: false }
        ]
    }, {
        question: "9. Who is the creator of JavaScript?",
        answers: [
            { a: "a. Alan Turing", correct: false },
            { b: "b. Bill Gates", correct: false },
            { c: "c. Steve Jobs", correct: false },
            { d: "d. Brendan Eich", correct: true }
        ]
    }, {
        question: "10. localStorage always saves data as a ___.",
        answers: [
            { a: "a. boolean", correct: false },
            { b: "b. string", correct: true },
            { c: "c. object", correct: false },
            { d: "d. number", correct: false }
        ]
    }
];
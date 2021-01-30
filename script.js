var timeLeft = document.querySelector("#secondsLeft");
var currentScore = document.querySelector("#currentScore");
var beginButton = document.querySelector("#beginQuiz");
var beginSection = document.querySelector("#beginSection");
var quizSection = document.querySelector("#quizHolder");
var currentQuestion = document.querySelector("#currentQuestion")
var optionOne = document.querySelector("#answerA")
var optionTwo = document.querySelector("#answerB")
var optionThree = document.querySelector("#answerC")
var optionFour = document.querySelector("#answerD")
var finalResultScreen = document.querySelector("#finalResults")
var finalScore = document.querySelector("#finalScore")
var leaderboardView = document.querySelector("#leaderboardBox")
var saveScoreBtn = document.querySelector("#saveYourScore")
var nameInput = document.querySelector("#nameInput")
var seeScoresBtn = document.querySelector("#seeScores")
var leaderboardScores = document.querySelector("#leaderboard")


var score = 0;
var timer = 30;
var questionNumber = 0;

//initiates quiz
beginButton.addEventListener("click", function(){
    beginSection.classList.add("hide");
    quizSection.classList.remove("hide")
    timeLeft.innerHTML = timer;
    initiateTimer();
    var timerIsRunning = setInterval(function(){
        timeLeft.innerHTML = timer;
        timer--;
        console.log(timer)
        if (timer <= -1){
        quizSection.classList.add("hide");
        finalResultScreen.classList.remove("hide");
        leaderboardView.classList.remove("hide");
        finalScore.innerHTML = " " + score;
        clearInterval(timerIsRunning);
        };
    }, 1000);
    displayQuestions(questionNumber);
});

function initiateTimer(){
    timeLeft.innerHTML = timer;
    timer--;
    }
function displayQuestions(currentQuestionIndex){
    if (currentQuestionIndex >=10){
        quizSection.classList.add("hide");
        finalResultScreen.classList.remove("hide");
        leaderboardScores.classList.remove("hide");
        finalScore.innerHTML = " " + score;
        return;
    }
    enableButtons();
    currentQuestion.innerHTML = JSON.stringify(quizQuestions[currentQuestionIndex].question).replace(/"/g,"");
    
    optionOne.innerHTML = JSON.stringify(quizQuestions[currentQuestionIndex].answers[0].a).replace(/"/g, "");
    optionTwo.innerHTML = JSON.stringify(quizQuestions[currentQuestionIndex].answers[1].b).replace(/"/g, "");
    optionThree.innerHTML = JSON.stringify(quizQuestions[currentQuestionIndex].answers[2].c).replace(/"/g, "");
    optionFour.innerHTML = JSON.stringify(quizQuestions[currentQuestionIndex].answers[3].d).replace(/"/g, "");
    
    optionOne.setAttribute("class", "btn btn-light btn-lg btn-block text-left");
    optionTwo.setAttribute("class", "btn btn-light btn-lg btn-block text-left");
    optionThree.setAttribute("class", "btn btn-light btn-lg btn-block text-left");
    optionFour.setAttribute("class", "btn btn-light btn-lg btn-block text-left");

}

optionOne.addEventListener("click", function(){
    isCorrect = quizQuestions[questionNumber].answers[0].correct
    console.log(isCorrect)
    wrongOrRight(optionOne);
    disableButtons();
    questionNumber++;
    setTimeout(function(){
        displayQuestions(questionNumber);
    }, 1000);
})

optionTwo.addEventListener("click", function(){
    isCorrect = quizQuestions[questionNumber].answers[1].correct
    console.log(isCorrect)
    wrongOrRight(optionTwo);
    disableButtons();
    questionNumber++;
    setTimeout(function(){
        displayQuestions(questionNumber);
    }, 1000);
})

optionThree.addEventListener("click", function(){
    isCorrect = quizQuestions[questionNumber].answers[2].correct
    console.log(isCorrect)
    wrongOrRight(optionThree);
    disableButtons();
    questionNumber++;
    setTimeout(function(){
        displayQuestions(questionNumber);
    }, 1000);
})

optionFour.addEventListener("click", function(event){
    event.preventDefault();
    isCorrect = quizQuestions[questionNumber].answers[3].correct
    console.log(isCorrect);
    wrongOrRight(optionFour);
    disableButtons();
    questionNumber++;
    setTimeout(function(){
        displayQuestions(questionNumber);
    }, 1000);
})



function wrongOrRight(whatsTheQuestion){
    console.log(whatsTheQuestion);
    if (isCorrect){
        whatsTheQuestion.setAttribute("class", "btn btn-success btn-lg btn-block text-left disabled");
        score += 100;
        currentScore.innerHTML =score;
    } else {
        whatsTheQuestion.setAttribute("class", "btn btn-danger btn-lg btn-block text-left disabled");
        score -= 25;
        timer -= 5;
        currentScore.innerHTML =score;
    }
}

//disable buttons after user selects answer
function disableButtons(){    
    optionOne.disabled=true;
    optionTwo.disabled=true;
    optionThree.disabled=true;
    optionFour.disabled=true;
}

//enable buttons with new question
function enableButtons(){
    optionOne.disabled=false;
    optionTwo.disabled=false;
    optionThree.disabled=false;
    optionFour.disabled=false;
}

//save score
saveScoreBtn.addEventListener("click", function(event){
    event.preventDefault();
    var playerName = nameInput.value
    console.log(playerName)
    localStorage.setItem(playerName, score)
    var inTheLeaderboard = localStorage.getItem(playerName)
    leaderboardScores.append(inTheLeaderboard);
    leaderboardView.classList.remove("hide")

})

//see scores

seeScoresBtn.addEventListener("click", function(event){
    event.preventDefault();
    console.log("you clicked me")
    leaderboardView.classList.remove("hide");
    finalResultScreen.classList.add("hide");
    quizSection.classList.add("hide");
    beginSection.classList.add("hide");

})

//quiz questions
var quizQuestions = [
    {
        question: "1. In which year was JavaScript created?",
        answers: [
            {a: "a. 1990", correct: false},
            {b: "b. 1995", correct: true},
            {c: "c. 2000", correct: false},
            {d: "d. 2005", correct: false},
        ]
    }, {
        question: "2. Which heading tag would give you the largest heading?",
        answers: [
            {a: "a. &lt;h5&gt;", correct: false},
            {b: "b. &lt;h1&gt;", correct: true},
            {c: "c. &lt;h3&gt;", correct: false},
            {d: "d. &lt;h6&gt;", correct: false}
        ]
    }, {
        question: "3. Which method would you use to remove whitespace from a string?",
        answers: [
            {a: "a. trim()", correct: true},
            {b: "b. parseFloat()", correct: false},
            {c: "c. join()", correct: false},
            {d: "d. concat()", correct: false}
        ]
    },{
        question: "4. Which of the following is a boolean data type?",
        answers: [
            {a: "a. 15", correct: false},
            {b: "b. null", correct: false},
            {c: "c. undefined", correct: false},
            {d: "d. true", correct: true}
        ]
    },{
        question: "5. Which of the following is not a self-closing tag?",
        answers: [
            {a: "a. &lt;img&gt;", correct: false},
            {b: "b. &lt;a&gt;", correct: true},
            {c: "c. &lt;meta&gt;", correct: false},
            {d: "d. &lt;hr&gt;", correct: false}
        ]
    },{
        question: "6. What does CSS stand for?",
        answers: [
            {a: "a. Changing Style Sheets", correct: false},
            {b: "b. Cascading Style Source", correct: false},
            {c: "c. Cascading Style Sheets", correct: true},
            {d: "d. Colorful Style Sheets", correct: false}
        ]
    },{
        question: "7. Which of the following is not a programming language?",
        answers: [
            {a: "a. C#", correct: false},
            {b: "b. JavaScript", correct: false},
            {c: "c. HTML", correct: true},
            {d: "d. Python", correct: false}
        ]
    },{
        question: "8. JavaScript variables cannot start with a(n) _____.",
        answers: [
            {a: "a. number", correct: true},
            {b: "b. lowercase letter", correct: false},
            {c: "c. uppercase letter", correct: false},
            {d: "d. underscore (_)", correct: false}
        ]
    },{
        question: "9. Who is the creator of JavaScript?",
        answers: [
            {a: "a. Alan Turing", correct: false},
            {b: "b. Bill Gates", correct: false},
            {c: "c. Steve Jobs", correct: false},
            {d: "d. Brendan Eich", correct: true}
        ]
    },{
        question: "10. Which tag would you use to create an ordered list?",
        answers: [
            {a: "a. &lt;ul&gt;", correct: false},
            {b: "b. &lt;ol&gt;", correct: true},
            {c: "c. &lt;li&gt;", correct: false},
            {d: "d. &lt;dl&gt;", correct: false}
        ]
    }
]
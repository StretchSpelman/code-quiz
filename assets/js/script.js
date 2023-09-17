const startButton = document.getElementById("start-button");
const questionContainer = document.getElementById("question-text");
const answerButtons = document.getElementById("answer-buttons");
const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("timer");
var score = 0;
var timer;


var quizQuestions = [
{
    question: "Commonly used data types DO NOT include:",
    answers: ['strings','booleans', 'alerts', 'numbers'],
    correctAnswer: 'alerts'
},

{
    question: "The condition in an if/else statement in enclosed within ____.",
    answers: ['quotes','curly brackets', 'parentheses', 'square brackets'],
    correctAnswer: 'parentheses'
},

{
    question: "Arrays in JavaScript can be used to store ____.",
    answers: ['numbers and strings','other arrays', 'booleans', 'all of the above'],
    correctAnswer: 'all of the above'
},

{
    question: "String values must be enclosed within ____ when being assigned to variables.",
    answers: ['commas','curly brackets', 'quotes', 'parentheses'],
    correctAnswer: 'quotes'
},

{
    question: "A very useful tool used during development and debugging for printing content to the debugger is:",
    answers: ['JavaScript','terminal/bash', 'for loops', 'console.log'],
    correctAnswer: 'console.log'
},
];

startButton.addEventListener('click', startQuiz);

function startQuiz() {
    startButton.classList.add("hide");
    currentQuestionIndex = 0;
    score = 0;
    setNextQuestion();
    startTimer(60);
}

function startTimer(duration) {
    let timeLeft=duration;
    timerDisplay.textContent=timeLeft;
    timer = setInterval(function() {
      timeLeft--;
      timerDisplay.textContent = timeLeft;
      if (timeLeft <= 0 || currentQuestionIndex >= quizQuestions.length) {
        endQuiz();
      }
    }, 1000);
  }

  function setNextQuestion() {

    if (currentQuestionIndex < quizQuestions.length) {
        const question = quizQuestions[currentQuestionIndex];
        questionContainer.innerText = question.question;
        answerButtons.innerHTML = "";
        
        question.answers.forEach(answer => {
            const button = document.createElement("button");
            button.innerText = answer;
            button.classList.add("btn");
            button.addEventListener("click", () => selectAnswer(answer, question.correctAnswer));
            answerButtons.appendChild(button);
        });
    } else {
        endQuiz();
    }
}


function selectAnswer(selectedAnswer, correctAnswer) {
    if (selectedAnswer === correctAnswer) {
        score++;
        scoreDisplay.textContent = score;
    } else {
        startTimer(parseInt(timerDisplay.textContent) - 10);
    }

    currentQuestionIndex++;
    setNextQuestion();
}

function showHighScore() {
    highscoreContainer.style.display = "block";
}

function endQuiz() {
    clearInterval(timer);
    questionContainer.innerText = "Quiz Over!";
    answerButtons.innerHTML = "";
    scoreDisplay.textContent = score;
    updateHighScore();
    showHighScore();
    var initials = prompt('Enter your initials:');
}


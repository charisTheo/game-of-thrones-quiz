let QUIZ_DATA = {};
let RESULTS_DATA = {};
let QUIZ_QUESTIONS = [];
let currentQuestionIndex = 0;
let currentQuestion = {};
let score = 0;
let pointsDOM = document.getElementById('points');
let submitBtn = document.getElementById('submit-button');
let mainForm = document.forms["choices"];

document.body.onload = function () 
{
    mainForm.onchange = function () {
        // if nothing selected disable the submit button
        if (!document.querySelectorAll("input[type=checkbox]:checked, input[type=radio]:checked").length)
            submitBtn.setAttribute('disabled', true);
        else submitBtn.removeAttribute('disabled');
    }
    mainForm.onsubmit = checkAnswer;
    init();
}

window.nextQuestion = function (questionNumber = ++currentQuestionIndex)
{
    if (questionNumber >= QUIZ_QUESTIONS.length) {
        return end();
    }
    submitBtn.setAttribute('disabled', true);
    currentQuestion = QUIZ_QUESTIONS[questionNumber];
    renderQuestion(currentQuestion);
}

window.end = function () 
{
    getResultsData().then(function (data)
    {
        RESULTS_DATA = data;
        const results = getResults(RESULTS_DATA.results);
        renderResults(results);
    });
}

function init () 
{
    getQuizData().then(function (data)
    {
        QUIZ_DATA = data;
        QUIZ_QUESTIONS = data.questions;
        document.getElementById('quiz-title').innerText = QUIZ_DATA.title;
        document.getElementById('quiz-description').innerText = QUIZ_DATA.description;
        document.getElementById('results').style.display = 'none';
        document.getElementById('question-container').style.display = 'block';
        // initialiase progress
        currentQuestionIndex = 0;
        score = 0;
        pointsDOM.innerText = score;
        nextQuestion(0);
    });
}

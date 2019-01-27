(function()
{
    function getUserValues () 
    {
        // disable submit button
        submitBtn.setAttribute('disabled', true);
        let values = [];
        let formElements = document.forms[0].elements;
        for (let i = 0; i < formElements.length; i++) {
            if (formElements[i].getAttribute("type") !== "submit") 
            {
                values.push({
                    value: formElements[i].checked,
                    choice: formElements[i].value,
                    element: formElements[i]
                });
            }
        }
        return values;
    }

    function checkAnswer (event) 
    {
        event.preventDefault();
        let values = getUserValues();
        let wrongAnswerElements = [];
        let correctAnswerElements = [];
        // convert to array of strings
        const correctAnswers = currentQuestion.correct_answer.toString().split(",");
        let wrongAnswerFlag = false;

        for (let i = 0; i < values.length; i++) 
        {
            if (correctAnswers.includes(values[i].choice))
            {
                correctAnswerElements.push(values[i].element);
                if (!values[i].value)
                    wrongAnswerFlag = true;
            } else if (values[i].value && !wrongAnswerElements.includes(values[i].elements) && !correctAnswerElements.includes(values[i].elements)) 
            {
                wrongAnswerFlag = true;
                wrongAnswerElements.push(values[i].element);
            }
        }
        return validateAnswer(
            correctAnswerElements, 
            wrongAnswerElements, 
            wrongAnswerFlag ? undefined : currentQuestion.points
        );
    }

    function validateAnswer (correctAnswerElements, wrongAnswerElements, points = undefined) 
    {
        if (points) {
            score += points;
            // update the DOM
            pointsDOM.innerText = score;
            // show added points
            document.getElementById('added-points').innerHTML = "+ " + points;
            document.getElementById('added-points').classList.add('fade');
            // show validation to user
            document.getElementById('thumbs-up').classList.add('active');
        } else {
            // show validation to user
            document.getElementById('thumbs-down').classList.add('active');
            for (let i = 0; i < wrongAnswerElements.length; i++) {
                // show wrong user answers
                wrongAnswerElements[i].classList.add('wrong');
            }
        }

        // show correct answer(s)
        for (let i = 0; i < correctAnswerElements.length; i++) {
            correctAnswerElements[i].classList.add('correct');
        }
        // delay 3 seconds
        document.querySelector('main .container').classList.add('fade');
        setTimeout(function () 
        {
            // next question
            nextQuestion();
            // hide added validation elements
            document.getElementById('added-points').classList.remove('fade');
            document.querySelector('main .container').classList.remove('fade');
            document.getElementById('thumbs-down').classList.remove('active');
            document.getElementById('thumbs-up').classList.remove('active');
        }, 3000);
    }
    
    window.checkAnswer = checkAnswer;
})();

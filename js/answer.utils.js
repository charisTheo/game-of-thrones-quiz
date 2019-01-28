(function()
{
    function getUserValues () 
    {
        // disable submit button
        submitBtn.setAttribute('disabled', true);
        let values = [];
        let formElements = mainForm.elements;
        for (let i = 0; i < formElements.length; i++) {
            if (formElements[i].getAttribute("type") !== "submit") 
            {
                // save values of all input elements
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
            // if this element is a correct answer
            if (correctAnswers.includes(values[i].choice))
            {
                // save the element and check for user input 
                correctAnswerElements.push(values[i].element);
                if (!values[i].value)
                    // if user has not selecte the correct answer set a flag
                    wrongAnswerFlag = true;
            } else if (values[i].value 
                && !wrongAnswerElements.includes(values[i].elements) 
                && !correctAnswerElements.includes(values[i].elements)) 
            {
                // if user has selected a wrong choice save the input element for output later
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
        const thumbsUp = document.getElementById('thumbs-up');
        const thumbsDown = document.getElementById('thumbs-down');
        const mainContainer = document.querySelector('main .container');
        const addedPoints = document.getElementById('added-points');

        if (points) {
            score += points;
            // update the DOM
            pointsDOM.innerText = score;
            // show added points
            addedPoints.innerHTML = "+ " + points;
            addedPoints.classList.add('fade');
            // show validation to user
            thumbsUp.classList.add('active');
        } else {
            // show validation to user
            thumbsDown.classList.add('active');
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
        mainContainer.classList.add('fade');
        setTimeout(function () 
        {
            // next question
            nextQuestion();
            // hide added validation elements
            addedPoints.classList.remove('fade');
            mainContainer.classList.remove('fade');
            thumbsDown.classList.remove('active');
            thumbsUp.classList.remove('active');
        }, 3000);
    }
    
    window.checkAnswer = checkAnswer;
})();

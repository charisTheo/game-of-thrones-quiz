(function()
{
    function renderResults (resultsToRender)
    {
        document.getElementById('results-percentage').innerText = resultsToRender.percentage;
        document.getElementById('results-title').innerText = resultsToRender.title;
        document.getElementById('results-message').innerText = resultsToRender.message;
        document.getElementById('results-image').src = resultsToRender.img;
        document.getElementById('question-container').style.display = 'none';
        document.getElementById('results').style.display = 'block';
    }

    function getResults (resultsArray)
    {
        let maxScore = 0;
        for (let j = 0; j < QUIZ_QUESTIONS.length; j++) {
            maxScore += QUIZ_QUESTIONS[j].points;
        }
        const scorePercentage = Math.round((score / maxScore) * 100);

        for (let i = 0; i < resultsArray.length; i++) {
            if (scorePercentage >= resultsArray[i].minpoints && scorePercentage <= resultsArray[i].maxpoints)
            {
                resultsArray[i].percentage = scorePercentage + '%';
                return resultsArray[i];
            }
        }
    }

    window.renderResults = renderResults;
    window.getResults = getResults;
})();
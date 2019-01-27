const QUIZ_URL = "https://proto.io/en/jobs/candidate-questions/quiz.json";
const RESULTS_URL = "https://proto.io/en/jobs/candidate-questions/result.json";

(function()
{
    function getQuizData () 
    {
        return getHttpRequest(QUIZ_URL)
        .then(function (data) 
        {
            return data;
        })
        .catch(function (error)
        {
            console.log("getHttpRequest() -> Error: ", error);
            return alert("There was an error fetching the Quiz data");
        });
    
    };
    
    function getResultsData () 
    {
        return getHttpRequest(RESULTS_URL)
        .then(function (data) 
        {
            return data;
        })
        .catch(function (error)
        {
            console.log("getHttpRequest() -> Error: ", error);
            return alert("There was an error fetching the Results data");
        });
    
    };

    function getHttpRequest(url) 
    {
        return new Promise(function (resolve, reject) 
        {
            fetch(url,
                {
                    method: 'get'
                })
                .then(function (response)
                {
                    return response.json();
                })
                .then(function (data)
                {
                    return resolve(data);
                })
                .catch(function (error) 
                {
                    reject(error);
                });
        });
    }

    window.getQuizData = getQuizData;
    window.getResultsData = getResultsData;
})();
(function()
{
    function renderQuestion (question) 
    {
        document.getElementById('question').innerText = question.title;
        document.getElementById('question-image').src = question.img;
        renderChoices(question);
    }

    function renderChoices (question) {
        // remove previous question choices
        mainForm.innerHTML = "";
        if (question.question_type === 'truefalse') return renderTruefalse();

        for (let i = 0; i < question.possible_answers.length; i++)
        {
            let caption = question.possible_answers[i].caption;
            let id = caption.split(" ").join("");
            let choiceContainer = document.createElement("div");
            choiceContainer.classList.add('choice-container');

            let choice = document.createElement("input");
            if (question.question_type === 'mutiplechoice-single') {
                choice.setAttribute("type", "radio");
                choice.setAttribute("required", true);
                choice.name = 'answer';
            } else {
                choice.setAttribute("type", "checkbox");
            }
            choice.setAttribute("id", id);
            choice.setAttribute("name", "q_id" + question.q_id);
            choice.value = question.possible_answers[i].a_id;

            let label = document.createElement("label");
            label.setAttribute("for", id);
            label.innerText = caption;

            choiceContainer.appendChild(choice);
            choiceContainer.appendChild(label);
            mainForm.appendChild(choiceContainer);
        }
    }

    function renderTruefalse ()
    {
        let choiceContainerTrue = document.createElement("div");
        choiceContainerTrue.classList.add('choice-container');
        let choiceContainerFalse = document.createElement("div");
        choiceContainerFalse.classList.add('choice-container');

        let radioTrue = document.createElement("input");
        radioTrue.setAttribute("type", "radio");
        radioTrue.setAttribute("id", "radioTrue");
        radioTrue.setAttribute("required", true);
        radioTrue.value = true;
        radioTrue.name = 'answer';
        
        let labelTrue = document.createElement("label");
        labelTrue.setAttribute("for", "radioTrue");
        labelTrue.innerText = 'True';

        let radioFalse = document.createElement("input");
        radioFalse.setAttribute("type", "radio");
        radioFalse.setAttribute("id", "radioFalse");
        radioFalse.setAttribute("required", true);
        radioFalse.value = false;
        radioFalse.name = 'answer';
        
        let labelFalse = document.createElement("label");
        labelFalse.setAttribute("for", "radioFalse");
        labelFalse.innerText = 'False';

        choiceContainerTrue.appendChild(radioTrue);
        choiceContainerTrue.appendChild(labelTrue);
        
        choiceContainerFalse.appendChild(radioFalse);
        choiceContainerFalse.appendChild(labelFalse);
        
        mainForm.appendChild(choiceContainerTrue);
        mainForm.appendChild(choiceContainerFalse);
    }

    window.renderQuestion = renderQuestion;
})();
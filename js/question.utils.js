(function()
{
    function renderQuestion (question) 
    {
        document.getElementById('question').innerText = question.title;
        document.getElementById('question-image').src = question.img;
        renderChoices(question);
    }

    function renderChoices (question) 
    {
        let questionToRender;
        // display appropriate choices for the question type
        for (let i = 0; i < QUESTION_TYPES.length; i++) 
        {
            if (QUESTION_TYPES[i].type === question.question_type)
                questionToRender = QUESTION_TYPES[i];
            
            // hide all choice types
            document.getElementById(QUESTION_TYPES[i].type).style.display = "none";
            document.getElementById(QUESTION_TYPES[i].type).innerHTML = '';
        }
        questionToRender.render(question);
    }

    function renderMultipleChoiceSingle (question)
    {
        for (let i = 0; i < question.possible_answers.length; i++)
        {
            let caption = question.possible_answers[i].caption;
            let id = caption.split(" ").join("");
            let choiceContainer = document.createElement("div");
            choiceContainer.classList.add('choice-container');

            let radio = document.createElement("input");
            radio.setAttribute("type", "radio");
            radio.setAttribute("id", id);
            radio.setAttribute("required", true);
            // radio.value = caption;
            radio.value = question.possible_answers[i].a_id;
            radio.name = 'answer';
            
            let label = document.createElement("label");
            label.setAttribute("for", id);
            label.innerText = caption;

            choiceContainer.appendChild(radio);
            choiceContainer.appendChild(label);
            document.getElementById(question.question_type).appendChild(choiceContainer);
        }
        document.forms[0].onsubmit = checkAnswer;
        // display choices section        
        document.getElementById(question.question_type).style.display = "block";
    }


    function renderMultipleChoiceMultiple (question)
    {
        for (let i = 0; i < question.possible_answers.length; i++)
        {
            let caption = question.possible_answers[i].caption;
            let id = caption.split(" ").join("");
            let choiceContainer = document.createElement("div");
            choiceContainer.classList.add('choice-container');

            let checkbox = document.createElement("input");
            checkbox.setAttribute("type", "checkbox");
            checkbox.setAttribute("id", id);
            checkbox.setAttribute("name", "q_id" + question.q_id);
            checkbox.value = question.possible_answers[i].a_id;
            
            let label = document.createElement("label");
            label.setAttribute("for", id);
            label.innerText = caption;

            choiceContainer.appendChild(checkbox);
            choiceContainer.appendChild(label);
            document.getElementById(question.question_type).appendChild(choiceContainer);
        }
        document.forms[0].onsubmit = checkAnswer;
        // display choices section
        document.getElementById(question.question_type).style.display = 'block';
    }

    function renderTruefalse (question)
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
        
        document.getElementById(question.question_type).appendChild(choiceContainerTrue);
        document.getElementById(question.question_type).appendChild(choiceContainerFalse);

        document.forms[0].onsubmit = checkAnswer;
        // display choices section
        document.getElementById(question.question_type).style.display = 'block';
    }


    window.renderQuestion = renderQuestion;
    window.renderMultipleChoiceSingle = renderMultipleChoiceSingle;
    window.renderMultipleChoiceMultiple = renderMultipleChoiceMultiple;
    window.renderTruefalse = renderTruefalse;
})();
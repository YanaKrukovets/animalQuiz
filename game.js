var questionNumber = 0;
var correct_answer = "";
var result;
var lengthR;

$.getJSON('https://opentdb.com/api.php?amount=10&category=27&type=multiple', function(data) {
     result = data.results;
     lengthR = result.length - 1;

    findQuestion();
});

function findQuestion() {
    if (questionNumber <= lengthR) {
        cleanAnswers();
    var question = result[questionNumber],
        answers = question.incorrect_answers, 
        str;
    
    correct_answer = question.correct_answer;
    answers.push(correct_answer);
    answers.sort();
     
    str = question.question.replaceAll('&quot;', '"');
    str =  str.replaceAll("&#039;", "'");

    $("#question").text(str);

    for (const i in answers) {
        $("#answer" + i).text(answers[i]);    
    }
} else {
    congradulations();
}

}

function congradulations() {
    $('#fireworks').addClass('pyro');
    $('#container').removeClass('ms-5');
    $('#questions').html('<h1 class="text-center">Congradulations! You know something about animals!</h1> <p class="text-center"><a href="game.html" class="btn btn-success row">Play again</a></p>');
}

function cleanAnswers() {
    var answer, j = 0;

    for (j=0; j<4; j++) {
        answer = $("#answer" + j)
        if (answer.hasClass("btn-success")) {
            answer.removeClass("btn-success");  
        }
        if (answer.hasClass("btn-danger")) {
            answer.removeClass("btn-danger");  
        }
        if (!answer.hasClass("btn-outline-secondary")) {
            answer.addClass("btn-outline-secondary");  
        }
    }
}

function checkAnswer(event) {
    var value = event.target.innerText;
    
    if (value == correct_answer) {
        questionNumber += 1;
        event.target.classList.remove("btn-outline-secondary");
        event.target.classList.add("btn-success");
        findQuestion();
    } else {
        event.target.classList.remove("btn-outline-secondary");
        event.target.classList.add("btn-danger");
    }
}



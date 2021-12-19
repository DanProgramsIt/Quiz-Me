// Make the start button operational.
// Make a timer, timer starts  when button is clicked, and then the person is presented with a question.
// If the person gets the answer correct, no time is lost and another set of questionsArr appear.
// If the person picks the wrong answer they lose 10 seconds.
// When all questionsArr are answered, the timer stops, and the game is over.
// When the game ends, a prompt will show up asking for the players initials.
// No more than 3 letters can be used for initials.
// Make a code to save initials on the local storage.
// Make a timer, timer starts  when button is clicked, and then the person is presented with a question.

var timeEl = document.querySelector("#time")
var startBtn = document.querySelector("#start")
var questionContainer = document.querySelector(".questions-div")
var questionTitle = document.querySelector("#question")
var intro = document.querySelector(".intro-div")
var gameOver = document.querySelector(".completed-div")
var finalScore = document.querySelector("#final-score")
var idEl = document.querySelector("#intials")
var submit = document.querySelector("#submit")
var scoreBtn = document.querySelector("#linkscore")
var scoreBoard = document.querySelector(".scoreboard")
var scoreList = document.querySelector("#score-list")
var startOver = document.querySelector("#go-back")
var revealEl = document.querySelector("#reveal")
var submitBtn = document.querySelector("#submit")
var answers = document.createElement("ol")

var time = 60;
var maxScore = 60;
var timer;
var index = 0;

var showQ = document.createElement("h3")
var ques1 = document.createElement("li")
var ques2 = document.createElement("li")
var ques3 = document.createElement("li")
var ques4 = document.createElement("li")
var set1 = document.createElement("button")
var set2 = document.createElement("button")
var set3 = document.createElement("button")
var set4 = document.createElement("button")
var input = document.createElement("input")





var questionsArr = [
    {
        title: "Which Marvel Avenger shoots arrow?",
        choices: ['Rick James', 'Hawk Eye', 'Black Panther', 'Stephen Hawking'],
        answer: 'Hawk Eye'
    },
    {
        title: "How many galaxies are there in the observable universe?",
        choices: ['One Hundred', 'Two Thousand', 'Three Million', 'Two Trillian'],
        answer: 'Two Trillian'
    },
    {
        title: "Which Avenger turns green when angry?",
        choices: ['Macaulay Culkin', 'Gordon Ramsay', 'The Incredible Hulk', 'The Flash'],
        answer: 'The Incredible Hulk'
    },
    {
        title: "What does css stand for?",
        choices: ['Classic Stupid Suspect', 'Crunchy Spicy Sauce', 'Cascading Style Sheets', 'Creepy Super Stregnth'],
        answer: 'Cascading Style Sheets'
    },
];

function showQuestions() {

    if (index === 0) {
        var removeQuiz = document.getElementById("beginning");
        removeQuiz.remove();
        startTimer();
    }

    showQ.innerHTML = questionsArr[index].title;


    if (questionsArr[index] !== 3) {
        console.log(questionsArr[index].title)
        set1.textContent = questionsArr[index].choices[0]
        set2.textContent = questionsArr[index].choices[1]
        set3.textContent = questionsArr[index].choices[2]
        set4.textContent = questionsArr[index].choices[3]

        ques1.appendChild(set1);
        ques2.appendChild(set2);
        ques3.appendChild(set3);
        ques4.appendChild(set4);
        answers.appendChild(ques1);
        answers.appendChild(ques2);
        answers.appendChild(ques3);
        answers.appendChild(ques4);
        questionContainer.appendChild(showQ);
        questionContainer.appendChild(answers);


        set1.addEventListener("click", answerSelect);
        set2.addEventListener("click", answerSelect);
        set3.addEventListener("click", answerSelect);
        set4.addEventListener("click", answerSelect);
    }

    else {

        showScoreBoard();
    }

}

function answerSelect() {

    var correct = document.createElement("h6")
    var wrong = document.createElement("h6")
    correct.textContent = "Correct"
    wrong.textContent = "Wrong"

    correct.setAttribute("Style", "font-size:20px ;margin:15px;black")
    wrong.setAttribute("Style", "font-size:20px ;margin:15px;black")


    if (this.textContent === questionsArr[index].answer) {

        questionContainer.appendChild(correct);
        setTimeout(function () {
            questionContainer.innerHTML = "";
            index++;
            if (index === questionsArr.length) {
                showScoreBoard();

            }

            else {

                showQuestions()
            }
        }, 600)
    }

    else {

        if (time >= 10) {
            time = time - 10;
        }

        timeEl.textContent = time;


        maxScore = maxScore - 10;
        console.log(maxScore)
        questionContainer.appendChild(wrong);
        setTimeout(function () {
            questionContainer.innerHTML = "";
            index++;


            showQuestions()

        }, 600)

    }

};

function startTimer() {

    timer = setInterval(function () {

        time--;
        timeEl.textContent = time;

        if (time === 0) {
            showScoreBoard()
            clearAll();
            clearInterval(timer)

        }
    }, 600);
}

function clearAll() {
    var removeAnwsers = document.getElementById("questions-div");
    removeAnwsers.style.display = "none";
}


function showScoreBoard() {
    finalScore.textContent = maxScore;
    clearInterval(timer);
    gameOver.style.display = "block";
};


var listScore = [];
function lastRegist() {

    listScore = JSON.parse(localStorage.getItem("Scores"));
};

function saveScore() {

    var playerInitial = document.querySelector("#initials").value;
    var playerScore = maxScore;

    if (playerInitial === "") {

        alert("Please provide initials");

    }

    else {

        listScore = JSON.parse(localStorage.getItem("Scores")) || [];
        var scores = {
            score: playerScore,
            initials: playerInitial
        };

        listScore.push(scores)
        localStorage.setItem("Scores", JSON.stringify(listScore));
    }
};

//Event listeners
document.getElementById("start").addEventListener("click", showQuestions)

scoreBtn.addEventListener("click", lastRegist);

gameOver.style.display = "none";

submit.addEventListener('click', (event) => {
    event.preventDefault();
    saveScore();
    window.location.href = "highscores.html"
})
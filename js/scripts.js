document.onload = loadFunct();



function loadFunct() {
    endMsg[0].style.display = "none";
}



function startQuiz() {
    intro.css("display", "none");
    timerId = setInterval(countDown, 1000);
    timeElem[0].innerHTML = time;
    generateQuestion();
}
function countDown() {
    time--;
    timeElem[0].innerHTML = time;
    if (time <= 0) {
        finishQuiz();
    }
}
function generateQuestion() {
    var question = questions[questionIndex];
    questionTitle[0].innerHTML = question.title;

    choices.empty();
    question.choices.forEach(function(element, i) {
        var choiceButton = document.createElement("button");
        choiceButton.setAttribute("class", "button_choice");
        choiceButton.setAttribute("value", element);
        choiceButton.innerHTML = i+1 + ":\t" + element;
        choiceButton.onclick = ansSubmit;
        choices.append(choiceButton);
    });
}
function ansSubmit() {
//    console.log("\t\t"+this.value+"\n\t\t"+questions[questionIndex].answer);
    if (this.value != questions[questionIndex].answer) {
        time = time - 10;
        if (time < 0) {
            time = 0;
        }
//        console.log("innerHTML:\t"+feedback.innerHTML);
        feedback[0].innerHTML = "Disapointment!"
        feedback.css("background-color", "#ff3860")
//        console.log("innerHTML:\t"+feedback.innerHTML);
//        console.log(feedback);
        timeElem.innerHTML = time;
    } else {
        feedback[0].innerHTML = "Good."
        feedback.css("background-color", "#00bea2")
    }
    feedback.css("opacity", "1");
    setTimeout(function() {
        feedback.css("opacity", "0");
    }, 1000);
    questionIndex = questionIndex + 1;
    if (questionIndex === questions.length) {
        finishQuiz();
    } else {
        generateQuestion();
    }
}
function finishQuiz() {
    clearInterval(timerId);
    endMsg[0].style.display = "flex";
    final[0].innerHTML = time;
    questionCard.css("display", "none");
}



function saveScore() {
    var names = initials[0].value;
    
    if (typeof window.localStorage.highscoreList === "string") {
        var tempArray = JSON.parse(window.localStorage.getItem("highscoreList"));
        // var high = JSON.parse(JSON.stringify(window.localStorage)) || [];
        // console.log(high);
    } else {
        var tempArray = [];
    }
    var prevArray = tempArray;
    const pushLocation = (obj) => {
        var flag = 0;
        console.log("object:\t"+obj.score)
        // console.log(elem)
        prevArray.forEach((elem) => {
            // console.log("object:\t"+obj)
            // console.log(elem.title)
            if (obj.initials === elem.initials && obj.score === elem.score) {
                flag = 1;
            }
        });
        if (flag === 1) {
            return false;
        } else {
            return true;
        }
    }
    var scoreToJSON= {
        score: time,
        initials: names
    };
    if (pushLocation(scoreToJSON)) {
        tempArray.push(scoreToJSON);
    }
    console.log(scoreToJSON);
    // high.push(scoreToJSON);
    window.localStorage.setItem("highscoreList", JSON.stringify(tempArray));

    
}



function generateTableHead() {
    if (typeof window.localStorage.highscoreList === "string") {
        // var tbl = document.createElement("table");
        console.log(window.localStorage.highscoreList);
        var tempArray = JSON.parse(window.localStorage.highscoreList);
        console.log(tempArray.length);
        for (i=0; i<tempArray.length; i++) {
            var initialss = document.createElement("td");
            var space = document.createElement("tr");
            var score = document.createElement("td");
            var genre = document.createElement("td");
            // initials.setAttribute("class", "content is-medium");
            initialss.innerHTML = tempArray[i].initials;
            // score.setAttribute("class", "content is-medium");
            score.innerHTML = tempArray[i].score;
            
            console.log(appendThis);
            appendThis[0].appendChild(initialss);
            appendThis[0].appendChild(score);
            
            appendThis[0].appendChild(space);
        }
    }
}

  
// var scoreList = JSON.parse(window.localStorage.highscoreList) || [];
// let table = document.querySelector("highscores");
// let data = Object.keys(scoreList);
generateTableHead();

function vHS(element) {
    console.log(element)
    if (element.css("opacity") === "0") {
        element.css("opacity", "1")
    } else {
        element.css("opacity", "0")
    }
}
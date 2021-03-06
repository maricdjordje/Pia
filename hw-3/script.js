let highscoreDiv = document.querySelector("#highscore");
let gameTimerEl = document.querySelector("#gameTimer");
let quesTimerEl = document.querySelector("#quesTimer");
let mainEl = document.querySelector("#details");
let timerTab = document.querySelector("#timers");



var test = false;
var score = 0;
var quiz = {};
var quizType = "";

var gameDuration = 0;
var gameSecElapsed = 0;
var gameInterval;

var questionDuration = 20;
var questionSecElapsed = 0;
var questionInterval;


init();

function init() {
  clearDetails();
  reset();
  
  let heading = document.createElement("p");
  heading.setAttribute("id", "main-heading");
  heading.textContent = "Proverite svoje znanje!";

  
  let instructions = document.createElement("p");
  instructions.setAttribute("id", "instructions");
  instructions.textContent = " Dobrodošli u JavaScript kviz iz predmeta Programiranje internet aplikacija. Pred vama je 10 pitanja, pri čemu birate da li odgovarate na pitanje iz opšte kulture ili iz informacionih tehnologija."; 

  // startJsQuiz
  let startOpstaPitanja = document.createElement("button");
  startOpstaPitanja.setAttribute("id", "startOpstaPitanja");
  startOpstaPitanja.setAttribute("class", "btn btn-secondary");
  startOpstaPitanja.textContent= "Kviz opšteg znanja";

  
  let startItPitanja = document.createElement("button");
  startItPitanja.setAttribute("id", "startItPitanja");
  startItPitanja.setAttribute("class", "btn btn-secondary");
  startItPitanja.textContent= "Kviz IT znanja";

  mainEl.appendChild(heading);
  mainEl.appendChild(instructions);
  mainEl.appendChild(startOpstaPitanja);
  mainEl.appendChild(startItPitanja);

  startOpstaPitanja.addEventListener("click", function () {
    quizType = "Kviz opšteg znanja";
    playQuiz(opstaPitanja);
  });

  startItPitanja.addEventListener("click", function () {
    quizType = "Informacione tehnologije";
    playQuiz(itPitanja);
  });
}


function clearDetails() {
  mainEl.innerHTML = "";
}

function reset() {
  quizType = "";
  score = 0;

  gameDuration = 0;
  gameSecElapsed = 0;
  gameInterval;

  questionDuration = 20;
  questionSecElapsed = 0;
  questionInterval;
}


function playQuiz(questionSet) {
  if (test) { console.log("--- playQuiz ---"); }
  
  
  quiz = setUpQuestions(questionSet);

  
  timerTab.setAttribute("style", "visibility: visible;");

  
  gameDuration = quiz.length * 20;
  if (test) { console.log("duration g,q:",gameDuration,questionDuration); }

  startGameTimer();
  renderTime();

  
  presentQuestion();
}


function setUpQuestions(arr) {
  if (test) {console.log("--- setUpQuestions ---");}

  let ranQuest = [];

  for (let i=0; i<arr.length; i++) {
    ranQuest.push(arr[i]);
  }
  return ranQuest;
}

 
function presentQuestion() {
  if (test) {console.log("--- presentQuestion ---");}
  

  
  questionSecElapsed = 0;

  
  if ( quiz.length === 0 ) {
    endOfGame();
    return;
  }

  
  curQuestion = quiz.pop();

  
  clearDetails();
   
  
  let question = document.createElement("h1");
  
  question.setAttribute("question", curQuestion.title);
  question.textContent = curQuestion.title;
  mainEl.appendChild(question)

  
  let choiceBox = document.createElement("ul");
  choiceBox.setAttribute("id","choiceBox");
  mainEl.appendChild(choiceBox);

  
  for( let i=0; i<curQuestion.choices.length; i++ ) {
    
    let listChoice = document.createElement("li");
    
    listChoice.setAttribute("choice-value", curQuestion.choices[i]);
    listChoice.setAttribute("id","questionNum-"+i);
    listChoice.textContent = curQuestion.choices[i];
    
    choiceBox.appendChild(listChoice)
  }

  if (test) { console.log("cur", curQuestion);}

  
  choiceBox.addEventListener("click", function (){
    scoreAnswer(curQuestion);
  });
  
}

function scoreAnswer(cur) {
  if (test) { console.log("--- scoreAnswer ---");}
 
  var e = event.target;
  if ( e.matches("li")) {
    let selectedItem = e.textContent;
    
    if (test) { console.log("selectedItem quiz " + selectedItem); }
    
    if ( selectedItem === cur.answer ) {
      
      score += questionDuration - questionSecElapsed;
      
    } else {
      if (test) { console.log("wrong answer");}
      
      gameDuration -= 10;
    }
  if (test) { console.log("sselected ",selectedItem);}
    showAnswers(cur);
    
  }
}


function showAnswers(cur) {
  if (test) { console.log("--- showAnswer ---"); }
  
  if (test) { console.log("sa qanda",cur);}
  if (test) { console.log("sselected ",selectedItem);}


  for (let i=0; i<cur.choices.length; i++) {
    if (test) { console.log("sa in for ",i);}

    let questid = "#questionNum-" + i;
    
    let questrow = document.querySelector(questid);

    

    if (test) { console.log("saf selected" + selectedItem + "<");}
    if (test) { console.log("saf color test >" +  cur.choices[i] +"<");}

    if ( cur.choices[i] !== cur.answer ) {
      if (test) { console.log("color test flase");}
      questrow.setAttribute("style","background-color: red");
    } else {
      if (test) { console.log("color test true");}
      questrow.setAttribute("style","background-color: green");
    }
  }
  
  setTimeout(presentQuestion,500);
}


function setGameTime() {
  if (test) { console.log("--- setGameTime ---"); }
  if (test) { console.log("gameDuration " + gameDuration); }
  clearInterval(gameInterval);
  gameSeconds = gameDuration;
}


function renderTime() {
  

  gameTimerEl.textContent = gameDuration - gameSecElapsed;
  quesTimerEl.textContent = questionDuration - questionSecElapsed;

  if ( (questionDuration - questionSecElapsed) < 1 ) {
    
    gameDuration -= 10;
    if (test) { console.log("too slow"); }
    presentQuestion();
  } 

  if ( (gameDuration - gameSecElapsed) < 1 ) {
   endOfGame();
  }
}

function startGameTimer () {
  if (test) { console.log("--- startGameTimer ---"); }
  setGameTime();

  gameInterval = setInterval(function() {
    gameSecElapsed++; 
    questionSecElapsed++; 
    renderTime();
  }, 1000);
}

function stopTime() {
  if (test) { console.log("--- stopTime --- ");}
  gameSeconds = 0;
  questionSeconds = 0;
  clearInterval(gameInterval);
}


function endOfGame() {
  if (test) { console.log("--- endOfGame ---"); }
  stopTime();
  clearDetails();

  timerTab.setAttribute("style", "visibility: hidden;");

  let heading = document.createElement("p");
  heading.setAttribute("id", "main-heading");
  heading.textContent = "Kviz je završen!";

  
  let instructions = document.createElement("p");
  instructions.setAttribute("id", "instructions");
  instructions.textContent = " Vaš ostvareni rezultat je " + score; 

  
  let playAgain = document.createElement("button");
  playAgain.setAttribute("id", "playAgain");
  playAgain.setAttribute("class", "btn btn-secondary");
  playAgain.textContent = "Igraj ponovo";

  
  let par = document.createElement("p");

  let initialsLabel = document.createElement("label");
  initialsLabel.setAttribute("for","userInitials");
  initialsLabel.textContent = "Unesite prvih 5 slova vašeg imena: ";

  let initialsInput = document.createElement("input");
  initialsInput.setAttribute("id","userInitials");
  initialsInput.setAttribute("name","userInitials");
  initialsInput.setAttribute("minlength","3");
  initialsInput.setAttribute("maxlength","30");
  initialsInput.setAttribute("size","30");


  mainEl.appendChild(heading);
  mainEl.appendChild(instructions);
  mainEl.appendChild(initialsLabel);
  mainEl.appendChild(initialsInput);
  mainEl.appendChild(par);
  mainEl.appendChild(playAgain);

  playAgain.addEventListener("click", init);

    // cuva 10 najboljih rezultata i sortira od najveceg do najmanjeg
  initialsInput.addEventListener("input", function() {
    initialsInput.value = initialsInput.value.toUpperCase();
    if ( initialsInput.value.length === 10 ) { 

      
      let thisScore = [ { type: quizType, name: initialsInput.value, score: score } ]; 

      //uzima najveci rez iz memorije
      let storedScores = JSON.parse(localStorage.getItem("highScores")); 
      if (test) { console.log("storedScore",storedScores); }

      if (storedScores !== null) { 
        storedScores.push(thisScore[0]); 
      } else {
        storedScores = thisScore;
      }

      localStorage.setItem("highScores", JSON.stringify(storedScores));
      highScores();
    }
  });
}

function highScores() {
  stopTime();
  clearDetails();

  timerTab.setAttribute("style", "visibility: hidden;");

  
  let storedScores = JSON.parse(localStorage.getItem("highScores")); 

  
  let heading = document.createElement("h2");
  heading.setAttribute("id", "main-heading");
  heading.textContent = "Najbolje ostvareni rezultati";

  mainEl.appendChild(heading);

  
  if ( storedScores !== null ) {
    // sortira rezultate kviza
    storedScores.sort((a,b) => (a.score < b.score) ? 1: -1);

    
    let numScores2Display = 10;
    if ( storedScores.length < 10 ) { 
      numScores2Display = storedScores.length; 
    }

    for (var i = 0; i < numScores2Display; i++) {
      var s = storedScores[i];

      var p = document.createElement("p");
      p.textContent = s.name + " " + s.score + " ( " + s.type + " )";
      mainEl.appendChild(p);
    }
  } else {
    var p = document.createElement("p");
    p.textContent =  "Unesite vaše ime!"
    mainEl.appendChild(p);
  }


  // dugme da se krene sa igrom
  let playAgain = document.createElement("button");
  playAgain.setAttribute("id", "playAgain");
  playAgain.setAttribute("class", "btn btn-secondary");
  playAgain.textContent = "Klikni ovde da započneš kviz!";

  mainEl.appendChild(playAgain);

  playAgain.addEventListener("click", init);
}

highscoreDiv.addEventListener("click", highScores);

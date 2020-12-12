const quizQuestions = [
  {
    question: "what is 5+5?",
    options: [5, 6, 9, 10],
    answer: 3,
  },
  {
    question: "what is 5+1?",
    options: [5, 6, 9, 10],
    answer: 1,
  },
  {
    question: "what is the capital of Germany?",
    options: ["Munich", "Dortmund", "Berlin", "Stuttgart"],
    answer: 2,
  },
];

const questionsLength = quizQuestions.length;

const totalQuestions = document.querySelector(".question-size");
const nextButton = document.getElementById("next");
nextButton.disabled = true;
totalQuestions.innerHTML = questionsLength;
const timeAvailable = document.querySelector(".time-available");
const questionCount = document.querySelector(".question-count");
const timer = document.querySelector(".timer");
const questionText = document.querySelector(".question-text");
const optionContainer = document.querySelector(".option-container");
const startBox = document.getElementsByClassName("start-box");
const questionBox = document.getElementsByClassName("question-box");
const resultBox = document.getElementsByClassName("result-box");
const score = document.querySelector(".score");
const timeTaken = document.querySelector(".time-taken");

let questionNumber = 0;
let questionAnswerIndex = 0;
let availableQuestion = [];
let correctAnswerCount = 0;
let TotalTimeAvailable = 5;
timeAvailable.innerHTML = TotalTimeAvailable;
let secondsCount = TotalTimeAvailable;
let time;
let totalTimeTaken = 0;
let totalTime = TotalTimeAvailable * questionsLength;

function setQuestions() {
  for (let i = 0; i < questionsLength; i++) {
    availableQuestion.push(quizQuestions[i]);
  }
}

function getQuestions() {
  //setting question counter
  questionCount.innerHTML =
    "Question " + (questionNumber + 1) + " of " + questionsLength;

  //setting timer
  time = setInterval(questionTimer, 1000);

  //take question randomly
  const questionIndex =
    availableQuestion[Math.floor(Math.random() * availableQuestion.length)];
  //set question
  questionText.innerHTML = questionIndex.question;

  //index of question answer is set
  questionAnswerIndex = questionIndex.answer;

  //getting option length
  const optionsSize = questionIndex.options.length;
  const availableOptions = [];

  //setting all the options into an array
  for (let i = 0; i < optionsSize; i++) {
    availableOptions.push(questionIndex.options[i]);
  }

  //optionContainer.innerHTML = ""; //Fast but not standard
  // standard implementation
  while (optionContainer.hasChildNodes()) {
    optionContainer.removeChild(optionContainer.lastChild);
  }

  for (let i = 0; i < optionsSize; i++) {
    //selecting options randomly to display
    const optIndx =
      availableOptions[Math.floor(Math.random() * availableOptions.length)];
    const ind = availableOptions.indexOf(optIndx); //getting index of the option
    //creating div element
    const opt = document.createElement("div");
    opt.innerHTML = optIndx;
    opt.id = questionIndex.options.indexOf(optIndx);
    opt.className = "option";
    optionContainer.appendChild(opt);
    opt.setAttribute("onClick", "getAnswer(this)");
    //remoivng the displayed option from available options
    availableOptions.splice(ind, 1);
  }

  //taking index of the current question
  const index = availableQuestion.indexOf(questionIndex);
  //remoivng the displayed question from available questions
  availableQuestion.splice(index, 1);

  //incrementing question number
  questionNumber++;
}

function startQuiz() {
  questionNumber = 0;
  availableQuestion = [];
  totalTimetaken = 0;
  correctAnswerCount = 0;

  startBox[0].style.display = "none";
  questionBox[0].style.display = "";
  resultBox[0].style.display = "none";

  setQuestions();

  getQuestions();
}

function next() {
  if (questionNumber != questionsLength) {
    getQuestions();
  } else {
    questionBox[0].style.display = "none";
    resultBox[0].style.display = "";

    score.innerHTML = correctAnswerCount + "/" + questionsLength;
    timeTaken.innerHTML = totalTimeTaken + " s";
  }
}

function goHome() {
  startBox[0].style.display = "";
  questionBox[0].style.display = "none";
  resultBox[0].style.display = "none";
}

function getAnswer(element) {
  nextButton.disabled = false;
  clearInterval(time);
  totalTimeTaken += Math.max(TotalTimeAvailable - secondsCount - 1, 0);
  secondsCount = TotalTimeAvailable;
  const id = parseInt(element.id);
  if (id === questionAnswerIndex) {
    correctAnswerCount++;
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }

  const optLen = optionContainer.children.length;
  for (let i = 0; i < optLen; i++) {
    if (parseInt(optionContainer.children[i].id) === questionAnswerIndex) {
      optionContainer.children[i].classList.add("correct");
    }
    optionContainer.children[i].classList.add("freezeClick");
  }
}

function questionTimer() {
  timer.innerHTML = "Time: " + secondsCount + " s";
  secondsCount--;
  if (secondsCount == -1) {
    clearInterval(time);
    secondsCount = TotalTimeAvailable;
    totalTimeTaken += TotalTimeAvailable;
    next();
  }
}

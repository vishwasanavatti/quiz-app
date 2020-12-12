const quizQuestions = [
  {
    question: "What is the largest country in the world?",
    options: ["Russia", "Canada", "China", "United States"],
    answer: 0,
  },
  {
    question: "Which of these species is not extinct?",
    options: [
      "Komodo dragon",
      "Japanese sea lion",
      "Tasmanian tiger",
      "Saudi gazelle",
    ],
    answer: 0,
  },
  {
    question: "Which ocean borders the west coast of the United States?",
    options: ["Pacific", "Atlantic", "Indian", "Arctic"],
    answer: 0,
  },
  {
    question: "Which nation claims ownership of Antarctica?",
    options: [
      "No one, but there are claims.",
      "United States of America",
      "United Nations",
      "Australia",
    ],
    answer: 0,
  },
  {
    question:
      "Leonardo Di Caprio won his first Best Actor Oscar for his performance in which film?",
    options: [
      "The Revenant",
      "The Wolf Of Wall Street",
      "Inception",
      "Shutter Island",
    ],
    answer: 0,
  },
  {
    question: "How many manned moon landings have there been?",
    options: [6, 1, 3, 7],
    answer: 0,
  },
  {
    question: "What is the fastest land animal?",
    options: ["Cheetah", "Lion", "Thomson Gazelle", "Pronghorn Antelope"],
    answer: 0,
  },
  {
    question: "Botanically speaking, which of these fruits is NOT a berry?",
    options: ["Strawberry", "Blueberry", "Banana", "Concord Grape"],
    answer: 0,
  },
  {
    question: "Which of the following is NOT a real element?",
    options: ["Vitrainium", "Praseodymium", "Hassium", "Lutetium"],
    answer: 0,
  },
  {
    question: "Harvard University is located in which city?",
    options: ["Cambridge", "Providence", "New York", "Washington D.C."],
    answer: 0,
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

//global variables declared here
let TotalTimeAvailable = 10; //total time per question
timeAvailable.innerHTML = TotalTimeAvailable;
let questionNumber = 0;
let questionAnswerIndex = 0;
let availableQuestion = [];
let correctAnswerCount = 0;
let secondsCount = TotalTimeAvailable;
let time;
let totalTimeTaken = 0;
let totalTime = TotalTimeAvailable * questionsLength;

//this function is called when start is clicked
function startQuiz() {
  questionNumber = 0;
  availableQuestion = [];
  totalTimeTaken = 0;
  correctAnswerCount = 0;

  startBox[0].style.display = "none";
  questionBox[0].style.display = "";
  resultBox[0].style.display = "none";

  setQuestions();

  getQuestions();
}

//Here questions are set to an array
function setQuestions() {
  for (let i = 0; i < questionsLength; i++) {
    availableQuestion.push(quizQuestions[i]);
  }
}

//Here questions are taken randomly from array and are displayed
function getQuestions() {
  nextButton.disabled = true;
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

//Next function is called to display next question
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

//This will go back to home
function goHome() {
  startBox[0].style.display = "";
  questionBox[0].style.display = "none";
  resultBox[0].style.display = "none";
}

//This function fetches the answer
function getAnswer(element) {
  nextButton.disabled = false;
  clearInterval(time);
  //Max is set to avoid negative value
  totalTimeTaken += Math.max(TotalTimeAvailable - secondsCount - 1, 0);
  secondsCount = TotalTimeAvailable;

  //correct and wrong are set by adding css class
  const id = parseInt(element.id);
  if (id === questionAnswerIndex) {
    correctAnswerCount++;
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }

  //disabling click after answer is selected
  const optLen = optionContainer.children.length;
  for (let i = 0; i < optLen; i++) {
    if (parseInt(optionContainer.children[i].id) === questionAnswerIndex) {
      optionContainer.children[i].classList.add("correct");
    }
    optionContainer.children[i].classList.add("freezeClick");
  }
}

//timer count down
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

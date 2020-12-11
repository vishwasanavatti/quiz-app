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
];

const questionsLength = quizQuestions.length;
document.querySelector(".question-size").innerHTML = questionsLength;

const questionCount = document.querySelector(".question-count");
const timer = document.querySelector(".timer");
const questionText = document.querySelector(".question-text");
const optionContainer = document.querySelector(".option-container");
const startBox = document.getElementsByClassName("start-box");
const questionBox = document.getElementsByClassName("question-box");
const resultBox = document.getElementsByClassName("result-box");

let questionNumber = 0;
let currentQuestion;
let availableQuestion = [];

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

  //set question
  const questionIndex =
    availableQuestion[Math.floor(Math.random() * availableQuestion.length)];
  questionText.innerHTML = questionIndex.question;

  const optionsSize = questionIndex.options.length;
  const availableOptions = [];

  for (let i = 0; i < optionsSize; i++) {
    availableOptions.push(questionIndex.options[i]);
  }

  //optionContainer.innerHTML = ""; //Fast but not standard
  // standard implementation
  while (optionContainer.hasChildNodes()) {
    optionContainer.removeChild(optionContainer.lastChild);
  }

  for (let i = 0; i < optionsSize; i++) {
    const opt = document.createElement("div");
    opt.innerHTML = questionIndex.options[i];
    opt.id = i;
    opt.className = "option";
    optionContainer.appendChild(opt);
  }

  const index = availableQuestion.indexOf(questionIndex);

  availableQuestion.splice(index, 1);

  questionNumber++;
}

function startQuiz() {
  questionNumber = 0;
  availableQuestion = [];

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
  }
}

function goHome() {
  startBox[0].style.display = "";
  questionBox[0].style.display = "none";
  resultBox[0].style.display = "none";
}

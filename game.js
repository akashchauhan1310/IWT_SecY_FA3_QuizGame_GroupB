const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText=document.getElementById('progressText');
const scoreText=document.getElementById('score');
const progressBarFull= document.getElementById('progressBarFull')

let currentQuestion = {};
let acceptingAnswers = false;
let score= 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: 'HTML stands for?',
        choice1: 'Hyper Text Markup Language',
        choice2: 'High Text Markup Language',
        choice3: 'Hyper Table Markup Language',
        choice4: 'None Of these',
        answer: 1,
    },
    {
        question:
            "From which tag descriptive list starts?",
        choice1: "<LL>",
        choice2: "<DD>",
        choice3: "<DL>",
        choice4: "<DS>",
        answer: 3,
    },
    {
        question: " How do you write 'Hello World' in an alert box?",
        choice1: "msgBox('Hello World');",
        choice2: "alertBox('Hello World');",
        choice3: "msg('Hello World');",
        choice4: "alert('Hello World');",
        answer: 4,
    },
    {
        question: "Which of the following defines a relative measurement for the height of a font in em spaces?",
        choice1: "%",
        choice2: "em",
        choice3: "ex",
        choice4: "cm",
        answer: 2,
    },
    {
        question: "Which of the following property is used to add or subtract space between the words of a sentence?",
        choice1: "text-indent",
        choice2: "text-align",
        choice3: "text-decoration",
        choice4: "text-transform",
        answer: 1,
    },
    {
        question: "Which of the following property of an anchor element signifies visited hyperlinks?",
        choice1: ":link",
        choice2: ":visited",
        choice3: ":hover",
        choice4: ":clicked",
        answer: 2,
    },
    {
        question: "Which attribute specifies a unique alphanumeric identifier to be associated with an element?",
        choice1: "class",
        choice2: "article",
        choice3: "id",
        choice4: "html",
        answer: 3,
    },
    {
        question: "Which tag is used to link javascript file to html file?",
        choice1: "<add>",
        choice2: "<script>",
        choice3: "<link>",
        choice4: "<merge>",
        answer: 2,
    },
    {
        question: "Which operator is used for strict comparison of variables?",
        choice1: "==",
        choice2: "===",
        choice3: "!=",
        choice4: "<=",
        answer: 2,
    },
    {
        question: "Which of these is correct syntax to apply flex-box in css?",
        choice1: "display:flex;",
        choice2: "display:flex-box;",
        choice3: "flex:dislay-flex-box;",
        choice4: "flex:display-flex;",
        answer: 1,
    }
];


const CORRECT_BONUS=10;
const MAX_QUESTIONS=5;
const MAX_SCORE=MAX_QUESTIONS*CORRECT_BONUS;



startGame = () => 
{
	questionCounter=0;
	score=0;
	availableQuestions = [...questions]
	getNewQuestion();
};

getNewQuestion = () =>
{
    if(availableQuestions.length==0 || questionCounter >= MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore',score);
        localStorage.setItem('mostRecentMaxScore',MAX_SCORE);
        return window.location.assign("end.html");
    }
	questionCounter++;
    progressText.innerText="Question: "+questionCounter+"/"+MAX_QUESTIONS;
    progressBarFull.style.width = ((questionCounter/MAX_QUESTIONS)*100)+"%";


	const questionIndex = Math.floor(Math.random() * availableQuestions.length);
	currentQuestion = availableQuestions[questionIndex];
	question.innerText = currentQuestion.question;

    choices.forEach(choice =>{
        const number=choice.dataset['number'];
        choice.innerText=currentQuestion['choice'+ number];
    });

    availableQuestions.splice(questionIndex,1);

    acceptingAnswers=true;


};

choices.forEach(choice =>
{
    choice.addEventListener('click',e=>
    {
        if(!acceptingAnswers) return;

        acceptingAnswers=false;
        const selectedChoice=e.target;
        const selectedAnswer=selectedChoice.dataset["number"];


        const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

      if(classToApply == "correct")
      {
        incrementScore(CORRECT_BONUS);
      }


        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {

                selectedChoice.parentElement.classList.remove(classToApply);
                getNewQuestion();

            },1000);


        

    });
});

incrementScore = num => {
    score+=num;
    scoreText.innerText=score;
}

startGame(); 
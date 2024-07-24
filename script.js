// const { resolveEnvPrefix } = require("vite");

const questions =[
    {
        question:"Which is the largest market value company in the world",
        answers:[
            {text:"Apple", correct: false},
            {text:"Nvidia", correct: true},
            {text:"Micorsoft", correct: false},
            {text:"Google", correct: false},
        ]
    },
    {
        question:"Which is the best batsmen in the world?",
        answers:[
            {text:"Virat Kohli",correct:true},
            {text:"Steve Smith",correct:false},
            {text:"Joe Root",correct:false},
            {text:"kane Williamson",correct:false},
        ]
    },
    {
        question:"Which team won the T20 world cup?",
        answers:[
            {text:"Australia",correct:false},
            {text:"South Africa",correct:false},
            {text:"India",correct:true},
            {text:"England",correct:false},
        ]
    },
    {
        question:"where the Paris olympics 2024 are hosting?",
        answers:[
            {text:"London",correct:false},
            {text:"USA",correct:false},
            {text:"China",correct:false},
            {text:"Paris",correct:true},
        ]
    },
];
const questionElement  =document.getElementById("question");
const answerButtons =document.getElementById("answer-buttons");
const nextButton  =document.getElementById("next-btn");

let currentQuestionIndex=0;
let score=0;

function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML="Next";
    showQuestion();
}
function showQuestion(){
    resetState();
    let currentQuestion =questions[currentQuestionIndex];
    let questionNo=currentQuestionIndex+1;
    questionElement.innerHTML=questionNo+ "."+currentQuestion.question;

    currentQuestion.answers.forEach(answer=>{
        const button=document.createElement("button")
        button.innerHTML=answer.text;
        button.classList.add("btn")
        answerButtons.appendChild(button)
        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click",selectAnswer)
    })
}

function resetState(){
    nextButton.style.display="none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild)
    }
}

function selectAnswer(e){
    const selectedBtn=e.target;
    // console.log(selectedBtn)
    const isCorrect = selectedBtn.dataset.correct === "true";
    // console.log(selectedBtn.dataset.correct)
    // console.log(isCorrect)
    if(isCorrect){
        console.log("success")
        score++;
        selectedBtn.classList.add("correct")
    }else{
        console.log("failure")
        selectedBtn.classList.add("incorrect")
    }
    Array.from(answerButtons.children).forEach(button=>{
        if(button.dataset.correct==="true"){
            button.classList.add("correct")
        }
        button.disabled=true;
    });
    nextButton.style.display="block"
}
nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton()
    }else{
        showScore();
    }
})
function showScore(){
    resetState();
    questionElement.innerHTML=`your scored ${score}  out of ${questions.length}!`
    nextButton.innerHTML="Play Again"
    nextButton.style.display="block";
    nextButton.addEventListener("click",()=>{
        startQuiz()
    })
}

function handleNextButton(){
        currentQuestionIndex++;
        if(currentQuestionIndex<questions.length){
            showQuestion();
        }
}
startQuiz()
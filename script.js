const questions = [
    {
        question: "Qual é a capital do estado do Paraná?",
        answers: [
            { text: "Londrina", correct: false },
            { text: "Curitiba", correct: true },
            { text: "Maringá", correct: false },
            { text: "Foz do Iguaçu", correct: false },
        ]
    },
    {
        question: "Em que ano foi fundada a cidade de Curitiba?",
        answers: [
            { text: "1853", correct: false },
            { text: "1721", correct: false },
            { text: "1693", correct: true },
            { text: "1901", correct: false },
        ]
    },
    {
        question: "Qual é o principal rio que banha a cidade de Foz do Iguaçu?",
        answers: [
            { text: "Rio Paraná", correct: true },
            { text: "Rio Iguaçu", correct: false },
            { text: "Rio Tibagi", correct: false },
            { text: "Rio Ivaí", correct: false },
        ]
    }
];

const questionElement = document.getElementById("question");
const optionsContainer = document.getElementById("options-container");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Próxima Pergunta";
    showQuestion();
}

function showQuestion() {
    nextButton.style.display = "none";
    let currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;
    optionsContainer.innerHTML = ''; // Limpa as opções anteriores

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("option-btn");
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        optionsContainer.appendChild(button);
    });
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }

    // Desativa os outros botões e mostra a resposta correta
    Array.from(optionsContainer.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    optionsContainer.innerHTML = "";
    questionElement.innerHTML = `Você acertou ${score} de ${questions.length} perguntas!`;
    nextButton.innerHTML = "Jogar Novamente";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();

const questions = [
    {
        question: "Qual é a capital do estado do Paraná?",
        answers: [
            { text: "Londrina", correct: false },
            { text: "Curitiba", correct: true },
            { text: "Maringá", correct: false },
            { text: "Foz do Iguaçu", correct: false },
        ]
    }
];

const questionElement = document.getElementById("question");
const optionsContainer = document.getElementById("options-container");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    showQuestion();
}

function showQuestion() {
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
    } else {
        selectedBtn.classList.add("incorrect");
    }

    // Desativa os outros botões para que o usuário não possa clicar novamente
    Array.from(optionsContainer.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
}

// Inicia o quiz quando a página carregar
startQuiz();

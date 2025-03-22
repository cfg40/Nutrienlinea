import { questions, resultCategories } from './config.js';

// Variables globales
let currentQuestion = 0;
let userAnswers = [];
let totalScore = 0;

// Elementos DOM
const questionContainer = document.getElementById('question-container');
const resultsContainer = document.getElementById('results-container');
const progressFill = document.querySelector('.progress-fill');
const progressSteps = document.querySelectorAll('.step');

// Inicializar el test
function initTest() {
    currentQuestion = 0;
    userAnswers = [];
    totalScore = 0;
    showQuestion(currentQuestion);
    updateProgressBar();
    resultsContainer.classList.add('hidden');
    questionContainer.classList.remove('hidden');
}

// Mostrar pregunta actual
function showQuestion(index) {
    if (index >= questions.length) {
        showResults();
        return;
    }

    const question = questions[index];
    
    let optionsHTML = '';
    question.options.forEach((option, i) => {
        optionsHTML += `
            <div class="option" data-value="${option.value}">
                <input type="radio" name="q${question.id}" id="q${question.id}o${i}" class="option-input" ${userAnswers[index] === option.value ? 'checked' : ''}>
                <label for="q${question.id}o${i}">${option.text}</label>
            </div>
        `;
    });

    questionContainer.innerHTML = `
        <div class="question">
            <h2>${question.question}</h2>
            <div class="options">
                ${optionsHTML}
            </div>
        </div>
        <div class="buttons">
            ${index > 0 ? '<button class="btn btn-prev" id="prev-btn">Anterior</button>' : '<div></div>'}
            <button class="btn btn-next" id="next-btn" ${userAnswers[index] === undefined ? 'disabled' : ''}>
                ${index === questions.length - 1 ? 'Ver Resultados' : 'Siguiente'}
            </button>
        </div>
    `;

    // Event listeners
    document.querySelectorAll('.option').forEach(option => {
        option.addEventListener('click', selectOption);
    });

    const nextBtn = document.getElementById('next-btn');
    if (nextBtn) {
        nextBtn.addEventListener('click', nextQuestion);
    }

    const prevBtn = document.getElementById('prev-btn');
    if (prevBtn) {
        prevBtn.addEventListener('click', prevQuestion);
    }
}

// Seleccionar una opción
function selectOption(e) {
    const selectedOption = e.currentTarget;
    const allOptions = document.querySelectorAll('.option');
    
    // Deseleccionar todas las opciones
    allOptions.forEach(option => option.classList.remove('selected'));
    
    // Seleccionar la opción clickeada
    selectedOption.classList.add('selected');
    
    // Actualizar respuesta del usuario
    const value = parseInt(selectedOption.dataset.value);
    userAnswers[currentQuestion] = value;
    
    // Habilitar botón siguiente
    const nextBtn = document.getElementById('next-btn');
    if (nextBtn) {
        nextBtn.disabled = false;
    }
}

// Ir a la siguiente pregunta
function nextQuestion() {
    currentQuestion++;
    showQuestion(currentQuestion);
    updateProgressBar();
}

// Ir a la pregunta anterior
function prevQuestion() {
    currentQuestion--;
    showQuestion(currentQuestion);
    updateProgressBar();
}

// Actualizar la barra de progreso
function updateProgressBar() {
    const progress = ((currentQuestion) / questions.length) * 100;
    progressFill.style.width = `${progress}%`;
    
    progressSteps.forEach((step, index) => {
        if (index < currentQuestion) {
            step.classList.add('completed');
            step.classList.remove('active');
        } else if (index === currentQuestion) {
            step.classList.add('active');
            step.classList.remove('completed');
        } else {
            step.classList.remove('active');
            step.classList.remove('completed');
        }
    });
}

// Mostrar resultados
function showResults() {
    // Calcular puntuación total
    totalScore = userAnswers.reduce((total, answer) => total + answer, 0);
    
    // Convertir a escala 0-100 para mejor comprensión
    const maxPossibleScore = questions.length * 4; // 4 es el valor máximo por pregunta
    const scaledScore = Math.round((totalScore / maxPossibleScore) * 100);
    
    // Encontrar categoría de resultado
    let resultCategory = resultCategories.find(category => 
        scaledScore >= category.min && scaledScore <= category.max
    );
    
    if (!resultCategory) {
        resultCategory = resultCategories[resultCategories.length - 1];
    }
    
    // Mostrar resultados
    document.getElementById('final-score').textContent = scaledScore;
    document.getElementById('result-title').textContent = resultCategory.title;
    document.getElementById('result-title').className = resultCategory.class;
    document.getElementById('result-description').textContent = resultCategory.description;
    
    // Mostrar recomendaciones
    const recommendationsList = document.getElementById('recommendations-list');
    recommendationsList.innerHTML = '';
    
    resultCategory.recommendations.forEach(recommendation => {
        const li = document.createElement('li');
        li.textContent = recommendation;
        recommendationsList.appendChild(li);
    });
    
    // Ocultar preguntas y mostrar resultados
    questionContainer.classList.add('hidden');
    resultsContainer.classList.remove('hidden');
    
    // Completar la barra de progreso
    progressFill.style.width = '100%';
    progressSteps.forEach(step => {
        step.classList.add('completed');
        step.classList.remove('active');
    });
}

// Event listener para el botón de reinicio
document.getElementById('restart-btn').addEventListener('click', initTest);

// Iniciar el test
initTest();


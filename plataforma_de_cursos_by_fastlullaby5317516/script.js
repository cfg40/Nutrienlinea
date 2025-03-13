// Datos de usuarios
const users = [
    {
        email: "usuario@ejemplo.com",
        password: "password123"
    },
    {
        email: "admin@ejemplo.com",
        password: "admin123"
    }
];

// Variable para el estado de autenticación
let isAuthenticated = false;

// Datos de ejemplo - En un entorno real, estos datos vendrían de una API o base de datos
const coursesData = [
    {
        id: 1,
        title: "BAJAR DE PESO",
        progress: 35,
        modules: [
            {
                id: 1,
                title: "como bajar de peso de manera saludable",
                lessons: [
                    {
                        id: 1,
                        title: "Introducción",
                        duration: "8:25",
                        videoId: "hthttps://drive.google.com/drive/folders/179Lj9cauURKL6sSrEyJkgZ_Av90NnFlA?usp=sharingtps://drive.google.com/file/d/1t2UhSXF3Zoux1-hq_4HsnNwpZKs-EV3R/view?usp=drive_link://drive.google.com/file/d/1trvK6m_XRRk-1GqmG_jNnBQ1gtZJk7https://drive.google.com/file/d/1t2UhSXF3Zoux1-hq_4HsnNwpZKs-EV3R/view?usp=drive_linksO/preview",
                        completed: true
                    },
                    {
                        id: 2,
                        title: "Estructura básica de un documento HTML",
                        duration: "12:10",
                        videoId: "https://drive.google.com/file/d/1Y3g5JYt9n0pF6n_PYOorE_JRBxUjSCFL/preview",
                        completed: false
                    }
                ]
            },
            {
                id: 2,
                title: "CSS Fundamentals",
                lessons: [
                    {
                        id: 3,
                        title: "Introducción a CSS",
                        duration: "10:15",
                        videoId: "https://drive.google.com/file/d/1f7NZ4q-sCiw-lH7ikrR9dXYQ_TUHRRDe/preview",
                        completed: true
                    },
                    {
                        id: 4,
                        title: "Selectores en CSS",
                        duration: "15:30",
                        videoId: "https://drive.google.com/file/d/1yKu58ITvOBU5V0HQVqXlE4umlD3sikCk/preview",
                        completed: false
                    }
                ]
            }
        ]
    },
    {
        id: 2,
        title: "JavaScript Avanzado",
        progress: 10,
        modules: [
            {
                id: 3,
                title: "Conceptos Básicos",
                lessons: [
                    {
                        id: 5,
                        title: "Variables y tipos de datos",
                        duration: "11:20",
                        videoId: "https://drive.google.com/file/d/1mJY5zQU-Xg9HUMUlhMGnJbTzIlLvglZC/preview",
                        completed: true
                    },
                    {
                        id: 6,
                        title: "Funciones en JavaScript",
                        duration: "14:45",
                        videoId: "https://drive.google.com/file/d/1pMyCvCBtQl2gyFxikdPfQFRTNGKyAA4r/preview",
                        completed: false
                    }
                ]
            }
        ]
    },
    {
        id: 3,
        title: "React desde Cero",
        progress: 0,
        modules: [
            {
                id: 4,
                title: "Introducción a React",
                lessons: [
                    {
                        id: 7,
                        title: "¿Qué es React?",
                        duration: "9:45",
                        videoId: "https://drive.google.com/file/d/1OqE5gCUOp5_2pJAMnQUREqVQBK0Yit0N/preview",
                        completed: false
                    },
                    {
                        id: 8,
                        title: "Componentes en React",
                        duration: "13:20",
                        videoId: "https://drive.google.com/file/d/1o4IUAJiqcGEPTHAV1mVLWKmOIH2jdiZM/preview",
                        completed: false
                    }
                ]
            }
        ]
    }
];

// Variables globales
let currentCourse = null;
let currentLesson = null;

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    // Verificar si hay una sesión en localStorage
    checkAuthSession();
    
    // Configurar el formulario de login
    setupLoginForm();
    
    // Configurar los eventos de la aplicación solo si está autenticado
    if (isAuthenticated) {
        initializeCourses();
        setupEventListeners();
    }
});

// Verificar si hay una sesión almacenada
function checkAuthSession() {
    const authSession = localStorage.getItem('authSession');
    if (authSession) {
        isAuthenticated = true;
        showApp();
    }
}

// Configurar el formulario de login
function setupLoginForm() {
    const loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        if (authenticateUser(email, password)) {
            // Guardar la sesión y mostrar la app
            localStorage.setItem('authSession', email);
            isAuthenticated = true;
            showApp();
            
            // Inicializar componentes de la app
            initializeCourses();
            setupEventListeners();
        } else {
            // Mostrar error de autenticación
            const errorElement = document.getElementById('login-error');
            errorElement.textContent = "Correo electrónico o contraseña incorrectos";
            errorElement.style.display = "block";
        }
    });
}

// Autenticar usuario
function authenticateUser(email, password) {
    return users.some(user => user.email === email && user.password === password);
}

// Mostrar la aplicación y ocultar el login
function showApp() {
    document.getElementById('login-overlay').style.display = 'none';
    document.querySelector('.app-container').style.display = 'flex';
}

// Inicializar la lista de cursos
function initializeCourses() {
    const coursesList = document.getElementById('courses-list');
    
    coursesData.forEach(course => {
        const li = document.createElement('li');
        li.textContent = course.title;
        li.dataset.courseId = course.id;
        li.addEventListener('click', () => loadCourse(course));
        coursesList.appendChild(li);
    });
}

// Cargar un curso
function loadCourse(course) {
    // Actualizar UI para el curso seleccionado
    currentCourse = course;
    
    // Actualizar elementos activos en la lista de cursos
    document.querySelectorAll('#courses-list li').forEach(item => {
        item.classList.remove('active');
        if (parseInt(item.dataset.courseId) === course.id) {
            item.classList.add('active');
        }
    });
    
    // Actualizar título del curso y progreso
    document.getElementById('current-course-title').textContent = course.title;
    document.getElementById('course-progress').style.width = `${course.progress}%`;
    document.getElementById('progress-text').textContent = `${course.progress}%`;
    
    // Cargar módulos y lecciones
    loadModules(course.modules);
}

// Cargar módulos y lecciones
function loadModules(modules) {
    const modulesContainer = document.getElementById('modules-container');
    modulesContainer.innerHTML = '';
    
    modules.forEach(module => {
        const moduleElement = document.createElement('div');
        moduleElement.className = 'module';
        moduleElement.dataset.moduleId = module.id;
        
        moduleElement.innerHTML = `
            <div class="module-header">
                <div class="module-title">${module.title}</div>
                <button class="module-toggle"><i class="fas fa-chevron-down"></i></button>
            </div>
            <div class="module-lessons"></div>
        `;
        
        const lessonsContainer = moduleElement.querySelector('.module-lessons');
        
        module.lessons.forEach(lesson => {
            const lessonElement = document.createElement('div');
            lessonElement.className = `lesson ${lesson.completed ? 'completed' : 'incomplete'}`;
            lessonElement.dataset.lessonId = lesson.id;
            
            lessonElement.innerHTML = `
                <div class="lesson-status ${lesson.completed ? 'complete' : 'incomplete'}">
                    <i class="${lesson.completed ? 'fas fa-check' : 'fas fa-play'}"></i>
                </div>
                <div class="lesson-title">${lesson.title}</div>
                <div class="lesson-duration">${lesson.duration}</div>
            `;
            
            lessonElement.addEventListener('click', () => loadLesson(lesson));
            lessonsContainer.appendChild(lessonElement);
        });
        
        moduleElement.querySelector('.module-header').addEventListener('click', () => {
            moduleElement.classList.toggle('expanded');
        });
        
        modulesContainer.appendChild(moduleElement);
    });
}

// Cargar una lección
function loadLesson(lesson) {
    // Verificar autenticación antes de mostrar el video
    if (!isAuthenticated) {
        alert('Necesitas iniciar sesión para ver esta lección');
        return;
    }
    
    currentLesson = lesson;
    
    // Actualizar la lección activa en la UI
    document.querySelectorAll('.lesson').forEach(item => {
        item.classList.remove('active');
        if (parseInt(item.dataset.lessonId) === lesson.id) {
            item.classList.add('active');
        }
    });
    
    // Actualizar el título de la lección
    document.getElementById('current-lesson-title').textContent = lesson.title;
    
    // Mostrar el video
    document.getElementById('video-placeholder').style.display = 'none';
    document.getElementById('video-player').style.display = 'block';
    
    // Cargar el video de Google Drive
    const videoIframe = document.getElementById('video-iframe');
    videoIframe.src = lesson.videoId;
    
    // Actualizar el botón de "Marcar como completada"
    const markCompleteBtn = document.getElementById('mark-complete');
    if (lesson.completed) {
        markCompleteBtn.innerHTML = '<i class="fas fa-check-circle"></i> Completada';
        markCompleteBtn.disabled = true;
    } else {
        markCompleteBtn.innerHTML = '<i class="fas fa-check-circle"></i> Marcar como completada';
        markCompleteBtn.disabled = false;
    }
}

// Configurar escuchadores de eventos
function setupEventListeners() {
    // Toggle para el panel de lecciones
    document.getElementById('toggle-lessons').addEventListener('click', () => {
        document.querySelector('.lessons-panel').classList.toggle('collapsed');
    });
    
    // Botón para marcar como completada
    document.getElementById('mark-complete').addEventListener('click', () => {
        if (currentLesson && !currentLesson.completed) {
            markLessonAsComplete(currentLesson);
        }
    });
    
    // Botón para siguiente lección
    document.getElementById('next-lesson').addEventListener('click', loadNextLesson);
    
    // Añadir botón de cerrar sesión
    document.querySelector('.user-info').addEventListener('click', () => {
        logout();
    });
}

// Marcar una lección como completada
function markLessonAsComplete(lesson) {
    // En un entorno real, aquí enviaríamos una petición al servidor
    lesson.completed = true;
    
    // Actualizar la UI
    const lessonElement = document.querySelector(`.lesson[data-lesson-id="${lesson.id}"]`);
    lessonElement.classList.add('completed');
    lessonElement.querySelector('.lesson-status').classList.remove('incomplete');
    lessonElement.querySelector('.lesson-status').classList.add('complete');
    lessonElement.querySelector('.lesson-status i').className = 'fas fa-check';
    
    // Actualizar el botón
    const markCompleteBtn = document.getElementById('mark-complete');
    markCompleteBtn.innerHTML = '<i class="fas fa-check-circle"></i> Completada';
    markCompleteBtn.disabled = true;
    
    // Actualizar el progreso del curso
    updateCourseProgress();
}

// Actualizar el progreso del curso
function updateCourseProgress() {
    if (currentCourse) {
        let totalLessons = 0;
        let completedLessons = 0;
        
        currentCourse.modules.forEach(module => {
            module.lessons.forEach(lesson => {
                totalLessons++;
                if (lesson.completed) {
                    completedLessons++;
                }
            });
        });
        
        const progress = Math.round((completedLessons / totalLessons) * 100);
        currentCourse.progress = progress;
        
        // Actualizar la UI
        document.getElementById('course-progress').style.width = `${progress}%`;
        document.getElementById('progress-text').textContent = `${progress}%`;
    }
}

// Cargar la siguiente lección
function loadNextLesson() {
    if (!currentCourse || !currentLesson) return;
    
    let foundCurrent = false;
    let nextLesson = null;
    
    // Buscar la siguiente lección
    outerLoop: for (const module of currentCourse.modules) {
        for (const lesson of module.lessons) {
            if (foundCurrent) {
                nextLesson = lesson;
                break outerLoop;
            }
            if (lesson.id === currentLesson.id) {
                foundCurrent = true;
            }
        }
    }
    
    // Cargar la siguiente lección si existe
    if (nextLesson) {
        loadLesson(nextLesson);
    } else {
        alert('¡Ya has llegado al final del curso!');
    }
}

// Función para cerrar sesión
function logout() {
    localStorage.removeItem('authSession');
    isAuthenticated = false;
    document.getElementById('login-overlay').style.display = 'flex';
    document.querySelector('.app-container').style.display = 'none';
}
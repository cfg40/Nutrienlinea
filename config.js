export const questions = [
    {
        id: 1,
        question: "¿Con qué frecuencia consumes frutas y verduras?",
        options: [
            { text: "Menos de 1 vez a la semana", value: 0 },
            { text: "1-2 veces por semana", value: 1 },
            { text: "3-4 veces por semana", value: 2 },
            { text: "5-6 veces por semana", value: 3 },
            { text: "Todos los días", value: 4 }
        ]
    },
    {
        id: 2,
        question: "¿Cuántos vasos de agua bebes al día?",
        options: [
            { text: "Menos de 2 vasos", value: 0 },
            { text: "Entre 2 y 4 vasos", value: 1 },
            { text: "Entre 5 y 6 vasos", value: 2 },
            { text: "Entre 7 y 8 vasos", value: 3 },
            { text: "Más de 8 vasos", value: 4 }
        ]
    },
    {
        id: 3,
        question: "¿Con qué frecuencia consumes proteínas (carnes,pollo, pescado,etc.)?",
        options: [
            { text: "Rara vez o nunca", value: 0 },
            { text: "1-2 veces por semana", value: 1 },
            { text: "3-4 veces por semana", value: 2 },
            { text: "5-6 veces por semana", value: 3 },
            { text: "Todos los días", value: 4 }
        ]
    },
    {
        id: 4,
        question: "¿Con qué frecuencia consumes comida chatarra?",
        options: [
            { text: "Todos los días", value: 0 },
            { text: "5-6 veces por semana", value: 1 },
            { text: "3-4 veces por semana", value: 2 },
            { text: "1-2 veces por semana", value: 3 },
            { text: "Rara vez o nunca", value: 4 }
        ]
    },
    {
        id: 5,
        question: "¿Experimentas cansancio o fatiga durante el día?",
        options: [
            { text: "Casi siempre", value: 0 },
            { text: "Frecuentemente", value: 1 },
            { text: "A veces", value: 2 },
            { text: "Rara vez", value: 3 },
            { text: "Casi nunca", value: 4 }
        ]
    },
    {
        id: 6,
        question: "¿Planificas tus comidas o comes a cualquier hora?",
        options: [
            { text: "Siempre como a cualquier hora", value: 0 },
            { text: "Normalmente como a cualquier hora", value: 1 },
            { text: "A veces planifico mis comidas", value: 2 },
            { text: "Normalmente planifico mis comidas", value: 3 },
            { text: "Siempre planifico mis comidas", value: 4 }
        ]
    },
    {
        id: 7,
        question: "¿Cómo describirías tu digestión?",
        options: [
            { text: "Muy mala (molestias constantes)", value: 0 },
            { text: "Mala (molestias frecuentes)", value: 1 },
            { text: "Regular (algunas molestias)", value: 2 },
            { text: "Buena (pocas molestias)", value: 3 },
            { text: "Excelente (sin molestias)", value: 4 }
        ]
    }
];

export const resultCategories = [
    {
        min: 0,
        max: 30,
        title: "Deficiencia grave en alimentación",
        description: "Tus hábitos alimenticios actuales podrían estar causando serias deficiencias nutricionales.",
        class: "danger",
        recommendations: [
            "Consulta con un nutricionista para una evaluación completa.",
            "Incorpora frutas y verduras diariamente en tu dieta.",
            "Aumenta tu consumo de agua a mínimo 8 vasos diarios.",
            "Reduce drásticamente el consumo de alimentos procesados.",
            "Establece horarios regulares para tus comidas."
        ]
    },
    {
        min: 31,
        max: 55,
        title: "Hábitos moderados pero mejorables",
        description: "Tienes algunos hábitos positivos, pero hay importantes áreas de mejora para alcanzar una nutrición adecuada.",
        class: "warning",
        recommendations: [
            "Aumenta el consumo de frutas y verduras a diario.",
            "Mejora tu hidratación con al menos 6-8 vasos de agua al día.",
            "Reduce el consumo de alimentos procesados y comida rápida.",
            "Intenta establecer horarios regulares para tus comidas.",
            "Considera incluir más alimentos ricos en fibra para mejorar tu digestión."
        ]
    },
    {
        min: 56,
        max: 75,
        title: "Buena alimentación con algunas fallas",
        description: "Tu alimentación es generalmente buena, pero hay aspectos específicos que podrías mejorar para mejorar tu nutrición.",
        class: "warning",
        recommendations: [
            "Aumenta la variedad de frutas y verduras que consumes.",
            "Mantén la buena hidratación y considera añadir más agua si haces ejercicio.",
            "Limita aún más los alimentos procesados o con azúcares añadidos.",
            "Presta atención a tus niveles de energía y ajusta tu dieta según sea necesario.",
            "Considera añadir más fuentes de grasas saludables como aguacate, nueces o aceite de oliva."
        ]
    },
    {
        min: 76,
        max: 100,
        title: "Alimentación balanceada",
        description: "¡Felicidades! Mantienes hábitos alimenticios muy saludables y balanceados, lo que beneficia tu salud general.",
        class: "success",
        recommendations: [
            "Mantén tus excelentes hábitos de consumo de frutas y verduras.",
            "Continúa con tu buena hidratación diaria.",
            "Sigue limitando los alimentos procesados y azúcares añadidos.",
            "Considera hacer un seguimiento nutricional periódico para mantener el equilibrio.",
            "Comparte tus conocimientos y hábitos saludables con amigos y familiares."
        ]
    }
];


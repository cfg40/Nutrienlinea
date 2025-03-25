document.addEventListener('DOMContentLoaded', function() {
    const formIMC = document.getElementById('formIMC');
    const resultado = document.getElementById('resultado');
    const nombreResultado = document.getElementById('nombreResultado');
    const imcValor = document.getElementById('imcValor');
    const imcCategoria = document.getElementById('imcCategoria');
    const indicador = document.getElementById('indicador');
    const nuevoCalculo = document.getElementById('nuevoCalculo');
    const imcDescripcion = document.getElementById('imcDescripcion');
    const imcValorIndicador = document.getElementById('imcValorIndicador');
    
    formIMC.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Obtener los valores del formulario
        const nombre = document.getElementById('nombre').value;
        const altura = parseFloat(document.getElementById('altura').value);
        const peso = parseFloat(document.getElementById('peso').value);
        
        // Validar los datos
        if (!nombre || isNaN(altura) || isNaN(peso) || altura <= 0 || peso <= 0) {
            alert('Por favor, ingrese datos válidos');
            return;
        }
        
        // Calcular IMC (altura en metros, por eso dividimos por 100)
        const imc = peso / ((altura / 100) * (altura / 100));
        
        // Mostrar resultados
        nombreResultado.textContent = `Paciente: ${nombre}`;
        imcValor.textContent = `IMC: ${imc.toFixed(2)}`;
        
        // Determinar la categoría de IMC
        let categoria = '';
        let posicionIndicador = 0;
        let descripcion = '';
        let imagenIMC = '';
        
        if (imc < 18.5) {
            categoria = 'Bajo peso';
            posicionIndicador = (imc / 18.5) * 25; // Porcentaje dentro de la primera categoría
            descripcion = 'Un IMC por debajo de 18.5 indica que tiene bajo peso. Esto puede estar asociado con desnutrición o problemas de salud. Es recomendable consultar a un profesional de la salud.';
            imagenIMC = `<svg width="120" height="120" viewBox="0 0 100 100" xmlns="https://www.w3.org/2000/svg">
                <circle cx="50" cy="30" r="15" fill="#3498db"/>
                <line x1="50" y1="45" x2="50" y2="80" stroke="#3498db" stroke-width="5"/>
                <line x1="35" y1="60" x2="65" y2="60" stroke="#3498db" stroke-width="3"/>
                <line x1="30" y1="95" x2="50" y2="80" stroke="#3498db" stroke-width="5"/>
                <line x1="70" y1="95" x2="50" y2="80" stroke="#3498db" stroke-width="5"/>
            </svg>`;
        } else if (imc < 25) {
            categoria = 'Peso normal';
            posicionIndicador = 25 + ((imc - 18.5) / 6.5) * 25; // Porcentaje dentro de la segunda categoría
            descripcion = 'Un IMC entre 18.5 y 24.9 indica un peso saludable. Mantener un peso saludable puede reducir el riesgo de enfermedades crónicas asociadas con el sobrepeso y la obesidad.';
            imagenIMC = `<svg width="120" height="120" viewBox="0 0 100 100" xmlns="https://www.w3.org/2000/svg">
                <circle cx="50" cy="30" r="15" fill="#2ecc71"/>
                <line x1="50" y1="45" x2="50" y2="80" stroke="#2ecc71" stroke-width="5"/>
                <line x1="35" y1="60" x2="65" y2="60" stroke="#2ecc71" stroke-width="5"/>
                <line x1="30" y1="95" x2="50" y2="80" stroke="#2ecc71" stroke-width="5"/>
                <line x1="70" y1="95" x2="50" y2="80" stroke="#2ecc71" stroke-width="5"/>
                <path d="M40,25 Q50,35 60,25" fill="none" stroke="#2ecc71" stroke-width="2"/>
            </svg>`;
        } else if (imc < 30) {
            categoria = 'Sobrepeso';
            posicionIndicador = 50 + ((imc - 25) / 5) * 25; // Porcentaje dentro de la tercera categoría
            descripcion = 'Un IMC entre 25 y 29.9 indica sobrepeso. Esto puede aumentar el riesgo de desarrollar enfermedades como diabetes tipo 2, enfermedades cardíacas y presión arterial alta.';
            imagenIMC = `<svg width="120" height="120" viewBox="0 0 100 100" xmlns="https://www.w3.org/2000/svg">
                <circle cx="50" cy="30" r="15" fill="#f39c12"/>
                <ellipse cx="50" cy="65" rx="25" ry="20" fill="#f39c12"/>
                <line x1="50" y1="45" x2="50" y2="80" stroke="#f39c12" stroke-width="5"/>
                <line x1="30" y1="95" x2="50" y2="80" stroke="#f39c12" stroke-width="5"/>
                <line x1="70" y1="95" x2="50" y2="80" stroke="#f39c12" stroke-width="5"/>
            </svg>`;
        } else {
            categoria = 'Obesidad';
            posicionIndicador = 75 + Math.min(((imc - 30) / 10) * 25, 25); // Limitar al máximo de la barra
            descripcion = 'Un IMC de 30 o superior indica obesidad. La obesidad aumenta significativamente el riesgo de enfermedades cardíacas, diabetes, hipertensión y ciertos tipos de cáncer.';
            imagenIMC = `<svg width="120" height="120" viewBox="0 0 100 100" xmlns="https://www.w3.org/2000/svg">
                <circle cx="50" cy="30" r="15" fill="#e74c3c"/>
                <ellipse cx="50" cy="65" rx="30" ry="25" fill="#e74c3c"/>
                <line x1="50" y1="45" x2="50" y2="85" stroke="#e74c3c" stroke-width="5"/>
                <line x1="30" y1="100" x2="50" y2="85" stroke="#e74c3c" stroke-width="5"/>
                <line x1="70" y1="100" x2="50" y2="85" stroke="#e74c3c" stroke-width="5"/>
            </svg>`;
        }
        
        imcCategoria.textContent = `Categoría: ${categoria}`;
        imcDescripcion.innerHTML = `
            <div class="descripcion-con-imagen">
                <div class="imagen-imc">${imagenIMC}</div>
                <div class="texto-descripcion">${descripcion}</div>
            </div>
        `;
        
        // Ajustar la posición del indicador (como porcentaje del ancho total de la barra)
        const posicionAjustada = Math.min(Math.max(posicionIndicador, 0), 100);
        indicador.style.left = `${posicionAjustada}%`;
        
        // Mostrar el valor del IMC encima del indicador
        imcValorIndicador.textContent = imc.toFixed(1);
        imcValorIndicador.style.left = `${posicionAjustada}%`;
        
        // Mostrar el resultado y ocultar el formulario
        formIMC.style.display = 'none';
        resultado.classList.remove('oculto');
    });
    
    nuevoCalculo.addEventListener('click', function() {
        // Reiniciar el formulario y ocultar el resultado
        formIMC.reset();
        formIMC.style.display = 'block';
        resultado.classList.add('oculto');
    });
});
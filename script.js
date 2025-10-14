document.addEventListener('DOMContentLoaded', function () {

    // Accordion functionality
    const topicTitles = document.querySelectorAll('.topic-title');

    topicTitles.forEach(title => {
        title.addEventListener('click', () => {
            const content = title.nextElementSibling;
            const isActive = content.classList.contains('active');

            // Close all other topics first
            topicTitles.forEach(otherTitle => {
                otherTitle.nextElementSibling.classList.remove('active');
            });

            // If the clicked topic was not already active, open it
            if (!isActive) {
                content.classList.add('active');
            }
        });
    });

    // Practice section functionality
    const practiceButton = document.getElementById('practice-button');
    const practiceInput = document.getElementById('practice-input');
    const aiResponseDiv = document.getElementById('ai-response');

    practiceButton.addEventListener('click', () => {
        const userInput = practiceInput.value.toLowerCase(); // Lowercase for easier matching

        if (userInput.trim() === '') {
            alert('Por favor, escribe una instrucción antes de enviar.');
            return;
        }

        let simulatedResponse = '';

        // Check for keywords to give a more tailored simulated response
        if (userInput.includes('poema') || userInput.includes('poesía') || userInput.includes('haiku')) {
            simulatedResponse = '"En el jardín digital, un verso florece. La IA, poeta, al mundo estremece." ¡Buena instrucción! Como IA, puedo generar poesía en varios estilos y formas.';
        } else if (userInput.includes('historia') || userInput.includes('cuento') || userInput.includes('narración')) {
            simulatedResponse = '"Érase una vez un algoritmo que soñaba con datos..." ¡Excelente idea! Puedo ayudarte a crear personajes, tramas y diálogos para una historia fascinante.';
        } else if (userInput.includes('código') || userInput.includes('python') || userInput.includes('javascript')) {
            simulatedResponse = '`function holaMundo() { console.log("¡Hola, programador!"); }` ¡Perfecto! Puedo generar fragmentos de código, explicar funciones y ayudarte a depurar errores.';
        } else {
            simulatedResponse = '¡Gracias por tu instrucción! Estoy procesando tu solicitud. Recuerda que esta es una demostración. En una IA real, aquí recibirías una respuesta elaborada basada en tu petición.';
        }

        // Display the response
        aiResponseDiv.style.display = 'block';
        aiResponseDiv.innerHTML = `<p><strong>Tu instrucción:</strong> "${practiceInput.value}"</p><p><strong>Respuesta de la IA (simulada):</strong> ${simulatedResponse}</p>`;
    });

});
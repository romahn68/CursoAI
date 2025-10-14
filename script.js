document.addEventListener('DOMContentLoaded', function () {

    // --- Accordion functionality ---
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

    // --- Original Practice section functionality ---
    const practiceButton = document.getElementById('practice-button');
    if (practiceButton) {
        const practiceInput = document.getElementById('practice-input');
        const aiResponseDiv = document.getElementById('ai-response');

        practiceButton.addEventListener('click', () => {
            const userInput = practiceInput.value.toLowerCase();
            if (userInput.trim() === '') {
                alert('Por favor, escribe una instrucción antes de enviar.');
                return;
            }
            let simulatedResponse = '';
            if (userInput.includes('poema') || userInput.includes('poesía') || userInput.includes('haiku')) {
                simulatedResponse = '"En el jardín digital, un verso florece. La IA, poeta, al mundo estremece." ¡Buena instrucción! Como IA, puedo generar poesía en varios estilos y formas.';
            } else if (userInput.includes('historia') || userInput.includes('cuento') || userInput.includes('narración')) {
                simulatedResponse = '"Érase una vez un algoritmo que soñaba con datos..." ¡Excelente idea! Puedo ayudarte a crear personajes, tramas y diálogos para una historia fascinante.';
            } else if (userInput.includes('código') || userInput.includes('python') || userInput.includes('javascript')) {
                simulatedResponse = '`function holaMundo() { console.log("¡Hola, programador!"); }` ¡Perfecto! Puedo generar fragmentos de código, explicar funciones y ayudarte a depurar errores.';
            } else {
                simulatedResponse = '¡Gracias por tu instrucción! Estoy procesando tu solicitud. Recuerda que esta es una demostración. En una IA real, aquí recibirías una respuesta elaborada basada en tu petición.';
            }
            aiResponseDiv.style.display = 'block';
            aiResponseDiv.innerHTML = `<p><strong>Tu instrucción:</strong> "${practiceInput.value}"</p><p><strong>Respuesta de la IA (simulada):</strong> ${simulatedResponse}</p>`;
        });
    }

    // --- Prompt Laboratory Functionality ---

    // 1. Assistant Logic
    const generateBtn = document.getElementById('generate-prompt-btn');
    if (generateBtn) {
        generateBtn.addEventListener('click', () => {
            const role = document.getElementById('prompt-role').value.trim();
            const task = document.getElementById('prompt-task').value.trim();
            const context = document.getElementById('prompt-context').value.trim();
            const format = document.getElementById('prompt-format').value.trim();
            const outputArea = document.getElementById('final-prompt-output');

            let finalPrompt = '';
            if (role) finalPrompt += `${role}. `;
            if (task) finalPrompt += `${task}. `;
            if (context) finalPrompt += `Considera lo siguiente: ${context}. `;
            if (format) finalPrompt += `El resultado debe ser ${format}.`;

            outputArea.value = finalPrompt.trim();
        });
    }

    // 2. Qualifier Logic
    const qualifyBtn = document.getElementById('qualify-prompt-btn');
    if (qualifyBtn) {
        qualifyBtn.addEventListener('click', () => {
            const promptText = document.getElementById('qualifier-input').value.toLowerCase();
            const resultsDiv = document.getElementById('qualifier-results');
            
            if (promptText.trim() === '') {
                resultsDiv.innerHTML = '<p>Por favor, escribe un prompt para analizar.</p>';
                return;
            }

            const checks = {
                role: { pass: false, keywords: ['actúa como', 'eres un', 'compórtate como', 'en el rol de', 'experto'] },
                task: { pass: false, keywords: ['escribe', 'resume', 'traduce', 'explica', 'crea', 'genera', 'dame', 'lista', 'define', 'compara'] },
                context: { pass: false, minLength: 15 }, // Check for length as a proxy for context
                format: { pass: false, keywords: ['en formato de', 'en una lista', 'como una tabla', 'con viñetas', 'en un párrafo', 'un json', 'un haiku'] }
            };

            // Perform checks
            for (const key in checks) {
                if (key === 'context') {
                    if (promptText.length > checks.context.minLength) {
                        checks.context.pass = true;
                    }
                } else {
                    for (const keyword of checks[key].keywords) {
                        if (promptText.includes(keyword)) {
                            checks[key].pass = true;
                            break;
                        }
                    }
                }
            }

            // Build and display results
            let resultsHTML = '<ul>';
            resultsHTML += `<li class="${checks.role.pass ? 'pass' : 'fail'}">${checks.role.pass ? '✅' : '❌'} Asignaste un Rol</li>`;
            resultsHTML += `<li class="${checks.task.pass ? 'pass' : 'fail'}">${checks.task.pass ? '✅' : '❌'} Definiste una Tarea Clara</li>`;
            resultsHTML += `<li class="${checks.context.pass ? 'pass' : 'fail'}">${checks.context.pass ? '✅' : '❌'} Añadiste Contexto (longitud > 15)</li>`;
            resultsHTML += `<li class="${checks.format.pass ? 'pass' : 'fail'}">${checks.format.pass ? '✅' : '❌'} Especificaste un Formato</li>`;
            resultsHTML += '</ul>';

            resultsDiv.innerHTML = resultsHTML;
        });
    }
});
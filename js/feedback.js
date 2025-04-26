function generateAndDownloadFile() {
    const formType = document.getElementById('form-type').value;
    const name = document.getElementById('name').value;
    const contact = document.getElementById('contact').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    const jobPosition = document.getElementById('job-position').value;
    const portfolio = document.getElementById('portfolio').value;

    let fileContent = `Тип запроса: ${formType}\n`;
    fileContent += `Имя: ${name}\n`;
    fileContent += `Контакты: ${contact}\n`;

    if (subject) {
        fileContent += `Тема вопроса: ${subject}\n`;
    }

    fileContent += `Сообщение:\n${message}\n`;

    if (formType === 'job') {
        fileContent += `Позиция: ${jobPosition}\n`;
        fileContent += `Портфолио: ${portfolio}\n`;
    }

    const blob = new Blob([fileContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'vopros.txt';
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url);
    document.body.removeChild(a);

    document.getElementById('download-instructions').style.display = 'block';
}

const formTypeSelect = document.getElementById('form-type');
const jobFields = document.getElementById('job-fields');

formTypeSelect.addEventListener('change', function() {
    if (this.value === 'job') {
        jobFields.style.display = 'block';
    } else {
        jobFields.style.display = 'none';
    }
});
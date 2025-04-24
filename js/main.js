document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('.search-box input[type="text"]');
    const searchableElements = document.querySelectorAll('p, h3, h2');

    searchInput.addEventListener('input', function() {
        const searchTerm = searchInput.value.toLowerCase();

        searchableElements.forEach(element => {
            const text = element.textContent; // Не приводим к нижнему регистру здесь
            const lowerText = text.toLowerCase(); // Приводим к нижнему регистру для поиска

            element.innerHTML = text; // Сбрасываем подсветку (важно!)

            if (searchTerm && lowerText.includes(searchTerm)) {
                const index = lowerText.indexOf(searchTerm);
                const match = text.substring(index, index + searchTerm.length);

                const highlightedText = text.replace(match, `<span class="search-match">${match}</span>`);

                element.innerHTML = highlightedText;
            }
        });
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach(element => {
        setTimeout(() => {
            element.classList.add('visible');
        }, 100); // Задержка в 100 миллисекунд
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');

    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('open'); // Добавляем/удаляем класс 'open'
    });

    //  Все остальное JavaScript код
});
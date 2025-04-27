document.addEventListener('DOMContentLoaded', function() {
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach(element => {
        setTimeout(() => {
            element.classList.add('visible');
        }, 100);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('open');
        });
    }
});
const questionButtons = document.querySelectorAll('.question-button');

questionButtons.forEach(button => {
    button.addEventListener('click', () => {
        const answer = button.parentNode.nextElementSibling;
        if (answer.style.display === 'none') {
            answer.style.display = 'block';
        } else {
            answer.style.display = 'none';
        }
    });
});

const rulesOfAbyssLink = document.getElementById('rules-of-abyss-link');
const rulesOfAbyssPopup = document.getElementById('rules-of-abyss-popup');

rulesOfAbyssLink.addEventListener('click', (event) => {
    event.preventDefault(); // Предотвратить переход по ссылке
    rulesOfAbyssPopup.style.display = rulesOfAbyssPopup.style.display === 'none' ? 'block' : 'none';
});

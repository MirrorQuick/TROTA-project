document.addEventListener('DOMContentLoaded', function() {
    const audioPlayer = document.getElementById('audioPlayer');
    const playButtons = document.querySelectorAll('.play-button');

    playButtons.forEach(button => {
      button.addEventListener('click', function() {
        const songSrc = this.getAttribute('data-src');

        // Если проигрывается другая песня, остановить её
        if (audioPlayer.src && audioPlayer.src !== songSrc) {
          audioPlayer.pause();
        }

        audioPlayer.src = songSrc;

        // Проверка наличия и доступности аудио
        audioPlayer.addEventListener('error', function() {
          console.error('Ошибка загрузки аудио:', songSrc);
          alert('Не удалось загрузить аудио: ' + songSrc);
        });

        audioPlayer.play().catch(error => {
          console.error('Ошибка воспроизведения:', error);
          alert('Не удалось воспроизвести аудио: ' + songSrc + '. Возможно, браузер блокирует автовоспроизведение.  Попробуйте нажать кнопку еще раз.');
        });
      });
    });
  });
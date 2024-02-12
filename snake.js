// Змейка
var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");

// Установка размера холста
canvas.width = 400;
canvas.height = 400;

// Изменение размера клетки и сетки
var gridSize = 20;
var tileCountX = canvas.width / gridSize;
var tileCountY = canvas.height / gridSize;

// Позиция змейки
var snake = [{x: 10, y: 10}];
var dx = 1;
var dy = 0;

// Позиция фрукта
var fruit = {x: 15, y: 15};

// Очки
var score = 0;


// Основной игровой цикл
function gameLoop() {
    setTimeout(function() {
        requestAnimationFrame(gameLoop);
        update();
        draw();
    }, 100); // Задержка в миллисекундах между кадрами
}

function update() {
    // Перемещаем голову змейки
    var newX = snake[0].x + dx;
    var newY = snake[0].y + dy;

    // Проверяем столкновение с границами поля
    checkCollision();

    // Если змейка столкнулась с краем экрана, игра окончена
    if (newX < 0 || newX >= tileCountX || newY < 0 || newY >= tileCountY) {
        gameOver();
        return;
    }

    // Проверяем столкновение с собственным телом
    for (var i = 1; i < snake.length; i++) {
        if (snake[i].x === newX && snake[i].y === newY) {
            gameOver();
            return;
        }
    }

    // Добавляем новую голову
    snake.unshift({x: newX, y: newY});

    // Если змейка съела фрукт
    if (newX === fruit.x && newY === fruit.y) {
        score++;
        // Создаем новый фрукт
        spawnFruit();
    } else {
        // Удаляем хвост змейки
        snake.pop();
    }
}

function draw() {
    // Очищаем экран
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Рисуем змейку
    ctx.fillStyle = "#00f";
    snake.forEach(function(segment) {
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
    });

    // Рисуем фрукт
    ctx.fillStyle = "#f00";
    ctx.fillRect(fruit.x * gridSize, fruit.y * gridSize, gridSize, gridSize);

    // Выводим счет
    ctx.fillStyle = "#000";
    ctx.fillText("Score: " + score, 10, 20);
}

function gameOver() {
    var modal = document.getElementById("gameOverModal");
    var scoreText = document.getElementById("score");
    scoreText.textContent = score;
    modal.classList.remove("hidden");
}

function restartGame() {
    location.reload();
}

function spawnFruit() {
    // Генерируем новые координаты для фрукта
    fruit.x = Math.floor(Math.random() * tileCountX);
    fruit.y = Math.floor(Math.random() * tileCountY);

    // Проверяем, что фрукт не появился внутри змейки
    for (var i = 0; i < snake.length; i++) {
        if (fruit.x === snake[i].x && fruit.y === snake[i].y) {
            spawnFruit();
            return;
        }
    }
}

// Обработчик клавиш
document.addEventListener("keydown", function(event) {
    // Изменяем направление движения змейки
    if (event.key === "ArrowUp" && dy !== 1) {
        dx = 0;
        dy = -1;
    } else if (event.key === "ArrowDown" && dy !== -1) {
        dx = 0;
        dy = 1;
    } else if (event.key === "ArrowLeft" && dx !== 1) {
        dx = -1;
        dy = 0;
    } else if (event.key === "ArrowRight" && dx !== -1) {
        dx = 1;
        dy = 0;
    }
});

function draw() {
    // Очищаем экран
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Рисуем поле игры
    ctx.fillStyle = "#eee";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Рисуем змейку
    ctx.fillStyle = "#00f";
    snake.forEach(function(segment) {
        ctx.beginPath();
        ctx.arc(segment.x * gridSize + gridSize / 2, segment.y * gridSize + gridSize / 2, gridSize / 2, 0, Math.PI * 2);
        ctx.fill();
    });

    // Рисуем фрукт
    ctx.fillStyle = "#f00";
    ctx.fillRect(fruit.x * gridSize, fruit.y * gridSize, gridSize, gridSize);

    // Выводим счет
    ctx.fillStyle = "#000";
    ctx.fillText("Score: " + score, 10, 20);
}

function checkCollision() {
    // Проверяем, достигла ли голова змейки границ поля
    if (snake[0].x < 0 || snake[0].x >= tileCountX ||
        snake[0].y < 0 || snake[0].y >= tileCountY) {
        gameOver();
    }
}

// Запускаем игру
gameLoop();

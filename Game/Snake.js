const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const size = 20;  // Kích thước mỗi ô trong game
const boardWidth = 20;  // Chiều rộng của bảng (số ô)
const boardHeight = 20; // Chiều cao của bảng (số ô)
canvas.width = boardWidth * size;
canvas.height = boardHeight * size;

let snake = [{ x: 10, y: 10 }];
let direction = 'RIGHT';
let food = generateFood();
let gameInterval;
let isPaused = false;
let score = 0;  // Điểm số của người chơi
let gameOver = false;  // Biến xác định game đã kết thúc chưa

// Vẽ game và hiển thị điểm
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSnake();
    drawFood();
    updateScore();  // Cập nhật điểm sau mỗi lần vẽ
}

function drawSnake() {
    snake.forEach(segment => {
        ctx.fillStyle = 'lime';
        ctx.fillRect(segment.x * size, segment.y * size, size, size);
    });
}


function drawFood() {
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(food.x * size + size / 2, food.y * size + size / 2, size / 2, 0, Math.PI * 2);
    ctx.fill();
}

// Tạo thức ăn mới
function generateFood() {
    return {
        x: Math.floor(Math.random() * (boardWidth - 1)),  // Giới hạn x trong phạm vi của canvas
        y: Math.floor(Math.random() * (boardHeight - 1))  // Giới hạn y trong phạm vi của canvas
    };
}

// Di chuyển rắn và xử lý điểm số
function moveSnake() {
    const head = { ...snake[0] };

    if (direction === 'UP') head.y -= 1;
    if (direction === 'DOWN') head.y += 1;
    if (direction === 'LEFT') head.x -= 1;
    if (direction === 'RIGHT') head.x += 1;

    // Rắn sẽ xuyên qua tường (tái xuất ở đối diện)
    if (head.x < 0) head.x = boardWidth - 1;  // Xoay về bên phải
    if (head.x >= boardWidth) head.x = 0;     // Xoay về bên trái
    if (head.y < 0) head.y = boardHeight - 1; // Xoay xuống dưới
    if (head.y >= boardHeight) head.y = 0;    // Xoay lên trên

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        food = generateFood();  // Tạo thức ăn mới
        score += 10;  // Cộng điểm khi ăn được thức ăn
    } else {
        snake.pop();  // Loại bỏ phần đuôi
    }

    // Kiểm tra va chạm với chính rắn
    if (isCollision(head)) {
        gameOver = true;
        clearInterval(gameInterval);
        displayGameOver();
    }
}

// Kiểm tra va chạm với chính rắn
function isCollision(head) {
    return snake.some((segment, index) => index !== 0 && segment.x === head.x && segment.y === head.y);
}

// Cập nhật điểm lên giao diện
function updateScore() {
    document.getElementById('score').textContent = `Score: ${score}`;
}

// Hiển thị bảng Game Over
function displayGameOver() {
    document.getElementById('finalScore').textContent = `Score: ${score}`;
    document.getElementById('gameOverScreen').style.display = 'flex';
}

// Hàm chơi lại
function restartGame() {
    snake = [{ x: 10, y: 10 }];
    direction = 'RIGHT';
    food = generateFood();
    score = 0;
    gameOver = false;
    document.getElementById('gameOverScreen').style.display = 'none';
    gameInterval = setInterval(gameLoop, 100);
}

function gameLoop() {
    if (!isPaused && !gameOver) {
        moveSnake();
        draw();
    }
}

// Thay đổi hướng di chuyển
function changeDirection(newDirection) {
    if (newDirection === 'UP' && direction !== 'DOWN') direction = 'UP';
    if (newDirection === 'DOWN' && direction !== 'UP') direction = 'DOWN';
    if (newDirection === 'LEFT' && direction !== 'RIGHT') direction = 'LEFT';
    if (newDirection === 'RIGHT' && direction !== 'LEFT') direction = 'RIGHT';
}

// Tạm dừng hoặc tiếp tục game
function togglePause() {
    isPaused = !isPaused;
    document.getElementById('pause').textContent = isPaused ? '⏺️' : '⏸️';
}

document.getElementById('up').addEventListener('click', () => changeDirection('UP'));
document.getElementById('down').addEventListener('click', () => changeDirection('DOWN'));
document.getElementById('left').addEventListener('click', () => changeDirection('LEFT'));
document.getElementById('right').addEventListener('click', () => changeDirection('RIGHT'));
document.getElementById('pause').addEventListener('click', togglePause);
document.getElementById('restart').addEventListener('click', restartGame);

// Bắt đầu game
gameInterval = setInterval(gameLoop, 100);

// Bắt sự kiện phím để điều khiển
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp' || event.key === '8') {
        changeDirection('UP');
    }
    if (event.key === 'ArrowDown' || event.key === '2') {
        changeDirection('DOWN');
    }
    if (event.key === 'ArrowLeft' || event.key === '4') {
        changeDirection('LEFT');
    }
    if (event.key === 'ArrowRight' || event.key === '6') {
        changeDirection('RIGHT');
    }
    if (event.key === '5') {
        togglePause();  // Phím 5 để tạm dừng/tiếp tục
    }
});

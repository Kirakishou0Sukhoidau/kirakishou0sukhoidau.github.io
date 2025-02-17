const boardSize = 15; // Kích thước bảng 15x15
let snake = [{ x: 7, y: 7 }];
let direction = 'RIGHT';
let food = generateFood();
let isPaused = false;
let score = 0;
let gameOver = false;

// Lấy game board div
const gameBoard = document.getElementById('game-board');
const scoreDisplay = document.getElementById('score');
const gameOverDiv = document.getElementById('game-over');
const finalScoreDisplay = document.getElementById('final-score');

// Tạo bảng trò chơi (lưới)
function createBoard() {
    gameBoard.innerHTML = ''; // Xóa nội dung bảng nếu đã có
    for (let row = 0; row < boardSize; row++) {
        for (let col = 0; col < boardSize; col++) {
            const div = document.createElement('div');
            div.setAttribute('id', `${row}-${col}`);
            gameBoard.appendChild(div);
        }
    }
}

// Vẽ rắn trên bảng
function drawSnake() {
    snake.forEach(segment => {
        const element = document.getElementById(`${segment.y}-${segment.x}`);
        element.style.backgroundColor = 'lime';  // Vẽ rắn
    });
}

// Vẽ thức ăn
function drawFood() {
    const element = document.getElementById(`${food.y}-${food.x}`);
    element.style.backgroundColor = 'red';  // Vẽ thức ăn
    element.style.borderRadius = '50%';
}

// Tạo thức ăn mới
function generateFood() {
    return {
        x: Math.floor(Math.random() * boardSize),
        y: Math.floor(Math.random() * boardSize)
    };
}

// Di chuyển rắn
function moveSnake() {
    const head = { ...snake[0] };

    if (direction === 'UP') head.y -= 1;
    if (direction === 'DOWN') head.y += 1;
    if (direction === 'LEFT') head.x -= 1;
    if (direction === 'RIGHT') head.x += 1;

    // Xử lý việc rắn xuyên qua tường
    if (head.x < 0) head.x = boardSize - 1;
    if (head.x >= boardSize) head.x = 0;
    if (head.y < 0) head.y = boardSize - 1;
    if (head.y >= boardSize) head.y = 0;

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        food = generateFood();
        score += 10;
        scoreDisplay.textContent = score;
    } else {
        snake.pop(); // Loại bỏ phần đuôi
    }

    // Kiểm tra va chạm với chính mình
    if (isCollision(head)) {
        gameOver = true;
        endGame();
    }
}

// Kiểm tra va chạm với thân rắn
function isCollision(head) {
    return snake.some((segment, index) => index !== 0 && segment.x === head.x && segment.y === head.y);
}

// Cập nhật hướng di chuyển
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

// Hàm game loop
function gameLoop() {
    if (!isPaused && !gameOver) {
        moveSnake();
        drawBoard();
    }
}

// Vẽ lại bảng
function drawBoard() {
    createBoard();  // Tạo lại bảng
    drawSnake();    // Vẽ rắn
    drawFood();     // Vẽ thức ăn
}

// Bắt sự kiện D-pad điều khiển
document.getElementById('up').addEventListener('click', () => changeDirection('UP'));
document.getElementById('down').addEventListener('click', () => changeDirection('DOWN'));
document.getElementById('left').addEventListener('click', () => changeDirection('LEFT'));
document.getElementById('right').addEventListener('click', () => changeDirection('RIGHT'));
document.getElementById('pause').addEventListener('click', togglePause);

// Bắt sự kiện bàn phím cho điều khiển và chơi lại
document.addEventListener('keydown', (event) => {
    // Phím mũi tên lên, xuống, trái, phải
    if (event.key === 'ArrowUp' || event.key === '8') changeDirection('UP');
    if (event.key === 'ArrowDown' || event.key === '2') changeDirection('DOWN');
    if (event.key === 'ArrowLeft' || event.key === '4') changeDirection('LEFT');
    if (event.key === 'ArrowRight' || event.key === '6') changeDirection('RIGHT');
    
    // Phím Enter hoặc Space để tạm dừng/tiếp tục
    if (event.key === 'Enter' || event.key === ' ') togglePause(); 
    
    // Phím Enter hoặc R để chơi lại khi game over
    if (gameOver && (event.key === 'Enter' || event.key === ' ' || event.key === 'r' || event.key === 'R')) {
        restartGame();
    }
});


// Hàm kết thúc game
function endGame() {
    // Cập nhật điểm
    finalScoreDisplay.textContent = score;
    
    // Hiển thị bảng thông báo Game Over
    gameOverDiv.style.display = 'block';
    
    // Dừng game
    clearInterval(gameInterval);
}

// Hàm chơi lại
function restartGame() {
    // Khởi tạo lại các giá trị trò chơi
    snake = [{ x: 7, y: 7 }];
    direction = 'RIGHT';
    food = generateFood();
    isPaused = false;
    score = 0;
    gameOver = false;
    scoreDisplay.textContent = score;
    
    // Ẩn bảng thông báo Game Over
    gameOverDiv.style.display = 'none';
    
    // Bắt đầu lại vòng lặp game
    gameInterval = setInterval(gameLoop, 150);
}

// Khởi tạo game
createBoard();
let gameInterval = setInterval(gameLoop, 150);  // Chạy game mỗi 200ms



document.addEventListener("keydown", function(event) {
    alert("Bạn vừa nhấn phím: " + event.key); // Hiển thị phím đang bấm
});

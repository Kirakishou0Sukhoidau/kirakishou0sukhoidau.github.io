const minInput = document.getElementById("min");
const maxInput = document.getElementById("max");
const quayButton = document.getElementById("quay");

quayButton.addEventListener("click", function() {
    const min = parseInt(minInput.value);
    const max = parseInt(maxInput.value);

    // Kiểm tra tính hợp lệ của phạm vi
    if (min > max) {
        alert("Giá trị 'Từ' phải nhỏ hơn hoặc bằng giá trị 'Đến'.");
        return;
    }

    // Tạo số ngẫu nhiên trong phạm vi
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

    // Hiển thị số quay ra
    alert(`Số quay ra là: ${randomNumber}`);
});




const inputs = document.getElementById("inputs");
const addInputButton = document.getElementById("add-input");
const gachaButton = document.getElementById("gacha");
const deleteButton = document.getElementById("delete");

// Thêm ô input mới
addInputButton.addEventListener("click", () => {
    const newInput = document.createElement("input");
    newInput.type = "text";
    newInput.name = "data";
    newInput.placeholder = "Nhập dữ liệu";
    newInput.style.margin = "2px"; // Thêm margin cho mỗi ô input
    inputs.appendChild(newInput);
});

// Xóa ô input
deleteButton.addEventListener("click", () => {
    const lastInput = inputs.lastElementChild;
    if (lastInput && lastInput.tagName === "INPUT") {
        inputs.removeChild(lastInput);
    }
});

// Chọn ngẫu nhiên và hiển thị kết quả
gachaButton.addEventListener("click", () => {
    const allInputs = inputs.querySelectorAll("input");
    const data = [];
    for (const input of allInputs) {
        data.push(input.value);
    }
    const randomIndex = Math.floor(Math.random() * data.length);
    const randomData = data[randomIndex];
    alert(`Kết quả là: ${randomData}`);
});

const resetqButton = document.getElementById("resetq");

resetqButton.addEventListener("click", () => {
    const allInputsq = document.querySelectorAll("input[type='number']");
    for (const input of allInputsq) {
        input.value = "";
    }
});

  const resetButton = document.getElementById("reset");

resetButton.addEventListener("click", () => {
    const allInputs = document.querySelectorAll("input[type='text']");
    for (const input of allInputs) {
        input.value = "";
    }
});

const button = document.getElementById('abcd');

button.addEventListener('click', () => {
    const letters = ['A', 'B', 'C', 'D'];
    const randomIndex = Math.floor(Math.random() * letters.length);
    const randomLetter = letters[randomIndex];

    alert(`Đáp án là: ${randomLetter}`);
});
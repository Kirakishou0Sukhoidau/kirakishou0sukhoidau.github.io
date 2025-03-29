
// Lấy các thẻ textarea
const htmlInput = document.getElementById('html');
const cssInput = document.getElementById('css');
const jsInput = document.getElementById('js');
const outputDiv = document.getElementById('giao-dien');

// Hàm thực thi code
function executeCode() {
  // Tạo một iframe để cách ly môi trường chạy code
  const iframe = document.createElement('iframe');
  iframe.style.width = '100%';
  iframe.style.height = '100%';
  outputDiv.innerHTML = '';
  outputDiv.appendChild(iframe);

  const doc = iframe.contentDocument;
  const head = doc.head;
  const body = doc.body;

  // Chèn HTML
  body.innerHTML = htmlInput.value;

  // Chèn CSS
  const style = doc.createElement('style');
  style.textContent = cssInput.value;
  head.appendChild(style);

  // Chèn JavaScript
  const script = doc.createElement('script');
  script.textContent = jsInput.value;
  body.appendChild(script);
}

// Thực thi code khi có thay đổi trong textarea
htmlInput.addEventListener('input', executeCode);
cssInput.addEventListener('input', executeCode);
jsInput.addEventListener('input', executeCode);

// Gọi hàm executeCode lần đầu để hiển thị kết quả ban đầu
executeCode();
  

//test-link
  const giaoDienDivl = document.getElementById('giao-dien');
  const urlInput = document.getElementById('urlInput');

  urlInput.addEventListener('input', () => {
    const url = urlInput.value;
    if (url) {
      giaoDienDivl.innerHTML = `<iframe src="${url}" frameborder="0"></iframe>`;
    } else {
      giaoDienDivl.innerHTML = '';
    }
  });



/*    const giaoDienDiv = document.getElementById('giao-dien');
  const screenSizeSelector = document.getElementById('screen-size-selector');

  screenSizeSelector.addEventListener('change', (event) => {
    const selectedSize = parseInt(event.target.value);
    giaoDienDiv.style.width = selectedSize + 'px';
  });*/

/*const giaoDienDiv = document.getElementById('giao-dien');
const screenSizeSelector = document.getElementById('screen-size-selector');
const customSizeInput = document.getElementById('customSize');

screenSizeSelector.addEventListener('change', (event) => {
  const selectedSize = parseInt(event.target.value);
  giaoDienDiv.style.width = selectedSize + 'px';
  customSizeInput.value = ''; // Xóa giá trị trong ô input tùy chỉnh khi chọn radio
});

customSizeInput.addEventListener('input', (event) => {
  const customSize = parseInt(event.target.value);
  if (!isNaN(customSize)) {
    giaoDienDiv.style.width = customSize + 'px';
  }
});
*/

//kich-co-man
  const giaoDienDiv = document.getElementById('giao-dien');
  const screenSizeSelector = document.getElementById('screen-size-selector');
  const customSizeInput = document.getElementById('customSize');

  screenSizeSelector.addEventListener('change', (event) => {
    const selectedSize = parseInt(event.target.value);
    giaoDienDiv.style.width = selectedSize + 'px';
  });

  customSizeInput.addEventListener('input', (event) => {
    const customSize = parseInt(event.target.value);
    if (!isNaN(customSize)) {
      giaoDienDiv.style.width = customSize + 'px';
    }
  });


//xoa
const resetButton = document.getElementById("reset");

resetButton.addEventListener("click", () => {
    const allInputs = document.querySelectorAll("input[type='text']");
    for (const input of allInputs) {
        input.value = "";
    }
});

const resetButton2 = document.getElementById("reset2");

resetButton2.addEventListener("click", () => {
    const allInputs2 = document.querySelectorAll("input[type='number']");
    for (const input of allInputs2) {
        input.value = "";
    }
});

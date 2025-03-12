function giaiPT() {
    let A = parseFloat(document.getElementById("A").value);
    let B = parseFloat(document.getElementById("B").value);

    if (isNaN(A) || isNaN(B)) {
        alert("Vui lòng nhập giá trị hợp lệ!");
        return;
    }

    // Giải hệ phương trình
    let x = A - B; // x = A - B
    let y = 2 * B - A; // y = 2B - A

    // Hiển thị kết quả
    document.getElementById("ketQuaX").innerText = `Banish 2 thẻ xyz rank ${x}`;
    document.getElementById("ketQuaY").innerText = `Banish 1 quái thú Fusion ${y} sao`;
}



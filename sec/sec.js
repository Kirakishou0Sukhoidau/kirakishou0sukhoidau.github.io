function giaiPT() {
    let A = parseFloat(document.getElementById("A").value);
    let B = parseFloat(document.getElementById("B").value);

    // Kiểm tra nếu giá trị nhập không hợp lệ
    if (isNaN(A) || isNaN(B)) {
        document.getElementById("ketQuaX").innerText = "";
        document.getElementById("ketQuaY").innerText = "";
        return;
    }

    // Giải hệ phương trình
    let x = A - B; // x = A - B
    let y = 2 * B - A; // y = 2B - A

    // Nếu bất kỳ kết quả nào âm, chỉ hiển thị "Không phù hợp"
    if (x <= 0 || y <= 0) {
        document.getElementById("ketQuaX").innerText = "Không phù hợp";
        document.getElementById("ketQuaY").innerText = "";
    } else {
        document.getElementById("ketQuaX").innerText = `Banish 2 quái xyz rank ${x}`;
        document.getElementById("ketQuaY").innerText = `Banish 1 quái fusion level ${y}`;
    }
}

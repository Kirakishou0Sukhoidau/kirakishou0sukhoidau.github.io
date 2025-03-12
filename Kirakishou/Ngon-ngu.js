//chinh-do-rong-cua-select
function adjustWidth(selectElement) {
    let tempSpan = document.createElement("span");
    tempSpan.style.visibility = "hidden";
    tempSpan.style.whiteSpace = "nowrap";
    tempSpan.style.position = "absolute";
    tempSpan.style.font = window.getComputedStyle(selectElement).font;
    tempSpan.innerText = selectElement.options[selectElement.selectedIndex].text;
    
    document.body.appendChild(tempSpan);

    // Lấy font-size của selectElement để chuyển đổi px -> em
    let fontSize = parseFloat(window.getComputedStyle(selectElement).fontSize);
    
    // Giới hạn chiều rộng tối đa (tính bằng em)
    let maxWidth = (window.innerWidth * 0.5) / fontSize; // Đổi từ px sang em
    
    // Lấy chiều rộng của nội dung và chuyển đổi sang em
    let selectWidth = tempSpan.offsetWidth / fontSize + 1.6875; // Cộng thêm padding, tùy chỉnh nếu cần

    // Giới hạn chiều rộng tối đa
    selectElement.style.width = (selectWidth > maxWidth ? maxWidth : selectWidth) + "em";

    // Áp dụng kiểu overflow
    selectElement.style.textOverflow = "ellipsis";
    selectElement.style.overflow = "hidden";
    selectElement.style.whiteSpace = "nowrap";

    document.body.removeChild(tempSpan);
}

document.addEventListener("DOMContentLoaded", function() {
    adjustWidth(document.getElementById("search-engine-search"));

    // Đảm bảo rằng hàm được gọi lại sau khi render hoàn tất
    setTimeout(function() {
        adjustWidth(document.getElementById("search-engine-search"));
    }, 100); // Tùy chỉnh thời gian delay nếu cần
});

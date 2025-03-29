/*const tabs = document.querySelector(".tabs");

tabs.addEventListener("click", (e) => {
  const target = e.target;

  if (target.tagName === "A") {
    const href = target.getAttribute("href");
    const div = document.querySelector(href);

    // Ẩn tất cả các tab
    const allTabs = tabs.querySelectorAll(".vb div");
    allTabs.forEach((tab) => {
      tab.classList.remove("active");
    });

    // Hiển thị tab được chọn
    div.classList.add("active");
  }
});*/ //ok

const tabs = document.querySelector(".tabs");

// Hiển thị div #dieu-khoan đầu tiên
const dieuKhoan = document.querySelector("#dk");
dieuKhoan.classList.add("active");

tabs.addEventListener("click", (e) => {
  const target = e.target;

  if (target.tagName === "A") {
    const href = target.getAttribute("href");
    const div = document.querySelector(href);

    // Ẩn tất cả các tab
    const allTabs = tabs.querySelectorAll(".vb div");
    allTabs.forEach((tab) => {
      tab.classList.remove("active");
    });

    // Hiển thị tab được chọn
    div.classList.add("active");
  }
});

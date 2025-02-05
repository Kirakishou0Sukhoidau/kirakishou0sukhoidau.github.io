let currentPage = parseInt(localStorage.getItem("currentPage")) || 0; // Lấy từ localStorage hoặc mặc định 0

function layAnh() {
    const khuXemAnh = document.getElementById("khu-xem-anh");
    const tag = document.getElementById("tag-input").value.trim();
    const apiUrl = `https://api.rule34.xxx/index.php?page=dapi&s=post&q=index&limit=25&json=1&tags=${encodeURIComponent(tag)}&pid=${currentPage}`;

    console.log("Fetching:", apiUrl); // Kiểm tra URL API

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log("API Response:", data); // Kiểm tra dữ liệu trả về

            // Tạo DocumentFragment để giảm số lần thao tác DOM
            const fragment = document.createDocumentFragment();
            document.getElementById("select-page").value = currentPage;

            if (!data || !Array.isArray(data) || data.length === 0) {
                khuXemAnh.innerHTML = "<p>Không tìm thấy ảnh!</p>";
                return;
            }


data.forEach(post => {
    if (!post.file_url) return;

    let mediaContainer = document.createElement("div");
    mediaContainer.classList.add("media-item");

    let imgElement = document.createElement("img");
    imgElement.alt = "Hình ảnh";
    imgElement.classList.add("image-preview");
    imgElement.dataset.src = post.preview_url || post.sample_url;
    imgElement.style.opacity = "0"; 

    // **Thêm title để hiện tooltip khi giữ vào ảnh**
    imgElement.title = post.tags; 

    // **Kiểm tra tags và định dạng file**
    let tags = post.tags.toLowerCase();
    let fileType = post.file_url.split('.').pop().toLowerCase(); // Lấy phần đuôi file

    if ((tags.includes("video") || tags.includes("animated")) && ["mp4", "mov", "webm"].includes(fileType)) {
        imgElement.classList.add("video-preview"); // Viền xanh
    } else if ((tags.includes("ai_generated")) && ["jpg", "png", "jpeg"].includes(fileType)) {
        imgElement.classList.add("ai-preview"); // Viền vàng
    } else if ((!tags.includes("ai_generated")) && ["jpg", "png", "jpeg"].includes(fileType)) {
        imgElement.classList.add("img-preview"); // Viền hồng
    } else {
        imgElement.classList.add("default-preview"); // Viền hồng
    }

    imgElement.addEventListener("click", () => {
        window.open(post.file_url, "_blank");
    });

    imgElement.onerror = () => imgElement.style.display = "none";

    mediaContainer.appendChild(imgElement);
    fragment.appendChild(mediaContainer);
});


            // Xóa ảnh cũ và thêm ảnh mới vào một lần duy nhất
            khuXemAnh.innerHTML = "";
            khuXemAnh.appendChild(fragment);

            // Kích hoạt lazy load
            lazyLoadImages();
        })
        .catch(error => {
            console.error("Lỗi tải ảnh/video:", error);
            khuXemAnh.innerHTML = "<p>Lỗi khi tải ảnh!</p>";
        });
}

// **Lazy load hình ảnh**
function lazyLoadImages() {
    const images = document.querySelectorAll(".image-preview");
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                let img = entry.target;
                img.src = img.dataset.src;
                img.style.opacity = "1"; // Hiện ảnh khi load xong
                obs.unobserve(img);
            }
        });
    }, { rootMargin: "100px" });

    images.forEach(img => observer.observe(img));
}


// Cập nhật localStorage khi đổi trang
function capNhatTrangMoi(pid) {
    currentPage = pid;
    localStorage.setItem("currentPage", currentPage);
    layAnh();
}

// Xử lý nút Previous
document.getElementById("previous").addEventListener("click", function () {
    if (currentPage > 0) {
        capNhatTrangMoi(currentPage - 1);
    }
});

// Xử lý nút Next
document.getElementById("nexts").addEventListener("click", function () {
    capNhatTrangMoi(currentPage + 1);
});

// Xử lý nhập số trang và nhấn "Tới"
document.getElementById("skip-pages").addEventListener("click", function () {
    let pageInput = parseInt(document.getElementById("select-page").value);

    if (!isNaN(pageInput) && pageInput >= 0) {
        capNhatTrangMoi(pageInput);
    } else {
        alert("Vui lòng nhập số trang hợp lệ!");
    }
});

// Gọi ảnh ban đầu khi load trang
layAnh();

// CSS để căn chỉnh ảnh và video preview
/*const style = document.createElement("style");
style.innerHTML = `
 
`;
document.head.appendChild(style);
*/

function timAnhMoi() {
    currentPage = 0; // Reset về trang đầu
    localStorage.setItem("currentPage", currentPage); // Cập nhật localStorage
    layAnh(); // Gọi hàm tải ảnh
}


document.getElementById("tag-input").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Ngăn reload trang
        timAnhMoi(); // Gọi tìm ảnh luôn
    }
});


document.getElementById("select-page").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Ngăn tải lại trang
        
        let pageInput = parseInt(this.value);
        if (!isNaN(pageInput) && pageInput >= 0) {
            capNhatTrangMoi(pageInput);
        } else {
            alert("Vui lòng nhập số trang hợp lệ!");
        }
    }
});



//xoa-input-ngan-phu
const resettkButtonnp = document.querySelector(".resetnp");

resettkButtonnp.addEventListener("click", function(event) {
  event.preventDefault(); // Ngăn hành vi mặc định  const inputrsElementtk2 = document.querySelector("#form-quet #input-quet");
      const inputrsElementtknp = document.querySelector("#tag-input");
  inputrsElementtknp.value = "";
});


const resettkButtonnp2 = document.querySelector(".resetnp2");

resettkButtonnp2.addEventListener("click", function(event) {
  event.preventDefault(); // Ngăn hành vi mặc định  const inputrsElementtk2 = document.querySelector("#form-quet #input-quet");
      const inputrsElementtknp2 = document.querySelector("#select-page");
  inputrsElementtknp2.value = "";
});




let currentPage = parseInt(localStorage.getItem("currentPage")) || 0; // Lấy từ localStorage hoặc mặc định 0

function layAnh() {
    const khuXemAnh = document.getElementById("khu-xem-anh");
    const tag = document.getElementById("tag-input").value.trim();
    const apiUrl = `https://api.rule34.xxx/index.php?page=dapi&s=post&q=index&limit=25&json=1&tags=${encodeURIComponent(tag)}&pid=${currentPage}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            khuXemAnh.innerHTML = ""; // Xóa nội dung cũ
            document.getElementById("select-page").value = currentPage; // Cập nhật input số trang

            if (!data || data.length === 0) {
                khuXemAnh.innerHTML = "<p>Không tìm thấy ảnh!</p>";
                return;
            }

            data.forEach(post => {
                let mediaContainer = document.createElement("div");
                mediaContainer.classList.add("media-item");

                if (post.file_url.endsWith(".mp4")) {
                    // Nếu là video, hiển thị ảnh preview
                    let previewImg = document.createElement("img");
                    previewImg.src = post.preview_url;
                    previewImg.alt = "Video Preview";
                    previewImg.classList.add("video-preview");

                    previewImg.addEventListener("click", () => {
                        window.open(post.file_url, "_blank"); // Mở video trong tab mới
                    });

                    mediaContainer.appendChild(previewImg);
                } else {
                    // Nếu là ảnh, hiển thị preview trước
                    let imgElement = document.createElement("img");
                    imgElement.src = post.preview_url || post.sample_url; // Hiện ảnh thu nhỏ
                    imgElement.alt = "Hình ảnh";
                    imgElement.classList.add("image-preview");

                    imgElement.addEventListener("click", () => {
                        window.open(post.file_url, "_blank"); // Mở ảnh gốc
                    });

                    imgElement.onerror = () => imgElement.style.display = "none";
                    mediaContainer.appendChild(imgElement);
                }

                khuXemAnh.appendChild(mediaContainer);
            });
        })
        .catch(error => console.error("Lỗi tải ảnh/video:", error));
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
const style = document.createElement("style");
style.innerHTML = `
    .media-item {
        display: inline-block;
        margin: 5px;
    }
    .video-preview {
        border: 2px solid blue; /* Để dễ nhận diện video */
        cursor: pointer;
    }
    .image-preview {
        border: 2px solid pink;
        cursor: pointer;
    }
`;
document.head.appendChild(style);

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




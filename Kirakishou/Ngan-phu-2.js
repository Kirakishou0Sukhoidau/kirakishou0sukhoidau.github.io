let currentPage = parseInt(localStorage.getItem("currentPage")) || 0;

function layAnh() {
    const khuXemAnh = document.getElementById("khu-xem-anh");
    const tag = document.getElementById("tag-input").value.trim();
    document.getElementById("select-page").value = currentPage;

    // API XML (rule34.xxx)
    const apiRule34Xxx = `https://api.rule34.xxx/index.php?page=dapi&s=post&q=index&limit=50&json=1&tags=${encodeURIComponent(tag)}&pid=${currentPage}`;

    // API JSON (Danbooru) - Lấy cả rating:s và rating:q, chỉ gọi nếu tags <= 2
    let apiDanbooruUrl = null;
    const tagsArray = tag.split(" ");
    if (tagsArray.length <= 2) {
        apiDanbooruUrl = `https://danbooru.donmai.us/posts.json?tags=${encodeURIComponent(tag)} (rating:e OR rating:q)&limit=50&page=${currentPage + 1}`;
    }

    console.log("Fetching:", apiRule34Xxx);
    if (apiDanbooruUrl) console.log("Fetching:", apiDanbooruUrl);

    // Gọi cả hai API song song
    Promise.all([
        fetch(apiRule34Xxx).then(res => res.json()).catch(() => null),
        apiDanbooruUrl ? fetch(apiDanbooruUrl).then(res => res.json()).catch(() => null) : null
    ]).then(([xmlData, danbooruData]) => {
        const fragment = document.createDocumentFragment();
        khuXemAnh.innerHTML = ""; // Xóa ảnh cũ trước khi thêm mới

        if (xmlData && Array.isArray(xmlData) && xmlData.length > 0) {
            addImagesToFragment(xmlData, fragment, false);
        }

        if (danbooruData && Array.isArray(danbooruData) && danbooruData.length > 0) {
            addImagesToFragment(danbooruData, fragment, true);
        }

        if (!fragment.hasChildNodes()) {
            khuXemAnh.innerHTML = "<p>Không tìm thấy ảnh!</p>";
        } else {
            khuXemAnh.appendChild(fragment);
            lazyLoadImagesHent();
        }
    }).catch(error => {
        console.error("Lỗi tải ảnh:", error);
        khuXemAnh.innerHTML = "<p>Lỗi khi tải ảnh!</p>";
    });
}

// Thêm ảnh vào trang
function addImagesToFragment(data, fragment, isDanbooru = false) {
    data.forEach(post => {
        let fileUrl = post.file_url;
        let previewUrl = isDanbooru
            ? post.preview_file_url || post.large_file_url || fileUrl  // Danbooru: Dùng preview trước
            : post.preview_url || post.sample_url || fileUrl;          // abc.com: Dùng preview trước

        if (!fileUrl || !previewUrl) return;

        let mediaContainer = document.createElement("div");
        mediaContainer.classList.add("media-item");

        let imgElement = document.createElement("img");
        imgElement.alt = "Hình ảnh";
        imgElement.classList.add("image-preview");
        imgElement.dataset.src = previewUrl;
        imgElement.style.opacity = "0";
        imgElement.title = isDanbooru ? (post.tag_string || "Không có tags") : (post.tags || "Không có tags");


        // Xác định viền ảnh dựa trên loại file
let fileType = fileUrl.split('.').pop().toLowerCase();

if (["mp4", "mov", "webm"].includes(fileType)) {
    imgElement.classList.add("video-preview"); // Viền xanh
} else if (fileType === "gif") {
    imgElement.classList.add("gif-preview"); // Viền lục
} else if (["jpg", "png", "jpeg"].includes(fileType)) {
    imgElement.classList.add("img-preview"); // Viền hồng
} else {
    imgElement.classList.add("default-preview"); // Viền mặc định
}

        
 /*       let tags = (post.tags || "").toLowerCase();
        let fileType = fileUrl.split('.').pop().toLowerCase();

        if ((tags.includes("video") || tags.includes("animated")) && ["mp4", "mov", "webm"].includes(fileType)) {
            imgElement.classList.add("video-preview"); // Viền xanh
        } else if (tags.includes("ai_generated") && ["jpg", "png", "jpeg"].includes(fileType)) {
            imgElement.classList.add("ai-preview"); // Viền vàng
        } else if (!tags.includes("ai_generated") && ["jpg", "png", "jpeg"].includes(fileType)) {
            imgElement.classList.add("img-preview"); // Viền hồng
        } else if (tags.includes("animated") && fileType === "gif") {
            imgElement.classList.add("gif-preview"); // Viền lục
        } else {
            imgElement.classList.add("default-preview"); // Viền hồng
        }
        */

        imgElement.addEventListener("click", () => window.open(fileUrl, "_blank"));
        imgElement.onerror = () => imgElement.style.display = "none";

        mediaContainer.appendChild(imgElement);
        fragment.appendChild(mediaContainer);
    });
}

// **Lazy load hình ảnh**
function lazyLoadImagesHent() {
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

// Xử lý khi tìm ảnh mới
function timAnhMoi() {
    currentPage = 0; // Reset về trang đầu
    localStorage.setItem("currentPage", currentPage);
    layAnh();
}

document.getElementById("tag-input").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        timAnhMoi();
    }
});

document.getElementById("select-page").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        let pageInput = parseInt(this.value);
        if (!isNaN(pageInput) && pageInput >= 0) {
            capNhatTrangMoi(pageInput);
        } else {
            alert("Vui lòng nhập số trang hợp lệ!");
        }
    }
});
        



//Tag-goi-y
document.addEventListener("DOMContentLoaded", function () {
    const tagInputDanbooru = document.getElementById('tag-input');
    const suggestionsBoxDanbooru = document.createElement('div');
    suggestionsBoxDanbooru.id = 'suggestions';
    document.body.appendChild(suggestionsBoxDanbooru);

    tagInputDanbooru.addEventListener('input', function () {
        const queryDanbooru = this.value.trim();
        suggestionsBoxDanbooru.innerHTML = ''; // Xóa gợi ý cũ

        if (queryDanbooru.length === 0) {
            suggestionsBoxDanbooru.style.display = 'none';
            return; // Không tìm kiếm nếu rỗng
        }

        fetch(`https://danbooru.donmai.us/tags.json?search[name_matches]=${queryDanbooru}*`)
            .then(response => response.json())
            .then(data => {
                if (data.length === 0) {
                    suggestionsBoxDanbooru.style.display = 'none';
                    return;
                }

                // Lọc bỏ tag có 0 posts và sắp xếp theo post_count giảm dần
                const validTags = data
                    .filter(tag => tag.post_count > 0) // Chỉ giữ tag có ít nhất 1 post
                    .sort((a, b) => b.post_count - a.post_count); // Ưu tiên tag phổ biến

                if (validTags.length === 0) {
                    suggestionsBoxDanbooru.style.display = 'none';
                    return;
                }

                suggestionsBoxDanbooru.innerHTML = '';
                validTags.slice(0, 10).forEach(tag => {
                    const suggestion = document.createElement('div');
                    suggestion.textContent = `${tag.name} (${tag.post_count} posts)`;
                    suggestion.classList.add("suggestion-item");
                    suggestion.addEventListener('click', function () {
                        tagInputDanbooru.value = tag.name;
                        suggestionsBoxDanbooru.style.display = 'none'; // Ẩn sau khi chọn
                    });
                    suggestionsBoxDanbooru.appendChild(suggestion);
                });

                const rectDanbooru = tagInputDanbooru.getBoundingClientRect();
                suggestionsBoxDanbooru.style.top = `${rectDanbooru.bottom + window.scrollY}px`;
                suggestionsBoxDanbooru.style.left = `${rectDanbooru.left + window.scrollX}px`;
                suggestionsBoxDanbooru.style.width = `${rectDanbooru.width}px`;
                suggestionsBoxDanbooru.style.display = 'block'; // Hiện gợi ý khi có kết quả
            })
            .catch(error => {
                console.error('Lỗi khi lấy gợi ý:', error);
            });
    });

    // Hiển thị gợi ý khi ô nhập liệu có focus
    tagInputDanbooru.addEventListener('focus', function () {
        if (suggestionsBoxDanbooru.innerHTML.trim() !== '') {
            suggestionsBoxDanbooru.style.display = 'block';
        }
    });

    // Ẩn gợi ý khi mất focus, nhưng chờ 200ms để xử lý trường hợp click vào gợi ý
    tagInputDanbooru.addEventListener('blur', function () {
        setTimeout(() => {
            suggestionsBoxDanbooru.style.display = 'none';
        }, 200);
    });
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
  inputrsElementtknp2.value = "0";
});




        

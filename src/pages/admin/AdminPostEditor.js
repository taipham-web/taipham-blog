// Admin Post Editor - Create/Edit Post
import { createPost, updatePost, getPostById } from "../../firebase/posts.js";
import { uploadImage, uploadImageBlob } from "../../firebase/storage.js";

let currentPost = null;
let editorInstance = null;

export async function AdminPostEditor(postId = null) {
  if (postId && postId !== "new") {
    currentPost = await getPostById(postId);
  } else {
    currentPost = null;
  }

  const isEdit = currentPost !== null;

  return `
    <div class="admin-editor">
      <div class="editor-header">
        <h1>${isEdit ? "✏️ Chỉnh sửa bài viết" : "📝 Tạo bài viết mới"}</h1>
        <a href="/admin/dashboard" class="btn-secondary">← Quay lại</a>
      </div>
      
      <form id="postForm" class="post-form">
        <div class="form-columns">
          <!-- Left Column -->
          <div class="form-column-left">
            <div class="form-group">
              <label for="title">Tiêu đề *</label>
              <input type="text" id="title" name="title" required 
                     value="${isEdit ? currentPost.title : ""}"
                     placeholder="Nhập tiêu đề bài viết">
            </div>
            
            <div class="form-group">
              <label for="excerpt">Tóm tắt (hiển thị ở trang chủ)</label>
              <textarea id="excerpt" name="excerpt" rows="3" 
                        placeholder="Mô tả ngắn về bài viết...">${
                          isEdit && currentPost.excerpt
                            ? currentPost.excerpt
                            : ""
                        }</textarea>
            </div>
            
            <div class="form-group">
              <label for="content">Nội dung *</label>
              <textarea id="content" name="content">${
                isEdit ? currentPost.content : ""
              }</textarea>
            </div>
          </div>
          
          <!-- Right Column -->
          <div class="form-column-right">
            <div class="form-group">
              <label for="date">Ngày đăng *</label>
              <input type="date" id="date" name="date" required 
                     value="${
                       isEdit
                         ? currentPost.date
                         : new Date().toISOString().split("T")[0]
                     }">
            </div>
            
            <div class="form-group">
              <label for="category">Danh mục *</label>
              <select id="category" name="category" required>
                <option value="">Chọn danh mục</option>
                <option value="Siêu xe" ${
                  isEdit && currentPost.category === "Siêu xe" ? "selected" : ""
                }>Siêu xe</option>
                <option value="Review Phim" ${
                  isEdit && currentPost.category === "Review Phim"
                    ? "selected"
                    : ""
                }>Review Phim</option>
                <option value="Review Sách" ${
                  isEdit && currentPost.category === "Review Sách"
                    ? "selected"
                    : ""
                }>Review Sách</option>
                <option value="Trinh thám" ${
                  isEdit && currentPost.category === "Trinh thám"
                    ? "selected"
                    : ""
                }>Trinh thám</option>
                <option value="Kinh dị" ${
                  isEdit && currentPost.category === "Kinh dị" ? "selected" : ""
                }>Kinh dị</option>
                <option value="Công nghệ" ${
                  isEdit && currentPost.category === "Công nghệ"
                    ? "selected"
                    : ""
                }>Công nghệ</option>
                <option value="Du lịch" ${
                  isEdit && currentPost.category === "Du lịch" ? "selected" : ""
                }>Du lịch</option>
                <option value="Âm nhạc" ${
                  isEdit && currentPost.category === "Âm nhạc" ? "selected" : ""
                }>Âm nhạc</option>
                <option value="Khác" ${
                  isEdit && currentPost.category === "Khác" ? "selected" : ""
                }>Khác</option>
              </select>
            </div>
            
            <div class="form-group">
              <label for="thumbnailFile">Ảnh bìa (Upload)</label>
              <input type="file" id="thumbnailFile" name="thumbnailFile" 
                     accept="image/*" class="file-input">
              <div id="thumbnailPreview" class="image-preview">
                ${
                  isEdit && currentPost.image
                    ? `<img src="${currentPost.image}" alt="Thumbnail"><button type="button" class="remove-image">✕</button>`
                    : ""
                }
              </div>
              <input type="hidden" id="image" name="image" 
                     value="${
                       isEdit && currentPost.image ? currentPost.image : ""
                     }">
            </div>
            
            <div class="form-group">
              <label for="youtubeId">YouTube Video ID (tùy chọn)</label>
              <input type="text" id="youtubeId" name="youtubeId" 
                     value="${
                       isEdit && currentPost.youtubeId
                         ? currentPost.youtubeId
                         : ""
                     }"
                     placeholder="dQw4w9WgXcQ">
              <small>Chỉ nhập ID, ví dụ: dQw4w9WgXcQ</small>
            </div>
          </div>
        </div>
        
        <div class="form-actions">
          <button type="submit" class="btn-primary">
            ${isEdit ? "💾 Lưu thay đổi" : "📤 Đăng bài"}
          </button>
          <a href="/admin/dashboard" class="btn-secondary">Hủy</a>
        </div>
      </form>
    </div>
  `;
}

export function initAdminPostEditor(postId) {
  const form = document.getElementById("postForm");
  if (!form) return;

  // Initialize TinyMCE
  initTinyMCE();

  // Handle thumbnail upload
  const thumbnailInput = document.getElementById("thumbnailFile");
  const thumbnailPreview = document.getElementById("thumbnailPreview");
  const imageInput = document.getElementById("image");

  thumbnailInput.addEventListener("change", async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      thumbnailInput.disabled = true;
      const url = await uploadImage(file, "thumbnails");

      imageInput.value = url;
      thumbnailPreview.innerHTML = `
        <img src="${url}" alt="Thumbnail">
        <button type="button" class="remove-image">✕</button>
      `;

      // Add remove handler
      thumbnailPreview
        .querySelector(".remove-image")
        .addEventListener("click", () => {
          imageInput.value = "";
          thumbnailPreview.innerHTML = "";
          thumbnailInput.value = "";
        });

      thumbnailInput.disabled = false;
    } catch (error) {
      alert("❌ Lỗi upload ảnh: " + error.message);
      thumbnailInput.disabled = false;
    }
  });

  // Handle remove existing thumbnail
  const removeBtn = thumbnailPreview.querySelector(".remove-image");
  if (removeBtn) {
    removeBtn.addEventListener("click", () => {
      imageInput.value = "";
      thumbnailPreview.innerHTML = "";
      thumbnailInput.value = "";
    });
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = "Đang lưu...";

    const postData = {
      title: document.getElementById("title").value,
      excerpt: document.getElementById("excerpt").value || "",
      date: document.getElementById("date").value,
      category: document.getElementById("category").value,
      image: document.getElementById("image").value || null,
      youtubeId: document.getElementById("youtubeId").value || null,
      content: editorInstance
        ? editorInstance.getContent()
        : document.getElementById("content").value,
    };

    try {
      if (postId && postId !== "new") {
        await updatePost(postId, postData);
        alert("✅ Đã cập nhật bài viết!");
      } else {
        await createPost(postData);
        alert("✅ Đã tạo bài viết mới!");
      }

      // Destroy TinyMCE before navigation
      if (editorInstance) {
        editorInstance.destroy();
        editorInstance = null;
      }

      window.location.href = "/admin/dashboard";
    } catch (error) {
      alert("❌ Lỗi: " + error.message);
      submitBtn.disabled = false;
      submitBtn.textContent =
        postId && postId !== "new" ? "💾 Lưu thay đổi" : "📤 Đăng bài";
    }
  });
}

// Initialize TinyMCE Editor
function initTinyMCE() {
  if (typeof tinymce === "undefined") {
    console.error("TinyMCE not loaded");
    return;
  }

  tinymce.init({
    selector: "#content",
    height: 600,
    menubar: false,
    plugins: [
      "advlist",
      "autolink",
      "lists",
      "link",
      "image",
      "charmap",
      "preview",
      "anchor",
      "searchreplace",
      "visualblocks",
      "code",
      "fullscreen",
      "insertdatetime",
      "media",
      "table",
      "help",
      "wordcount",
    ],
    toolbar:
      "undo redo | formatselect | bold italic underline strikethrough | " +
      "forecolor backcolor | alignleft aligncenter alignright alignjustify | " +
      "bullist numlist outdent indent | link image media | removeformat | code | help",
    content_style:
      "body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; font-size: 16px; line-height: 1.6; }",

    // Auto upload images when drag & drop or paste
    images_upload_handler: async (blobInfo, progress) => {
      try {
        const blob = blobInfo.blob();
        const filename = blobInfo.filename();

        // Upload to Firebase Storage
        const url = await uploadImageBlob(blob, filename);

        return url;
      } catch (error) {
        console.error("Image upload error:", error);
        throw error;
      }
    },

    // Allow paste images from clipboard
    paste_data_images: true,

    // File picker for manual image insert
    file_picker_types: "image",
    file_picker_callback: (callback, value, meta) => {
      if (meta.filetype === "image") {
        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");

        input.onchange = async function () {
          const file = this.files[0];
          if (!file) return;

          try {
            const url = await uploadImage(file, "posts");
            callback(url, { alt: file.name });
          } catch (error) {
            alert("❌ Lỗi upload ảnh: " + error.message);
          }
        };

        input.click();
      }
    },

    setup: (editor) => {
      editor.on("init", () => {
        editorInstance = editor;
      });
    },
  });
}

const sideBar = document.querySelector(".sideBar");
const closeBtn = document.querySelector(".closeBtn");
const menuBtn = document.querySelector(".menuBtn");
const logoutBtn = document.querySelector(".logoutBtn");
const sideBarIcons = document.querySelectorAll(".sideBarLinksContainer li");

//Open and close side-bar function
const openCloseSidebar = function () {
  const toggleSidebar = function (isCollapsed) {
    sideBar.classList.toggle("collapsed", isCollapsed);
    closeBtn.classList.toggle("hidden", isCollapsed);
    menuBtn.classList.toggle("hidden", !isCollapsed);
    logoutBtn.classList.toggle("hidden", isCollapsed);
  };

  closeBtn.addEventListener("click", function () {
    toggleSidebar(true);
  });

  menuBtn.addEventListener("click", function () {
    toggleSidebar(false);
  });

  sideBar.addEventListener("mouseleave", function () {
    toggleSidebar(true);
  });

  sideBarIcons.forEach(function (element) {
    element.addEventListener("mouseover", function () {
      toggleSidebar(false);
    });
  });
};

openCloseSidebar();

window.addEventListener("DOMContentLoaded", () => {
  // ปุ่มย้อนกลับ
  const backBtn = document.getElementById("backBtn");
  backBtn?.addEventListener("click", () => {
    window.location.href = "Admin_parcelHistory.html";
  });

  // จัดการอัปโหลดพัสดุ
  const uploadForm = document.getElementById("uploadForm");
  uploadForm?.addEventListener("submit", async (e) => {
    e.preventDefault();

    // สร้าง FormData จากฟอร์ม
    const formData = new FormData(uploadForm);

    try {
      const res = await fetch("http://localhost:3000/upload", {
        method: "POST",
        body: formData
      });

      if (res.ok) {
        alert("อัปโหลดพัสดุสำเร็จ");
        // ถ้าต้องการทำอะไรเพิ่ม เช่น clear form หรือ redirect ให้ใส่ที่นี่
      } else {
        const text = await res.text();
        alert("เกิดข้อผิดพลาด: " + text);
      }
    } catch (err) {
      console.error("ไม่สามารถเชื่อมต่อไปยังเซิร์ฟเวอร์:", err);
      alert("ไม่สามารถเชื่อมต่อไปยังเซิร์ฟเวอร์");
    }
  });
});
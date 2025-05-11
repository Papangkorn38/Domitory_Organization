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
  const urlParams = new URLSearchParams(window.location.search);
  const roomID = urlParams.get("room");

  fetch(`http://localhost:3000/api/read/parcel/${roomID}`)
    .then((res) => res.json())
    .then((data) => {
      if (!Array.isArray(data) || data.length === 0) {
        console.error("ไม่พบข้อมูลพัสดุ");
        return;
      }

      const latest = data[data.length - 1];
      const roomDisplay = "A" + latest.RoomID;
      document.getElementById("user-id-box").textContent = roomDisplay;
      document.getElementById("box").value = roomDisplay;

      const date = new Date(latest.ParcelDate);
      const formattedDate = `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth()+1).toString().padStart(2, '0')}-${date.getFullYear()+543}   ${date.toTimeString().split(' ')[0]}`;
      document.getElementById("date-box").value = formattedDate;

      const imgBox = document.getElementById("upload-box img");
      imgBox.src = `../uploads/${latest.IMG}`;
      imgBox.alt = "รูปพัสดุ";
    })
    .catch((err) => {
      console.error("ไม่สามารถโหลดข้อมูลพัสดุ:", err);
    });

  // เพิ่มปุ่มย้อนกลับไปยังหน้า Admin_parcelHistory.html
  const backBtn = document.getElementById("backBtn");
  if (backBtn) {
    backBtn.addEventListener("click", () => {
      window.location.href = "Admin_parcelHistory.html";
    });
  }
});

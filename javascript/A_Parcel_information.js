const sideBar = document.querySelector(".sideBar");
const closeBtn = document.querySelector(".closeBtn");
const menuBtn = document.querySelector(".menuBtn");
const logoutBtn = document.querySelector(".logoutBtn");
const sideBarIcons = document.querySelectorAll(".sideBarLinksContainer li");

const openCloseSidebar = function () {
  const toggleSidebar = function (isCollapsed) {
    sideBar.classList.toggle("collapsed", isCollapsed);
    closeBtn.classList.toggle("hidden", isCollapsed);
    menuBtn.classList.toggle("hidden", !isCollapsed);
    logoutBtn.classList.toggle("hidden", isCollapsed);
  };

  closeBtn.addEventListener("click", () => {
    toggleSidebar(true);
  });

  menuBtn.addEventListener("click", () => {
    toggleSidebar(false);
  });

  sideBar.addEventListener("mouseleave", () => {
    toggleSidebar(true);
  });

  sideBarIcons.forEach((el) => {
    el.addEventListener("mouseover", () => {
      toggleSidebar(false);
    });
  });
};

openCloseSidebar();

window.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const roomID = urlParams.get("room");

  fetch(`http://localhost:3000/api/read/parcel/${roomID}`)
    .then(res => res.json())
    .then(data => {
      if (!Array.isArray(data) || data.length === 0) {
        console.error("ไม่พบข้อมูลพัสดุ");
        return;
      }

      const latest = data[data.length - 1];

      const roomDisplay = latest.RoomID;
      document.getElementById("user-id-box").textContent = roomDisplay;
      document.getElementById("box").value = roomDisplay;

      const d = new Date(latest.ParcelDate);
      const formattedDate =
        d.getDate().toString().padStart(2, "0") + "-" +
        (d.getMonth() + 1).toString().padStart(2, "0") + "-" +
        (d.getFullYear() + 543) + "   " +
        d.toTimeString().split(" ")[0];
      document.getElementById("date-box").value = formattedDate;

      const parcelDisplay = latest.PID;
      document.getElementById("parcelbox").value = parcelDisplay;

      const imgEl = document.querySelector("#upload-box img");
      if (imgEl && latest.IMG) {
        imgEl.src = `../NodeJsAndMySql/uploads/${latest.IMG}`;
        imgEl.alt = "รูปพัสดุ";
      }
    })
    .catch(err => {
      console.error("ไม่สามารถโหลดข้อมูลพัสดุ:", err);
    });

  const backBtn = document.getElementById("backBtn");
  if (backBtn) {
    backBtn.addEventListener("click", () => {
      window.location.href = "Admin_parcelHistory.html";
    });
  }
});
var logout = function(){
  if(confirm('ต้องการจะออกจากระบบใช่ไหม')){
      localStorage.removeItem('AID');
      window.location.href = '../html/login.html';
  }else{
      console.log('ยกเลิกการlogoutเรียบร้อยแล้ว');
  }
}
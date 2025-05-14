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

/*ใช้เลื่อนแถบ*/ 
const tabs = document.querySelectorAll('.tab');
const indicator = document.querySelector('.blueline');

const requestOptions = {
  method: "GET",
  redirect: "follow"
};

const sections = {
  "คำร้องใหม่": "rq-waiting",
  "อยู่ระหว่างดำเนินการ": "rq-doing",
  "รายการที่สำเร็จ": "rq-done"
};

// โหลดข้อมูลคำร้องจาก API และใส่ตามกล่อง
function loadRequests() {
  fetch("http://localhost:3000/api/read/request", requestOptions)
    .then((response) => response.json())
    .then((data) => {
      const grouped = {};
      data.forEach(item => {
        const status = item.Status || "unknown"; //จัดกลุ่มคำร้องตามสถานะ
        if (!grouped[status]) grouped[status] = [];
        grouped[status].push(item);
      });

      // ล้างกล่องทั้งหมด
      Object.values(sections).forEach(id => {
        document.getElementById(id).innerHTML = "";
      });

      // ใส่ข้อมูลลงในแถบตามสถานะ
      for (const status in grouped) {
        let containerId = "";
        if (status === "do") containerId = "rq-waiting";
        else if (status === "doing") containerId = "rq-doing";
        else if (status === "done") containerId = "rq-done";
        else continue;

        const container = document.getElementById(containerId);
        grouped[status].forEach(item => {
          const card = document.createElement("div");
          card.className = "boxrq";
          card.style.display = "block"; 
          card.innerHTML = `
            <div style="padding-left: 12px; text-align: left;"onclick="window.location.href='request1.html?id=1${item.requestID}'">
              <div>RoomID : ${item.RoomID || "-"}</div>
              <div>Topic : ${item.Topic || "-"}</div>
              <div>Description : ${item.Description || "-"}</div>
              <div>Date : ${item.R_date ? item.R_date.substring(0, 10) : "-"}</div>
            </div>
          `;
          container.appendChild(card);
        });
      }
    })
    
    .catch((error) => console.error("fetch error:", error));
}

// เปลี่ยนแท็บ
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    indicator.style.transform = `translateX(${index * 100}%)`;

    const tabText = tab.textContent.trim();
    const activeId = sections[tabText];

    // ซ่อนทุกกล่องก่อน
    Object.values(sections).forEach(id => {
      const el = document.getElementById(id);
      el.style.visibility = "hidden";
    });

    // แสดงกล่องที่เลือก
    const activeBox = document.getElementById(activeId);
    activeBox.style.visibility = "visible";
  });
});


// โหลดข้อมูลเมื่อเปิดหน้า
document.addEventListener("DOMContentLoaded", () => {
  loadRequests();

  // ซ่อนกล่องตรงกลางและขวา
  document.getElementById("rq-doing").style.visibility = "hidden";
  document.getElementById("rq-done").style.visibility = "hidden";

  // แสดงกล่องฝั่งซ้าย
  document.getElementById("rq-waiting").style.visibility = "visible";

  // ตั้งแท็บให้ active ที่คำร้องใหม่ และเลื่อนแถบ .blueline ให้ตรง
  document.querySelectorAll(".tab").forEach((tab, i) => {
    if (tab.textContent.trim() === "คำร้องใหม่") {
      tab.classList.add("active");
      document.querySelector(".blueline").style.transform = `translateX(${i * 100}%)`;
    } else {
      tab.classList.remove("active");
    }
  });
});
var logout = function(){
  if(confirm('ต้องการจะออกจากระบบใช่ไหม')){
      localStorage.removeItem('AID');
      window.location.href = '../html/login.html';
  }else{
      console.log('ยกเลิกการlogoutเรียบร้อยแล้ว');
  }
}
  


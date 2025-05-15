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
const params = new URLSearchParams(window.location.search);
const id = params.get('id'); 

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    indicator.style.transform = `translateX(${index * 100}%)`;
  });
});

document.addEventListener("DOMContentLoaded", () => {
  fetch(`http://localhost:3000/api/read/request/byID/${id}`, {
    cache: "no-store",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("ไม่สามารถโหลดข้อมูลได้");
      }
      return response.json();
    })
    .then((data) => {
      if (!data || data.length === 0) {
        console.warn("ไม่พบข้อมูลในฐานข้อมูล");
        return;
      }

      const req = data[0]; // ดึง object จาก array

      document.querySelector(".noroom .boxnoroom").innerText = req.RoomID || "-";
      document.querySelector(".status .boxnoroom").innerText = req.Status || "-";
      document.querySelector(".topic .boxnoroom").innerText = req.Topic || "-";
      document.querySelector(".text .boxtext").innerText = req.Description || "-";
      document.querySelector(".id").innerText = `${req.RoomID || "-"}`;


      if (req.IMG) {
        document.querySelector(".boxpic").innerHTML = `
          <img src="http://localhost:3000/uploads/${req.IMG}" //ตรงนี้ทำม่ายเปน
               alt="รูปภาพแจ้งซ่อม" 
               style="max-width: 100%; max-height: 100%; border-radius: 10px;">
        `;
      }
    })
    .catch((error) => {
      console.error("เกิดข้อผิดพลาดในการโหลดข้อมูล:", error);
    });
});
var update_request = function(){
    var R_status;
  
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };

    fetch("http://localhost:3000/api/read/request/byID/"+id, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        
        data = result[0];
        if(data.Status == 'do'){
          R_status = 'doing';
        }else if(data.Status == 'doing'){
          R_status = 'done';
        }else{
          alert('คำร้องนี้เป็นรายการที่สำเร็จไปแล้ว');
          R_status = 'done';
          window.location.href='../html/roomStatus.html';
        }

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        "Status": R_status
      });

      const requestOptions = {
        method: "PATCH",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };

      fetch("http://localhost:3000/api/update/request/"+data.RoomID, requestOptions)
        .then((response) => response.text())
        .then((result) => {
          alert('อัพเดตข้อมูลเสร็จสิ้น');
          window.location.href='../html/A_request.html';
        })
        .catch((error) => console.error(error));
        
      })
      .catch((error) => console.error(error));
}

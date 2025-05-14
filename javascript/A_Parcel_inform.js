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
  const roomID = document.getElementById("box");
  const backBtn = document.getElementById("backBtn");
  const uploadForm = document.getElementById("uploadForm");
  const fileInput = document.getElementById("imgInput");
  const ParcelID = document.getElementById('parcelbox');

  // ปุ่มย้อนกลับ
  backBtn?.addEventListener("click", () => {
    window.location.href = "Admin_parcelHistory.html";
  });

  uploadForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const requestOptions_R = {
      method: "GET",
      redirect: "follow"
    };

    fetch("http://localhost:3000/api/read/room/"+roomID.value, requestOptions_R)
      .then((response) => response.json())
      .then((result) => {
        if(result[0].Status == 'Unoccupied'){
          alert('ห้องว่าง');
        }else{
          
          const formdata = new FormData();
          formdata.append("PID", ParcelID.value);
          formdata.append("RoomID", roomID.value);
          formdata.append("AID", window.AdminID);
          formdata.append("IMG", fileInput.files[0]);

          const requestOptions = {
            method: "POST",
            body: formdata,
            redirect: "follow"
          };

          fetch("http://localhost:3000/upload", requestOptions)
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.error(error));
          alert('บันทึกเรียบร้อย');
        }
      })
      .catch((error) => console.error(error));

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
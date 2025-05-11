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
<<<<<<< HEAD
var logout = function(){
  if(confirm('ต้องการจะออกสุ่ระบบใช่ไหม')){
      window.location.href = '../html/login.html';
  }else{
      console.log('ยกเลิกการlogoutเรียบร้อยแล้ว');
  }
}
=======

/*ใช้เลื่อนแถบ*/ 
const tabs = document.querySelectorAll('.tab');
const indicator = document.querySelector('.blueline');

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    indicator.style.transform = `translateX(${index * 100}%)`;
  });
});

>>>>>>> 9bd2137be403978d7ff4f79cb9f41dc792cc3acb

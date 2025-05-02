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
var admin_parcelHistory = function(){
    const raw = "";

    const requestOptions = {
    method: "GET",
    redirect: "follow"
    };
    
    var parcel_table = document.getElementById('parcel_table');
    fetch("http://localhost:3000/api/read/client", requestOptions)
    .then((response) => response.json())
    .then((result) => {
        parcel_table.innerHTML = '';
        var jsonObj = JSON.parse(result);
        console.log(jsonObj);
    })
    .catch((error) => console.error(error));
}
  
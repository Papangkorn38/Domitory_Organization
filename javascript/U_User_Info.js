const sideBar = document.querySelector(".sideBar");
const closeBtn = document.querySelector(".closeBtn");
const menuBtn = document.querySelector(".menuBtn");
const logoutBtn = document.querySelector(".logoutBtn");
const sideBarIcons = document.querySelectorAll(".sideBarLinksContainer li");
const backBtn = document.querySelector(".backBtn");

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

backBtn.addEventListener("click", function () {
    window.location.href = "home-client.html"; // ย้อนกลับไปหน้า Home 
});

logoutBtn.addEventListener("click", function () {
    sessionStorage.clear();
    localStorage.clear();
    window.location.href = "login.html";
});
var userinfo = function(){
  const requestOptions = {
  method: "GET",
  redirect: "follow"
};

fetch("http://localhost:3000/api/read/client/0002", requestOptions)
  .then(response => response.json())
  .then(data => {
      document.getElementById("Fname").value = data[0].Fname;
      document.getElementById("Lname").value = data[0].Lname;
      document.getElementById("CitizenID").value = data[0].CitizenID;
      document.getElementById("BirthDate").value = data[0].BirthDate;
      document.getElementById("Cemail").value = data[0].Cemail;
      document.getElementById("PhoneNum").value = data[0].PhoneNum;
      document.getElementById("Address").value = data[0].Address;
    })
  .catch((error) => console.error(error));

}
openCloseSidebar();

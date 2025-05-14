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

function formatThaiDate(isoString) {
  const date = new Date(isoString);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // เดือนเริ่มที่ 0
  const year = date.getFullYear();

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}

var admin_parcelHistory = function(){
    const raw = "";

    const requestOptions = {
    method: "GET",
    redirect: "follow"
    };
    
    var parcel_table = document.getElementById('parcel_table');
    fetch("http://localhost:3000/api/read/parcel", requestOptions)
    .then((response) => response.text())
    .then((result) => {
        parcel_table.innerHTML = '';
        var jsonObj = JSON.parse(result);
        for (let user of jsonObj){
          const formatDate = formatThaiDate(user.ParcelDate);

          var row = `
            <tr onclick="window.location.href='A_Parcel_information.html?room=${user.RoomID}'" style="cursor: pointer;">
              <td>${user.RoomID}</td>
              <td>${formatDate}</td>
              <td>${user.PID}</td>
              <td>${user.Status}</td>
            </tr>
          `;
          parcel_table.insertAdjacentHTML('beforeend', row)
        }
    })
    .catch((error) => console.error(error));
}
var logout = function(){
  if(confirm('ต้องการจะออกจากระบบใช่ไหม')){
      localStorage.removeItem('AID');
      window.location.href = '../html/login.html';
  }else{
      console.log('ยกเลิกการlogoutเรียบร้อยแล้ว');
  }
}  
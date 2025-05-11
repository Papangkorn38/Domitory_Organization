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
    const roomNumber = "4051"; //เปลี่ยนเป็น login ทีหลัง
    const tableBody = document.querySelector(".bill-table tbody");
  
    fetch(`http://localhost:3000/api/read/bills_history/${roomNumber}`)
      .then(response => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then(data => {
        if (!Array.isArray(data)) throw new Error("Data is not an array");
  
        tableBody.innerHTML = ""; // ล้างตารางก่อน
  
        data.forEach(bill => {
          const row = document.createElement("tr");
          row.innerHTML = `
            <td>${bill.RoomID}</td>
            <td>${bill.BHDate ? formatDate(bill.BHDate) : "-"}</td>
            <td>${bill.BHRoomChaege}</td>
            <td>${bill.BHWaterBill}</td>
            <td>${bill.BHElectricBill}</td>
            <td>${bill.BHTotalCharge}</td>
            <td>${bill.Status || "ยังไม่ชำระ"}</td>
            <td>${bill.Bill ? formatDate(bill.Bill) : "-"}</td>
          `;
          tableBody.appendChild(row);
        });
      })
      .catch(error => {
        console.error("เกิดข้อผิดพลาดในการโหลดข้อมูลบิล:", error);
      });
  });
  
  function formatDate(sqlDate) {
    if (!sqlDate) return "-";
    const d = new Date(sqlDate);
    if (isNaN(d)) return sqlDate;
    return d.toLocaleDateString("th-TH", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  }
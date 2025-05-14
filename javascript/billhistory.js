const sideBar = document.querySelector(".sideBar");
const closeBtn = document.querySelector(".closeBtn");
const menuBtn = document.querySelector(".menuBtn");
const logoutBtn = document.querySelector(".logoutBtn");
const sideBarIcons = document.querySelectorAll(".sideBarLinksContainer li");
const params = new URLSearchParams(window.location.search);
const id = params.get('id');
var bar = document.querySelector('.sideBarLinksContainer');
bar.innerHTML = `
                <li>
                <img src="../img/Home.png" alt=""><a href='home-client.html?id=${id}'>หน้าหลัก</a>
                </li>
                <li><img src="../img/Tall Person_white.png" alt=""><a href="U_User_Info.html?id=${id}">ข้อมูลลูกบ้าน</a></li>
                <li>
                    <img src="../img/Folder.png" alt=""><a href="User_bill_history.html?id=${id}">ประวัติบิลลูกบ้าน</a>
                </li>
                <li>
                    <img src="../img/Bill.png" alt=""hei><a href="U_User_Billing_Form.html?id=${id}">บิลค่าใช้จ่าย</a>
                </li>
                <li>
                    <img src="../img/Cardboard Box.png" alt=""><a href="User_Parcel.html?id=${id}">พัสดุ</a>
                </li>
                <li><img src="../img/Wallet_White.png" alt=""><a href="U_insert_slip.html?id=${id}">ชำระค่าเช่า</a></li>
                <li>
                    <img src="../img/Maintenance.png" alt=""><a href="user_maintenanceStatus.html?id=${id}">แจ้งซ่อม</a>
                </li>
                <li>
                    <img src="../img/Contact.png" alt=""><a href="#">ติดต่อเรา</a>
                </li>
            `

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

  // ให้กับ container หลักที่ไม่ถูกลบ เช่น .sideBarLinksContainer
const container = document.querySelector(".sideBarLinksContainer");

container.addEventListener("mouseover", function (event) {
  // ตรวจสอบว่า mouseover เกิดขึ้นที่ <li> หรือไม่
  if (event.target.closest("li")) {
    sideBar.classList.remove("collapsed");
    closeBtn.classList.remove("hidden");
    menuBtn.classList.add("hidden");
    logoutBtn.classList.remove("hidden");
  }
});
};

openCloseSidebar();

window.addEventListener("DOMContentLoaded", () => {
  
    const roomNumber = id; //เปลี่ยนเป็น login ทีหลัง
    const tableBody = document.querySelector(".bill-table tbody");
  
    fetch(`http://localhost:3000/api/read/bill/${roomNumber}`)
      .then(response => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then(data => {
        if (!Array.isArray(data)) throw new Error("Data is not an array");
  
        tableBody.innerHTML = ""; // ล้างตารางก่อน
  
        data.forEach(bill => {
          const row = document.createElement("tr");
          row.onclick = () => window.location.href = `U_bill_by_id.html?id=${bill.BID}`;
          row.innerHTML = `
          <tr onclick="window.location.href='#'">
            <td>${bill.RoomID}</td>
            <td>${bill.BillDate ? formatDate(bill.BillDate) : "-"}</td>
            <td>${bill.RoomCharge}</td>
            <td>${bill.WaterBill}</td>
            <td>${bill.ElectricBill}</td>
            <td>${bill.TotalCharge}</td>
          </tr>  
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
  var logout = function(){
  if(confirm('ต้องการจะออกจากระบบใช่ไหม')){
      window.location.href = '../html/login.html';
  }else{
      console.log('ยกเลิกการlogoutเรียบร้อยแล้ว');
  }
}
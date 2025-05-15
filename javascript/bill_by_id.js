var bar = document.querySelector('.sideBarLinksContainer');
document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const billID = id; // หรือใช้ดึงจาก URL เช่น ?room=4051
    
  
    fetch(`http://localhost:3000/api/read/billbyBID/${billID}`)
      .then(response => response.json())
      .then(data => {
        if (data.length === 0) {
          alert("ไม่พบข้อมูลบิลในระบบ");
          return;
        }
  
        const bill = data[0];

        bar.innerHTML = `
                <li>
                <img src="../img/Home.png" alt=""><a href='home-client.html?id=${bill.RoomID}'>หน้าหลัก</a>
                </li>
                <li><img src="../img/Tall Person_white.png" alt=""><a href="U_User_Info.html?id=${bill.RoomID}">ข้อมูลลูกบ้าน</a></li>
                <li>
                    <img src="../img/Folder.png" alt=""><a href="User_bill_history.html?id=${bill.RoomID}">ประวัติบิลลูกบ้าน</a>
                </li>
                <li>
                    <img src="../img/Bill.png" alt=""hei><a href="U_User_Billing_Form.html?id=${bill.RoomID}">บิลค่าใช้จ่าย</a>
                </li>
                <li>
                    <img src="../img/Cardboard Box.png" alt=""><a href="User_Parcel.html?id=${bill.RoomID}">พัสดุ</a>
                </li>
                <li><img src="../img/Wallet_White.png" alt=""><a href="U_insert_slip.html?id=${bill.RoomID}">ชำระค่าเช่า</a></li>
                <li>
                    <img src="../img/Maintenance.png" alt=""><a href="user_maintenanceStatus.html?id=${bill.RoomID}">แจ้งซ่อม</a>
                </li>
                <li>
                    <img src="../img/Contact.png" alt=""><a href="home-client.html?id=${id}">ติดต่อเรา</a>
                </li>
            `
  
        // ใส่ค่าจากฐานข้อมูลลงในช่อง input
        document.querySelector('.user-id-display').textContent = bill.RoomID;
        document.querySelector('.user-id-input').value = bill.RoomID;
        document.querySelector('.rent-box').value = bill.RoomCharge;
        document.querySelector('.totalBillingInput').value = bill.TotalCharge;
        document.getElementById('total_W').value = bill.WaterBill;
        document.getElementById('total_E').value = bill.ElectricBill;
        //ไว้เช็ครอบบิล
        // วันออกบิล
        const billDateObj = new Date(bill.BillDate);
        const billDate = billDateObj.toLocaleDateString("th-TH");
        document.querySelector('.date-box').value = billDate;
  
        // รอบบิล (แสดงตามวันออกบิล)
        const thaiMonths = [
          "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
          "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
        ];
        const month = thaiMonths[billDateObj.getMonth()];
        const yearBE = billDateObj.getFullYear() + 543;
        const billingCycle = `-- ${month} ${yearBE} --`;
  
        const billingCycleSelect = document.querySelector('.billing-cycle-box');
        for (let i = 0; i < billingCycleSelect.options.length; i++) {
          if (billingCycleSelect.options[i].text.trim() === billingCycle) {
            billingCycleSelect.selectedIndex = i;
            break;
          }
        }
        //จบตรงนี้
        // ค่าน้ำ
        document.querySelector('.water-current-box').value = bill.WaterCurrent;
        document.querySelector('.water-previous-box').value = bill.WaterPrevious;
        document.querySelector('.water-used-box').value = bill.WaterUsed;
        document.querySelector('.water-price-box').value = bill.WaterPrice;
  
        // ค่าไฟ
        document.querySelector('.electric-current-box').value = bill.ElectricCurrent;
        document.querySelector('.electric-previous-box').value = bill.ElectricPrevious;
        document.querySelector('.electric-used-box').value = bill.ElectricUsed;
        document.querySelector('.electric-price-box').value = bill.ElectricPriced;
  
      })
      .catch(error => {
        console.error("โหลดข้อมูลบิลล้มเหลว:", error);
      });
  });
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

var logout = function(){
  if(confirm('ต้องการจะออกจากระบบใช่ไหม')){
      window.location.href = '../html/login.html';
  }else{
      console.log('ยกเลิกการlogoutเรียบร้อยแล้ว');
  }
}

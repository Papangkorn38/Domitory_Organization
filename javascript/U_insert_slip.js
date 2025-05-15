const sideBar = document.querySelector(".sideBar");
const closeBtn = document.querySelector(".closeBtn");
const menuBtn = document.querySelector(".menuBtn");
const logoutBtn = document.querySelector(".logoutBtn");
const sideBarIcons = document.querySelectorAll(".sideBarLinksContainer li");
const confirmBtn = document.querySelector(".action-btn");
const imageInput = document.getElementById("imgInput");
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
                    <img src="../img/Contact.png" alt=""><a href="home-client.html?id=${id}">ติดต่อเรา</a>
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

confirmBtn.addEventListener("click", async function (event) {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  event.preventDefault();

  if (
    imageInput.files.length === 0
  ) {
    console.log("Please fill all the input");
    return;
  }

  const formData = new FormData();
  formData.append("IMG", imageInput.files[0]);
  formData.append("RoomID", id);

  try {
    const response = await fetch(`http://localhost:3000/slip/`, {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      // Handle successful response
      alert('ส่งข้อมูลเรียบร้อยแล้ว');
      window.location.href = `../html/home-client.html?id=${id}`; // Redirect after successful submission
    } else {
      console.error("Request failed:", response.status);
    }
  } catch (error) {
    console.error("Error:", error);
  }
});

openCloseSidebar();
  var read_bill = function(){
    var roomID = document.getElementById('client_roomID');
    var billMonth = document.getElementById('Date_month');
    var billDate = document.getElementById('Date');
    var billTotal = document.getElementById('total');
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };

  fetch("http://localhost:3000/api/read/bill/"+id, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      var bill = result[result.length-1];
      document.querySelector('.user-id-box').innerHTML = bill.RoomID;
      const dateObj = new Date(bill.BillDate);
      const day = String(dateObj.getDate()).padStart(2, '0');
      const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // เดือนเริ่มที่ 0
      const year = dateObj.getFullYear();
      const formattedDate = `${day}/${month}/${year}`;
      const months = dateObj.getMonth();

      const thaiMonths = [
        "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน",
        "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม",
        "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
      ];

      const thaiMonthName = thaiMonths[months];
      
      roomID.value = bill.RoomID;
      billMonth.value = thaiMonthName;
      billDate.value = formattedDate;
      billTotal.value = bill.TotalCharge;
    })
    .catch((error) => console.error(error));
}
var logout = function(){
  if(confirm('ต้องการจะออกจากระบบใช่ไหม')){
      window.location.href = '../html/login.html';
  }else{
      console.log('ยกเลิกการlogoutเรียบร้อยแล้ว');
  }
}
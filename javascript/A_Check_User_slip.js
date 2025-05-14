const sideBar = document.querySelector(".sideBar");
const closeBtn = document.querySelector(".closeBtn");
const menuBtn = document.querySelector(".menuBtn");
const logoutBtn = document.querySelector(".logoutBtn");
const sideBarIcons = document.querySelectorAll(".sideBarLinksContainer li");
const selector = document.getElementById("roomIDField");

const openCloseSidebar = function () {
  const toggleSidebar = function (isCollapsed) {
    sideBar.classList.toggle("collapsed", isCollapsed);
    closeBtn.classList.toggle("hidden", isCollapsed);
    menuBtn.classList.toggle("hidden", !isCollapsed);
    logoutBtn.classList.toggle("hidden", isCollapsed);
  };

  closeBtn.addEventListener("click", () => toggleSidebar(true));
  menuBtn.addEventListener("click", () => toggleSidebar(false));
  sideBar.addEventListener("mouseleave", () => toggleSidebar(true));
  sideBarIcons.forEach(el => el.addEventListener("mouseover", () => toggleSidebar(false)));
};

openCloseSidebar();

function showApproveModal() {
  // 1. อ่านข้อความใน <div id="displayRoomID"> (เช่น "A0002")
  const displayID = document.getElementById("displayRoomID").innerText;

  // 2. ตัดตัว "A" ด้านหน้าออก เพื่อให้ตรงกับ PK ในฐานข้อมูล (เช่น "0002")
  const rawID = displayID.replace(/^A/, "");

  // 3. เรียก API PATCH ไปอัปเดตสถานะห้อง
  fetch(`http://localhost:3000/api/update/room/${rawID}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ Status: "Paid" })
  })
    .then(res => {
      if (!res.ok) throw new Error("อัปเดตสถานะห้องไม่สำเร็จ");
      document.getElementById("approveModal").classList.remove("hidden");
    })
    .catch(err => console.error(err));
}

function showRejectModal() {
  const displayID = document.getElementById("displayRoomID").innerText;
  const rawID = displayID.replace(/^A/, "");
  fetch(`http://localhost:3000/api/update/room/${rawID}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ Status: "Unpaid" })
  })
    .then(res => {
      if (!res.ok) throw new Error("อัปเดตสถานะห้องไม่สำเร็จ");
      document.getElementById("rejectModal").classList.remove("hidden");
    })
    .catch(err => console.error(err));
}

function closeModal(modalId) {
  document.getElementById(modalId).classList.add("hidden");
  window.location.href='roomStatus.html';
}

window.onload = function() {
  // 3.1 ดึง list ห้องมาก่อน
  fetch("http://localhost:3000/api/read/room")
    .then(res => res.json())
    .then(rooms => {
      // สมมติ rooms = ["0001","0002",…]
      selector.innerHTML = rooms
        .map(r => `<option value="${r.RoomID}">${r.RoomID}</option>`)
        .join("");

      // 3.2 ตั้ง listener หลังจากมี <option> แล้ว
      selector.addEventListener("change", () => {
        updateSlipAndBillData(selector.value);
      });

      // 3.3 เรียกครั้งแรกด้วยค่า default (ค่าตัวแรกใน <select>)
      updateSlipAndBillData(selector.value);
    })
    .catch(err => console.error("Error fetching rooms:", err));
};

function updateSlipAndBillData(roomID) {
  const roomIDText = roomID.replace(/^A/, "");

  document.getElementById("displayRoomID").textContent = roomID;
  document.getElementById("roomIDField").value = roomID;

  // เคลียร์ค่าก่อน
  document.getElementById("billing-cycle").value = "";
  document.getElementById("billdate").value = "";
  document.getElementById("rent-box").value = "";
  document.getElementById("slipImage").src = "";

  //Fetch Bill
  fetch(`http://localhost:3000/api/read/bill/${roomIDText}`)
    .then(res => res.json())
    .then(billData => {
      if (billData.length > 0) {
        const bill = billData[billData.length - 1];
        const createdAt = new Date(bill.BillDate);

        const dateStr = createdAt.toLocaleDateString("th-TH", {
          day: "2-digit", month: "2-digit", year: "numeric"
        });
        const timeStr = createdAt.toLocaleTimeString("th-TH", {
          hour: "2-digit", minute: "2-digit", second: "2-digit"
        });
        const monthYear = createdAt.toLocaleDateString("th-TH", {
          month: "long", year: "numeric"
        });

        document.getElementById("billing-cycle").value = `-- ${monthYear} --`;
        document.getElementById("billdate").value = `${dateStr} ${timeStr}`;
        document.getElementById("rent-box").value = `${bill.TotalCharge}`;
      }
    })
    .catch(err => console.error("Error fetching bill:", err));

  //Fetch Slip Image
  fetch(`http://localhost:3000/api/read/slip/${roomIDText}`)
    .then(res => res.json())
    .then(slipData => {
      console.log("Slip data:", slipData);

      if (slipData.length > 0) {
        const slip = slipData[slipData.length - 1]; // ใช้สลิปล่าสุด
        document.getElementById("slipImage").src = `http://localhost:3000/uploads/${slip.IMG}`;
      } else {
        document.getElementById("slipImage").src = "";
      }
    })
    .catch(err => console.error("Error fetching slip:", err));
}

var logout = function(){
  if(confirm('ต้องการจะออกจากระบบใช่ไหม')){
      localStorage.removeItem('AID');
      window.location.href = '../html/login.html';
  }else{
      console.log('ยกเลิกการlogoutเรียบร้อยแล้ว');
  }
}
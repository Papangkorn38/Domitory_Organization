const sideBar = document.querySelector(".sideBar");
const closeBtn = document.querySelector(".closeBtn");
const menuBtn = document.querySelector(".menuBtn");
const logoutBtn = document.querySelector(".logoutBtn");
const sideBarIcons = document.querySelectorAll(".sideBarLinksContainer li");

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
  document.getElementById("approveModal").classList.remove("hidden");
}
function showRejectModal() {
  document.getElementById("rejectModal").classList.remove("hidden");
}
function closeModal(modalId) {
  document.getElementById(modalId).classList.add("hidden");
}

window.onload = function () {
  const selector = document.getElementById("roomIDField");
  for (let i = 1; i <= 20; i++) {
    const room = `A${i.toString().padStart(4, "0")}`;
    const option = document.createElement("option");
    option.value = room;
    option.textContent = room;
    selector.appendChild(option);
  }

  selector.addEventListener("change", function () {
    const selectedRoom = this.value;
    updateSlipAndBillData(selectedRoom);
  });

  updateSlipAndBillData("A0001");
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


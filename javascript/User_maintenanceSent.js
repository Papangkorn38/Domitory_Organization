const sideBar = document.querySelector(".sideBar");
const closeBtn = document.querySelector(".closeBtn");
const menuBtn = document.querySelector(".menuBtn");
const logoutBtn = document.querySelector(".logoutBtn");
const sideBarIcons = document.querySelectorAll(".sideBarLinksContainer li");
const userID = document.querySelector(".user-id-box");
const inputRoomID = document.getElementById("roomID");
const inputStatus = document.getElementById("status");
const topicInput = document.querySelector(".subject-field");
const descriptionInput = document.querySelector(".message-field");
const requestImageContainer = document.querySelector(".image-wrapper");
const confirmBtn = document.querySelector(".action-btn");

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

const addData = function (data) {
  userID.textContent = `A${data.RoomID}`;
  inputRoomID.value = `A${data.RoomID}`;
  data.Status === "do" || "doing"
    ? (inputStatus.value = "กำลังดำเนินการ")
    : "เสร็จสิ้น";
  topicInput.value = `${data.Topic}`;
  descriptionInput.value = `${data.Description}`;
  requestImageContainer.insertAdjacentHTML(
    "beforeend",
    `<img src="../NodeJsAndMySql/uploads/${data.IMG}" alt="Request Image" />`
  );
};

const updateRequestStatus = function (roomID) {
  try {
    const response = fetch(
      `http://localhost:3000/api/update/request/${roomID}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Status: "done" }),
      }
    );
    window.location.href = `../html/User_maintenanceStatus.html?id=${roomID}`;
  } catch (error) {
    console.log(error);
  }
};

// จะรู้ได้ไง่ว่า request ที่กดมาเป็น request อันไหน
window.onload = async function () {
  const urlParam = window.location.search;
  const searchParams = new URLSearchParams(urlParam);
  const requestID = searchParams.get("requestID");
  const roomID = searchParams.get("id");

  confirmBtn.addEventListener("click", function () {
    updateRequestStatus(roomID);
  });

  const response = await fetch(
    `http://localhost:3000/api/read/request/${roomID}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const responseData = await response.json();

  const actualData = responseData.filter(function (userPendingRequest) {
    return String(userPendingRequest.requestID) === requestID;
  });

  addData(actualData[0]);
};

openCloseSidebar();

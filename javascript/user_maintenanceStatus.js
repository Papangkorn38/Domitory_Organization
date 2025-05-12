// const { request } = require("http");
const sideBar = document.querySelector(".sideBar");
const closeBtn = document.querySelector(".closeBtn");
const menuBtn = document.querySelector(".menuBtn");
const logoutBtn = document.querySelector(".logoutBtn");
const sideBarIcons = document.querySelectorAll(".sideBarLinksContainer li");
const pendingHeader = document.querySelector(".pendingStatus");
const successHeader = document.querySelector(".successStatus");
const animationLine = document.querySelector(".line2");
const pendingRequestContainer = document.querySelector(
  ".pendingRequestContainer"
);
const successRequestContainer = document.querySelector(
  ".successRequestContainer"
);
const successRequest = document.querySelector(".successRequest");
const addRequestBtn = document.querySelector(".addRequest");

window.onload = async function () {
  // เหลือเอาเลขห้องมาจาก url

  // Fetch getting pending request
  const response = await fetch(`http://localhost:3000/api/read/request/0007`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  request = await response.json();

  // Add pending request
  request.forEach(function (userPendingRequest) {
    let fullDate = new Date(userPendingRequest.R_date);
    if (userPendingRequest.Status === "done") {
      successRequestContainer.insertAdjacentHTML(
        "beforeend",
        `<div class="successRequest hideRequest">
                  <div class="successImgContainer">
                    <img
                      src="../NodeJsAndMySql/uploads/${userPendingRequest.IMG}"
                      alt="Broken Ceiling Lamp"
                      class="requestImg"
                    />
                  </div>
                  <div class="successDescriptionContainer">
                    <p class="successTopic">Topic : <span>${
                      userPendingRequest.Topic
                    }</span></p>
                    <p class="successDescription">
                      Description : <span>${
                        userPendingRequest.Description
                      }</span>
                    </p>
                    <p class="successDate">
                      Date : <span>${userPendingRequest.R_date.slice(
                        0,
                        10
                      )} ${fullDate.toLocaleTimeString()}</span>
                    </p>
                  </div>
                </div>`
      );
    } else {
      pendingRequestContainer.insertAdjacentHTML(
        "beforeend",
        `<div class="pendingRequest">
          <div class="pendingImgContainer">
            <img
              src="../NodeJsAndMySql/uploads/${userPendingRequest.IMG}"
              alt="Maintenance Request Image"
              class="requestImg"
            />
          </div>
          <div class="pendingDescriptionContainer">
            <p class="pendingTopic">Topic : <span>${
              userPendingRequest.Topic
            }</span></p>
            <p class="pendingDescription">
              Description : <span>${userPendingRequest.Description}</span>
            </p>
            <p class="pendingDate">
              Date : <span>${userPendingRequest.R_date.slice(
                0,
                10
              )} ${fullDate.toLocaleTimeString()}</span>
            </p>
          </div>
        </div>`
      );
    }
  });

  if (document.querySelector(".pendingRequest") !== null) {
    document
      .querySelector(".pendingRequest")
      .addEventListener("click", function () {
        window.location.href = "../html/User_maintenanceSent.html";
      });
  }
};

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

const toggleAnimationLine = function (direction) {
  if (!animationLine.classList.contains(direction)) {
    animationLine.classList.remove(
      direction === "moveRight" ? "moveLeft" : "moveRight"
    );
    animationLine.classList.add(direction);
  }
};

const toggleVisibility = function (container, className, action) {
  for (const element of container.children) {
    element.classList[action](className);
  }
};

// Switch Status function
const switchStatus = function () {
  // const successRequestArray = pendingRequestContainer.children;
  successHeader.addEventListener("click", function () {
    toggleAnimationLine("moveRight");
    toggleVisibility(successRequestContainer, "hideRequest", "remove");
    toggleVisibility(pendingRequestContainer, "hideRequest", "add");
  });

  pendingHeader.addEventListener("click", function () {
    toggleAnimationLine("moveLeft");
    toggleVisibility(pendingRequestContainer, "hideRequest", "remove");
    toggleVisibility(successRequestContainer, "hideRequest", "add");
  });
};

addRequestBtn.addEventListener("click", function () {
  window.location.href = "../html/User_maintenanceCreate.html";
});

switchStatus();
openCloseSidebar();

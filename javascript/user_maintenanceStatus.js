// const { request } = require("http");

const sideBar = document.querySelector(".sideBar");
const closeBtn = document.querySelector(".closeBtn");
const menuBtn = document.querySelector(".menuBtn");
const logoutBtn = document.querySelector(".logoutBtn");
const sideBarIcons = document.querySelectorAll(".sideBarLinksContainer li");
const pendingHeader = document.querySelector(".pendingStatus");
const successHeader = document.querySelector(".successStatus");
const animationLine = document.querySelector(".line2");
const pendingRequest = document.querySelector(".pendingRequest");
const pendingRequestContainer = document.querySelector(
  ".pendingRequestContainer"
);
const successRequestContainer = document.querySelector(
  ".successRequestContainer"
);
const successRequest = document.querySelector(".successRequest");
const addRequestBtn = document.querySelector(".addRequest");

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

window.onload = async function () {
  // Fetch getting pending request
  const response = await fetch(`http://localhost:3000/api/read/request/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  request = await response.json();
  console.log(request);

  // Add pending request
  request.forEach(function (userPendingRequest) {
    pendingRequestContainer.insertAdjacentHTML(
      "afterbegin",
      `<div class="pendingRequest">
                  <div class="pendingImgContainer">
                    <img
                      src="../img/brokenCeilingLamp.jpg"
                      alt="Broken Ceiling Lamp"
                      class="requestImg"
                    />
                  </div>
                  <div class="pendingDescriptionContainer">
                    <p class="pendingTopic">Topic : <span>${userPendingRequest.Topic}</span></p>
                    <p class="pendingDescription">
                      Description : <span>${userPendingRequest.Description}</span>
                    </p>
                    <p class="pendingDate">
                      Date : <span>30-03-2568 14:50:00</span>
                    </p>
                  </div>
                </div>`
    );
  });
};

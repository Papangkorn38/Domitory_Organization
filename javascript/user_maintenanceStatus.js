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

// Switch Status function
const switchStatus = function () {
  // const successRequestArray = pendingRequestContainer.children;
  successHeader.addEventListener("click", function () {
    if (!animationLine.classList.contains("moveRight")) {
      animationLine.classList.remove("moveLeft");
      animationLine.classList.add("moveRight");
    }

    for (const successRequestElement of successRequestContainer.children) {
      successRequestElement.classList.remove("hideRequest");
    }

    for (const pendingStatusElement of pendingRequestContainer.children) {
      pendingStatusElement.classList.add("hideRequest");
    }
  });

  pendingHeader.addEventListener("click", function () {
    if (!animationLine.classList.contains("moveLeft")) {
      animationLine.classList.remove("moveRight");
      animationLine.classList.add("moveLeft");
    }

    for (const pendingStatusElement of pendingRequestContainer.children) {
      pendingStatusElement.classList.remove("hideRequest");
    }

    for (const successRequestElement of successRequestContainer.children) {
      successRequestElement.classList.add("hideRequest");
    }
  });
};

switchStatus();
openCloseSidebar();

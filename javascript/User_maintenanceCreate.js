const sideBar = document.querySelector(".sideBar");
const closeBtn = document.querySelector(".closeBtn");
const menuBtn = document.querySelector(".menuBtn");
const logoutBtn = document.querySelector(".logoutBtn");
const sideBarIcons = document.querySelectorAll(".sideBarLinksContainer li");
const confirmBtn = document.querySelector(".action-btn");
const topicInput = document.getElementById("topicInput");
const descriptionInput = document.getElementById("descriptionInput");
const imageInput = document.getElementById("imgInput");

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

const confirmRequest = async function (data) {
  const response = await fetch(`http://localhost:3000/request`, {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data;",
    },
    body: JSON.stringify(data),
  });
  console.log(response.json());
};

confirmBtn.addEventListener("click", function () {
  if (
    topicInput.value.trim() === "" ||
    descriptionInput.value.trim() === "" ||
    imageInput.files.length === 0
  ) {
    console.log("Please fill all the input");
  } else {
    let data = {
      RoomID: "0002",
      AID: "A000000001",
      Topic: topicInput.value,
      Description: descriptionInput.value,
      IMG: imageInput.files[0].name,
    };
    // console.log(data);
    confirmRequest(data);
  }
});

openCloseSidebar();

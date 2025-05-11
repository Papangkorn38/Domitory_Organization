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

confirmBtn.addEventListener("click", async function (event) {
  event.preventDefault();

  if (
    topicInput.value.trim() === "" ||
    descriptionInput.value.trim() === "" ||
    imageInput.files.length === 0
  ) {
    console.log("Please fill all the input");
    return;
  }

  const formData = new FormData();
  formData.append("IMG", imageInput.files[0]);
  formData.append("RoomID", "0002");
  formData.append("AID", "A000000001");
  formData.append("Topic", topicInput.value);
  formData.append("Description", descriptionInput.value);

  try {
    const response = await fetch(`http://localhost:3000/request/`, {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      // Handle successful response
      window.location.href = "../html/User_maintenanceStatus.html"; // Redirect after successful submission
    } else {
      console.error("Request failed:", response.status);
    }
  } catch (error) {
    console.error("Error:", error);
  }
});

openCloseSidebar();

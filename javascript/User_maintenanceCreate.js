const sideBar = document.querySelector(".sideBar");
const closeBtn = document.querySelector(".closeBtn");
const menuBtn = document.querySelector(".menuBtn");
const logoutBtn = document.querySelector(".logoutBtn");
const sideBarIcons = document.querySelectorAll(".sideBarLinksContainer li");
const confirmBtn = document.querySelector(".action-btn");
const topicInput = document.getElementById("topicInput");
const descriptionInput = document.getElementById("descriptionInput");
const imageInput = document.getElementById("imgInput");
const uploadContainer = document.querySelector(".upload-wrapper");

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

imageInput.addEventListener("change", function () {
  let image = URL.createObjectURL(imageInput.files[0]);
  if (uploadContainer.lastElementChild.tagName.toLowerCase() === "img") {
    uploadContainer.lastElementChild.src = image;
  } else {
    let newImage = document.createElement("img");
    newImage.src = image;
    newImage.classList.add("uploadedImage");
    uploadContainer.insertAdjacentElement("beforeend", newImage);
  }
});

const getData = async function () {
  const urlParam = window.location.search;
  const searchParams = new URLSearchParams(urlParam);
  const roomID = searchParams.get("id");

  const response = await fetch(
    `http://localhost:3000/api/read/request/${roomID}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const dataFromApi = await response.json();
  const roomAndAdminID = {
    RoomID: dataFromApi[0].RoomID,
    AdminID: dataFromApi[0].AID,
  };

  return roomAndAdminID;
};

confirmBtn.addEventListener("click", async function (event) {
  event.preventDefault();

  if (
    topicInput.value.trim() === "" ||
    descriptionInput.value.trim() === "" ||
    imageInput.files.length === 0
  ) {
    alert("Please fill all the input");
  } else {
    const roomData = getData();
    const formData = new FormData();
    formData.append("IMG", imageInput.files[0]);
    formData.append("RoomID", `${(await roomData).RoomID}`);
    formData.append("AID", `${(await roomData).AdminID}`);
    formData.append("Topic", topicInput.value);
    formData.append("Description", descriptionInput.value);

    try {
      const response = await fetch(`http://localhost:3000/request/`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        window.location.href = `../html/User_maintenanceStatus.html?id=${
          (await roomData).RoomID
        }`;
      } else {
        console.error("Request failed:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
});

openCloseSidebar();

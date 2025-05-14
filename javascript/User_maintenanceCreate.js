const sideBar = document.querySelector(".sideBar");
const closeBtn = document.querySelector(".closeBtn");
const menuBtn = document.querySelector(".menuBtn");
const logoutBtn = document.querySelector(".logoutBtn");
const sideBarIcons = document.querySelectorAll(".sideBarLinksContainer li");
const confirmBtn = document.querySelector(".action-btn");
const topicInput = document.getElementById("topicInput");
const descriptionInput = document.getElementById("descriptionInput");
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
                    <img src="../img/Contact.png" alt=""><a href="#">ติดต่อเรา</a>
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
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
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
var logout = function(){
  if(confirm('ต้องการจะออกจากระบบใช่ไหม')){
      window.location.href = '../html/login.html';
  }else{
      console.log('ยกเลิกการlogoutเรียบร้อยแล้ว');
  }
}
// const { request } = require("http");
var client_RoomID;
const sideBar = document.querySelector(".sideBar");
const closeBtn = document.querySelector(".closeBtn");
const menuBtn = document.querySelector(".menuBtn");
const logoutBtn = document.querySelector(".logoutBtn");
const sideBarIcons = document.querySelectorAll(".sideBarLinksContainer li");
const pendingHeader = document.querySelector(".pendingStatus");
const successHeader = document.querySelector(".successStatus");
const animationLine = document.querySelector(".line2");
const pendingRequest = document.querySelector(".pendingRequest");
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

const pendingRequestContainer = document.querySelector(
  ".pendingRequestContainer"
);
const successRequestContainer = document.querySelector(
  ".successRequestContainer"
);
const successRequest = document.querySelector(".successRequest");
const addRequestBtn = document.querySelector(".addRequest");

window.onload = async function () {
  const roomID = id;
  // Fetch getting pending request

  const response = await fetch(
    `http://localhost:3000/api/read/request/${roomID}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  request = await response.json();
  console.log(request);

  // Add pending request
  request.forEach(function (userPendingRequest) {
    let fullDate = new Date(userPendingRequest.R_date);
    if (userPendingRequest.Status === "done") {
      successRequestContainer.insertAdjacentHTML(
        "beforeend",
        `<div class="successRequest hideRequest" onclick="window.location.href = '../html/User_maintenanceSent.html?id=${userPendingRequest.requestID}'">
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
        `<div class="pendingRequest" onclick="window.location.href = '../html/User_maintenanceSent.html?id=${userPendingRequest.requestID}'">
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
  addRequestBtn.addEventListener("click", function () {
      window.location.href = `../html/User_maintenanceCreate.html?id=${id}`;
    });
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
  window.location.href = `../html/User_maintenanceCreate.html?id=${client_RoomID}`;
});

switchStatus();
openCloseSidebar();
/*
window.onload = async function () {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  // Fetch getting pending request
  const response = await fetch(`http://localhost:3000/api/read/request/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const request = await response.json();
  console.log(request[0].IMG);
  // Add pending request
  request.forEach(function (userPendingRequest) {
    // Convert buffer to base64 string
    const buffer = userPendingRequest.IMG.data;
    const base64Image = btoa(
      String.fromCharCode.apply(null, new Uint8Array(buffer))
    );
    console.log(buffer);
    console.log(buffer.toString());
    console.log(base64Image);

    pendingRequestContainer.insertAdjacentHTML(
      "beforeend",
      `<div class="pendingRequest">
                  <div class="pendingImgContainer">
                    <img
                      src="data:image/jpeg;base64,${base64Image}"
                      alt="Maintenance Request Image"
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
};*/

var load_data = function(){
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  client_RoomID = id;

  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };

  fetch("http://localhost:3000/api/read/request/"+id, requestOptions)
    .then((response) => response.json())
    .then((result) => {

      for(let test of result){
        let fullDate = new Date(test.R_date);
        if (test.Status === "done") {
      successRequestContainer.insertAdjacentHTML(
        "beforeend",
        `<div class="successRequest hideRequest"onclick="window.location.href='User_maintenanceSent.html?id=${test.PID}'">
                  <div class="successImgContainer">
                    <img
                      src="../NodeJsAndMySql/uploads/${test.IMG}"
                      alt="Broken Ceiling Lamp"
                      class="requestImg"
                    />
                  </div>
                  <div class="successDescriptionContainer">
                    <p class="successTopic">Topic : <span>${
                      test.Topic
                    }</span></p>
                    <p class="successDescription">
                      Description : <span>${
                        test.Description
                      }</span>
                    </p>
                    <p class="successDate">
                      Date : <span>${test.R_date.slice(
                        0,
                        10
                      )} ${fullDate.toLocaleTimeString()}</span>
                    </p>
                  </div>
                </div>`
      );
    } else if(test.Status === "do"){
      pendingRequestContainer.insertAdjacentHTML(
        "beforeend",
        `<div class="pendingRequest" onclick="window.location.href='User_maintenanceSent.html?id=${test.requestID}'">
          <div class="pendingImgContainer">
            <img
              src="../NodeJsAndMySql/uploads/${test.IMG}"
              alt="Maintenance Request Image"
              class="requestImg"
            />
          </div>
          <div class="pendingDescriptionContainer">
            <p class="pendingTopic">Topic : <span>${
              test.Topic
            }</span></p>
            <p class="pendingDescription">
              Description : <span>${test.Description}</span>
            </p>
            <p class="pendingDate">
              Date : <span>${test.R_date.slice(
                0,
                10
              )} ${fullDate.toLocaleTimeString()}</span>
            </p>
          </div>
        </div>`
      );
    }
      }
    })
    .catch((error) => console.error(error));

}
var logout = function(){
  if(confirm('ต้องการจะออกจากระบบใช่ไหม')){
      window.location.href = '../html/login.html';
  }else{
      console.log('ยกเลิกการlogoutเรียบร้อยแล้ว');
  }
}
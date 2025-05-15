var client_RoomID;
var bar = document.querySelector('.sideBarLinksContainer');
var unreceived_btn = function(){
      window.location.href=`../html/User_Parcel.html?id=${client_RoomID}`
}

var received_btn = function(){
      window.location.href=`../html/User_accepted_parcel.html?id=${client_RoomID}`
}

document.addEventListener("DOMContentLoaded", () => {
  const roomID = window.location.search.substring(1); // ดึง '0003' จาก '?0003'
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  client_RoomID = id;
  document.querySelector('.parcelRoomID').innerHTML = client_RoomID;

  fetch(`http://localhost:3000/api/read/parcel/${id}/received`)
    .then(res => res.json())
    .then(data => {
      const list = document.querySelector(".parcelList");
      list.innerHTML = '';
      bar.innerHTML = `
                <li>
                <img src="../img/Home.png" alt=""><a href='home-client.html?id=${data[0].RoomID}'>หน้าหลัก</a>
                </li>
                <li><img src="../img/Tall Person_white.png" alt=""><a href="U_User_Info.html?id=${data[0].RoomID}">ข้อมูลลูกบ้าน</a></li>
                <li>
                    <img src="../img/Folder.png" alt=""><a href="User_bill_history.html?id=${data[0].RoomID}">ประวัติบิลลูกบ้าน</a>
                </li>
                <li>
                    <img src="../img/Bill.png" alt=""hei><a href="U_User_Billing_Form.html?id=${data[0].RoomID}">บิลค่าใช้จ่าย</a>
                </li>
                <li>
                    <img src="../img/Cardboard Box.png" alt=""><a href="User_Parcel.html?id=${data[0].RoomID}">พัสดุ</a>
                </li>
                <li><img src="../img/Wallet_White.png" alt=""><a href="U_insert_slip.html?id=${data[0].RoomID}">ชำระค่าเช่า</a></li>
                <li>
                    <img src="../img/Maintenance.png" alt=""><a href="user_maintenanceStatus.html?id=${data[0].RoomID}">แจ้งซ่อม</a>
                </li>
                <li>
                    <img src="../img/Contact.png" alt=""><a href="#">ติดต่อเรา</a>
                </li>
            `

      data.forEach(p => {
        const parcelDate = new Date(p.ParcelDate);
        const dateStr = parcelDate.toLocaleDateString("th-TH");
        const timeStr = parcelDate.toLocaleTimeString("th-TH", {
          hour: "2-digit", minute: "2-digit"
        });

        const card = document.createElement("div");
        card.className = "parcelItem";

        card.innerHTML = `
          <a href="U_Parcel_information.html?pid=${p.PID}" class="parcelLink">
            <img src="/uploads/${p.IMG || 'placeholder.jpg'}" class="parcelImage" alt="Parcel Image" />
            <div class="parcelDetail">
              <div><strong>${p.RoomID}</strong></div>
              <div>${dateStr} ${timeStr}</div>
              <div>สถานะ: ได้รับแล้ว</div>
            </div>
          </a>
        `;

        list.appendChild(card);
      });
    })
    .catch(err => console.error("โหลดข้อมูลผิดพลาด:", err));
});

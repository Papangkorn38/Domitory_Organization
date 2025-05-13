var client_RoomID;
var unreceived_btn = function(){
      window.location.href=`../html/User_Parcel.html?id=${client_RoomID}`
}

var received_btn = function(){
      window.location.href=`../html/User_accepted_parcel.html?id=${client_RoomID}`
}

document.addEventListener("DOMContentLoaded", () => {
<<<<<<< HEAD
  const roomID = window.location.search.substring(1); 
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  client_RoomID = id;

  fetch(`http://localhost:3000/api/read/parcel/${id}/unreceived`)
    .then(res => res.json())
    .then(data => {
=======
  const roomID = window.location.search.substring(1);

  fetch(`http://localhost:3000/api/read/parcel/${roomID}/unreceived`)
    .then((res) => res.json())
    .then((data) => {
>>>>>>> fb23cdeb589c198d56148e4516d2fda342438a92
      const list = document.querySelector(".parcelList");
      list.innerHTML = "";

      data.forEach((p) => {
        const parcelDate = new Date(p.ParcelDate);
        const dateStr = parcelDate.toLocaleDateString("th-TH");
        const timeStr = parcelDate.toLocaleTimeString("th-TH", {
          hour: "2-digit",
          minute: "2-digit",
        });

        const card = document.createElement("div");
        card.className = "parcelItem";

        card.innerHTML = `
          <a href="U_Parcel_information.html?pid=${p.PID}" class="parcelLink">
            <img src="../NodeJsAndMySql/uploads/${
              p.IMG || "placeholder.jpg"
            }" class="parcelImage" alt="Parcel Image" />
            <div class="parcelDetail">
              <div><strong>${p.RoomID}</strong></div>
              <div>${dateStr} ${timeStr}</div>
              <div>สถานะ: ยังไม่ได้รับ</div>
            </div>
          </a>
        `;

        list.appendChild(card);
      });
    })
    .catch((err) => console.error("โหลดข้อมูลพัสดุยังไม่รับล้มเหลว:", err));
});

document.addEventListener("DOMContentLoaded", () => {
  const roomID = window.location.search.substring(1); // ดึง '0003' จาก '?0003'

  fetch(`http://localhost:3000/api/read/parcel/${roomID}/received`)
    .then(res => res.json())
    .then(data => {
      const list = document.querySelector(".parcelList");
      list.innerHTML = '';

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

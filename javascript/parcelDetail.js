document.addEventListener("DOMContentLoaded", () => {
  const pid = new URLSearchParams(window.location.search).get("pid");

  if (pid) {
    fetch(`http://localhost:3000/api/read/parcelByPID/${pid}`)
      .then(res => res.json())
      .then(data => {
        console.log(data.PID)
        document.querySelector(".user-id-box").innerText = data.RoomID || "-";
        document.querySelector(".box").value = data.RoomID || "-";

        const d = new Date(data.ParcelDate);
        const dateStr = d.toLocaleDateString("th-TH");
        const timeStr = d.toLocaleTimeString("th-TH", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        });

        const parcelBoxes = document.querySelectorAll(".parcel-box");
        if (parcelBoxes.length >= 2) {
          parcelBoxes[0].value = dateStr;
          parcelBoxes[1].value = timeStr;
        }

        document.querySelector(".upload-box").innerHTML = `
          <img src="../NodeJsAndMySql/uploads/${data.IMG}" class="parcelImage" alt="Parcel Image" />
        `;

        const btn = document.querySelector(".receive_parcel");

        if (data.Status === "received") {
          if (btn) btn.style.display = "none";
        } else if (btn) {
          btn.addEventListener("click", () => {
            fetch(`http://localhost:3000/api/update/parcel/${data.PID}`, {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ Status: "received" }),
            })
              .then((res) => res.json())
              .then(() => {
                alert("รับพัสดุเรียบร้อยแล้ว");
                window.location.href = `User_accepted_parcel.html?id=${data.RoomID}`;
              })
              .catch((err) => {
                console.error("รับพัสดุไม่สำเร็จ", err);
              });
          });
        }
      })
      .catch((err) => console.error("โหลดข้อมูลพัสดุล้มเหลว", err));
  }
});

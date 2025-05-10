fetch('http://localhost:3000/api/read/parcel')  // หรือ /api/read/parcel/A0002 หากต้องการเฉพาะห้อง
.then(response => response.json())
.then(data => {
  const parcelList = document.querySelector('.parcelList');
  parcelList.innerHTML = ''; // ล้างข้อมูลเดิม (ที่เขียนไว้ใน HTML)

  data.forEach(parcel => {
    const item = document.createElement('div');
    item.classList.add('parcelItem');

    item.innerHTML = `
      <img src="/uploads/${parcel.IMG}" alt="Parcel Image" class="parcelImage" />
      <div class="parcelDetail">
        <div><strong>${parcel.RoomID}</strong></div>
        <div>${parcel.Date ? parcel.Date : '-'}</div>
        <div>${parcel.Time ? parcel.Time : '-'}</div>
      </div>
    `;

    parcelList.appendChild(item);
  });
})
.catch(error => {
  console.error('เกิดข้อผิดพลาดในการโหลดข้อมูล:', error);
});
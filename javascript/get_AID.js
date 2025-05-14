const params = new URLSearchParams(window.location.search);

// ตรวจสอบว่า AID มีอยู่ใน localStorage หรือยัง
if (!localStorage.getItem('AID')) {
  const aidFromURL = params.get('id');
  if (aidFromURL) {
    localStorage.setItem('AID', aidFromURL);
    console.log('AID บันทึกไว้แล้ว:', aidFromURL);
  } else {
    console.warn('ไม่พบ AID ใน URL');
  }
} else {
  console.log('โหลด AID จาก localStorage แล้ว:', localStorage.getItem('AID'));
}

// กำหนดให้ window.AdminID ใช้งานได้ใน global scope
window.AdminID = localStorage.getItem('AID');

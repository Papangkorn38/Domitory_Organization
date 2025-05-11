// billing_form.js
// ดึงค่า previousReading จากตัวแปรภายใน JS แทน fetch
// แก้แค่ JS เท่านั้น ไม่แตะ HTML หรือ Server

document.addEventListener('DOMContentLoaded', () => {
  // 1. แผนที่เลขห้อง → ค่าเลขมิตเตอร์ครั้งก่อน (ค่าน้ำ/ค่าไฟ)
  //    ให้เติมห้องอื่น ๆ เข้าไปตามจริง
  const previousReadings = {
    'A0001': { 'ค่าน้ำ': 5,  'ค่าไฟ': 55  },
    'A0002': { 'ค่าน้ำ': 6,  'ค่าไฟ': 60  },
    'A0003': { 'ค่าน้ำ': 7,  'ค่าไฟ': 65  },
    // … เพิ่มตามจำนวนห้องที่มี
  };

  // 2. อ้างอิง DOM elements
  const roomInput       = document.querySelector('input.box');
  const cycleSelect     = document.querySelector('select.billing-cycle');
  const billingItems    = document.querySelectorAll('.billingItem');
  const totalBillingInp = document.querySelector('input.totalBillingInput');
  const saveBtn         = document.getElementById('save-btn');

  // เปิดใช้งานปุ่มบันทึก
  saveBtn.type     = 'button';
  saveBtn.disabled = false;

  // 3. ฟังก์ชันคำนวณยอดรวมทั้งสิ้น
  function updateGrandTotal() {
    let sum = 0;
    billingItems.forEach(item => {
      const t = parseFloat(item.querySelector('input.totalInput').value) || 0;
      sum += t;
    });
    totalBillingInp.value = sum;
  }

  // 4. ฟังก์ชันคำนวณข้อมูลแต่ละบิล (units, total)
  function recalcItem(item) {
    const currInput = item.querySelector('input.current-unitInput');
    const unitsIn   = item.querySelectorAll('input.current-unitInput')[1];
    const price     = parseFloat(item.querySelector('input.pricePerUnit').value) || 0;
    const totalIn   = item.querySelector('input.totalInput');

    const curr = parseFloat(currInput.value) || 0;
    unitsIn.value = curr;            // หน่วยที่ใช้ = ค่ามิตเตอร์ปัจจุบัน
    totalIn.value = curr * price;    // รวม = หน่วย * ราคา
    updateGrandTotal();
  }

  // 5. โหลดค่า previousReading จาก previousReadings ตามเลขห้อง + รอบบิล
  function loadPrevious() {
    const room = roomInput.value.trim();
    const data = previousReadings[room] || { 'ค่าน้ำ': 0, 'ค่าไฟ': 0 };

    billingItems.forEach(item => {
      const utilType = item.querySelector('label').textContent.trim();       // "ค่าน้ำ" หรือ "ค่าไฟ"
      const prevIn   = item.querySelector('input.unitInput');               // ช่องเลขครั้งก่อน
      prevIn.value   = data[utilType] || 0;
      recalcItem(item);
    });
  }

  // 6. bind event
  //    - เมื่อเปลี่ยนเลขห้องหรือรอบบิล → โหลด previous + recalc ใหม่
  //    - เมื่อแก้เลขมิตเตอร์ปัจจุบัน → recalc เฉพาะบิลนั้น
  roomInput     .addEventListener('change', loadPrevious);
  cycleSelect   .addEventListener('change', loadPrevious);
  billingItems.forEach(item => {
    // ป้องกันแก้หน่วยที่ใช้
    item.querySelectorAll('input.current-unitInput')[1].readOnly = true;
    // ถ้ามิตเตอร์ปัจจุบันเปลี่ยน ให้คำนวณใหม่
    item.querySelector('input.current-unitInput')
        .addEventListener('input', () => recalcItem(item));
  });

  // 7. โหลดครั้งแรก
  loadPrevious();

  // 8. เมื่อบันทึก → เก็บค่าปัจจุบันไว้ใน mapping → โหลด previous ใหม่
  saveBtn.addEventListener('click', () => {
    const room = roomInput.value.trim();
    if (!previousReadings[room]) {
      previousReadings[room] = { 'ค่าน้ำ': 0, 'ค่าไฟ': 0 };
    }
    billingItems.forEach(item => {
      const utilType = item.querySelector('label').textContent.trim();
      const curr     = parseFloat(item.querySelector('input.current-unitInput').value) || 0;
      previousReadings[room][utilType] = curr;
    });
    loadPrevious();
    alert('บันทึกสำเร็จ 🎉');
  });
});

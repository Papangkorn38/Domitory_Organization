document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const roomID = id; // หรือใช้ดึงจาก URL เช่น ?room=4051
    
  
    fetch(`http://localhost:3000/api/read/bill/${roomID}`)
      .then(response => response.json())
      .then(data => {
        if (data.length === 0) {
          alert("ไม่พบข้อมูลบิลในระบบ");
          return;
        }
  
        const bill = data[data.length-1];
  
        // ใส่ค่าจากฐานข้อมูลลงในช่อง input
        document.querySelector('.user-id-display').textContent = bill.RoomID;
        document.querySelector('.user-id-input').value = bill.RoomID;
        document.querySelector('.rent-box').value = bill.RoomCharge;
        document.querySelector('.totalBillingInput').value = bill.TotalCharge;
        document.getElementById('total_W').value = bill.WaterBill;
        document.getElementById('total_E').value = bill.ElectricBill;
        //ไว้เช็ครอบบิล
        // วันออกบิล
        const billDateObj = new Date(bill.BillDate);
        const billDate = billDateObj.toLocaleDateString("th-TH");
        document.querySelector('.date-box').value = billDate;
  
        // รอบบิล (แสดงตามวันออกบิล)
        const thaiMonths = [
          "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
          "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
        ];
        const month = thaiMonths[billDateObj.getMonth()];
        const yearBE = billDateObj.getFullYear() + 543;
        const billingCycle = `-- ${month} ${yearBE} --`;
  
        const billingCycleSelect = document.querySelector('.billing-cycle-box');
        for (let i = 0; i < billingCycleSelect.options.length; i++) {
          if (billingCycleSelect.options[i].text.trim() === billingCycle) {
            billingCycleSelect.selectedIndex = i;
            break;
          }
        }
        //จบตรงนี้
        // ค่าน้ำ
        document.querySelector('.water-current-box').value = bill.WaterCurrent;
        document.querySelector('.water-previous-box').value = bill.WaterPrevious;
        document.querySelector('.water-used-box').value = bill.WaterUsed;
        document.querySelector('.water-price-box').value = bill.WaterPrice;
  
        // ค่าไฟ
        document.querySelector('.electric-current-box').value = bill.ElectricCurrent;
        document.querySelector('.electric-previous-box').value = bill.ElectricPrevious;
        document.querySelector('.electric-used-box').value = bill.ElectricUsed;
        document.querySelector('.electric-price-box').value = bill.ElectricPriced;
  
      })
      .catch(error => {
        console.error("โหลดข้อมูลบิลล้มเหลว:", error);
      });
  });
  
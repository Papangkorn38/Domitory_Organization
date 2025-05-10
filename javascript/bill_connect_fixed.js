const sideBar = document.querySelector(".sideBar");
const closeBtn = document.querySelector(".closeBtn");
const menuBtn = document.querySelector(".menuBtn");
const logoutBtn = document.querySelector(".logoutBtn");
const sideBarIcons = document.querySelectorAll(".sideBarLinksContainer li");

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

  sideBarIcons.forEach(function (element) {
    element.addEventListener("mouseover", function () {
      toggleSidebar(false);
    });
  });
};

openCloseSidebar();

function updateItemsPerPage() {
    const allRows = document.querySelectorAll('table tbody tr');
    
    const validRows = Array.from(allRows).filter(row => {
        const cells = row.querySelectorAll('td');
        
        return !Array.from(cells).some(cell => {
            const text = cell.textContent.trim();
            return text === 'ไม่พบข้อมูลบิลสำหรับห้องนี้' || 
                   text.includes('ไม่พบข้อมูล');
        });
    });
    
    const tableRows = validRows.length;
    const itemsPerPageSelect = document.getElementById('itemsPerPage');
    
    itemsPerPageSelect.innerHTML = '';
    
    if (tableRows === 0) {
        const option = document.createElement('option');
        option.value = 0;
        option.textContent = '0';
        itemsPerPageSelect.appendChild(option);
    } else {
        // ถ้ามีแถว ให้แสดงตัวเลือก 1 ถึงจำนวนแถวที่มี
        for (let i = 1; i <= tableRows; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = i;
            itemsPerPageSelect.appendChild(option);
        }
    }
    
    itemsPerPageSelect.value = tableRows;
}

document.addEventListener('DOMContentLoaded', updateItemsPerPage);
const tableBody = document.querySelector('table tbody');
if (tableBody) {
    const observer = new MutationObserver(updateItemsPerPage);
    observer.observe(tableBody, { childList: true });
}

// กำหนด URL base สำหรับ API
const API_BASE_URL = 'http://localhost:3000/api';

// ฟังก์ชันสำหรับแปลงรูปแบบวันที่
function formatDate(dateString) {
  if (!dateString) return '-';

  const date = new Date(dateString);
  return date.toLocaleDateString('th-TH', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
}

// ฟังก์ชันสำหรับเพิ่มบิลใหม่
async function addNewBill(billData) {
  try {
    const response = await fetch(`${API_BASE_URL}/insert/bill`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(billData)
    });

    if (!response.ok) {
      throw new Error('Failed to add new bill');
    }

    return await response.json();
  } catch (error) {
    console.error('Error adding new bill:', error);
    throw error;
  }
}

// ฟังก์ชันสำหรับดึงข้อมูลบิลตามห้อง
async function fetchRoomBills(roomId) {
  try {
    console.log("เรียกข้อมูลบิลสำหรับห้อง:", roomId);

    // ถ้ามี A นำหน้า ให้ตัดออก
    const roomNumber = roomId.startsWith('A') ? roomId.substring(1) : roomId;
    console.log("หลังจากตัด A ออก (ถ้ามี):", roomNumber);

    // เรียกข้อมูลบิลของห้องนี้
    const response = await fetch(`${API_BASE_URL}/read/bill/${roomNumber}`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log("API Response:", response);

    if (!response.ok) {
      console.error("API Error:", response.status);
      throw new Error(`Failed to fetch bills: ${response.status}`);
    }

    const data = await response.json();
    console.log("ข้อมูลที่ได้รับจาก API:", data);
    return data;
  } catch (error) {
    console.error(`Error fetching bills for room ${roomId}:`, error);

    // ถ้าเกิด CORS error หรือไม่สามารถเชื่อมต่อกับ API ได้ ให้ใช้ข้อมูลตัวอย่าง
    console.log("ใช้ข้อมูลตัวอย่างแทน");

    // ข้อมูลตัวอย่างสำหรับห้องต่างๆ
    const sampleData = {
    };

    const cleanRoomId = roomId.startsWith('A') ? roomId.substring(1) : roomId;

    // ถ้ามีข้อมูลตัวอย่างสำหรับห้องนี้ ให้ใช้ข้อมูลนั้น ถ้าไม่มีให้ใช้ข้อมูลของห้อง 101
    return sampleData[cleanRoomId] || sampleData['101'];
  }
}

// ตรวจสอบว่าอยู่ที่หน้าไหน
const currentUrl = window.location.href;
const isBillPage = currentUrl.includes('Admin_bill.html');
const isBillInfoPage = currentUrl.includes('Admin_bill_info.html');

console.log("Current URL:", currentUrl);
console.log("Is Bill Page:", isBillPage);
console.log("Is Bill Info Page:", isBillInfoPage);

// ฟังก์ชันสำหรับดึงข้อมูลลูกค้าทั้งหมด
async function fetchAllClients() {
  try {
    console.log("กำลังดึงข้อมูลลูกค้าทั้งหมด");

    // เรียกข้อมูลลูกค้าทั้งหมด
    const response = await fetch(`${API_BASE_URL}/read/client`, {
      method: 'GET',
      mode: 'cors', // no-cors, *cors, same-origin
      headers: {
        'Content-Type': 'application/json',
        // 'Access-Control-Allow-Origin': '*'
      }
    });
    console.log("API Response:", response);

    if (!response.ok) {
      console.error("API Error:", response.status);
      throw new Error(`Failed to fetch clients: ${response.status}`);
    }

    const data = await response.json();
    console.log("ข้อมูลลูกค้าที่ได้รับจาก API:", data);
    return data;
  } catch (error) {
    console.error(`Error fetching clients:`, error);

    // ถ้าเกิด CORS error หรือไม่สามารถเชื่อมต่อกับ API ได้ ให้ใช้ข้อมูลตัวอย่าง
    console.log("ใช้ข้อมูลตัวอย่างแทน");
    return [];
  }
}

// ถ้าอยู่ที่หน้ารายการบิล
if (isBillPage) {
  // ดึงข้อมูลลูกค้าและแสดงในตาราง
  document.addEventListener('DOMContentLoaded', function() {
    console.log("อยู่ที่หน้ารายการบิล - DOM Loaded");

    // ดึงข้อมูลลูกค้าทั้งหมด
    fetchAllClients().then(clients => {
      console.log("ได้รับข้อมูลลูกค้าแล้ว:", clients);

      const billTableBody = document.querySelector('.billTable tbody');
      if (billTableBody) {
        console.log("พบตารางบิล");

        // ล้างข้อมูลเดิม
        billTableBody.innerHTML = '';

        // ถ้าไม่มีข้อมูลลูกค้า
        if (!clients || clients.length === 0) {
          console.log("ไม่พบข้อมูลลูกค้า");
          const emptyRow = document.createElement('tr');
          emptyRow.innerHTML = `
            <td colspan="2" style="text-align: center;">ไม่พบข้อมูลลูกค้า</td>
          `;
          billTableBody.appendChild(emptyRow);
          return;
        }

        console.log("พบข้อมูลลูกค้า:", clients.length, "รายการ");

        // เพิ่มข้อมูลลูกค้าเข้าไปในตาราง
        clients.forEach(client => {
          console.log("กำลังเพิ่มลูกค้า:", client);

          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${client.RoomID}</td>
            <td>${client.Fname} ${client.Lname}</td>
          `;

          // ทำให้แถวคลิกได้
          row.style.cursor = 'pointer';

          // เพิ่ม event listener สำหรับการคลิกแถว
          row.addEventListener('click', function() {
            const roomNumber = client.RoomID;
            console.log('Clicked on room:', roomNumber);
            window.location.href = `Admin_bill_info.html?room=${roomNumber}`;
          });

          billTableBody.appendChild(row);
        });
      } else {
        console.log("ไม่พบตารางบิล (.billTable tbody)");
      }
    }).catch(error => {
      console.error(`Error loading clients:`, error);

      const billTableBody = document.querySelector('.billTable tbody');
      if (billTableBody) {
        billTableBody.innerHTML = `
          <tr>
            <td colspan="2" style="text-align: center; color: red;">
              เกิดข้อผิดพลาดในการโหลดข้อมูล: ${error.message}
            </td>
          </tr>
        `;
      }
    });
  });
}

// ถ้าอยู่ที่หน้าข้อมูลบิล
if (isBillInfoPage) {
  console.log("อยู่ที่หน้าข้อมูลบิล");

  // ดึงค่า room_id จาก URL
  const urlParams = new URLSearchParams(window.location.search);
  const roomId = urlParams.get('room') || '101'; // ถ้าไม่มี room ใน URL ให้ใช้ 101 เป็นค่าเริ่มต้น

  console.log("Room ID จาก URL:", roomId);

  if (roomId) {
    console.log('Displaying information for room:', roomId);

    // อัพเดทเลขห้องที่แสดง
    const profileRoom = document.querySelector('.profileRoom');
    if (profileRoom) {
      profileRoom.textContent = roomId;
      console.log("อัพเดทเลขห้องแล้ว");
    } else {
      console.log("ไม่พบ element .profileRoom");
    }

    // ดึงข้อมูลบิลของห้อง
    document.addEventListener('DOMContentLoaded', function() {
      fetchRoomBills(roomId).then(bills => {
        console.log("ได้รับข้อมูลบิลแล้ว:", bills);

        const billTableBody = document.querySelector('.bill-table tbody');
        if (billTableBody) {
          console.log("พบตารางบิล");

          // ล้างข้อมูลเดิม
          billTableBody.innerHTML = '';

          // ถ้าไม่มีข้อมูลบิล
          if (!bills || bills.length === 0) {
            console.log("ไม่พบข้อมูลบิล");
            const emptyRow = document.createElement('tr');
            emptyRow.innerHTML = `
              <td colspan="8" style="text-align: center;">ไม่พบข้อมูลบิลสำหรับห้องนี้</td>
            `;
            billTableBody.appendChild(emptyRow);
            return;
          }

          console.log("พบข้อมูลบิล:", bills.length, "รายการ");

          // เพิ่มข้อมูลบิลเข้าไปในตาราง
          bills.forEach(bill => {
            console.log("กำลังเพิ่มบิล:", bill);

            const row = document.createElement('tr');
            row.innerHTML = `
              <td>${bill.RoomID || roomId}</td>
              <td>${formatDate(bill.BillDate)}</td>
              <td>${bill.RoomCharge || 0}</td>
              <td>${bill.WaterBill || 0}</td>
              <td>${bill.ElecticBill || 0}</td>
              <td>${bill.TotalCharge || 0}</td>
              <td>${bill.Status || 'รอชำระ'}</td>
              <td>${formatDate(bill.BillDate)}</td>
            `;
            billTableBody.appendChild(row);
          });
        } else {
          console.log("ไม่พบตารางบิล (.bill-table tbody)");
        }
      }).catch(error => {
        console.error(`Error loading bills for room ${roomId}:`, error);
      });
    });
  }

  // เพิ่ม event listener สำหรับปุ่มย้อนกลับ
  document.addEventListener('DOMContentLoaded', function() {
    const backButton = document.querySelector('.back-link');
    if (backButton) {
      backButton.addEventListener('click', function(e) {
        e.preventDefault();
        window.location.href = 'Admin_bill.html';
      });
    }
  });
}

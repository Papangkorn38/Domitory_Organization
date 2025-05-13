var read_user_by_id = function(){
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const requestOptions = {
        method: "GET",
        redirect: "follow"
      };
    //เขื่อมด้วย ID
    var userRoomID = document.getElementById('user_RoomID');
    var userStatus = document.getElementById('user_Status');
    var userFname = document.getElementById('user_Fname');
    var userLname = document.getElementById('user_Lname');
    var userCitizenID = document.getElementById('user_CitizenID');
    var userBirthDate = document.getElementById('user_BirthDate');
    var userAge = document.getElementById('user_age');
    var userCemail = document.getElementById('user_Cemail');
    var userPhone = document.getElementById('user_Phone');
    var userAddress = document.getElementById('user_Address');
    var button = document.getElementById('id_button');
      
      fetch("http://localhost:3000/api/read/client/"+id, requestOptions)
        .then((response) => response.json())
        .then((result) => {

            //แปลง status เป็นภาษาไทย
            var status;
            if(result[0].Status == 'Unoccupied'){
                status = 'ยังไม่มีห้องพัก';
            }else if(result[0].Status == 'Unpaid'){
                status = 'ยังไม่ชำระ';
            }else if(result[0].Status == 'Paid'){
                status = 'ชำระแล้ว';
            }else{
                status = 'error';
            }

            //แปลงวันที่
            const dateObj = new Date(result[0].BirthDate);
            const day = String(dateObj.getDate()).padStart(2, '0');
            const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // เดือนเริ่มที่ 0
            const year = dateObj.getFullYear();
            const formattedDate = `${day}/${month}/${year}`;

            //แทนที่ข้อมูล
            userRoomID.innerHTML = result[0].RoomID;
            userStatus.value = status;
            userFname.value = result[0].Fname;
            userLname.value = result[0].Lname;
            userCitizenID.value = result[0].CitizenID;
            userBirthDate.value = formattedDate;
            userAge.value = result[0].age;
            userCemail.value = result[0].Cemail;
            userPhone.value = result[0].PhoneNum;
            userAddress.value = result[0].Address;

            button.innerHTML = `
            <button class="update" onclick="window.location.href='../html/A_UserInfoEdit.html?id=`+result[0].RoomID+`'">แก้ไข</button>
            <button class="delete" onclick="user_delete('${id}')">ลบ</button>
            `;
        })
        .catch((error) => console.error(error));
}
var user_delete = function(id){
    if(confirm('คุณต้องการจะลบข้อมูลลูกบ้านท่านนี้ใช่ไหม')){
        
        const requestOptions = {
            method: "DELETE",
            redirect: "follow"
          };
      
      fetch("http://localhost:3000/api/delete/client/"+id, requestOptions)
        .then((response) => response.text())
        .then((result) => {
            console.log('ลบข้อมูลเรียบร้อยแล้ว');
            window.location.href='roomStatus.html';
            user_update_status(id);

        })
        .catch((error) => console.error(error));
    }else{
        console.log('ยกเลิกการลบข้อมูลเรียบร้อยแล้ว');
    }
}

var user_update_status = function(id){
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
    "RoomID": id,
    "Status": "Unoccupied"
    });

    const requestOptions = {
    method: "PATCH",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
    };

    fetch("http://localhost:3000/api/update/room/"+id, requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}

var clientID;
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
    var roomIDEdit = document.getElementById('user_RoomID_edit');
    var username = document.getElementById('user_Username');
      
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
            clientID = result[0].CID;
            roomIDEdit.value = result[0].RoomID;
            username.value = result[0].Password;

            button.innerHTML = `
            <button class="update" onclick="user_update_client()">ยืนยัน</button>
            `;
        })
        .catch((error) => console.error(error));
}
var user_update_client = function(){
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    const raw = JSON.stringify({
      "CID":clientID,
      "Fname": document.getElementById('user_Fname').value,
      "Lname": document.getElementById('user_Lname').value,
      "Username": document.getElementById('user_Username').value,
      "Password": document.getElementById('user_Password').value,
      "Cemail": document.getElementById('user_Cemail').value,
      "Address": document.getElementById('user_Address').value,
      "BirthDate": document.getElementById('user_BirthDate').value,
      "CitizenID": document.getElementById('user_CitizenID').value,
      "PhoneNum": document.getElementById('user_Phone').value,
      "RoomID": document.getElementById('user_RoomID_edit').value
    });
    
    const requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };
    
    fetch("http://localhost:3000/api/update/client/"+id, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log('แก้ไขข้อมูลเรียบร้อยแล้ว');
        //window.location.href = 'roomStatus.html'
        }
    )
      .catch((error) => console.error(error));    
}

var userRoomID = document.getElementById('user_RoomID');
var userCID = document.getElementById('user_CID');
var userUsername = document.getElementById('user_Username');
var userPassword = document.getElementById('user_Password');
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

var insert_user = function(){
    
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
    "CID": userCID.value,
    "Fname": userFname.value,
    "Lname": userLname.value,
    "Username": userUsername.value,
    "Password": userPassword.value,
    "Cemail": userCemail.value,
    "Address": userAddress.value,
    "BirthDate": userBirthDate.value,
    "CitizenID": userCitizenID.value,
    "PhoneNum": userPhone.value,
    "RoomID": userRoomID.value
    });

    const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
    };

    fetch("http://localhost:3000/api/insert/client", requestOptions)
    .then((response) => response.json())
    .then((result) => {
        if(result.status == 'ok'){
            alert('บันทึกข้อมูลสำเร็จ');
            window.location.href='roomStatus.html';
            update_room(userRoomID.value);
        }else{
            alert('error');
        }
    })
    .catch((error) => console.error(error));

}

var update_room = function(id){

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
    "RoomID": id,
    "Status": "Unpaid"
    });

    const requestOptions = {
    method: "PATCH",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
    };

    fetch("http://localhost:3000/api/update/room/"+id, requestOptions)
    .then((response) => response.text())
    .then((result) => {console.log(result)})
    .catch((error) => console.error(error));

}


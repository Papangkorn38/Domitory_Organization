var client_RoomID ;
var client_Status;
var client_info = function(){
    window.location.href=`../html/U_User_Info.html?id=${client_RoomID}`;
}
var client_parcel = function(){
    window.location.href=`../html/User_Parcel.html?id=${client_RoomID}`;
}
var client_payment = function(){
    if(client_Status=='Paid'){
        alert('คุณได้ชำระค่าเช่าไปเรียบร้อยแล้ว');
    }else{
        window.location.href=`../html/U_insert_slip.html?id=${client_RoomID}`
    }
}
var client_bill = function(){
    window.location.href=`../html/U_User_Billing_Form.html?id=${client_RoomID}`
}
var client_maintenance = function(){
    window.location.href=`../html/user_maintenanceStatus.html?id=${client_RoomID}`;
}
var client_billhistory = function(){
    window.location.href=`../html/User_bill_history.html?id=${client_RoomID}`
}


var load_user_id = function(){
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    var user_RoomID = document.getElementById('user_roomID');

    const requestOptions = {
    method: "GET",
    redirect: "follow"
    };

    fetch("http://localhost:3000/api/read/client/"+id, requestOptions)
    .then((response) => response.json())
    .then((result) => {
        user_RoomID.innerHTML = result[0].RoomID;
        client_RoomID = result[0].RoomID;
        client_Status = result[0].Status;
    })
    .catch((error) => console.error(error));

}
var logout = function(){
  if(confirm('ต้องการจะออกจากระบบใช่ไหม')){
      window.location.href = '../html/login.html';
  }else{
      console.log('ยกเลิกการlogoutเรียบร้อยแล้ว');
  }
}
var insert_bill = function(){
  var roomID = document.getElementById('insert_roomID');
  var rent = document.getElementById('rent');
  var currentUnitInputWater = document.getElementById('current_unitInput_water');
  var unitInputWater = document.getElementById('unitInput_water');
  var unitUsedWater = document.getElementById('unit_used_water');
  var unitCostWater = document.getElementById('unit_cost_water');
  var totalWater = document.getElementById('total_water');
  var currentUnitInputElectric = document.getElementById('current_unitInput_electric');
  var unitInputElectric = document.getElementById('unitInput_electric');
  var unitUsedElectric = document.getElementById('unit_used_electric');
  var unitCostElectric = document.getElementById('unit_cost_electric');
  var totalElectric = document.getElementById('total_electric');
  var billCycle = document.getElementById('billing_cycle');
  var totalRent = document.getElementById('total');
  var selectedText = billCycle.options[billCycle.selectedIndex].text;
  var cleanText = selectedText.replace(/--\s*|\s*--/g, '').trim();

  const requestOptions_read = {
    method: "GET",
    redirect: "follow"
  };

  fetch("http://localhost:3000/api/read/room/"+roomID.value, requestOptions_read)
    .then((response) => response.json())
    .then((result) => {
      var data = result[0];
      if(data.Status == 'Unoccupied'){
        alert('ห้องว่าง');
      }else{
        
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        "RoomID": roomID.value,
        "AID":window.AdminID,
        "RoomCharge": rent.value,
        "TotalCharge": totalRent.value,
        "WaterBill": totalWater.value,
        "ElectricBill": totalElectric.value,
        "BillingCycle": cleanText,
        "WaterCurrent": currentUnitInputWater.value,
        "WaterPrevious": unitInputWater.value,
        "WaterUsed": unitUsedWater.value,
        "WaterPrice": unitCostWater.value,
        "ElectricCurrent": currentUnitInputElectric.value,
        "ElectricPrevious": unitInputElectric.value,
        "ElectricUsed": unitUsedElectric.value,
        "ElectricPriced": unitCostElectric.value
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };

      fetch("http://localhost:3000/api/insert/bill", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if(result.msg == 'Data inserted successfully'){
            alert('บันทึกเสร็จสิ้น');
            update_room(roomID.value);
            window.location.href='roomStatus.html';
          }
        })
        .catch((error) => console.error(error));
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
  .then((result) => console.log(result))
  .catch((error) => console.error(error));

}

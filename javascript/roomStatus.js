var read_room = function(){
    const requestOptions = {
        method: "GET",
        redirect: "follow"
      };
      var readTotalRoom = document.getElementById('total_room');
      var readTotalAvalibleRoom = document.getElementById('total_Avalible_room');
      var readTotalUnpaidRoom = document.getElementById('total_Unpaid_room');
      var readTotalPaidRoom = document.getElementById('total_Paid_room');
      var test_container = document.getElementById('test');
      readTotalRoom.innerHTML = "Loading..";
      readTotalAvalibleRoom.innerHTML = "Loading..";
      readTotalUnpaidRoom.innerHTML = "Loading..";
      readTotalPaidRoom.innerHTML = "Loading..";
      fetch("http://localhost:3000/api/read/count/room", requestOptions)
        .then((response) => response.json())
        .then((result) => {
            readTotalRoom.innerHTML = result.summary.total;  
            readTotalAvalibleRoom.innerHTML = result.summary.do_count;
            readTotalUnpaidRoom.innerHTML = result.summary.doing_count;
            readTotalPaidRoom.innerHTML = result.summary.done_count;
            test_container.innerHTML = '';

            for(let test of result.data){
                var row = `
                  <div class="room_box_flex_box" id="room_${test.RoomID}">${test.RoomID}</div>
                `;
                test_container.insertAdjacentHTML("beforeend",row);
                var roomElement = document.getElementById(`room_${test.RoomID}`);

                // ตรวจสอบว่า Status ของห้องคือ "Paid" หรือไม่
                if (test.Status == 'Paid') {
                    roomElement.style.backgroundColor = 'green'; // เปลี่ยนสีพื้นหลัง
                }else if(test.Status == 'Unpaid'){
                    roomElement.style.backgroundColor = 'red';
                }else{
                    roomElement.style.backgroundColor = 'gray';
                }
              }
        })
        .catch((error) => console.error(error));
}
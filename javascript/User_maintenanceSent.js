var load_request = function(){
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  var client_roomID = document.getElementById('roomID');
  var client_status = document.getElementById('status');
  var client_topic = document.getElementById('topic');
  var client_description = document.getElementById('description');
  var client_img = document.querySelector('.image-wrapper');
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };

  fetch("http://localhost:3000/api/read/request/byID/"+id, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      var data = result[0];
      client_roomID.value = data.RoomID;
      client_status.value = data.Status;
      client_topic.value = data.Topic;
      client_description.value = data.Description;
      client_img.innerHTML = `
      <div class="image-wrapper">
                    <img src="../NodeJsAndMySql/uploads/${data.IMG}" alt="แจ้งซ่อม" />
      </div>
      `
    })
    .catch((error) => console.error(error));
}

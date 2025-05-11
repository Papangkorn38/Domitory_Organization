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
    })
    .catch((error) => console.error(error));

}
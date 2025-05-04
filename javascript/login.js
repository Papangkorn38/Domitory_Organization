var login = function(){
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    if(!username && !password){
        alert("กรุณากรอก username และ password");
        window.location.href = '../html/login.html';
    }

    if(!username && password){
        alert("กรุณากรอก username");
        window.location.href = '../html/login.html';
    }

    if(username && !password){
        alert("กรุณากรอก password");
        window.location.href = '../html/login.html';
    }

    const raw = JSON.stringify({
      "Username": username,
      "Password": password
    });
    
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };
    
    fetch("http://localhost:3000/api/login", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if(result.status == 'ok'){
            alert('เข้าสู่ระบบเรียบร้อย');
            if(result.role == 'client'){
                window.location.href = '#';
                console.log('ได้หน้าuserมาแล้วเอามาใส่ด้วยนะ');
            }else if(result.role == 'admin'){
                window.location.href = '../html/roomStatus.html';
            }else{
                alert('error');
            }
        }else if(result.status == 'error'){
            alert('password ไม่ถูกต้อง')
        }else{
            alert('ไม่เจอผู้ใช้งานในระบบ');
        }
      })
      .catch((error) => console.error(error));
}
//2ตัวนี้เป็น package ที่เราโหลดมาใช้จาก package-lock.json
const express = require('express'); //ดึง express มาใช้
const mysql = require('mysql2'); // ดึง mysql2 มาใช้
const cors = require('cors');// ดึง cors มาใช้
const multer  = require('multer') // ดึง multer มาใช้เพื่ออัพโหลดรูปภาพ
const bcrypt = require('bcrypt');
const path = require("path");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const filename = `${Date.now()}-${file.originalname}`;
    cb(null, filename);
  },
});
const upload = multer({
  storage,
});

const app = express(); //เรียก express ที่เราดึงมาใช้
const port = 3000; //กำหนด port ของserver

//เอาไว้เปิดพอร์ต 3000
app.use(express.static(path.join(__dirname, "../")));
app.get("/request", (req, res) => {
  res.sendFile(path.join(__dirname, "../html/request.html"));
});

app.use(cors());

//connect กับตัวdatabase ใน mysql
const connection = mysql.createConnection({
  host: "localhost", //กำหนดให้เป็น local host
  user: "root", //ชื่อที่เราตั้ง
  password: "root", //password ที่เราตั้งไว้
  database: "mydb", // ชื่อ schema ที่เราตั้งไว้
});

//ดักจับerrorระหว่าง connect ไปยัง database
connection.connect((error) => {
  //ถ้าเจอให้ขึ้นข้อความพร้อมบอกว่า error อะไร
  if (error) {
    console.error("Error to connect MySql ", error);
    return;
  }
  //ถ้าไม่มี error ก็ให้บอกว่าเชื่อมต่อสำเร็จ
  console.log("Connect to MySql successfully");
});

//เพิ่ม request เข้าสู่ระบบ
app.post("/request", upload.single("IMG"), (req, res) => {
  console.log("Request Object:", req); // ลอง Log Request ทั้งหมด
  if (!req.file) {
    console.log("no file upload");
    return res.status(400).send("No file uploaded");
  } else {
    const { RoomID, AID, Topic, Description } = req.body;
    // ดึงชื่อไฟล์จาก req.file.filename (หรือ req.file.path ตามการตั้งค่า multer)
    const uploadedFileName = req.file.filename;
    // หรือ const uploadedFilePath = req.file.path;

    const inserDATA =
      "INSERT INTO request(RoomID,AID,Topic,Description,IMG) VALUES(?,?,?,?,?)";
    // ใช้ uploadedFileName (หรือ uploadedFilePath) แทน req.body.IMG
    connection.query(
      inserDATA,
      [RoomID, AID, Topic, Description, uploadedFileName],
      (error, result) => {
        if (error) {
          console.error(error);
          res.status(500).send("Database error");
          return;
        }
        console.log("file uploaded");
        res.send("File uploaded successfully");
      }
    );
  }
});

//เพิ่มพัสดุเข้าสู่ระบบ
app.post("/upload", upload.single("IMG"), (req, res) => {
  console.log("Request Object:", req); // ลอง Log Request ทั้งหมด
  if (!req.file) {
    console.log("no file upload");
    return res.status(400).send("No file uploaded");
  } else {
    const { PID, CID, RoomID } = req.body;
    // ดึงชื่อไฟล์จาก req.file.filename (หรือ req.file.path ตามการตั้งค่า multer)
    const uploadedFileName = req.file.filename;
    // หรือ const uploadedFilePath = req.file.path;

    const inserDATA = "INSERT INTO parcel(PID,CID,RoomID,IMG) VALUES(?,?,?,?)";
    // ใช้ uploadedFileName (หรือ uploadedFilePath) แทน req.body.IMG
    connection.query(
      inserDATA,
      [PID, CID, RoomID, uploadedFileName],
      (error, result) => {
        if (error) {
          console.error(error);
          res.status(500).send("Database error");
          return;
        }
        console.log("file uploaded");
        res.send("File uploaded successfully");
      }
    );
  }
});

//เพิ่มพัสดุเข้าสู่ระบบ
app.post("/slip", upload.single("IMG"), (req, res) => {
  console.log("Request Object:", req); // ลอง Log Request ทั้งหมด
  if (!req.file) {
    console.log("no file upload");
    return res.status(400).send("No file uploaded");
  } else {
    const { RoomID } = req.body;
    // ดึงชื่อไฟล์จาก req.file.filename (หรือ req.file.path ตามการตั้งค่า multer)
    const uploadedFileName = req.file.filename;
    // หรือ const uploadedFilePath = req.file.path;

    const inserDATA = "INSERT INTO slip(RoomID,IMG) VALUES(?,?)";
    // ใช้ uploadedFileName (หรือ uploadedFilePath) แทน req.body.IMG
    connection.query(inserDATA, [RoomID, uploadedFileName], (error, result) => {
      if (error) {
        console.error(error);
        res.status(500).send("Database error");
        return;
      }
      console.log("file uploaded");
      res.send("File uploaded successfully");
    });
  }
});

app.use("/api", express.json());

//สร้าง API สำหรับเพิ่มข้อมูล
app.post("/api/insert/client", (req, res) => {
  //ตัวbodyที่เราจะเพิ่มเข้าไป สำคัญ*ชื่อและลำดับต้องเหมือนกับในdatabaseที่เราสร้างไว้ทุกตัวอักษรไม่งั้นมันจะerror และตัวที่เป็นforienge key ของตารางอื่นต้องตัวprimary keyหลักของตัวนั้นต้องมีค่าจริงอยู่ไม่งั้นมันจะerrorเพราะเราไม่assignค่าที่ไม่มีอยุ่จริง*
  const {
    CID,
    Fname,
    Lname,
    Username,
    Password,
    Cemail,
    Address,
    BirthDate,
    CitizenID,
    PhoneNum,
    RoomID,
  } = req.body;
  //ใส่คำสั่งsqlสำหรับเข้าไปจัดการdatabase
  const query =
    "INSERT INTO client(CID , Fname , Lname , Username , Password , Cemail , Address , BirthDate , CitizenID , PhoneNum , RoomID) VALUES(?,?,?,?,?,?,?,?,?,?,?)";
  //ตรวจสอบerror
  connection.query(
    query,
    [
      CID,
      Fname,
      Lname,
      Username,
      Password,
      Cemail,
      Address,
      BirthDate,
      CitizenID,
      PhoneNum,
      RoomID,
    ],
    (error, result) => {
      if (error) {
        console.error("Error to inserting data ", error);
        res.status(500).json({ error: "Internal server error" });
      }
      res.json({
        msg: "Data inserted successfully",
        insertedID: result.insertId,
      });
    }
  );
});

//แก้ไขข้อมุล client
app.patch("/api/update/client/:roomid", async (req, res) => {
  const roomID = req.params.roomid;
  const {
    CID,
    Fname,
    Lname,
    Username,
    Password,
    Cemail,
    Address,
    BirthDate,
    CitizenID,
    PhoneNum,
    RoomID,
  } = req.body;
  const query =
    "UPDATE client SET CID = ? ,Fname = ? , Lname = ?,Username = ?, Password = ?,Cemail = ?, Address = ?, BirthDate = ? ,CitizenID = ?, PhoneNum = ?, RoomID = ? WHERE RoomID = ?";
  try {
    connection.query(
      query,
      [
        CID,
        Fname,
        Lname,
        Username,
        Password,
        Cemail,
        Address,
        BirthDate,
        CitizenID,
        PhoneNum,
        RoomID,
        roomID,
      ],
      (error, results, fields) => {
        if (error) {
          console.log(error);
          return res.status(400).send();
        }
        res.status(200).json(results);
      }
    );
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
});

//ลบข้อมุล client
app.delete("/api/delete/client/:roomid", async (req, res) => {
  const roomID = req.params.roomid;
  const query = "DELETE FROM client WHERE RoomID = ?";
  try {
    connection.query(query, [roomID], (error, results, fields) => {
      if (error) {
        console.log(error);
        return res.status(400).send();
      }
      res.status(200).json(results);
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
});

//อันนี้insert ของroom ใช้คำสั่งเดียวกัน
app.post("/api/insert/room", (req, res) => {
  const { RoomID, Status } = req.body;
  const query = "INSERT INTO room(RoomID , Status) VALUES(?,?)";
  connection.query(query, [RoomID, Status], (error, result) => {
    if (error) {
      console.error("Error to inserting data ", error);
      res.status(500).json({ error: "Internal server error" });
    }
    res.json({
      msg: "Data inserted successfully",
      insertedID: result.insertId,
    });
  });
});

//แก้ไขข้อมูลห้องพัก
app.patch("/api/update/room/:roomid", async (req, res) => {
  const roomID = req.params.roomid;
  const { RoomID, Status } = req.body;
  const query = "UPDATE room SET RoomID = ?,Status = ? WHERE RoomID = ?";
  try {
    connection.query(
      query,
      [RoomID, Status, roomID],
      (error, results, fields) => {
        if (error) {
          console.log(error);
          return res.status(400).send();
        }
        res.status(200).json(results);
      }
    );
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
});

//ลบข้อมุล room
app.delete("/api/delete/room/:roomid", async (req, res) => {
  const roomID = req.params.roomid;
  const query = "DELETE FROM room WHERE RoomID = ?";
  try {
    connection.query(query, [roomID], (error, results, fields) => {
      if (error) {
        console.log(error);
        return res.status(400).send();
      }
      res.status(200).json(results);
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
});

//อ่านข้อมูล room ทั้งหมด
app.get("/api/read/room", async (req, res) => {
  try {
    connection.query("SELECT * FROM room", (error, results, fields) => {
      if (error) {
        console.log(error);
        return res.status(400).send();
      }
      res.status(200).json(results);
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
});

//อ่านข้อมูล room 1 คนดูจาก roomID
app.get("/api/read/room/:RoomID", async (req, res) => {
  const roomid = req.params.RoomID;
  try {
    connection.query(
      "SELECT * FROM room WHERE RoomID = ?",
      [roomid],
      (error, results, fields) => {
        if (error) {
          console.log(error);
          return res.status(400).send();
        }
        res.status(200).json(results);
      }
    );
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
});

// อ่านข้อมูล room พร้อม summary
app.get('/api/read/count/room', async (req, res) => {
    try {
        // ดึงข้อมูลทั้งหมด
        connection.query("SELECT * FROM room", (err1, roomResults) => {
            if (err1) {
                console.log(err1);
                return res.status(400).send();
            }

            // ดึงข้อมูลสรุปสถานะ
            connection.query(`
                SELECT
                    COUNT(*) AS total,
                    SUM(CASE WHEN status = 'Unoccupied' THEN 1 ELSE 0 END) AS do_count,
                    SUM(CASE WHEN status = 'Unpaid' THEN 1 ELSE 0 END) AS doing_count,
                    SUM(CASE WHEN status = 'Paid' THEN 1 ELSE 0 END) AS done_count
                FROM room
            `, (err2, summaryResults) => {
                if (err2) {
                    console.log(err2);
                    return res.status(400).send();
                }

                // ตอบกลับด้วยข้อมูลทั้งหมด + สรุป
                res.status(200).json({
                    data: roomResults,
                    summary: summaryResults[0]
                });
            });
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send();
    }
});


//insert admin
app.post("/api/insert/admin", (req, res) => {
  const { AID, AFname, ALname, AEmail, APhone, Username, Password } = req.body;
  const query =
    "INSERT INTO admin(AID , AFname ,ALname ,AEmail ,APhone ,Username ,Password) VALUES(?,?,?,?,?,?,?)";
  connection.query(
    query,
    [AID, AFname, ALname, AEmail, APhone, Username, Password],
    (error, result) => {
      if (error) {
        console.error("Error to inserting data ", error);
        res.status(500).json({ error: "Internal server error" });
      }
      res.json({
        msg: "Data inserted successfully",
        insertedID: result.insertId,
      });
    }
  );
});

//อ่านข้อมูล Admin ทุกคน
app.get("/api/read/admin", async (req, res) => {
  try {
    connection.query("SELECT * FROM admin", (error, results, fields) => {
      if (error) {
        console.log(error);
        return res.status(400).send();
      }
      res.status(200).json(results);
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
});

//อ่านข้อมูล admin 1 คนดูจาก AID
app.get("/api/read/admin/:AID", async (req, res) => {
  const adminID = req.params.AID;
  try {
    connection.query(
      "SELECT * FROM admin WHERE AID = ?",
      [adminID],
      (error, results, fields) => {
        if (error) {
          console.log(error);
          return res.status(400).send();
        }
        res.status(200).json(results);
      }
    );
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
});

//อ่านข้อมูล client ทุกคน
app.get("/api/read/client", async (req, res) => {
  try {
    connection.query("SELECT * FROM client", (error, results, fields) => {
      if (error) {
        console.log(error);
        return res.status(400).send();
      }
      res.status(200).json(results);
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
});

//อ่านข้อมูล client 1 คนดูจาก RoomID
app.get("/api/read/client/:RoomID", async (req, res) => {
  const roomID = req.params.RoomID;
  try {
    connection.query(
      "SELECT * FROM client WHERE RoomID = ?",
      [roomID],
      (error, results, fields) => {
        if (error) {
          console.log(error);
          return res.status(400).send();
        }
        res.status(200).json(results);
      }
    );
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
});

//รายการบิลลูกบ้านทั้งหมด
app.get("/api/read/bill", async (req, res) => {
  try {
    connection.query("SELECT * FROM bills", (error, results, fields) => {
      if (error) {
        console.log(error);
        return res.status(400).send();
      }
      res.status(200).json(results);
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
});

//เพิ่มbillsเข้าระบบ
app.post("/api/insert/bill", (req, res) => {
  const { RoomID, AID, RoomCharge, TotalCharge, WaterBill, ElecticBill } =
    req.body;
  const query =
    "INSERT INTO bills(RoomID , AID , RoomCharge , TotalCharge , WaterBill , ElecticBill) VALUES(?,?,?,?,?,?)";
  connection.query(
    query,
    [RoomID, AID, RoomCharge, TotalCharge, WaterBill, ElecticBill],
    (error, result) => {
      if (error) {
        console.error("Error to inserting data ", error);
        res.status(500).json({ error: "Internal server error" });
      }
      res.json({
        msg: "Data inserted successfully",
        insertedID: result.insertId,
      });
    }
  );
});

//ฟอร์มแจ้งบิลค่าใช้จ่ายจากRoomID
app.get("/api/read/bill/:RoomID", async (req, res) => {
  const roomID = req.params.RoomID;
  try {
    connection.query(
      "SELECT * FROM bills WHERE RoomID = ?",
      [roomID],
      (error, results, fields) => {
        if (error) {
          console.log(error);
          return res.status(400).send();
        }
        res.status(200).json(results);
      }
    );
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
});

//ฟอร์มแจ้งพัสดุ
app.get("/api/read/parcel", async (req, res) => {
  try {
    connection.query("SELECT * FROM parcel", (error, results, fields) => {
      if (error) {
        console.log(error);
        return res.status(400).send();
      }
      res.status(200).json(results);
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
});

//ฟอร์มแจ้งข้อมูลพัสดุ
app.get("/api/read/parcel/:RoomID", async (req, res) => {
  const roomID = req.params.RoomID;
  try {
    connection.query(
      "SELECT * FROM parcel WHERE RoomID = ?",
      [roomID],
      (error, results, fields) => {
        if (error) {
          console.log(error);
          return res.status(400).send();
        }
        res.status(200).json(results);
      }
    );
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
});

//อ่านข้อมูล parcel 1 คนดูจาก Status
app.get("/api/read/parcel/:RoomID/:Status", async (req, res) => {
  const status = req.params.Status;
  const roomID = req.params.RoomID;
  try {
    connection.query(
      "SELECT * FROM parcel WHERE Status = ? AND RoomID = ? ",
      [status, roomID],
      (error, results, fields) => {
        if (error) {
          console.log(error);
          return res.status(400).send();
        }
        res.status(200).json(results);
      }
    );
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
});

//อ่านข้อมูล slip ทุกคน
app.get("/api/read/slip", async (req, res) => {
  try {
    connection.query("SELECT * FROM slip", (error, results, fields) => {
      if (error) {
        console.log(error);
        return res.status(400).send();
      }
      res.status(200).json(results);
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
});

//อ่านข้อมูล slip 1 คนดูจาก RoomID
app.get("/api/read/slip/:RoomID", async (req, res) => {
  const roomID = req.params.RoomID;
  try {
    connection.query(
      "SELECT * FROM slip WHERE RoomID = ?",
      [roomID],
      (error, results, fields) => {
        if (error) {
          console.log(error);
          return res.status(400).send();
        }
        res.status(200).json(results);
      }
    );
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
});

//อ่านข้อมูล request ทุกคน
app.get("/api/read/request", async (req, res) => {
  try {
    connection.query("SELECT * FROM request", (error, results, fields) => {
      if (error) {
        console.log(error);
        return res.status(400).send();
      }
      res.status(200).json(results);
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
});

//อ่านข้อมูล request 1 คนดูจาก RoomID
app.get("/api/read/request/:RoomID", async (req, res) => {
  const roomID = req.params.RoomID;
  try {
    connection.query(
      "SELECT * FROM request WHERE RoomID = ?",
      [roomID],
      (error, results, fields) => {
        if (error) {
          console.log(error);
          return res.status(400).send();
        }
        res.status(200).json(results);
      }
    );
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
});

//อ่านข้อมูล request 1 คนดูจาก Status
app.get("/api/read/request/:RoomID/:Status", async (req, res) => {
  const status = req.params.Status;
  const roomID = req.params.RoomID;
  try {
    connection.query(
      "SELECT * FROM request WHERE Status = ? AND RoomID = ? ",
      [status, roomID],
      (error, results, fields) => {
        if (error) {
          console.log(error);
          return res.status(400).send();
        }
        res.status(200).json(results);
      }
    );
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
});

//login client
app.post('/api/login',async(req,res) => {
    const {Username,Password} = req.body;
    try{
        connection.query("SELECT * FROM client WHERE Username = ?", [Username], (error,ClientResults,fields)=>{
            if(error){
                console.log(error);
                return res.status(400).send();
            }
            //ถ้าไม่เจอ user
            if(ClientResults.length > 0){
                //ถ้าเจอและรหัสถูก
                if(Password == ClientResults[0].Password){
                    return res.json({status:'ok', role: "client",message:'login success'})
                }else{
                    return res.json({status:'error', role: "client",message:'wrong password'})
                }
            }
            
            //res.status(200).json(results)
            connection.query("SELECT * FROM admin WHERE Username = ?", [Username], (error2,AdminResults,fields)=>{
                if(error2){
                    console.log(error2);
                    return res.status(400).send();
                }
                //ถ้าไม่เจอ user
                if(AdminResults.length > 0){
                    //ถ้าเจอและรหัสถูก
                    if(Password == AdminResults[0].Password){
                        return res.json({status:'ok', role: "admin",message:'login success'})
                    }else{
                        return res.json({status:'error', role: "admin",message:'wrong password'})
                    }
                }
                else{
                    return res.json({status:'error',message:'user not found'})
                }
            })
        })
    }catch(error){
        console.log(error);
        return res.status(500).send();
    }
})

//อัปเดต Status ของ request
app.patch("/api/update/request/:roomid", async (req, res) => {
  const roomID = req.params.roomid;
  const { Status } = req.body;
  const query = "UPDATE request SET Status = ? WHERE RoomID = ?";
  try {
    connection.query(query, [Status, roomID], (error, results, fields) => {
      if (error) {
        console.log(error);
        return res.status(400).send();
      }
      res.status(200).json(results);
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
});

//อัปเดต Status ของ parcel
app.patch("/api/update/parcel/:roomid", async (req, res) => {
  const roomID = req.params.roomid;
  const { Status } = req.body;
  const query = "UPDATE parcel SET Status = ? WHERE RoomID = ?";
  try {
    connection.query(query, [Status, roomID], (error, results, fields) => {
      if (error) {
        console.log(error);
        return res.status(400).send();
      }
      res.status(200).json(results);
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
});

//มันจะแสดงต้องเปิดserver
app.listen(port, () => {
  console.log(`Server is running on port : ${port}`);
});
//ต้องรัน node index.js เพื่อเปิดserverก่อนนะถึงจะเชื่อมต่อได้อะ

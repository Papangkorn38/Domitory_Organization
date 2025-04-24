//2ตัวนี้เป็น package ที่เราโหลดมาใช้จาก package-lock.json
const express = require('express'); //ดึง express มาใช้
const mysql = require('mysql2'); // ดึง mysql2 มาใช้

const app = express();//เรียก express ที่เราดึงมาใช้
const port = 3000;//กำหนด port ของserver

app.use(express.json())

//connect กับตัวdatabase ใน mysql
const connection = mysql.createConnection({
    host: "localhost",//กำหนดให้เป็น local host
    user: "root",//ชื่อที่เราตั้ง
    password: "root",//password ที่เราตั้งไว้
    database: "mydb"// ชื่อ schema ที่เราตั้งไว้
})

//ดักจับerrorระหว่าง connect ไปยัง database
connection.connect((error) => {
    //ถ้าเจอให้ขึ้นข้อความพร้อมบอกว่า error อะไร
    if(error){
        console.error("Error to connect MySql ",error);
        return;
    }
    //ถ้าไม่มี error ก็ให้บอกว่าเชื่อมต่อสำเร็จ
    console.log("Connect to MySql successfully")
})

//สร้าง API สำหรับเพิ่มข้อมูล
app.post('/api/insert',(req,res) => {
    //ตัวbodyที่เราจะเพิ่มเข้าไป สำคัญ*ชื่อและลำดับต้องเหมือนกับในdatabaseที่เราสร้างไว้ทุกตัวอักษรไม่งั้นมันจะerror และตัวที่เป็นforienge key ของตารางอื่นต้องตัวprimary keyหลักของตัวนั้นต้องมีค่าจริงอยู่ไม่งั้นมันจะerrorเพราะเราไม่assignค่าที่ไม่มีอยุ่จริง*
    const { CID , Fname , Lname , Username , Password , Cemail , Address , BirthDate , CitizenID , PhoneNum , RoomID } = req.body;
    //ใส่คำสั่งsqlสำหรับเข้าไปจัดการdatabase
    const query = "INSERT INTO client(CID , Fname , Lname , Username , Password , Cemail , Address , BirthDate , CitizenID , PhoneNum , RoomID) VALUES(?,?,?,?,?,?,?,?,?,?,?)";
    //ตรวจสอบerror
    connection.query(query,[CID , Fname , Lname , Username , Password , Cemail , Address , BirthDate , CitizenID , PhoneNum , RoomID],(error,result) => {
        if(error){
            console.error("Error to inserting data ",error);
            res.status(500).json({error: "Internal server error"});
        }
        res.json({
            msg: "Data inserted successfully",
            insertedID: result.insertId
        })
    })
})

//อันนี้insert ของroom ใช้คำสั่งเดียวกัน
app.post('/api/insert/room',(req,res) => {
    const { RoomID , Status } = req.body;
    const query = "INSERT INTO room(RoomID , Status) VALUES(?,?)";
    connection.query(query,[RoomID , Status],(error,result) => {
        if(error){
            console.error("Error to inserting data ",error);
            res.status(500).json({error: "Internal server error"});
        }
        res.json({
            msg: "Data inserted successfully",
            insertedID: result.insertId
        })
    })
})

//อ่านข้อมูล client ทุกคน
app.get('/read',async(req,res) => {
    try{
        connection.query("SELECT * FROM client", (error,results,fields)=>{
            if(error){
                console.log(error);
                return res.status(400).send();
            }
            res.status(200).json(results)
        })
    }catch(error){
        console.log(error);
        return res.status(500).send();
    }
})

//อ่านข้อมูล client 1 คนดูจาก ID
app.get('/read/single/:CID',async(req,res) => {
    const ID = req.params.CID;
    try{
        connection.query("SELECT * FROM client WHERE CID = ?", [ID], (error,results,fields)=>{
            if(error){
                console.log(error);
                return res.status(400).send();
            }
            res.status(200).json(results)
        })
    }catch(error){
        console.log(error);
        return res.status(500).send();
    }
})

//มันจะแสดงต้องเปิดserver
app.listen(port, () => {
    console.log(`Server is running on port : ${port}`);
})
//ต้องรัน node index.js เพื่อเปิดserverก่อนนะถึงจะเชื่อมต่อได้อะ
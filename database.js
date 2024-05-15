
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

const dbConn = mysql.createConnection({
    host: 'localhost',
    user: 'root', // <== ระบุให้ถูกต้อง
    password: '',  // <== ระบุให้ถูกต้อง
    database: 'student_database', // <== ใส่ port ให้ถูกต้อง (default 3306, MAMP ใช้ 8889)
});

app.get("/students", (req, res) => {
    res.sendFile(__dirname + '/student.html');
 });

app.post("/students", async (req, res) => {
    // ส่งข้อมูลผ่าน body-parser (Middleware)
    const name = req.body.name;
    const age = req.body.age;
    const phone = req.body.phone;
    const email = req.body.email;
 
    const connection = await dbConn;
    await connection.connect();
    connection.query("insert into students (name,age,phone,email) values('"+name+"','"+age+"',"+phone+",'"+email+"')", (err, rows, fields) => {
        if (err) throw err;
    
        res.send('คุณได้ทำการเพิ่มข้อมูลเรียบร้อย');
      });
    await connection.end();
 })
 

app.listen(3000, () => {
 console.log('server started on port 3000!');
});


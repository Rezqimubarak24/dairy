const express = require("express")
const mysql = require("mysql")
const BodyParser = require("body-parser")
const app = express()
app.use(BodyParser.urlencoded({ extended: true }))
//connect index
app.set("view engine", "ejs")
app.set("views", "views")
//connect database
const db = mysql.createConnection({
    host: "localhost",
    database: "tes",
    user: "root",
    passworld: "",
})
db.connect((err)=>{
    if(err) throw err
    console.log("database connected...")
 //output list
    app.get("/", (req, res)=>{
        const sql = "SELECT * FROM user" 
        db.query(sql, (err, result)=>{
            const users = JSON.parse(JSON.stringify(result))
            res.render("index", {users: users, title:"my diary"})
        })
    })
 //output form
    app.post("/tambah", (req, res)=>{
        const insertSql = `INSERT INTO user (hari, hape, fun, olah, cerita) VALUES('${req.body.hari}', '${req.body.hape}', '${req.body.fun}', '${req.body.olah}', '${req.body.cerita}');`
        db.query(insertSql, (err, result)=>{
            if (err) throw err
            res.redirect("/");
        })
    })

})
//server
app.listen(8000, ()=>{
    console.log("server ready...")
})

const mysql = require('mysql');
const express = require('express');
const body_parser = require('body-parser');

// Database Connection

const db = {
    host : 'localhost',
    user : 'root',
    passowrd : '',
    database : 'schoolbell',
    multipleStatements: true
}


var app = express();
app.use(body_parser.json());
app.use(function(request, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});

var mysql_con = mysql.createConnection(db);

mysql_con.connect((err)=> {
    if(!err)
    console.log('\nConnected to `schoolbell` mysql database.')
    else
    console.log('DB Connection failed \n Error : ' + JSON.stringify(err, undefined, 2))
});

app.listen(3000, ()=>console.log('Express Server is running on post no - http://localhost:3000/ \n\nUse http://localhost:3000/employees to get employees details.'));

// Get all employees
app.get('/employees', (req, res)=>{
    mysql_con.query('SELECT * FROM schoolbell.emp_manager;', (err, rows, fields)=>{
        if(!err)
        res.send(rows);
        else
        res.send(err);

    })
});

// Get an employee 
app.get('/employees/:id', (req, res)=>{
    mysql_con.query('select * from employee where id = ?',[req.params.id], (err, rows, fields)=>{
        if(!err)
        res.send(rows);
        else
        res.send(err);
    })
});

// Delete employee using id
app.delete('/employees/:id', (req, res)=>{
    mysql_con.query('delete from employee where id = ?',[req.params.id], (err, rows, fields)=>{
        if(!err)
        res.send('Deleted employee.');
        else
        res.send(err);
    })
});

// Insert an employee using id
app.post('/employees', (req, res)=>{
    var emp = req.body;
    var sql = "SET @id = ?; SET @name = ?; SET @age = ?; \
    SET @gender = ?; SET @department = ?; SET @manager_id = ?; SET @salary = ?; \
    SET @joined = ?; \
    CALL EmployeeAddOrEdit (@id,@name,@age,@gender,@department,@manager_id,@salary,@joined)"
    mysql_con.query(sql,[emp.id,emp.name,emp.age,emp.gender,emp.department,emp.manager_id,emp.salary,emp.joined],(err, rows, fields)=>{
        if(!err) 
            rows.forEach(element => {
                if(element.constructor == Array)
                    res.send("Employee added with id " + element[0].id);
            })
        else
            res.send(err);
    })
});

// update an employee using id

app.put('/employees', (req, res)=>{
    var emp = req.body;
    console.log(emp);
    var sql = "SET @id = ?; SET @name = ?; SET @age = ?; \
    SET @gender = ?; SET @department = ?; SET @manager_id = ?; SET @salary = ?; \
    SET @joined = ?; \
    CALL EmployeeAddOrEdit (@id,@name,@age,@gender,@department,@manager_id,@salary,@joined)"
    mysql_con.query(sql,[emp.id,emp.name,emp.age,emp.gender,emp.department,emp.manager_id,emp.salary,emp.joined],(err, rows, fields)=>{
        if(!err) 
            rows.forEach(element => {
                if(element.constructor == Array)
                    res.send("Updated Successfully at id " + element[0].id);
            })
        else
            console.log(err);
    })
});

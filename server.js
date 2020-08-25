const mysql = require('mysql');
const express = require('express');
const bodyparser = require('body-parser');
var app = express();
var cors = require('cors')
//Configuring express server
app.use(cors())
app.use(bodyparser.json());


//MySQL details
var con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'pj_non',
  multipleStatements: true
});


con.connect((err) => {
  if (!err)
    console.log('Connection Successfully');
  else
    console.log('Connection Failed!' + JSON.stringify(err, undefined, 2));
});

app.post('/login', (req, res) => {
  var sql = "SELECT * FROM login WHERE email = ? AND password = ?";
  var values =
    [req.body.email, req.body.password];
  con.query(sql, values, function (err, result) {
    if (result.length) {
      res.json(result)
    } else {
      res.json(null)
    }

  })
});

app.post('/register', (req, res) => {
  var sql = "INSERT INTO login (name, password, email, role) VALUES ?";
  var values = [
    [req.body.fullname, req.body.password, req.body.email, "employee"]
  ];
  con.query(sql, [values], function (err, result) {
    if (err) throw err;
    console.log("Register Success");
  })
})

app.post('/add', (req, res) => {
  var sql = "INSERT INTO equipment (name, description	, stock, image) VALUES ?";
  var values = [
    [req.body.name, req.body.description, req.body.stock, req.body.image]
  ];
  con.query(sql, [values], function (err, result) {
    if (err) throw err;
    console.log("Insert Success");
  })
})

app.post('/borrow', (req, res) => {

  // console.log(req.body)

  var sql = "INSERT INTO history (employee_id, equipment_id	, employee_name, amount ,date_start, date_end, status) VALUES ?";
  var values = [
    [req.body.equipment_id, req.body.employee_id, req.body.employee_name,
    req.body.amount, req.body.date_start, req.body.date_end, 'Not Retuned']
  ];
  con.query(sql, [values], function (err, result) {
    if (err) throw err;
    console.log("Borrow Success");
  })
})

app.put('/update', (req, res) => {

  // console.log(req.body)
  var sql = "UPDATE equipment SET name = '" + req.body.name + "', stock = '" + req.body.stock + "' WHERE id = '" + req.body.id + "'";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Update Success");
  })
})

app.put('/updateem', (req, res) => {

  // console.log(req.body)
  var sql = "UPDATE login SET name = '" + req.body.name + "', email = '" + req.body.email + "' WHERE user_id = '" + req.body.id + "'";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Update Success");
  })
})

app.put('/updateamount', (req, res) => {

  // console.log(req.body)
  var sql = "UPDATE equipment SET stock = '" + req.body.stock + "' WHERE id = '" + req.body.id + "'";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Update Success");
  })
})

app.get('/get', (req, res) => {
  con.query('SELECT * FROM login', (err, rows, fields) => {
    if (!err)
      res.send(rows);
    else
      console.log(err);
  })
});

app.delete('/deleteeq', (req, res) => {
  // console.log(req.body.id)
  var sql = "DELETE FROM equipment WHERE id = ?";
  con.query(sql, req.body.id, function (err, result) {
    if (err) throw err;
    console.log("Delete Success");
  })
});

app.delete('/deleteem', (req, res) => {

  var sql = "DELETE FROM login WHERE user_id = ?";
  con.query(sql, req.body.user_id, function (err, result) {
    if (err) throw err;
    console.log("Delete Success");
  })
});

app.get('/getproduct', (req, res) => {
  con.query('SELECT * FROM equipment', (err, rows, fields) => {
    if (!err)
      res.send(rows);
    else
      console.log(err);
  })
});

app.get('/getuser', (req, res) => {
  con.query('SELECT * FROM login WHERE role = "employee"', (err, rows, fields) => {
    if (!err)
      res.send(rows);
    else
      console.log(err);
  })
});

app.get('/gethistory', (req, res) => {
  con.query('SELECT * FROM history ', (err, rows, fields) => {
    if (!err)
      res.send(rows);
    else
      console.log(err);
  })
});

app.get('/getday', (req, res) => {
  con.query('SELECT date(date_start) as stat_day, SUM(amount) from history GROUP BY date(date_start) order by stat_day', (err, rows, fields) => {

    if (!err)
      res.send(rows);
    else
      console.log(err);
  })
});

const port = process.env.PORT || 7000;
app.listen(port, () => console.log(`Listening on port ${port}..`));
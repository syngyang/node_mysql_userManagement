const mysql = require('mysql');

//connection pool
const pool = mysql.createPool({
    connectionLimit: 100,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWD,
    database: process.env.DB_NAME
})


//view users
exports.view = (req,res)=> {
    pool.getConnection((err, connection)=> {
        if(err) throw err; //NOT CONNECTED
        console.log(`connected as id ${connection.threadId}`)
    
        // user the connection
        const sql = 'SELECT * FROM user WHERE status = "active"';
        connection.query(sql, (err,rows)=>{
            //When done with the connection, relese it
            connection.release();
            if(!err) {
                res.render('home', {rows});
            } else {
                console.log(err);
            }
            console.log('The data from user table: \n', rows);
        });
    });
    
 }
// find user by Search
 exports.find = (req,res)=> {
    pool.getConnection((err, connection)=> {
        if(err) throw err; //NOT CONNECTED
        console.log(`connected as id ${connection.threadId}`)
        
        let searchTerm = req.body.search;
        //console.log(searchTerm)
        // user the connection
        const sql = 'SELECT * FROM user WHERE first_name LIKE ? OR last_name LIKE ?';
        connection.query(sql, ['%'+ searchTerm +'%','%'+ searchTerm +'%'], (err,rows)=>{
            //When done with the connection, relese it
            connection.release();
            if(!err) {
                res.render('home', {rows});
            } else {
                console.log(err);
            }
            console.log('The data from user table: \n', rows);
        });
    });
 }
 exports.form = (req, res)=> {
     res.render('add-user')
 }
 // add new user
 exports.addUser = (req,res)=> {
    const {first_name, last_name, email, phone, comments } = req.body;

    pool.getConnection((err, connection)=> {
        if(err) throw err; //NOT CONNECTED
        console.log(`connected as id ${connection.threadId}`)
        
        // user the connection
        const sql = 'INSERT INTO user SET first_name = ?, last_name = ?, email = ?, phone = ?, comments = ?';
        // const sql = 'INSERT INTO user SET ?, ?, ?, ?,?';
        connection.query(sql,[first_name,last_name,email,phone,comments], (err,rows)=>{
            //When done with the connection, relese it
            connection.release();
            if(!err) {
                res.render('add-user', {alert:'User added successfully.'});
            } else {
                console.log(err);
            }
            console.log('The data from user table: \n', rows);
        });
    });
 }

 exports.editUser = (req, res)=> {
   
    pool.getConnection((err, connection)=> {
        if(err) throw err; //NOT CONNECTED
        console.log(`connected as id ${connection.threadId}`)
        
        // user the connection
        const sql = 'SELECT * FROM user WHERE id = ?';
        connection.query(sql,[req.params.id],(err,rows)=>{
            // console.log(rows)
            //When done with the connection, relese it
            connection.release();
            if(!err) {
                res.render('edit-user', {rows});
            } else {
                console.log(err);
            }
            console.log('The data from user table: \n', rows);
        });
    });
 }

 exports.updateUser = (req,res)=> {
    const {first_name, last_name, email, phone, comments } = req.body;

    pool.getConnection((err, connection)=> {
        if(err) throw err; //NOT CONNECTED
        console.log(`connected as id ${connection.threadId}`)
        
        // user the connection
        const sql = 'UPDATE user SET first_name = ?, last_name =?, email= ?, phone= ? WHERE id = ?';
        connection.query(sql,[first_name,last_name,email,phone,req.params.id],(err,rows)=>{
            //When done with the connection, relese it
            connection.release();
            if(!err) {
                res.render('edit-user', {rows, alert:`${first_name} has been updated.`});
            } else {
                console.log(err);
            }
            console.log('The data from user table: \n', rows);
        });
    });
 }
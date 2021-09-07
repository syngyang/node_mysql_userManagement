const express = require('express')
const mysql = require('mysql')
const exphbs = require('express-handlebars')

require('dotenv').config();

const app = express()
const port = process.env.PORT ||  5000
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(express.static('public'));

//Template Engine
app.engine('hbs',exphbs({extname:'.hbs'}))
app.set('view engine','hbs')

//mysql
const pool = mysql.createPool({
    connectionLimit: 100,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWD,
    database: process.env.DB_NAME
})
pool.getConnection((err, connection)=> {
    if(err) throw err; //NOT CONNECTED
    console.log(`connected as id ${connection.threadId}`)

})
// app.get('', (req, res)=>{
//     pool.getConnection((err, connection)=> {
//         if(err) throw err;
//         console.log(`connected as id ${connection.threadId}`)

//         connection.query('SELECT * FROM beers', (err, rows)=>{
//             connection.release() // return the connection to pool
//         })
//     })
// })


const routes = require('./server/routes/user')
app.use('/', routes)

// process.once('SIGUSR2', function () {
//     process.kill(process.pid, 'SIGUSR2');
//   });
  
//   process.on('SIGINT', function () {
//     // this is only called on ctrl+c, not restart
//     process.kill(process.pid, 'SIGINT');
//   });


app.listen(port, ()=>{
  console.log( `the server is running on ${port}`)
})
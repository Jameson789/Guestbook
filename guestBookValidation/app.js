const express = require('express');
const mariadb = require('mariadb')

const app = express();
const PORT = 3000;

const pool = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    database: 'guestBook',
    password: '1234'
});

async function connect() {
    try {
        const conn = await pool.getConnection();
        console.log("Connected to mariaDB");
        return conn;
    } catch (err) {
        console.log('Error connecting to MariaDB: ' + err);
    }
};
//connect(); //for testing

app.use(express.urlencoded({ extended: false }));
// app.use(express.static('public'));
app.use(express.static('views'));


app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('home');
}); 


app.post('/success', async (req, res) => {
    const data = req.body;
    console.log(data);
    //connect to database 
    const conn = await connect();

    //insert our order 
    await conn.query(`INSERT INTO guests (fname, lname, job, company, linkedin, email, meet, other, comment, mailing, html, text) 
VALUES ('${data.fname}', '${data.lname}', '${data.job} ', '${data.company} ', '${data.linkedin} ',
'${data.email} ', '${data.menu}', '${data.other} ', '${data.comment} ', '${data.mailing} ', '${data.html} ', '${data.text} '); 
`);
    res.render('thankyou');
}); 

app.get('/guests', async (req, res) => { 
    const conn = await connect();
    let data = await conn.query(`SELECT * FROM guests ORDER BY date_submitted DESC;`);
    console.log(data);
    res.render('results', {data : data});
});

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});
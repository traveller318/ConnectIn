import mysql from 'mysql2'

const con = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Vaishali@0408',
    database: 'connectIn'
}).promise();


export default con
import mysql from 'mysql2'

const con = mysql.createPool({
    host: "ENTER THE HOST NAME",
    user: "ENTER THE USER NAME",
    password: "ENTER THE PASSWORD",
    database: "ENTER THE DATABASE NAME"
}).promise();


export default con
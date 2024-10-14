import mysql2 from "mysql2";

var con = mysql2.createConnection({
    host: "localhost",
    user: "root",
    password: "Declan1Berm2!",
    database: 'byfiachra',
});

con.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.message);
        return;
    }
    console.log("Connected!")
});

export default con;
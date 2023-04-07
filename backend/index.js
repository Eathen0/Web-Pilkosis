import express from "express";
import multer from "multer";
import cors from "cors";
import mysql from "mysql";

const PORT = process.env.PORT || 8080;
const app = express();

app.use(cors());

// KONEKSI KE DATABASE MYSQL

const koneksi = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "pilkosis",
});

// KONEKSI KE DATABASE MYSQL
koneksi.connect();

app.get("/", (req, res) => {
  res.json({
    message: "KENAPA NGAB?",
  });
});

// ENDPOINT LOGIN

app.get("/login", (req, res) => {
  let statusLogin = false;
  //   res.status(200).send("sfioxjklm");
  const username = req.query.username;
  const paswd = req.query.password;

  koneksi.query(
    `SELECT id, nama, username, password, status, hak, pilihan FROM user WHERE username = '${username}' `,
    (err, result, field) => {
      // console.log(result);
      const data = Object.values(JSON.parse(JSON.stringify(result))); // MENGAMBIL DATA DI RowDataPacket
      if (data.length > 0) {
        // JIKA DATA ADA MAKA AKAN DIJALANKAN
        let userData = {
          // MENAMPUNG DATA USER
          id: data[0].id,
          nama: data[0].nama,
          username: data[0].username,
          status: data[0].status,
          hak: data[0].hak,
          pilihan: data[0].pilihan,
        };
        if (data[0].password === paswd) {
          statusLogin = true;
          res.status(200).json(userData);
        } else {
          res.status(500).json({
            login: statusLogin,
          });
        }
      }
    }
  );
});

app.listen(PORT, () => {
  console.log(`Berjalan di port ${PORT}`);
});

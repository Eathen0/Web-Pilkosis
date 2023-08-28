import express from "express";
import { MongoClient } from "mongodb";
import multer from "multer";
import axios from "axios";
import FormData from "form-data";
import cors from "cors";
import mysql from "mysql";

// import Time from "./Time/time.js";

// NOTE = MIGRASI MENGGUNAKAN MYSQL (AI GENERATED CODE)

const api_keyUpGambar =
  process.env.API_KEY_UPGAMBAR || "e0f70b04483970cd5bec8a44e8faaf14";
const url = process.env.MONGODB_URI || "mongodb://localhost:27017";
const dbName = "pilkosis";
const app = express();
const PORT = process.env.PORT || 8080;
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "pilkosis_db",
});

const upload = multer({});
// console.log(getJam());

connection.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Berhasil konek ke MySQL");
  }
});

app.use(cors());

app.get("/", (req, res) => {
  res.json({
    message: "PERGI KE /api",
  });
});

app.get("/api", (req, res) => {
  res.json({
    message: "Masukan endpoint yang valid",
  });
});

app.get("/api/login", (req, res) => {
  const username = req.query.username.toString();
  const paswd = req.query.password;

  let statusLogin = false;

  // console.log(username, paswd);

  connection.query(
    `SELECT * FROM user WHERE username = '${username}' AND password = '${paswd}'`,
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({
          message: "Terjadi kesalahan pada server",
        });
      } else {
        const data = result[0];

        if (data) {
          // JIKA DATA ADA MAKA AKAN DIJALANKAN
          let userData = {
            // MENAMPUNG DATA USER

            nama: data.nama,
            username: data.username,
            password: data.password,
            status: data.status,
            hak: data.hak,
            pilihan: data.pilihan,
          };
          if (data.password === paswd) {
            statusLogin = true;
            res.status(200).json(userData);
          }
        } else {
          res.status(404).json({
            login: statusLogin,
            status: "Username Tidak Ditemukan atau password salah",
          });
        }
      }
    }
  );
});

app.post("/api/paslon", upload.single("foto"), (req, res) => {
  const noPaslon = parseInt(req.body.no_paslon);
  const namaPaslon = req.body.nama_paslon;
  const visi = req.body.visi;
  const misi = req.body.misi;
  const ketua = req.body.calon_ketua;
  const proker = req.body.proker;
  const wakil = req.body.calon_wakil;

  let data = new FormData();
  data.append("key", "e0f70b04483970cd5bec8a44e8faaf14");
  data.append("image", req.file.buffer.toString("base64"));

  axios({
    method: "post",
    url: "https://api.imgbb.com/1/upload",
    data: data,
  }).then((response) => {
    // res.send(response.data.data.url);
    connection.query(
      `INSERT INTO paslon (no_paslon, nama_paslon, visi, misi, calon_ketua, calon_wakil, proker, fotonya) VALUES (${noPaslon}, '${namaPaslon}', '${visi}', '${misi}', '${ketua}', '${wakil}', '${proker}', '${response.data.data.url}')`,
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(400).json({
            message: "Gagal menambahkan paslon",
          });
        } else {
          res.status(200).json({
            message: "Berhasil menambahkan paslon",
          });
        }
      }
    );
  });
});

app.get("/api/paslon", (req, res) => {
  connection.query(`SELECT * FROM paslon`, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).json({
        message: "Gagal mendapatkan data paslon",
      });
    } else {
      res.status(200).json(result);
    }
  });
});

app.delete("/api/paslon/", (req, res) => {
  connection.query(
    `DELETE FROM paslon WHERE nama_paslon = '${req.query.nama_paslon}'`,
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(400).json({
          message: "Gagal menghapus paslon",
        });
      } else {
        res.status(200).json({
          message: "Berhasil menghapus paslon",
        });
      }
    }
  );
});

app.get("/api/paslon/:nama_paslon", (req, res) => {
  const noPaslon = parseInt(req.params.nama_paslon);

  // console.log(noPaslon);

  connection.query(
    `SELECT * FROM paslon WHERE no_paslon = ${noPaslon}`,
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(400).json({
          message: "Gagal mendapatkan data paslon",
        });
      } else {
        res.status(200).json(result[0]);
      }
    }
  );
});

app.put("/api/vote", (req, res) => {
  const username = req.query.username;
  const pilihan = req.query.pilihan;
  const password = req.query.password;

  //   console.log(username, pilihan, password);

  connection.query(
    `SELECT * FROM user WHERE username = '${username}' AND password = '${password}'`,
    (err, result) => {
      let resultData = Object.values(JSON.parse(JSON.stringify(result)))[0];
      //   if (resultData.status == 1) {
      //     res.sendStatus(403).send("Anda sudah melakukan vote");
      //   }

      if (resultData.status === 0) {
        connection.query(
          `UPDATE paslon SET total=total+1 WHERE no_paslon = ${pilihan}`,
          (err, rows) => {
            if (err) throw err;

            connection.query(
              `UPDATE user SET pilihan=${pilihan}, status=1 WHERE username = '${username}' AND password = '${password}'`,
              (err, resultnya) => {
                if (resultnya) {
                }
              }
            );
          }
        );
      } else {
        console.log("Sudah");
      }
    }
  );
});

app.get("/api/pemilih", (req, res) => {
  connection.query(`SELECT * FROM user WHERE status = 1`, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).json({
        message: "Gagal mendapatkan data pemilih",
      });
    } else {
      res.status(200).json(result);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});

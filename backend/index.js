import express from "express";
import cors from "cors";
import mysql from "mysql";
import multer from "multer";
import path from "path";
import Time from "./Time/time.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 8080;
const app = express();

const storage = multer.diskStorage({
  // MENENTUKAN TEMPAT UPLOAD
  destination: function (req, file, cb) {
    cb(null, "tmp/uploads");
  },
  filename: function (req, file, cb) {
    // console.log(req.body);
    const namaFile = `${req.body.nama_paslon}_${Time()}.${
      file.mimetype.split("/")[1]
    }`;

    cb(null, namaFile);
    // console.log(req.body);
  },
});

const upload = multer({ storage: storage });

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
  console.log("sd");
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
          res.status(404).json({
            login: statusLogin,
            status: "Password Salah",
          });
        }
      } else {
        res.status(404).json({
          login: statusLogin,
          status: "Username Tidak Ditemukan",
        });
      }
    }
  );
});

app.get("/getPemilih", (req, res) => {
  koneksi.query(
    "SELECT * FROM user WHERE status = 1",
    (err, result, field) => {
      if (result) {
        res.status(200).json(result);
      }
    }
  );
});

// const addFotoPaslon = (namaFile, namaPaslon) => {
//   koneksi.query(
//     `INSERT INTO paslon_ (fotonya) VALUES (${namaFile}) WHERE nama_paslon = ${namaPaslon}`,
//     (err, result, field) => {
//       if (err) {
//         // console.log(err);
//       }
//       console.log("ofndmx");
//     }
//   );
// };55555555555555555555555555555555555555555555

app.post("/paslon", upload.single("foto"), (req, res) => {
  // res.json(req.body);
  const noPaslon = parseInt(req.body.no_paslon);
  const namaPaslon = req.body.nama_paslon;
  const visi = req.body.visi;
  const misi = req.body.misi;
  const ketua = req.body.calon_ketua;
  const proker = req.body.proker;
  const wakil = req.body.calon_wakil;
  let namaFile = req.file.filename;
  // console.log(namaFile);

  koneksi.query(
    `INSERT INTO paslonnya (id, no_paslon, nama_paslon, visi, misi, calon_ketua, calon_wakil, proker, fotonya) VALUES (NULL, ${noPaslon}, '${namaPaslon}', '${visi}', '${misi}', '${ketua}', '${wakil}', '${proker}', '${namaFile}')`,
    (err, result, field) => {
      if (result) {
        res.status(200).json({
          status: "berhasil",
        });
        if (err) {
          res.status(400).json({
            status: "gagal",
          });
        }
        // addFotoPaslon(namaFile, namaPaslon);
      }
    }
  );
});

app.get("/picture/:paslon", (req, res) => {
  const paslon = req.params.paslon;
  koneksi.query(
    `SELECT fotonya FROM paslonnya WHERE nama_paslon = '${paslon}'`,
    (err, result, field) => {
      if (result) {
        const data = Object.values(JSON.parse(JSON.stringify(result)));
        res.sendFile(`tmp/uploads/${data[0].fotonya}`, { root: __dirname });
      }
    }
  );
});

app.post("/vote", (req, res) => {
  const username = req.query.username;
  const pilihan = req.query.pilihan;

  koneksi.query(
    `UPDATE paslonnya SET total=total+1 WHERE no_paslon=${pilihan}`,
    (err, result, field) => {
      if (result.affectedRows == 1) {
        res.status(200).json({
          status: "berhasil",
        });
        koneksi.query(
          `UPDATE user SET pilihan='${pilihan}', status=1 WHERE username='${username}'`
        );
      } else {
        res.status(404).json({
          status: "gagal",
        });
      }
    }
  );
});

app.get("/paslon", (req, res) => {
  koneksi.query("SELECT * FROM `paslonnya`", (err, result, field) => {
    if (result) {
      res.status(200).json(result);
    }
  });
});

// app.post("/calonketua", upload.single("fotoketua"), (req, res) => {
//   const nama = req.body.nama;
//   const visi = req.body.visi;
//   const misi = req.body.misi;
//   const nomor = req.body.nomor;
//   const proker = req.body.proker;
//   const foto = req.file.filename;

//   koneksi.query(
//     `INSERT INTO calon_ketua (id, nama, visi, misi, nomor, proker, foto) VALUES (NULL, '${nama}', '${visi}', '${misi}', '${nomor}', '${proker}', '${foto}');`,
//     (err, result, field) => {
//       console.log(err);
//     }
//   );
// });

// app.get("/calonketua", (req, res) => {
//   koneksi.query("SELECT * FROM calon_ketua", (err, result, field) => {
//     if (result) {
//       res.status(200).json(result);
//     }
//     console.log(req.hostname);
//   });
// });

app.post("/bataswaktu", (req, res) => {
  const mualai = req.body.mulai;
  const selesai = req.body.selesai;

  // koneksi.query(`SELECT INTO calon-`);
});

const listener = app.listen(PORT, () => {
  console.log(`Berjalan di port ${PORT}`);
  // console.log(listener.address());
});
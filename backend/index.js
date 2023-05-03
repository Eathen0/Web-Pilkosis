import express from "express";
import cors from "cors";
import mysql from "mysql";
import multer from "multer";
import Time from "./Time/time.js";

const PORT = process.env.PORT || 8080;
const app = express();
app.use(cors());

const storage = multer.diskStorage({
  // MENENTUKAN TEMPAT UPLOAD
  destination: function (req, file, cb) {
    cb(null, "paslon/");
  },
  filename: function (req, file, cb) {
    // console.log(req.body);
    const namaFile = `${req.body.nama_paslon}-${Time()}.${
      file.mimetype.split("/")[1]
    }`;

    cb(null, namaFile);
  },
});

const upload = multer({ storage: storage }); // INISIALISASI UPLOAD

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
    `SELECT id, nama, username, password, status, hak, pilihan FROM user_ WHERE username = '${username}' `,
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

const addFotoPaslon = (namaFile, namaPaslon) => {
  koneksi.query(
    `INSERT INTO paslon_ (foto) VALUES (${namaFile}) WHERE nama_paslon = ${namaPaslon}`,
    (err, result, field) => {
      if (err) {
        // console.log(err);
      }
    }
  );
};

app.post("/tambahpaslon", upload.single("foto"), (req, res) => {
  // res.json(req.body);
  const noPaslon = parseInt(req.body.no_paslon);
  const namaPaslon = req.body.nama_paslon;
  const visi = req.body.visi;
  const misi = req.body.misi;
  const ketua = req.body.calon_ketua;
  const proker = req.body.proker;
  const wakil = req.body.calon_wakil;
  // console.log(req.body);
  // const query = ;
  koneksi.query(
    `INSERT INTO paslon_ (no_paslon, nama_paslon, visi, misi, calon_ketua, calon_wakil, proker, foto) VALUES (${noPaslon}, '${namaPaslon}', '${visi}', '${misi}', '${ketua}', '${wakil}', '${proker}', '${req.file.filename}')`,
    (err, result, field) => {
      if (result) {
        res.status(200).json({
          status: "Berhasil",
        });
      }
    }
  );
});

app.listen(PORT, () => {
  console.log(`Berjalan di port ${PORT}`);
});

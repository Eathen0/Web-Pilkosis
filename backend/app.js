import express from "express";
import { MongoClient } from "mongodb";
const url = "mongodb://localhost:27017";
const dbName = "pilkosis";
import { fileURLToPath } from "url";
import path from "path";
import multer from "multer";

import Time from "./Time/time.js";
const app = express();
const PORT = 8080 || process.env.PORT;

const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

// console.log(getJam());

client.connect((err, client) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Berhasil konek ke mongo db");
  }
});

const db = client.db(dbName);

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

  db.collection("user")
    .findOne({
      username: username,
      password: paswd,
    })
    .then((result) => {
      // console.log(result.nama);

      const data = result;

      if (data) {
        // JIKA DATA ADA MAKA AKAN DIJALANKAN
        let userData = {
          // MENAMPUNG DATA USER

          nama: data.nama,
          username: data.username,
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
    });
});

app.post("/api/paslon", upload.single("foto"), (req, res) => {
  const noPaslon = parseInt(req.body.no_paslon);
  const namaPaslon = req.body.nama_paslon;
  const visi = req.body.visi;
  const misi = req.body.misi;
  const ketua = req.body.calon_ketua;
  const proker = req.body.proker;
  const wakil = req.body.calon_wakil;
  let namaFile = req.file.filename;

  console.log(req.body);

  db.collection("paslon")
    .insertOne({
      no_paslon: noPaslon,
      nama_paslon: namaPaslon,
      visi: visi,
      misi: misi,
      calon_ketua: ketua,
      calon_wakil: wakil,
      proker: proker,
      fotonya: namaFile,
    })
    .then((result) => {
      res.status(200).json({
        message: "Berhasil menambahkan paslon",
      });
    })
    .catch((err) => {
      res.status(400).json({
        message: "Gagal menambahkan paslon",
      });
    });
});
app.get("/api/paslon", (req, res) => {
  db.collection("paslon")
    .find()
    .toArray()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json({
        message: "Gagal mendapatkan data paslon",
      });
    });
});
app.get("/api/paslon/:no_paslon", (req, res) => {
  const noPaslon = parseInt(req.params.no_paslon);

  // console.log(noPaslon);

  db.collection("paslon")
    .findOne({
      no_paslon: noPaslon,
    })
    .then((result) => {
      res.status(200).json(result);
      // console.log(result);
    })
    .catch((err) => {
      res.status(400).json({
        message: "Gagal mendapatkan data paslon",
      });
    });
});
app.post("/api/vote", (req, res) => {
  const username = req.query.username;
  const pilihan = req.query.pilihan;
  const password = req.query.password;

  db.collection("user")
    .findOne({
      username: username,
      password: password,
    })
    .then((result) => {
      if (result.status === 0) {
        db.collection("paslon")
          .updateOne(
            {
              no_paslon: parseInt(pilihan),
            },
            {
              $inc: {
                total: 1,
              },
            }
          )
          .then((hasil) => {
            db.collection("user")
              .updateOne(
                {
                  username: username,
                },
                {
                  $set: {
                    status: 1,
                    pilihan: pilihan,
                  },
                }
              )
              .then((hasil) => {
                res.status(200).json({
                  message: "Berhasil melakukan vote",
                });
              })
              .catch((err) => {
                res.status(400).json({
                  message: "Gagal melakukan vote",
                });
              });
          });
      } else {
        res.status(400).json({
          message: "Anda sudah melakukan vote",
        });
      }
    });
});
app.get("/api/pemilih", (req, res) => {
  db.collection("user")
    .find({ status: 1 })
    .toArray()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json({
        message: "Gagal mendapatkan data pemilih",
      });
    });
});
app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});

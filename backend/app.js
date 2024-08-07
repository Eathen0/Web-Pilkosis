/* eslint-disable @typescript-eslint/no-unused-vars */

import express from "express";
import { MongoClient } from "mongodb";
import multer from "multer";
import axios from "axios";
import FormData from "form-data";
import cors from "cors";
import bodyParser from "body-parser";
// import Time from "./Time/time.js";

const api_keyUpGambar =
  process.env.API_KEY_UPGAMBAR || "e0f70b04483970cd5bec8a44e8faaf14";
const url = process.env.MONGODB_URI || "mongodb://localhost:27017";
const dbName = "pilkosis";
const app = express();
const PORT = process.env.PORT || 8080;

const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());
app.use(bodyParser.json());
const upload = multer({});
// console.log(getJam());

// console.log(process.env);

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
          password: data.password,
          status: data.status,
          hak: data.hak,
          pilihan: data.pilihan,
        };
        console.log(result);
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

  let data = new FormData();
  data.append("key", "e0f70b04483970cd5bec8a44e8faaf14");
  data.append("image", req.file.buffer.toString("base64"));

  axios({
    method: "post",
    url: "https://api.imgbb.com/1/upload",
    data: data,
  }).then((response) => {
    // res.send(response.data.data.url);
    db.collection("paslon")
      .insertOne({
        no_paslon: noPaslon,
        nama_paslon: namaPaslon,
        visi: visi,
        misi: misi,
        calon_ketua: ketua,
        calon_wakil: wakil,
        proker: proker,
        fotonya: response.data.data.url,
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
    // console.log(response);
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
app.delete("/api/paslon/", (req, res) => {
  db.collection("paslon")
    .findOneAndDelete({
      nama_paslon: req.query.nama_paslon,
    })
    .then((resul) => {
      res.status(200).json({
        message: "Berhasil menghapus paslon",
      });
    });
});
app.get("/api/paslon/:nama_paslon", (req, res) => {
  const noPaslon = parseInt(req.params.nama_paslon);

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
app.put("/api/vote", (req, res) => {
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
app.post("/api/feedback", (req, res) => {
  const nama = req.query.nama;
  const kelas = req.query.kelas;
  const kritik = req.query.kritik;
  const saran = req.query.saran;

  db.collection("feedback")
    .insertOne({
      nama,
      kelas,
      kritik,
      saran,
    })
    .then((result) => {
      res.status(200).json({
        status: "Berhasil",
      });
    })
    .catch((err) => {
      res.json({
        status: "Ada masalah",
      });
    });
});
app.get("/api/feedback", (req, res) => {
  db.collection("feedback")
    .find({})
    .toArray()
    .then((result) => {
      res.json(result);
    });
});
app.post("/api/waktu", (req, res) => {
  console.log(req.query.awal);
  db.collection("waktu")
    .updateOne(
      { idnya: "0" },
      { $set: { awal: req.query.awal, akhir: req.query.akhir } }
    )
    .then((result) => {
      res.json(result);
    });
});
app.get("/api/waktu", (req, res) => {
  db.collection("waktu")
    .find({ idnya: "0" })
    .toArray()
    .then((result) => {
      res.json(result);
    });
});
app.post("/api/chatbot", (req, res) => {
  let pesan = req.body.senderMessage;
  pesan = pesan.split("_");
  const username = pesan[0].replace("/get ", "");
  // const lahir = pesan[1];
  const ibu = pesan[1];
  console.log(ibu);
  db.collection("user")
    .findOne({ username: username, Ibu: ibu.toUpperCase() })
    .then((result) => {
      if (result) {
        res.json({
          data: [
            {
              message: `Halo *${result.nama}*, anda sudah terdaftar sebagai pemilih, password anda adalah *${result.password}*
                        
              `,
            },
          ],
        });
      } else {
        res.json({
          data: [
            {
              message: `Data tidak ditemukan 
                        Silahkan hubungi nomor berikut untuk informasi lebih lanjut

                        https://wa.me/message/KJL5XZYGFLQDG1
              `,
            },
          ],
        });
      }
    });
});

client.connect((err) => {
  if (err) {
    console.error(err);
    return false;
  }
  // connection to mongo is successful, listen for requests
});

app.listen(PORT, () => {
  console.log(`listening for requests on port ${PORT}`);
});

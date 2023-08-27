const waktu = new Date();

const anu = new Date("2023-8-27 12:09:00");

setInterval(() => {
  const sekarang = Date.now();

  const milidetik = anu - sekarang;
  const detik = Math.floor(milidetik / 1000);
  const menit = Math.floor(detik / 60);
  const jam = Math.floor(menit / 60);
  const hari = Math.floor(jam / 24);
  const minggu = Math.floor(hari / 7);

  console.log(
    `Sisa waktu: ${minggu} minggu ${hari % 7} hari ${jam % 24} jam ${
      menit % 60
    } menit ${detik % 60} detik`
  );
}, 1000);

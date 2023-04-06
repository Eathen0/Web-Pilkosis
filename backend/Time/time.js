const Time = () => {
  let waktu = new Date();

  const nama_hari = [
    "Minggu",
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jumat",
    "Sabtu",
  ];

  const tahun = waktu.getFullYear();
  const bulan = waktu.getMonth();
  const hari = nama_hari[waktu.getDay()];
  const tanggal = waktu.getDate();
  const jam = waktu.getHours();
  const menit = waktu.getMinutes();
  const detik = waktu.getSeconds();

  const waktunya = `${hari} ${tanggal}-${bulan}-${tahun} ${jam}:${menit}:${detik}`;

  return waktunya;
};

// console.log(Time());
export default Time;

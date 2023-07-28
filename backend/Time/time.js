const Time = () => {
  let waktu = new Date();
  const tahun = waktu.getFullYear();
  const bulan = waktu.getMonth();
  // const hari = nama_hari[waktu.getDay()];
  const tanggal = waktu.getDate();
  const jam = waktu.getHours();
  const menit = waktu.getMinutes();
  const detik = waktu.getSeconds();
  const milidetik = waktu.getMilliseconds();

  const waktunya = `${tahun}${bulan}${tanggal}${jam}${menit}${detik}${milidetik}`;
  const untukNamaFile = ``;

  return waktunya;
  //
  // return untukNamaFile;
};

// console.log(Time());
export default Time;

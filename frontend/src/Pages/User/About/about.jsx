import c1 from './about-assets/c1.jpeg'
import c2 from './about-assets/c2.jpeg'
import c3 from './about-assets/c3.jpeg'

export default function About() {
  const cartsMany = [
    {
      foto: c1,
      nama: 'Riziq Lili Ulil Albab',
      kelas: 'X',
      jurusan: 'PPLG'
    },
    {
      foto: c2,
      nama: 'Putri Nurinita Sari',
      kelas: 'X',
      jurusan: 'PPLG'
    },
    {
      foto: c3,
      nama: 'Muhammad Adam Maulana Nuradyan',
      kelas: 'X',
      jurusan: 'PPLG'
    },
    {
      foto: c3,
      nama: 'Malikah',
      kelas: 'X',
      jurusan: 'PPLG'
    },
  ];

  return (
    <div className="pt-20">
      <h1 className="text-3xl text-center">Website Contributors</h1>
      <div className="flex flex-wrap gap-10 justify-center items-center w-full h-auto px-28 pb-10 pt-10">
        {cartsMany.map((el, ix) => {
          return (
            <div
              key={ix}
              className="p-2 hover:shadow-[3px_3px_10px_black] text-white transition-all duration-500 w-64 h-64 bg-slate-400 rounded-xl overflow-hidden flex flex-col"
            >
              <img
                className="hover:opacity-0 object-cover transition-all duration-500 absolute shadow-[1px_0_5px_black] w-[15rem] h-[15rem]"
                src={el.foto}
              />
              <div className="flex flex-col w-full h-full justify-center">
                <h1 className="font-bold text-lg mt-3 ml-3">{el.nama}</h1>
                <div className="m-2 p-2 flex gap-2 shadow-lg items-center w-full">
                  <ul>
                    <li>kelas</li>
                    <li>jurusan</li>
                  </ul>
                  <ul>
                    <li> : {el.kelas}</li>
                    <li> : {el.jurusan}</li>
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

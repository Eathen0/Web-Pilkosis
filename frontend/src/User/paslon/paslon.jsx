export default function Paslon({
  popUpS,
  selectMisi,
  SelectProker,
  paslonIMG,
}) {
  function MisiBTN({ misisID }) {
    return (
      <button
        onClick={() => {
          popUpS(true);
          selectMisi(misisID);
        }}
        className="hover:bg-white/30 transition-colors bg-black/50 rounded-md"
      >
        Visi Dan Misi
      </button>
    );
  }

  function ProkerBTN(prokerId) {
    return (
      <button
        onClick={() => {
          popUpS(true);
          SelectProker(prokerId);
        }}
        className="hover:bg-white/30 transition-colors bg-black/50 rounded-b-xl"
      >
        Program Kerja
      </button>
    );
  }

  return (
    <>
      {/* <div className='bg-gray-400 w-full h-16 text-white'>
            </div> */}
      <div className="text-white grid grid-cols-2 gap-10 justify-items-center content-center w-full h-auto px-28 pb-10 pt-10">
        <div className="rounded-t-[40%] rounded-b-xl bg-gradient-to-br from-blue-600 from-10% to-[#40128B] w-72 h-80 pb-4 grid justify-center align-middle gap-3">
          <img
            className="rounded-t-[50%] rounded-b-xl w-64 h-52 mt-3 flex justify-center object-cover"
            src={sampleImage}
            sizes="cover"
          ></img>
          <MisiBTN misisID={1} />
          <ProkerBTN prokerId={1} />
        </div>
        <div className="rounded-t-[40%] rounded-b-xl bg-gradient-to-br from-blue-600 from-10% to-[#40128B] w-72 h-80 pb-4 grid justify-center align-middle gap-3">
          <div className="rounded-t-[50%] rounded-b-xl bg-black w-64 h-52 mt-3"></div>
          <MisiBTN misisID={2} />
          <ProkerBTN prokerId={2} />
        </div>
        <div className="rounded-t-[40%] rounded-b-xl bg-gradient-to-br from-blue-600 from-10% to-[#40128B] w-72 h-80 pb-4 grid justify-center align-middle gap-3">
          <div className="rounded-t-[50%] rounded-b-xl bg-black w-64 h-52 mt-3"></div>
          <MisiBTN misisID={3} />
          <ProkerBTN prokerId={3} />
        </div>
        <div className="rounded-t-[40%] rounded-b-xl bg-gradient-to-br from-blue-600 from-10% to-[#40128B] w-72 h-80 pb-4 grid justify-center align-middle gap-3">
          <div className="rounded-t-[50%] rounded-b-xl bg-black w-64 h-52 mt-3"></div>
          <MisiBTN misisID={4} />
          <ProkerBTN prokerId={4} />
        </div>
      </div>
    </>
  );
}

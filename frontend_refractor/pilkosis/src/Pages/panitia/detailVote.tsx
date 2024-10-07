import { Isearch, IThumbsUp } from "@components/icons"
import Popup from "@components/popup"
import CTitle from "@components/title"
import authorizer from "@utils/authorizer"
import tryRequest from "@utils/tryRequest"
import { Dispatch, useEffect, useState } from "react"
import { useNavigate, useOutletContext } from "react-router-dom"
import { Bounce, toast, ToastContainer } from "react-toastify"
import "@toastifyCss"
import CInput from "@components/input"


interface DetailVote {
   created_at: string
   id: number
   paslon_id?: number
   pemilih: string
   user_id: number
   voted_caksis?: number
   voted_cawaksis?: number
}


export default function DetailVote () {
   const navigate = useNavigate()
   const [dataDetailVote, setDataDetailVote] = useOutletContext<{detailVote: [dataDetailVote: DetailVote[] | undefined, setDataDetailVote: Dispatch<DetailVote[] | undefined>]}>().detailVote
   const [CPopup, triggerPopup] = Popup()

   const handdleDelete = (id: number) => {
      tryRequest({
         apiEndPoint: '/api/voted',
         axiosOptions: {
            method: 'DELETE',
            params: { id }
         },
         async tryAgainCallback(_, tryAgain) {
            const auth = await authorizer('panitia')
            if (Array.isArray(auth))
               return tryAgain()
            else 
               return navigate('/')
         },
         onSucceed() {
            setDataDetailVote(dataDetailVote?.filter(data => data.id !== id))
            toast.success('Berhasil menghapus data', { containerId: 'detailVote' })
         },
         onFailed(err) {
            toast.error(`Gagal menghapus data "${err.message}"`, { containerId: 'detailVote' })
         }
      })
   }

   const [searchableDVote, setSearchableDVote] = useState<DetailVote[] | undefined>()
   useEffect(() => { 
      if (dataDetailVote)
         setSearchableDVote(dataDetailVote)
   }, [dataDetailVote])
   const [searchText, setSearchText] = useState('')
   const handdleSearch = (ev: any) => {
      ev.preventDefault()
      
      if (searchText.length === 0) return setSearchableDVote(dataDetailVote)

      const searchResult = dataDetailVote?.filter(data => data.pemilih.toLowerCase().includes(searchText.toLowerCase()))
      if (searchResult) setSearchableDVote(searchResult)
   }

   return (
      <>
         <CTitle text="Detail Pemilih" logo={<IThumbsUp width="30" height="30" />} />

         <form onSubmit={handdleSearch} className="flex gap-4 justify-center items-end mb-10">
            <CInput value={searchText} onChange={ev => setSearchText(ev.target.value)} name="searchPemilih" placeholder="Cari Nama Pemilih" type="text"  />
            <button type="submit" className="w-fit p-1.5 shadow-sm rounded-full bg-primary hover:bg-primary/75 transition-colors duration-200">
               <Isearch width="37" height="37" color="white" />
            </button>
         </form>

         <table className="w-full">
            <thead className="h-10 text-accent-primary">
               <tr>
                  <th className="border border-primary">Nama Pemilih</th>
                  <th className="border border-primary">Waktu Memilih</th>
                  <th className="border border-primary">Sudah Memilih Caksis</th>
                  <th className="border border-primary">Sudah Memilih Cawaksis</th>
                  <th className="border border-primary">Aksi</th>
               </tr>
            </thead>
            <tbody>
               {searchableDVote?.map((data, index) => (
                  <tr key={index} className="h-14">
                     <td className="text-center min-w-52 border border-primary">{ data.pemilih }</td>
                     <td className="text-center min-w-52 border border-primary">{ new Date(data.created_at).toLocaleString('id', {dateStyle: 'medium', timeStyle: 'medium'}) }</td>
                     <td className="text-center min-w-52 border border-primary">
                        <span className={`${data.voted_caksis ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'} text-sm px-3 py-[0.1rem] text-center rounded-full`}>
                           { data.voted_caksis ? 'Sudah' : 'Belum' }
                        </span>
                     </td>
                     <td className="text-center min-w-52 border border-primary">
                        <span className={`${data.voted_cawaksis ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'} text-sm px-3 py-[0.1rem] text-center rounded-full`}>
                           { data.voted_cawaksis ? 'Sudah' : 'Belum' }
                        </span>
                     </td>
                     <td className="text-center min-w-52 border border-primary">
                        <button onClick={() => triggerPopup({message: `Yakin ingin menghapus pilihan dari ${data.pemilih}`, onConfirm: () => handdleDelete(data.id)})} className="py-1 px-4 rounded-full text-red-800 border border-red-500 text-sm shadow-sm cursor-pointer hover:bg-red-500 hover:text-white transition-colors duration-200">hapus</button>
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>

         <CPopup title="Yakin" />
         <ToastContainer
            containerId='detailVote'
				position="top-center"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="light"
				transition={Bounce}
			/>
      </>
   )
}
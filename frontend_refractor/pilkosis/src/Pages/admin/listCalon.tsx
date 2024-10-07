import FallbackErrorContent from "@components/contentErrorFallback"
import FallbackLoadContent from "@components/contentLoadFallback"
import { IThumbsUp } from "@components/icons"
import CImage from "@components/loadImage"
import CTitle from "@components/title"
import { Suspense } from "react"
import { Await, Link, useLoaderData, useNavigate } from "react-router-dom"
import { Bounce, toast, ToastContainer } from "react-toastify"
import '@toastifyCss'
import Popup from "@components/popup"
import tryRequest from "@utils/tryRequest"
import cache from "@utils/cache"
import authorizer from "@utils/authorizer"

const origin = import.meta.env.VITE_HOST_BACKEND

type DataCalon = {
   id: string;
   nomor_urut: string;
   nama: string;
   calon_jabatan: string;
   visi: string;
   misi: string;
   program_kerja: string;
   img: string;
   ttl: string;
   motto: string;
   alamat: string;
   kelas: string
}

export default function ListCalon () {
   const { dataCaksis, dataCawaksis } = (useLoaderData() as { dataCaksis: any, dataCawaksis: any }) || { dataCaksis: [], dataCawaksis: [] }
   const [CPopup, triggerPopup] = Popup()
   const navigate = useNavigate()

   const handdleDelete = (id: string) => {
      tryRequest({
         apiEndPoint: `/api/calon/${id}`,
         axiosOptions: { method: 'delete', validateStatus: status => status <= 200, headers: { Authorization: `Bearer ${cache.get('accessToken')}` } },
         async tryAgainCallback (_, tryAgain) {
            cache.delete("accessToken");
				if (Array.isArray(await authorizer("admin")))
					//? if the authorizer is successfull the return value will be an array
					return tryAgain();
				return navigate("/");
         },
         onSucceed () {
            toast.success('Berhasil Menghapus Calon', { containerId: 'listcalon' })
            window.location.reload()
         },
         onFailed () {
            toast.error('Gagal Menghapus Calon', { containerId: 'listcalon' })
         }
      })
   }

   return (
      <>
         <ToastContainer
            containerId='listcalon'
            key='caksis'
            className="z-50"
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
         <CPopup message="Anda Yakin Ingin Menghapus Calon Ini" title="Hapus?" />

         <CTitle text='Daftar Calon' logo={<IThumbsUp width='30' height='30' />} />
         <Link to='/admin/calon/tambah' className="px-6 py-2 rounded-md hover:shadow-lg transition-shadow duration-300 border-2 border-thirdtiary">Tambah</Link>

         <h2 className="text-xl font-semibold text-accent-primary mb-4 mt-8">Daftar Calon Ketua Osis</h2>
         <div>
            <Suspense fallback={<FallbackLoadContent />}>
               <Await 
                  errorElement={<FallbackErrorContent message="gagal memuat data caksis" />}
                  resolve={dataCaksis}
                  children={(data: DataCalon[]) => 
                     data.map((item, index) => (
                        <div key={index} className="flex gap-4 items-center mb-4">
                           <CImage src={`${origin}/uploads/${item.img}`} alt={item.nama} className="w-20 h-20 rounded-full object-cover border border-accent-primary" />
                           <div className="grow">
                              <p>
                                 <span className="font-semibold">Nama: </span>
                                 {item.nama}
                              </p>
                              <p>
                                 <span className="font-semibold">Kelas: </span>
                                 {item.kelas}
                              </p>
                           </div>
                           <button onClick={() => triggerPopup({ onConfirm: () => handdleDelete(item.id) })} className="py-1 px-4 rounded-full text-red-800 border border-red-500 text-sm shadow-sm cursor-pointer hover:bg-red-500 hover:text-white transition-colors duration-200">hapus</button>
                        </div>
                     ))
                  }
               />
            </Suspense>
         </div>

         <h2 className="text-xl font-semibold text-accent-primary mb-4 mt-8">Daftar Calon Wakil Ketua Osis</h2>
         <div>
         <Suspense fallback={<FallbackLoadContent />}>
               <Await 
                  errorElement={<FallbackErrorContent message="gagal memuat data cawaksis" />}
                  resolve={dataCawaksis}
                  children={(data: DataCalon[]) => 
                     data.map((item, index) => (
                        <div key={index} className="flex gap-4 items-center mb-4">
                           <CImage src={`${origin}/uploads/${item.img}`} alt={item.nama} className="w-20 h-20 rounded-full object-cover border border-accent-primary" />
                           <div className="grow">
                              <p>
                                 <span className="font-semibold">Nama: </span>
                                 {item.nama}
                              </p>
                              <p>
                                 <span className="font-semibold">Kelas: </span>
                                 {item.kelas}
                              </p>
                           </div>
                           <button onClick={() => triggerPopup({ onConfirm: () => handdleDelete(item.id) })} className="py-1 px-4 rounded-full text-red-800 border border-red-500 text-sm shadow-sm cursor-pointer hover:bg-red-500 hover:text-white transition-colors duration-200">hapus</button>
                        </div>
                     ))
                  }
               />
            </Suspense>
         </div>
      </>
   )
}
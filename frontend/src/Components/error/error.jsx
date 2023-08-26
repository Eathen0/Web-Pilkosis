import { Link } from "react-router-dom"

export default function ErrorPage() {
    return (
        <div className="flex flex-col items-center justify-center h-screen gap-5 text-center">
            <h1 className="font-bold text-5xl">Error!</h1>
            <p>Halaman tidak di temukan, coba masukan alamat yang benar</p>
            <Link to={"/"}><span className="text-blue-500 underline">Kembali ke halaman</span></Link>
        </div>
    )
}
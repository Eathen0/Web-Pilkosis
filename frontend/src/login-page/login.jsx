import logoSmk from '../assets/logo-smk.png'
import logoOsis from '../assets/logo-osis.png'

export default function LoginPage() {
    return (
        <div className="flex justify-center items-center w-full h-screen bg-login bg-cover flex-col gap-4">
            <div className="flex gap-10 items-center">
                <img src={logoSmk} alt="logo smkn 1 kebumen" className="bg-white rounded-full w-16 h-16" />
                <img src={logoOsis} alt="logo osis" className="w-16 h-[4.5rem]" />
            </div>
            <div className="flex items-center justify-center flex-col gap-10 backdrop-blur-sm bg-slate-950/50 w-[40rem] h-[25rem] rounded-xl">
                <h2 className="text-xl font-bold mb-2 text-white">Login</h2>
                <form className='w-96'>
                    <div className="mb-4">
                        <label className="block text-white font-bold mb-2">Username</label>
                        <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                        id="username"
                        type="text"
                        placeholder="Username"/>
                    </div>
                    <div className="mb-6">
                        <label className="block text-white font-bold mb-2">Password</label>
                        <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight"
                        id="password"
                        type="password"
                        placeholder="password"/>
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                        className="bg-blue-500 hover:bg-cyan-500 transition text-white font-bold py-2 px-4 rounded"
                        type="button">
                        Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
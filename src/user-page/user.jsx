export default function UserPage({ onClick }) {
    return (
        <div className="flex justify-center items-center w-full h-screen">
            <button onClick={onClick} 
            className="bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-md 
                text-white w-20 h-10 hover:w-40 hover:rounded-xl">
                click me
            </button>
        </div>
    )
}
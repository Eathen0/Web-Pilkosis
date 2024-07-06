import { Outlet } from 'react-router-dom'
import './App.css'
import Auth from './Middleware/Auth'

function App() {
  // const [count, setCount] = useState(0)
  Auth("/user")
  return (
    <>
      <Outlet />
    </>
  )
}

export default App

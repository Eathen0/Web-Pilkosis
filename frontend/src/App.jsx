import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import LoginPage from './login-page/login'
import User from './User/userComponent/user'
import Admin from './Admin/adminComponent/admin'

export default function App() {
  // const [swich, setSwich] = useState(false)
  // const [pageName, setPageName] = useState("login")
  // function handle() {
  //   swich ? setPageName("login") : setPageName("pilkosis")
  //   setSwich(!swich)
  // }

  // useEffect(() => {
  //   document.title = pageName
  // }, [pageName])


  return (
    < >
        <Router>
          <Routes>
            <Route path='/' element={<LoginPage />} />
            <Route path='/User' element={<User />} />
            <Route path='/Admin' element={<Admin />} />
          </Routes>
        </Router>
    </>
  )
}
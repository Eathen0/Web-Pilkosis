import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useState, useEffect } from 'react';

// Utility
//component
import LoginPage from '../Components/login-page/login';
import SlideBar from '../Components/slide-bar/slidebar';
import ErrorPage from '../Components/error-page/error';
import Paslon from '../Components/paslon/paslon';

//action
import userAuth from './action/userAuth';
import adminAuth from './action/adminAuth';

//loader
import getPaslon from './loader/getPaslon';
import getTotal from './loader/getTotal';

// Pages
//user
import User from '../Pages/User/userComponent/user';
import About from '../Pages/User/About/about';
import Feedback from '../Pages/User/Feedback/Feedback';

//admin
import Admin from '../Pages/Admin/adminComponent/admin';
import EditPaslon from '../Pages/Admin/editPaslon/editPaslon';
import Grafik from '../Pages/Admin/grafik/grafik';

function Router() {
    // change Page title
    const [pageName, setPageName] = useState("not found")
    useEffect(() => {
        document.title = `pilkosis - ${pageName}`
    }, [pageName])

    const [userHak, setUserHak] = useState("")
    const [triger, setTriger] = useState(true)
    useEffect(() => {
        setUserHak(new Object(JSON.parse(localStorage.getItem("token"))).hak)
    }, [triger])


    const routerPage = createBrowserRouter([
        {
            path: "/",
            element: <SlideBar />,
            errorElement: <ErrorPage />,
            children: [
                {
                    path: "admin",
                    element: <Admin pageName={setPageName} />,
                    action: adminAuth, //auth
                    children: [
                        {
                            path: "daftar_paslon",
                            element: <Paslon />,
                            loader: getPaslon //api query
                        },
                        {
                            path: "edit_paslon",
                            element: <EditPaslon />
                        },
                        {
                            path: "grafik",
                            element: <Grafik />,
                            loader: getTotal //api query
                        }
                    ]
                },
                {
                    path: "user",
                    element: <User pageName={setPageName} />,
                    action: userAuth, //auth
                    children: [
                        {
                            path: "daftar_paslon",
                            element: <Paslon />,
                            loader: getPaslon //api query
                        },
                        {
                            path: "about",
                            element: <About />
                        },
                        {
                            path: "feedback",
                            element: <Feedback />
                        }
                    ]
                }
            ]
        },
        {
            path: "/login",
            element: <LoginPage loginTriger={setTriger} pageName={setPageName}  />,
        }
    ]);

    return (
        <RouterProvider router={routerPage} />
    );
}

export default Router;
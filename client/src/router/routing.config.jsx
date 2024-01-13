import {BrowserRouter, Routes, Route} from "react-router-dom"

import Homelayout from "../pages/layouts/home/home.layout"
import LandingPage from "../pages/home/landing/landing.page"
import RegisterPage from "../pages/home/auth/register"

export const Routing = ()=>{
    return (<>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Homelayout/>}>
                    <Route index element={<LandingPage/>}/>
                    <Route path='register' element={<RegisterPage/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    </>)
}

export default Routing
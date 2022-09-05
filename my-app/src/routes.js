import React from "react"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Main from "./pages/Main"
import imgUrl from './assets/imgs/welcome.gif'
import MenuPage from "./pages/Setting/Menu"
import UserPage from "./pages/Setting/User"

export default (
    <Router>
        <Routes>
            <Route path="/" element={<Main />}>
                <Route index element={<img src={imgUrl} alt="es-lint want to get" style={{ width: '100%' }} />} />
                <Route path="/setting/menu" element={<MenuPage />} />
                <Route path="/setting/user" element={<UserPage />} />
            </Route>
        </Routes>
    </Router>
)

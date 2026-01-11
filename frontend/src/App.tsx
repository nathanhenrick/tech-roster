import { Routes, Route } from 'react-router-dom'
import AdminLayout from './layouts/AdminLayout/AdminLayout'
import NoneLayout from './layouts/NoneLayout'

import Login from "./pages/Login/Login"
import Developers from "./pages/Developers"
import Levels from "./pages/Levels/Levels"

import './index.scss'
import NotFound from './pages/NotFound'

function App() {
  return (
    <Routes>
      {/* Admin */}
      <Route element={<AdminLayout />}>
        <Route path='/admin/desenvolvedores' element={<Developers />}></Route>
        <Route path='/admin/niveis' element={<Levels />}></Route>
      </Route>

      {/* Login */}
      <Route element={<NoneLayout />}>
        <Route path='/admin/login' element={<Login />}></Route>
      </Route>

      {/* Fallback */}
      <Route element={<NoneLayout />}>
        <Route path='*' element={<NotFound />}></Route>
      </Route>
    </Routes>
  )
}

export default App

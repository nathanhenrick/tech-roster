import { Routes, Route, Navigate } from 'react-router-dom'
import AdminLayout from './layouts/AdminLayout/AdminLayout'
import NoneLayout from './layouts/NoneLayout'

import Login from "./pages/Auth/Login"
import Developers from "./pages/Developers/Developers"
import Levels from "./pages/Levels/Levels"
import ProtectedRoute from './services/routes/ProtectedRoute'

import './index.scss'
import NotFound from './pages/NotFound/NotFound'
import Register from './pages/Auth/Register'

function App() {
  return (
    <Routes>
      {/* Admin */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
          <Route path="/" element={<Navigate to="/admin/cadastrar" replace />} />
          <Route path='/admin/desenvolvedores' element={<Developers />}></Route>
          <Route path='/admin/niveis' element={<Levels />}></Route>
        </Route>
      </Route>

      {/* Fallback */}
      <Route element={<NoneLayout />}>
        <Route path='admin/login' element={<Login />}></Route>
        <Route path='admin/cadastrar' element={<Register />}></Route>
        <Route path='*' element={<NotFound />}></Route>
      </Route>
    </Routes>
  )
}

export default App

import { NavLink, useNavigate } from 'react-router-dom'
import { BsPeople, BsLayers, BsBoxArrowRight } from 'react-icons/bs'
import styles from './Sidebar.module.scss'
import { useIsLoading } from "../../components/isLoading/isLoading"
import { AuthService } from '../../services'
import { ToastContainer, toast } from 'react-toastify'

function Sidebar() {
  const { isLoadingStart, isLoadingStop } = useIsLoading()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      isLoadingStart()

      await AuthService.logout()

      localStorage.removeItem("token")
      
      toast.success('Saindo...')
      setTimeout(() => {
        navigate('/admin/login')
      }, 2000);
    } catch (error) {
      console.error(error)
    } finally {
      isLoadingStop()
    }
  }

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <img src="/logoFullColor.svg" alt="Logo da TechRoster" />
      </div>

      <hr className={styles.line} />

      <nav className={styles.nav}>
        <div>
          <NavLink
            to="/admin/desenvolvedores"
            className={({ isActive }) =>
              `${styles.navItem} ${isActive ? styles.navItemActive : ''}`
            }
          >
            <BsPeople />
            <span>Desenvolvedores</span>
          </NavLink>

          <NavLink
            to="/admin/niveis"
            className={({ isActive }) =>
              `${styles.navItem} ${isActive ? styles.navItemActive : ''}`
            }
          >
            <BsLayers />
            <span>Níveis</span>
          </NavLink>
        </div>

        <button
          className={styles.navItem}
          onClick={handleLogout}
        >
          <BsBoxArrowRight />
          <span>Sair</span>
        </button>
      </nav>
      <ToastContainer />
    </aside>
  )
}

export default Sidebar

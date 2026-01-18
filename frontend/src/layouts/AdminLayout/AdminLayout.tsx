import { Outlet } from "react-router-dom"
import Sidebar from "../../components/Sidebar/Sidebar"
import { Footer } from "../../components/Footer/Footer"
import styles from './AdminLayout.module.scss'

interface AdminLayoutProps {
  header?: React.ReactNode
}

export default function AdminLayout({ header }: AdminLayoutProps) {
  return (
    <div className={styles.container}>
      <Sidebar />

      <div className={styles.mainContent}>
        {header && <header className={styles.header}>{header}</header>}

        <div className={styles.pageContent}>
          <Outlet />
        </div>

        <Footer />
      </div>
    </div>
  )
}

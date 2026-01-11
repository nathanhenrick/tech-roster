import { useState } from 'react'
import {
  BsPeople,
  BsLayerForward,
  BsBoxArrowRight
} from "react-icons/bs"
import styles from './Sidebar.module.scss'

export function Sidebar() {
  const [activeMenu, setActiveMenu] = useState('levels')

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <div className={styles.logoIcon}>
          <img src="/src/assets/images/logoFullColor.svg" alt="TechRoster Logo" />
        </div>
      </div>

      <hr className={styles.line} />

      {/* Navigation tabs */}
      <nav className={styles.nav}>
        <div>
          <button
            className={`${styles.navItem} ${activeMenu === 'desenvolvedores' ? styles.navItemActive : ''}`}
            onClick={() => setActiveMenu('desenvolvedores')}
          >
            <BsPeople />
            <span>Desenvolvedores</span>
          </button>
          <button
            className={`${styles.navItem} ${activeMenu === 'niveis' ? styles.navItemActive : ''}`}
            onClick={() => setActiveMenu('niveis')}
          >
            <BsLayerForward />
            <span>Níveis</span>
          </button>
        </div>

        <button
          className={`${styles.navItem} ${activeMenu === 'niveis' ? styles.navItemActive : ''}`}
          onClick={() => setActiveMenu('niveis')}
        >
          <BsBoxArrowRight />
          <span>Sair</span>
        </button>
      </nav>
    </aside>
  )
}

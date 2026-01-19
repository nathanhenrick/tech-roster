import { Link, useNavigate } from 'react-router-dom'
import styles from './NotFound.module.scss'

export default function NotFound() {
  const navite = useNavigate()

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <span className={styles.code}>404</span>
        <h1>Página não encontrada</h1>
        <p>
          A rota que você tentou acessar não existe ou foi removida.
        </p>

        <div className={styles.btnContainer}>
          <Link to="" onClick={() => navite(-1)} className={styles.button}>
            Página anterior
          </Link>
          <Link to="" onClick={() => navite('/admin/cadastrar')} className={styles.button}>
            Início
          </Link>
        </div>
      </div>
    </div>
  )
}

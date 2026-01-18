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

        <Link to="" onClick={() => navite(-1)} className={styles.button}>
          Voltar
        </Link>
      </div>
    </div>
  )
}

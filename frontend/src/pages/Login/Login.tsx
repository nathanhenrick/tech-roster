// Components
import { useIsLoading } from "../../components/isLoading/isLoading"
import { Button } from "../../components/Button/Button"

import Loader from "../../components/isLoading/Loader"

// Style
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import styles from './Login.module.scss'

// Logic
import { useState } from "react";

export default function Login() {
  const { isLoading, isLoadingStart, isLoadingStop } = useIsLoading()

  const [showPassword, setShowPassword] = useState(false)

  const handleClick = async () => {
    try {
      isLoadingStart()
      await new Promise((resolve) => setTimeout(resolve, 1000000))
    } catch (error) {
      console.error(error)
    } finally {
      isLoadingStop()
    }
  }

  const togglePassword = () => {
    setShowPassword(prev => !prev)
  }

  return (
    <div className={styles.container}>
      <aside className={styles.aside}></aside>
      <section className={styles.section}>
        <img src="/src/assets/images/logoFullColor.svg" alt="TechRoster Logo" />
        <h1>Bem-vindo!</h1>
        <h2>Insira suas credenciais.</h2>
        <form>
          <input type="email" name="email" placeholder="E-mail" />
          <div className={styles.passwordView}>
            <input type={showPassword ? 'text' : 'password'} name="password" placeholder="Senha" />
            <button type="button" onClick={togglePassword}>
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>
          <Button onClick={handleClick} label={isLoading ? <Loader /> : "Entrar"} />
        </form>
      </section>
    </div>
  )
}

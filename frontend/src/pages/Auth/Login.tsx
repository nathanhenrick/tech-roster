import { useIsLoading } from "../../components/isLoading/isLoading"
import { Button } from "../../components/Button/Button"

import Loader from "../../components/isLoading/MiniLoader"

import { FaEye, FaEyeSlash } from "react-icons/fa6";
import styles from './Auth.module.scss'

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthService } from "../../services";
import { ToastContainer, toast } from 'react-toastify'
import axios from "axios";

export default function Login() {
  const { isLoading, isLoadingStart, isLoadingStop } = useIsLoading()
  const [form, setForm] = useState({
    email: "",
    password: "",
  })
  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault()
    try {
      isLoadingStart()
      const { token } = await AuthService.login(form)

      localStorage.setItem('token', token)

      toast.success('Login realizado com sucesso')

      setTimeout(() => {
        navigate('/admin/desenvolvedores')
      }, 2000);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          switch (error.response.status) {
            case 401:
              toast.error('Credenciais inválidas!')
              break
            case 422:
              toast.error('Preencha todos os campos!')
              break
            default:
              toast.error("Erro ao entrar, tente novamente mais tarde")
          }
        } else if (!error.request) {
          toast.error('Sem respota do servidor, tente novamente mais tarde')
        }
      }

      console.error(error)
    } finally {
      isLoadingStop()
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const togglePassword = () => {
    setShowPassword(prev => !prev)
  }

  return (
    <div className={styles.container}>
      <aside className={styles.aside}></aside>
      <section className={styles.section}>
        <img src="/logoFullColor.svg" alt="TechRoster Logo" />
        <h1>Bem-vindo!</h1>
        <h2>Insira suas credenciais.</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            data-testid="login-email"
            onChange={handleChange}
            value={form.email}
            type="email"
            name="email"
            placeholder="E-mail"
          />
          <div className={styles.passwordView}>
            <input
              data-testid="login-password"
              onChange={handleChange}
              value={form.password}
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Senha"
            />
            <button type="button" onClick={togglePassword}>
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>
          <Button data-testid="btn_login"
            type="submit" label={isLoading ? <Loader /> : "Entrar"} />
          <small>Não tem conta? <Link to="/admin/cadastrar">Cadastre-se</Link></small>
        </form>
      </section>
      <ToastContainer />
    </div>
  )
}

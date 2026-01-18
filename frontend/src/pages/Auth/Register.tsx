import { useIsLoading } from "../../components/isLoading/isLoading"
import { Button } from "../../components/Button/Button"

import Loader from "../../components/isLoading/MiniLoader"

import { FaEye, FaEyeSlash } from "react-icons/fa6";
import styles from './Auth.module.scss'

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthService } from "../../services";
import { ToastContainer, toast } from 'react-toastify'

export default function Register() {
  const { isLoading, isLoadingStart, isLoadingStop } = useIsLoading()
  const [form, setForm] = useState({
    email: "",
    password: "",
    password_confirmation: "",
  })

  const [showPassword, setShowPassword] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault()
    try {
      isLoadingStart()
      await AuthService.register(form)

      toast.success('Registro concluído com sucesso! Por favor, faça login')
      setTimeout(() => {
        navigate('/admin/login')
      }, 2000);
    } catch (error) {
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
        <h1>Criar conta</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input onChange={handleChange} value={form.email} type="email" name="email" placeholder="E-mail" />

          <div className={styles.passwordView}>
            <input onChange={handleChange} value={form.password} type={showPassword ? 'text' : 'password'} name="password" placeholder="Senha" />
            <button type="button" onClick={togglePassword}>
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>

          <div className={styles.passwordView}>
            <input onChange={handleChange} value={form.password_confirmation} type={showPassword ? 'text' : 'password'} name="password_confirmation" placeholder="Confirme sua senha" />
            <button type="button" onClick={togglePassword}>
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>

          <Button type="submit" disabled={isLoading} label={isLoading ? <Loader /> : "Cadastrar"} />
          <small>Já tem uma conta? <Link to="/admin/login">Faça seu login</Link></small>
        </form>
      </section>
      <ToastContainer />
    </div>
  )
}

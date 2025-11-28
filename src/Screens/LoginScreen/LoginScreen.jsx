import React, { useEffect } from 'react'
import './LoginScreen.css'
import useFetch from '../../hooks/useFetch.jsx'
import useForm from '../../hooks/useForm.jsx'
import {login} from '../../services/authService.js'
import { useNavigate, Link } from 'react-router'
import LOCALSTORAGE_KEYS from '../../constants/localstorage.js'

const FORM_FIELDS = {
    EMAIL: 'email',
    PASSWORD: 'password'
}

const initial_form_state = {
    [FORM_FIELDS.EMAIL]: '',
    [FORM_FIELDS.PASSWORD]: ''
}

export const LoginScreen = () => {

    const navigate = useNavigate()

    const {
        sendRequest,
        loading,
        response,
        error
    } = useFetch()
    
    const onLogin = (form_state) => {
        sendRequest(() => login(
            form_state[FORM_FIELDS.EMAIL],
            form_state[FORM_FIELDS.PASSWORD]
        ))
    }

    useEffect(
      () =>{
        console.log(response)
        if(response && response.ok){
          //Guardamos el token emitido por el backend, para despues usarlo como credencial
          localStorage.setItem(LOCALSTORAGE_KEYS.AUTH_TOKEN, response.data.authorization_token)
          navigate('/home')
        }
      },
      [response]
    )

    const {
        form_state: login_form_state,
        handleSubmit,
        handleInputChange
    } = useForm(
        {
            initial_form_state,
            onSubmit: onLogin
        }
    )

    return (
        <div className="login-wrapper">
            <div className="login-card">
                <h1>Iniciar Sesión</h1>

                <form className="login-form" onSubmit={handleSubmit}>
                    <input
                        name={FORM_FIELDS.EMAIL}
                        type="email"
                        placeholder="Enter your email"
                        onChange={handleInputChange}
                        value={login_form_state[FORM_FIELDS.EMAIL]}
                    />

                    <input
                        name={FORM_FIELDS.PASSWORD}
                        type="password"
                        placeholder="Enter your password"
                        onChange={handleInputChange}
                        value={login_form_state[FORM_FIELDS.PASSWORD]}
                    />

                    <button type="submit" className="btn-primary" disabled={loading}>
                        {loading ? 'Ingresando...' : 'Log in'}
                    </button>

                    {error && <div className="msg error">{error.message}</div>}
                    {response && <div className="msg success">{response.message}</div>}

                    <div className="login-links">
                      <Link to="/register">Create Account</Link>
                      <div><Link to="/forgot">Forgot Password?</Link></div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginScreen
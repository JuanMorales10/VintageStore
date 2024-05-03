import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css'; // Asegúrate de que el archivo CSS está correctamente vinculado

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:3002/api/login', {
                method: 'POST',
                body: JSON.stringify({ email, password }),
                headers: { 'Content-Type': 'application/json' }
            });
            const data = await response.json();
            console.log("Login response:", data);
            // Aquí manejar la respuesta, como guardar token en localStorage, redireccionar, etc.
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <div className="login">
            <Link to="/">
                <img src="/path/to/your/logo.png" alt="Home" className="login-logo"/>
            </Link>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    required="required"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    required="required"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <button type="submit" className="btn btn-primary btn-block btn-large">Entrar.</button>
            </form>
        </div>
    );
};

export default LoginForm;


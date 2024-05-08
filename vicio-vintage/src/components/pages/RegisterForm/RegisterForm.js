import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Register.css'; // Asegúrate de que el archivo CSS está correctamente vinculado

const RegisterForm = () => {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [contrasena, setPassword] = useState('');
    const [direccion, setDireccion] = useState('');
    const [telefono, setTelefono] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:3002/api/users/', {
                method: 'POST',
                body: JSON.stringify({ nombre, email, contrasena, direccion, telefono }),
                headers: { 'Content-Type': 'application/json' }
            });
            const data = await response.json();
            console.log("Register response:", data);
            // Manejar la respuesta, como guardar token en localStorage, redireccionar, etc.
        } catch (error) {
            console.error('Registration failed:', error);
        }
    };

    return (
        <div className="register">
            <Link to="/">
                <img src="/path/to/your/logo.png" alt="Home" className="register-logo"/>
            </Link>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="nombre"
                    placeholder="Full Name"
                    required="required"
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                />
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
                    value={contrasena}
                    onChange={e => setPassword(e.target.value)}
                />
                <input
                    type="text"
                    name="direccion"
                    placeholder="Address"
                    value={direccion}
                    onChange={e => setDireccion(e.target.value)}
                />
                <input
                    type="text"
                    name="telefono"
                    placeholder="Phone"
                    value={telefono}
                    onChange={e => setTelefono(e.target.value)}
                />
                <button type="submit" className="btn btn-primary btn-block btn-large">Registrarse</button>
            </form>
        </div>
    );
};

export default RegisterForm;

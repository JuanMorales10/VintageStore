import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';  // Importa el CSS directamente si no usas CSS Modules

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [contrasena, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        const response = await fetch('http://localhost:3002/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, contrasena })
        });
        const data = await response.json();
        if (response.ok) {
            localStorage.setItem('token', data.token);
            navigate('/admin/dashboard');
        } else {
            alert(data.message || 'Invalid credentials');
        }
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                />
                <input
                    type="password"
                    value={contrasena}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <button onClick={handleLogin}>Login</button>
            </div>
        </div>
    );
};

export default AdminLogin;





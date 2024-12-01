// src/Paginas/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../componentes/logo.png'; // Importação da logo

const LoginContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80vh;
    background-color: #f0f0f0;
`;

const LoginBox = styled.div`
    background: white;
    padding: 40px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
    text-align: center;
`;

const Logo = styled.img`
    width: 150px;
    margin-bottom: 20px;
`;

const Title = styled.h2`
    margin-bottom: 20px;
    color: #333;
`;

const Input = styled.input`
    width: 100%;
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #ddd;
    border-radius: 4px;
`;

const Button = styled.button`
    width: 100%;
    padding: 10px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    &:hover {
        background-color: #45a049;
    }
`;

const ErrorMessage = styled.p`
    color: red;
`;

function Login({ onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const predefinedUser = {
        email: 'wesley@gmail.com',
        password: '123456',
    };

    const handleLogin = (e) => {
        e.preventDefault();

        if (email === predefinedUser.email && password === predefinedUser.password) {
            onLogin();
            navigate('/');
        } else {
            setError('Usuário ou senha inválidos!');
        }
    };

    return (
        <LoginContainer>
            <LoginBox>
                {/* Exibe a logo no topo */}
                <Logo src={logo} alt="Logo Pizzaria" />
                <Title>Login</Title>
                {error && <ErrorMessage>{error}</ErrorMessage>}
                <form onSubmit={handleLogin}>
                    <Input
                        type="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                        type="password"
                        placeholder="Senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button type="submit">Entrar</Button>
                </form>
            </LoginBox>
        </LoginContainer>
    );
}

export default Login;

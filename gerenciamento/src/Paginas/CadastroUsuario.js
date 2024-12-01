import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../componentes/logo.png'; // Importação da logo

const RegisterContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f0f0f0;
`;

const RegisterBox = styled.div`
    background: white;
    padding: 40px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 500px;
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

const SuccessMessage = styled.p`
    color: green;
`;

function Register() {
    const [formData, setFormData] = useState({
        fullName: '',
        cpf: '',
        email: '',
        password: '',
        birthDate: '',
        address: '',
        phone: '',
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validação simples para garantir que os campos não estejam vazios
        if (Object.values(formData).some((value) => value.trim() === '')) {
            setError('Por favor, preencha todos os campos!');
            return;
        }

        setError('');
        setSuccess('Cadastro realizado com sucesso!');
        
        // Após alguns segundos, redireciona para o login
        setTimeout(() => navigate('/login'), 2000);
    };

    return (
        <RegisterContainer>
            <RegisterBox>
                {/* Exibe a logo no topo */}
                <Logo src={logo} alt="Logo Pizzaria" />
                <Title>Cadastro de Usuário</Title>
                {error && <ErrorMessage>{error}</ErrorMessage>}
                {success && <SuccessMessage>{success}</SuccessMessage>}
                <form onSubmit={handleSubmit}>
                    <Input
                        type="text"
                        name="fullName"
                        placeholder="Nome Completo"
                        value={formData.fullName}
                        onChange={handleChange}
                    />
                    <Input
                        type="text"
                        name="cpf"
                        placeholder="CPF"
                        value={formData.cpf}
                        onChange={handleChange}
                    />
                    <Input
                        type="email"
                        name="email"
                        placeholder="E-mail"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <Input
                        type="password"
                        name="password"
                        placeholder="Senha"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <Input
                        type="date"
                        name="birthDate"
                        value={formData.birthDate}
                        onChange={handleChange}
                    />
                    <Input
                        type="text"
                        name="address"
                        placeholder="Endereço"
                        value={formData.address}
                        onChange={handleChange}
                    />
                    <Input
                        type="text"
                        name="phone"
                        placeholder="Número de Telefone"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                    <Button type="submit">Cadastrar</Button>
                </form>
            </RegisterBox>
        </RegisterContainer>
    );
}

export default Register;

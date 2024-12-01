// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Sidebar from './componentes/Sidebar';
import Inicio from './Paginas/Inicio';
import Pedidos from './Paginas/Pedidos';
import Usuario from './Paginas/CadastroUsuario';
import Produto from './Paginas/Produto';
import Relatorio from './Paginas/Relatorio';
import Login from './Paginas/login';
import styled from 'styled-components';

const AppContainer = styled.div`
    display: flex;
`;

const Content = styled.div`
    flex: 1;
    padding: 20px;
`;

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleLogin = () => setIsAuthenticated(true);
    const handleLogout = () => setIsAuthenticated(false);

    return (
        <Router>
            {isAuthenticated ? (
                <AppContainer>
                    <Sidebar />
                    <Content>
                        <Routes>
                            <Route path="/" element={<Inicio />} />
                            <Route path="/pedidos" element={<Pedidos />} />
                            <Route path="/usuario" element={<Usuario />} />
                            <Route path="/produto" element={<Produto />} />
                            <Route path="/relatorio" element={<Relatorio />} />
                            <Route
                                path="/logout"
                                element={<Navigate to="/login" replace onClick={handleLogout} />}
                            />
                        </Routes>
                    </Content>
                </AppContainer>
            ) : (
                <Routes>
                    <Route path="/login" element={<Login onLogin={handleLogin} />} />
                    <Route path="*" element={<Navigate to="/login" />} />
                </Routes>
            )}
        </Router>
    );
}

export default App;

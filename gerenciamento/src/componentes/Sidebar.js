import React from 'react';
import styled from 'styled-components';
import { FaHome, FaClipboardList, FaUser, FaBox, FaUserCog } from 'react-icons/fa';
import SidebarItem from './SidebarItem';
import logo from './logo.png';

const SidebarContainer = styled.div`
    width: 180px; /* Defina a largura da barra lateral */
    height: 100vh; /* Preencha toda a altura da viewport */
    background-color: #C1272D;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 20px;
    position: fixed; /* Fixado na viewport */
    top: 0; /* Alinhado ao topo da página */
    left: 0; /* Alinhado à esquerda */
`;

const Logo = styled.img`
    width: 150px;
    margin-bottom: 40px;
`;

const MenuItems = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`;

function Sidebar() {
    return (
        <SidebarContainer>
            <Logo src={logo} alt="Forno e Sabor Logo" />
            <MenuItems>
                <SidebarItem icon={<FaHome />} text="Início" to="/" />
                <SidebarItem icon={<FaClipboardList />} text="Pedidos" to="/pedidos" />
                <SidebarItem icon={<FaUser />} text="Usuário" to="/usuario" />
                <SidebarItem icon={<FaBox />} text="Produto" to="/produto" />
                <SidebarItem icon={<FaUserCog />} text="Relatório" to="/relatorio" />
            </MenuItems>
        </SidebarContainer>
    );
}

export default Sidebar;

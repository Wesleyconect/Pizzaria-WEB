import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const ItemContainer = styled.div`
    width: 83%; /* Ocupa a largura total */
    display: flex;
    align-items: center;
    padding: 18px 15px;
    color: #FFF;
    font-size: 16px;
    cursor: pointer;
    transition: background 0.3s;

    &:hover {
        background-color: #A02025;
    }
`;

const IconContainer = styled.div`
    margin-right: 15px; /* Reduz o espaçamento entre o ícone e o texto */
    font-size: 20px;
`;

const Text = styled.span`
    flex: 1; /* Permite que o texto ocupe o restante do espaço */
    text-align: left; /* Alinha o texto à esquerda */
`;

function SidebarItem({ icon, text, to }) {
    return (
        <Link
            to={to}
            style={{
                textDecoration: 'none',
                color: 'inherit',
                width: '100%',
            }}
            aria-label={text}
        >
            <ItemContainer>
                <IconContainer>{icon}</IconContainer>
                <Text>{text}</Text>
            </ItemContainer>
        </Link>
    );
}

export default SidebarItem;

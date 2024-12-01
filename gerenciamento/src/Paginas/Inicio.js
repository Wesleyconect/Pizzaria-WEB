// src/Paginas/Inicio.js
import React from 'react';
import styled from 'styled-components';
import { Doughnut } from 'react-chartjs-2';
import { FaBoxOpen, FaCog, FaCheckCircle } from 'react-icons/fa';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

// Registrar os componentes necessários do Chart.js
Chart.register(ArcElement, Tooltip, Legend);

// Estilos para o container principal
const Container = styled.div`
    flex: 1;
    padding: 20px;
    margin-left: 250px; /* Espaço reservado para a Sidebar */
    min-height: 100vh; /* Garante que o conteúdo ocupe a altura total da tela */
    background-color: #f9f9f9; /* Cor de fundo para diferenciar do sidebar */
    box-sizing: border-box; /* Inclui padding e margin dentro do tamanho definido */
`;


// Estilos para os cartões de status
const CardsContainer = styled.div`
    display: flex;
    gap: 20px;
`;

const Card = styled.div`
    flex: 1;
    padding: 20px;
    color: white;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: ${props => props.color || '#ccc'};
    font-size: 24px;
    font-weight: bold;
    position: relative;
`;

const CardLabel = styled.div`
    font-size: 18px;
    margin-top: 10px;
`;

// Estilos para a seção de visão geral e gráfico de pizza
const OverviewContainer = styled.div`
    display: flex;
    gap: 20px;
    margin-top: 20px;
`;

const OverviewItem = styled.div`
    flex: 1;
    background-color: ${props => props.bgColor || '#f7f7f7'};
    border-radius: 8px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 18px;
    font-weight: bold;
    color: ${props => props.color || '#333'};
    text-align: center;
`;

const DoughnutContainer = styled.div`
    background-color: #f7f7f7;
    padding: 20px;
    border-radius: 8px;
    width: 300px;
    height: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

// Componente principal
function Inicio() {
    // Dados para o gráfico de pizza
    const data = {
        labels: ['Pedidos', 'Entregues', 'Cancelados', 'Total em vendas'],
        datasets: [
            {
                label: 'Vendas Categoria',
                data: [705, 705, 50, 755],
                backgroundColor: ['#4bc0c0', '#ffcd56', '#ff6384', '#36a2eb'],
                hoverBackgroundColor: ['#4bc0c0', '#ffcd56', '#ff6384', '#36a2eb'],
            },
        ],
    };

    return (
        <Container>
            <h2>Página Inicial</h2>

            {/* Cards de Status */}
            <CardsContainer>
                <Card color="#ff4d4f">
                    <FaBoxOpen size={48} />
                    <div>5</div>
                    <CardLabel>Pedido Recebido</CardLabel>
                </Card>
                <Card color="#ffc107">
                    <FaCog size={48} />
                    <div>2</div>
                    <CardLabel>Em produção</CardLabel>
                </Card>
                <Card color="#4caf50">
                    <FaCheckCircle size={48} />
                    <div>705</div>
                    <CardLabel>Finalizado</CardLabel>
                </Card>
            </CardsContainer>

            {/* Visão Geral e Gráfico */}
            <OverviewContainer>
                <div style={{ flex: 2, display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                    <OverviewItem bgColor="#e0f7e9" color="#4caf50">
                        <div>Pedidos Finalizados</div>
                        <div style={{ fontSize: '32px' }}>705</div>
                        <span style={{ color: '#4caf50' }}>+20% última semana</span>
                    </OverviewItem>
                    <OverviewItem bgColor="#fff7e0" color="#ffc107">
                        <div>Entregues</div>
                        <div style={{ fontSize: '32px' }}>705</div>
                        <span style={{ color: '#ffc107' }}>+30% última semana</span>
                    </OverviewItem>
                    <OverviewItem bgColor="#e0f7e0" color="#36a2eb">
                        <div>Total em vendas</div>
                        <div style={{ fontSize: '32px' }}>755</div>
                        <span style={{ color: '#36a2eb' }}>+25% última semana</span>
                    </OverviewItem>
                    <OverviewItem bgColor="#ffe0e0" color="#ff4d4f">
                        <div>Cancelados</div>
                        <div style={{ fontSize: '32px' }}>50</div>
                        <span style={{ color: '#ff4d4f' }}>+25% última semana</span>
                    </OverviewItem>
                </div>
                
                <DoughnutContainer>
                    <h3>Vendas Categoria</h3>
                    <Doughnut data={data} />
                </DoughnutContainer>
            </OverviewContainer>
        </Container>
    );
}

export default Inicio;

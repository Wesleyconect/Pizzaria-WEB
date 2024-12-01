import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    flex: 1;
    padding: 20px;
    margin-left: 250px;
    min-height: 100vh;
    background-color: #f9f9f9;
    box-sizing: border-box;
`;

const Dashboard = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
`;

const StatusCard = styled.div`
    width: 30%;
    background-color: ${(props) => props.bgColor || '#f0f0f0'};
    color: white;
    text-align: center;
    padding: 20px;
    border-radius: 10px;
`;

const Title = styled.h2`
    color: #333;
`;

const OrderSection = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-top: 20px;
`;

const OrderCard = styled.div`
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 15px;
`;

const OrderHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const ProductList = styled.ul`
    margin-top: 10px;
    font-size: 14px;
`;

const ProductItem = styled.li`
    list-style: none;
`;

const Button = styled.button`
    background-color: ${(props) => props.bgColor || '#4CAF50'};
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    width: 100%;
    &:hover {
        background-color: ${(props) => props.hoverColor || '#45a049'};
    }
`;

function Pedidos() {
    const [receivedOrders, setReceivedOrders] = useState([]);
    const [inProductionOrders, setInProductionOrders] = useState([]);
    const [finalizedOrdersCount, setFinalizedOrdersCount] = useState(0); // Contador de finalizados

    // Fetch pedidos do backend local
    const fetchOrders = async () => {
        try {
            const response = await fetch('https://fornoesaborweb.free.beeceptor.com/application/json');
            if (response.ok) {
                const data = await response.json();
                setReceivedOrders(data); // Inicializa todos os pedidos como "Recebidos"
            } else {
                console.error('Erro ao buscar pedidos:', response.status);
            }
        } catch (error) {
            console.error('Erro:', error.message);
        }
    };

    // Fetch pedidos finalizados
    const fetchFinalizedOrders = async () => {
        try {
            const response = await fetch('http://localhost:5000/pedidos'); // Use o endpoint do backend
            if (response.ok) {
                const data = await response.json();
                setFinalizedOrdersCount(data.length); // Conta o número de pedidos
            } else {
                console.error('Erro ao buscar pedidos finalizados:', response.status);
            }
        } catch (error) {
            console.error('Erro ao buscar pedidos finalizados:', error.message);
        }
    };

    useEffect(() => {
        fetchOrders();
        fetchFinalizedOrders(); // Busca os pedidos finalizados ao carregar a página
    }, []);

    // Aceitar Pedido
    const handleAcceptOrder = (index) => {
        const orderToMove = receivedOrders[index];
        setReceivedOrders(receivedOrders.filter((_, i) => i !== index));
        setInProductionOrders([...inProductionOrders, orderToMove]);
    };

    // Finalizar Pedido
    const handleCompleteOrder = async (index) => {
        const orderToFinalize = receivedOrders[index];
    
        try {
            const response = await fetch('http://localhost:5000/pedidos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderToFinalize),
            });
    
            if (response.ok) {
                const data = await response.json(); // Recebe o novo pedido e o total de pedidos do backend
                setInProductionOrders(inProductionOrders.filter((_, i) => i !== index));
    
                // Atualiza o contador com o valor retornado do backend
                setFinalizedOrdersCount(data.totalPedidos);
    
                console.log('Pedido finalizado com sucesso');
            } else {
                console.error('Erro ao finalizar o pedido:', response.status);
            }
        } catch (error) {
            console.error('Erro:', error.message);
        }
    };
    

    return (
        <Container>
            <Title>Painel de Pedidos</Title>

            {/* Dashboard de Status */}
            <Dashboard>
                <StatusCard bgColor="#f44336">
                    <h3>Pedidos Recebidos</h3>
                    <p>{receivedOrders.length}</p>
                </StatusCard>
                <StatusCard bgColor="#ffa726">
                    <h3>Em Produção</h3>
                    <p>{inProductionOrders.length}</p>
                </StatusCard>
                <StatusCard bgColor="#4CAF50">
                    <h3>Finalizados</h3>
                    <p>{finalizedOrdersCount}</p>
                </StatusCard>
            </Dashboard>

            {/* Pedidos Recebidos */}
            <h3>Pedidos Recebidos</h3>
            <OrderSection>
                {receivedOrders.map((order, index) => (
                    <OrderCard key={index}>
                        <OrderHeader>
                            <div><strong>Cliente:</strong> {order.customerName}</div>
                        </OrderHeader>
                        <p><strong>Endereço:</strong> {order.address}</p>
                        <p><strong>Pagamento:</strong> {order.paymentMethod}</p>
                        <ProductList>
                            <strong>Produtos:</strong>
                            {order.products.map((product, i) => (
                                <ProductItem key={i}>
                                    - {product.name} ({product.size}) x{product.quantity}
                                </ProductItem>
                            ))}
                        </ProductList>
                        <Button bgColor="#ffa726" hoverColor="#fb8c00" onClick={() => handleAcceptOrder(index)}>
                            Aceitar Pedido
                        </Button>
                    </OrderCard>
                ))}
            </OrderSection>

            {/* Pedidos em Produção */}
            <h3>Em Produção</h3>
            <OrderSection>
                {inProductionOrders.map((order, index) => (
                    <OrderCard key={index}>
                        <OrderHeader>
                            <div><strong>Cliente:</strong> {order.customerName}</div>
                        </OrderHeader>
                        <p><strong>Endereço:</strong> {order.address}</p>
                        <ProductList>
                            <strong>Produtos:</strong>
                            {order.products.map((product, i) => (
                                <ProductItem key={i}>
                                    - {product.name} ({product.size}) x{product.quantity}
                                </ProductItem>
                            ))}
                        </ProductList>
                        <Button bgColor="#4CAF50" hoverColor="#45a049" onClick={() => handleCompleteOrder(index)}>
                            Finalizar
                        </Button>
                    </OrderCard>
                ))}
            </OrderSection>
        </Container>
    );
}

export default Pedidos;

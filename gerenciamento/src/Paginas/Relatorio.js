import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

// Estilos principais
const Container = styled.div`
    flex: 1;
    padding: 20px;
    margin-left: 250px;
    min-height: 100vh;
    background-color: #f9f9f9;
    box-sizing: border-box;
`;

const Title = styled.h1`
    text-align: center;
    margin-bottom: 20px;
    color: #333;
`;

const Section = styled.div`
    margin-bottom: 30px;
`;

const SectionTitle = styled.h2`
    color: #444;
    margin-bottom: 15px;
    border-bottom: 2px solid #ddd;
    padding-bottom: 5px;
`;

const Button = styled.button`
    background-color: #4CAF50;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-bottom: 15px;

    &:hover {
        background-color: #45a049;
    }
`;

const CardContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 15px;
`;

const Card = styled.div`
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 15px;
    border: 1px solid #ddd;
`;

const CardTitle = styled.h3`
    font-size: 16px;
    color: #555;
    margin-bottom: 10px;
`;

const CardContent = styled.p`
    font-size: 14px;
    color: #666;
    margin: 5px 0;
`;

const Loading = styled.p`
    text-align: center;
    font-size: 16px;
    color: #888;
`;

const Error = styled.p`
    text-align: center;
    font-size: 16px;
    color: red;
`;

const Relatorio = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [pedidos, setPedidos] = useState([]);
    const [produtos, setProdutos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Busca os dados do backend
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [usuariosRes, pedidosRes, produtosRes] = await Promise.all([
                    fetch('http://localhost:5000/usuarios'),
                    fetch('http://localhost:5000/pedidos'),
                    fetch('http://localhost:5000/products'),
                ]);

                const [usuariosData, pedidosData, produtosData] = await Promise.all([
                    usuariosRes.json(),
                    pedidosRes.json(),
                    produtosRes.json(),
                ]);

                setUsuarios(usuariosData);
                setPedidos(pedidosData);
                setProdutos(produtosData);
            } catch (err) {
                setError('Erro ao carregar os dados. Verifique o servidor.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <Loading>Carregando dados...</Loading>;
    if (error) return <Error>{error}</Error>;

    // Função para gerar PDF de usuários
    const generateUsuariosPDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(16);
        doc.text('Relatório de Usuários', 10, 10);

        const tableData = usuarios.map((usuario) => [
            usuario.nome,
            usuario.email,
        ]);

        doc.autoTable({
            head: [['Nome', 'Email']],
            body: tableData,
            startY: 20,
        });

        doc.save('usuarios.pdf');
    };

    // Função para gerar PDF de pedidos
    const generatePedidosPDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(16);
        doc.text('Relatório de Pedidos', 10, 10);

        const tableData = pedidos.map((pedido) => [
            pedido.id,
            pedido.customerName,
            pedido.paymentMethod,
        ]);

        doc.autoTable({
            head: [['ID', 'Cliente', 'Forma de Pagamento']],
            body: tableData,
            startY: 20,
        });

        doc.save('pedidos.pdf');
    };

    // Função para gerar PDF de produtos
    const generateProdutosPDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(16);
        doc.text('Relatório de Produtos', 10, 10);

        const tableData = produtos.map((produto) => [
            produto.name,
            produto.priceLarge,
            produto.priceMedium,
            produto.priceSmall,
            produto.description,
        ]);

        doc.autoTable({
            head: [
                ['Nome', 'Preço Grande', 'Preço Médio', 'Preço Pequeno', 'Descrição'],
            ],
            body: tableData,
            startY: 20,
        });

        doc.save('produtos.pdf');
    };

    return (
        <Container>
            <Title>Relatório de Dados</Title>

            {/* Relatório de Usuários */}
            <Section>
                <SectionTitle>Usuários Cadastrados</SectionTitle>
                <Button onClick={generateUsuariosPDF}>Baixar Relatório de Usuários</Button>
                <CardContainer>
                    {usuarios.map((usuario) => (
                        <Card key={usuario.id}>
                            <CardTitle>{usuario.nome}</CardTitle>
                            <CardContent>Email: {usuario.email}</CardContent>
                        </Card>
                    ))}
                </CardContainer>
            </Section>

            {/* Relatório de Pedidos */}
            <Section>
                <SectionTitle>Pedidos Detalhados</SectionTitle>
                <Button onClick={generatePedidosPDF}>Baixar Relatório de Pedidos</Button>
                <CardContainer>
                    {pedidos.map((pedido) => (
                        <Card key={pedido.id}>
                            <CardTitle>Pedido ID: {pedido.id}</CardTitle>
                            <CardContent>Cliente: {pedido.customerName}</CardContent>
                            <CardContent>Pagamento: {pedido.paymentMethod}</CardContent>
                        </Card>
                    ))}
                </CardContainer>
            </Section>

            {/* Relatório de Produtos */}
            <Section>
                <SectionTitle>Produtos Cadastrados</SectionTitle>
                <Button onClick={generateProdutosPDF}>Baixar Relatório de Produtos</Button>
                <CardContainer>
                    {produtos.map((produto) => (
                        <Card key={produto.id}>
                            <CardTitle>{produto.nome}</CardTitle>
                            <CardContent>Descrição: {produto.description}</CardContent>
                            <CardContent>Preço Grande: R$ {produto.priceLarge}</CardContent>
                        </Card>
                    ))}
                </CardContainer>
            </Section>
        </Container>
    );
};

export default Relatorio;

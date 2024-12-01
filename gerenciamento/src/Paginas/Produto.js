import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
    flex: 1;
    padding: 20px;
    margin-left: 250px; /* Espaço reservado para a Sidebar */
    min-height: 100vh; /* Garante que o conteúdo ocupe a altura total da tela */
    background-color: #f9f9f9; /* Cor de fundo para diferenciar do sidebar */
    box-sizing: border-box; /* Inclui padding e margin dentro do tamanho definido */
`;


const Title = styled.h2`
    color: #333;
`;

const Button = styled.button`
    background-color: #4CAF50;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-bottom: 20px;
    
    &:hover {
        background-color: #45a049;
    }
`;

const SearchInput = styled.input`
    padding: 8px;
    margin-bottom: 20px;
    width: 100%;
    max-width: 400px;
    border: 1px solid #ddd;
    border-radius: 4px;
`;

const ProductList = styled.div`
    margin-top: 20px;
`;

const ProductItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    background: #f9f9f9;
    border: 1px solid #ddd;
    margin-bottom: 10px;
    border-radius: 4px;
`;

const ProductImage = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 4px;
    margin-right: 15px;
`;

const ActionButton = styled.button`
    background-color: ${(props) => props.color || '#007BFF'};
    color: white;
    padding: 5px 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-left: 10px;
    
    &:hover {
        background-color: ${(props) => props.hoverColor || '#0056b3'};
    }
`;

const ProductForm = styled.form`
    display: flex;
    flex-direction: column;
    background-color: #f5f5f5;
    padding: 20px;
    border-radius: 4px;
    margin-top: 20px;
`;

const Input = styled.input`
    padding: 8px;
    margin: 10px 0;
    border: 1px solid #ddd;
    border-radius: 4px;
`;

const TextArea = styled.textarea`
    padding: 8px;
    margin: 10px 0;
    border: 1px solid #ddd;
    border-radius: 4px;
    resize: vertical;
`;

const SubmitButton = styled(Button)`
    background-color: #007BFF;

    &:hover {
        background-color: #0056b3;
    }
`;

function Produto() {
    const [products, setProducts] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [newProduct, setNewProduct] = useState({
        name: '',
        description: '',
        imageUrl: '',
        priceSmall: '',
        priceMedium: '',
        priceLarge: '',
    });
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState(null);

    // Carrega os produtos do backend ao montar o componente
    useEffect(() => {
        fetchProducts();
    }, []); // O array vazio garante que a função será chamada apenas ao montar o componente

    // Função para buscar produtos do backend
    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/products');
            setProducts(response.data); // Atualiza o estado com os dados do backend
        } catch (err) {
            setError('Erro ao carregar produtos.');
            console.error("Erro ao buscar produtos:", err);
        }
    };

    // Função para enviar novo produto ao backend ou atualizar produto existente
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editIndex !== null) {
                const updatedProduct = { 
                    ...newProduct,
                    id: products[editIndex].id 
                };
                await axios.put(`http://localhost:5000/products/${updatedProduct.id}`, updatedProduct);
                setProducts(products.map((p, i) => (i === editIndex ? updatedProduct : p)));
            } else {
                const response = await axios.post('http://localhost:5000/products', newProduct);
                setProducts([...products, response.data]);
            }
            // Limpa o formulário e esconde o formulário de edição
            setNewProduct({
                name: '',
                description: '',
                imageUrl: '',
                priceSmall: '',
                priceMedium: '',
                priceLarge: '',
            });
            setShowForm(false);
            setEditIndex(null);
        } catch (err) {
            setError('Erro ao salvar o produto.');
            console.error("Erro ao salvar produto:", err);
        }
    };

    // Função para editar um produto
    const handleEdit = (index) => {
        setEditIndex(index);
        setNewProduct(products[index]);
        setShowForm(true);
    };

    // Função para deletar um produto do backend e atualizar a lista local
    const handleDeactivate = async (index) => {
        try {
            const productId = products[index].id;
            await axios.delete(`http://localhost:5000/products/${productId}`);
            setProducts(products.filter((_, i) => i !== index));
        } catch (err) {
            setError('Erro ao desativar o produto.');
            console.error("Erro ao desativar produto:", err);
        }
    };

    const handleAddProduct = () => {
        setShowForm(true);
        setEditIndex(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct((prev) => ({ ...prev, [name]: value }));
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // Filtra produtos com base no termo de pesquisa
    const filteredProducts = products.filter((product) => {
        const term = searchTerm.toLowerCase();
        return (
            product.name.toLowerCase().includes(term) ||
            product.priceSmall.toString().includes(term) ||
            product.priceMedium.toString().includes(term) ||
            product.priceLarge.toString().includes(term)
        );
    });

    return (
        <Container>
            <Title>Cadastro de Produtos</Title>
            <Button onClick={handleAddProduct}>Cadastrar Produto</Button>

            {error && <p style={{ color: 'red' }}>{error}</p>}
            
            <SearchInput
                type="text"
                placeholder="Pesquisar por nome ou preço"
                value={searchTerm}
                onChange={handleSearchChange}
            />

            <ProductList>
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product, index) => (
                        <ProductItem key={product.id}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                {product.imageUrl && <ProductImage src={product.imageUrl} alt={product.name} />}
                                <div>
                                    <strong>{product.name}</strong>
                                    <p>Pequena: R$ {product.priceSmall} | Média: R$ {product.priceMedium} | Grande: R$ {product.priceLarge}</p>
                                </div>
                            </div>
                            <div>
                                <ActionButton 
                                    color="#007BFF" 
                                    hoverColor="#0056b3" 
                                    onClick={() => handleEdit(index)}
                                >
                                    Editar
                                </ActionButton>
                                <ActionButton 
                                    color="#FF4136" 
                                    hoverColor="#c30000" 
                                    onClick={() => handleDeactivate(index)}
                                >
                                    Desativar
                                </ActionButton>
                            </div>
                        </ProductItem>
                    ))
                ) : (
                    <p>Nenhum produto encontrado</p>
                )}
            </ProductList>

            {showForm && (
                <ProductForm onSubmit={handleSubmit}>
                    <h3>{editIndex !== null ? 'Editar Produto' : 'Cadastrar Novo Produto'}</h3>
                    
                    <label>
                        Nome do Produto:
                        <Input
                            type="text"
                            name="name"
                            value={newProduct.name}
                            onChange={handleInputChange}
                            required
                        />
                    </label>

                    <label>
                        Descrição:
                        <TextArea
                            name="description"
                            value={newProduct.description}
                            onChange={handleInputChange}
                            required
                        />
                    </label>

                    <label>
                        Imagem do Produto (URL):
                        <Input
                            type="text"
                            name="imageUrl"
                            value={newProduct.imageUrl}
                            onChange={handleInputChange}
                        />
                    </label>

                    <label>
                        Preço (Pequena):
                        <Input
                            type="number"
                            name="priceSmall"
                            value={newProduct.priceSmall}
                            onChange={handleInputChange}
                            required
                        />
                    </label>

                    <label>
                        Preço (Média):
                        <Input
                            type="number"
                            name="priceMedium"
                            value={newProduct.priceMedium}
                            onChange={handleInputChange}
                            required
                        />
                    </label>

                    <label>
                        Preço (Grande):
                        <Input
                            type="number"
                            name="priceLarge"
                            value={newProduct.priceLarge}
                            onChange={handleInputChange}
                            required
                        />
                    </label>

                    <SubmitButton type="submit">
                        {editIndex !== null ? 'Salvar Alterações' : 'Salvar Produto'}
                    </SubmitButton>
                </ProductForm>
            )}
        </Container>
    );
}

export default Produto;
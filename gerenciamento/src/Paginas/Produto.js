import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useDropzone } from 'react-dropzone';

const DropzoneContainer = styled.div`
    border: 2px dashed #ddd;
    padding: 20px;
    text-align: center;
    background-color: #f5f5f5;
    margin-bottom: 20px;
    border-radius: 8px;
    cursor: pointer;

    &:hover {
        border-color: #4CAF50;
    }
`;

const Container = styled.div`
    flex: 1;
    padding: 20px;
    margin-left: 250px;
    min-height: 100vh;
    background-color: #f9f9f9;
`;

const Title = styled.h2`
    color: #333;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
`;

const Button = styled.button`
    background-color: #4CAF50;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background-color: #45a049;
    }
`;

const SearchInput = styled.input`
    padding: 8px;
    width: 100%;
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

const Modal = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    width: 90%;
    max-width: 500px;
`;

const ModalBackdrop = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
`;

const Input = styled.input`
    padding: 8px;
    margin: 10px 0;
    border: 1px solid #ddd;
    border-radius: 4px;
    width: 100%;
`;

const TextArea = styled.textarea`
    padding: 8px;
    margin: 10px 0;
    border: 1px solid #ddd;
    border-radius: 4px;
    resize: vertical;
    width: 100%;
`;

const SubmitButton = styled(Button)`
    background-color: #007BFF;
    margin-top: 10px;

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
        priceSmall: '',
        priceMedium: '',
        priceLarge: '',
    });
    const [imageFile, setImageFile] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState(null);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop: (acceptedFiles) => setImageFile(acceptedFiles[0]),
    });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/products');
            setProducts(response.data);
        } catch (err) {
            setError('Erro ao carregar produtos.');
            console.error("Erro ao buscar produtos:", err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', newProduct.name);
        formData.append('description', newProduct.description);
        formData.append('priceSmall', newProduct.priceSmall);
        formData.append('priceMedium', newProduct.priceMedium);
        formData.append('priceLarge', newProduct.priceLarge);
        if (imageFile) {
            formData.append('image', imageFile);
        }

        try {
            if (editIndex !== null) {
                const response = await axios.put(
                    `http://localhost:5000/products/${products[editIndex].id}`,
                    formData,
                    { headers: { 'Content-Type': 'multipart/form-data' } }
                );
                const updatedProduct = response.data;
                setProducts(
                    products.map((product, index) =>
                        index === editIndex ? updatedProduct : product
                    )
                );
            } else {
                const response = await axios.post(
                    'http://localhost:5000/products',
                    formData,
                    { headers: { 'Content-Type': 'multipart/form-data' } }
                );
                setProducts([...products, response.data]);
            }
            resetForm();
        } catch (err) {
            setError('Erro ao salvar o produto.');
            console.error("Erro ao salvar produto:", err);
        }
    };

    const handleEdit = (index) => {
        const productToEdit = products[index];
        setNewProduct({
            name: productToEdit.name,
            description: productToEdit.description,
            priceSmall: productToEdit.priceSmall,
            priceMedium: productToEdit.priceMedium,
            priceLarge: productToEdit.priceLarge,
        });
        setImageFile(null);
        setShowForm(true);
        setEditIndex(index);
    };

    const handleDeactivate = async (index) => {
        const productId = products[index].id;
        try {
            await axios.delete(`http://localhost:5000/products/${productId}`);
            setProducts(products.filter((_, i) => i !== index));
        } catch (err) {
            setError('Erro ao desativar o produto.');
            console.error("Erro ao desativar produto:", err);
        }
    };

    const resetForm = () => {
        setNewProduct({
            name: '',
            description: '',
            priceSmall: '',
            priceMedium: '',
            priceLarge: '',
        });
        setImageFile(null);
        setShowForm(false);
        setEditIndex(null);
    };

    return (
        <Container>
            <Title>Cadastro de Produtos</Title>
            <Header>
                <SearchInput
                    type="text"
                    placeholder="Pesquisar por nome ou preço"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button onClick={() => setShowForm(true)}>Cadastrar Produto</Button>
            </Header>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <ProductList>
                {products.map((product, index) => (
                    <ProductItem key={product.id}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            {product.imageUrl && <ProductImage src={product.imageUrl} alt={product.name} />}
                            <div>
                                <strong>{product.name}</strong>
                                <p>
                                    Pequena: R$ {product.priceSmall} | Média: R$ {product.priceMedium} | Grande: R$ {product.priceLarge}
                                </p>
                            </div>
                        </div>
                        <div>
                            <ActionButton onClick={() => handleEdit(index)}>Editar</ActionButton>
                            <ActionButton color="#FF4136" onClick={() => handleDeactivate(index)}>
                                Desativar
                            </ActionButton>
                        </div>
                    </ProductItem>
                ))}
            </ProductList>

            {showForm && (
                <>
                    <ModalBackdrop onClick={resetForm} />
                    <Modal>
                        <h3>{editIndex !== null ? 'Editar Produto' : 'Cadastrar Produto'}</h3>
                        <form onSubmit={handleSubmit}>
                            <label>
                                Nome do Produto:
                                <Input
                                    type="text"
                                    name="name"
                                    value={newProduct.name}
                                    onChange={(e) =>
                                        setNewProduct({ ...newProduct, name: e.target.value })
                                    }
                                    required
                                />
                            </label>
                            <label>
                                Descrição:
                                <TextArea
                                    name="description"
                                    value={newProduct.description}
                                    onChange={(e) =>
                                        setNewProduct({ ...newProduct, description: e.target.value })
                                    }
                                    required
                                />
                            </label>
                            <DropzoneContainer {...getRootProps()}>
                                <input {...getInputProps()} />
                                {imageFile ? (
                                    <p>Imagem selecionada: {imageFile.name}</p>
                                ) : (
                                    <p>Arraste e solte uma imagem aqui ou clique para selecionar</p>
                                )}
                            </DropzoneContainer>
                            <label>
                                Preço Pequeno:
                                <Input
                                    type="number"
                                    name="priceSmall"
                                    value={newProduct.priceSmall}
                                    onChange={(e) =>
                                        setNewProduct({ ...newProduct, priceSmall: e.target.value })
                                    }
                                    required
                                />
                            </label>
                            <label>
                                Preço Médio:
                                <Input
                                    type="number"
                                    name="priceMedium"
                                    value={newProduct.priceMedium}
                                    onChange={(e) =>
                                        setNewProduct({ ...newProduct, priceMedium: e.target.value })
                                    }
                                    required
                                />
                            </label>
                            <label>
                                Preço Grande:
                                <Input
                                    type="number"
                                    name="priceLarge"
                                    value={newProduct.priceLarge}
                                    onChange={(e) =>
                                        setNewProduct({ ...newProduct, priceLarge: e.target.value })
                                    }
                                    required
                                />
                            </label>
                            <SubmitButton type="submit">
                                {editIndex !== null ? 'Salvar Alterações' : 'Salvar Produto'}
                            </SubmitButton>
                        </form>
                    </Modal>
                </>
            )}
        </Container>
    );
}

export default Produto;

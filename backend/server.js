const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Caminhos para os arquivos
const pedidoFilePath = path.join(__dirname, 'datapedido.json');
const productFilePath = path.join(__dirname, 'dataproduto.json');
const userFilePath = path.join(__dirname, 'datausuarios.json');

// Função para carregar dados de um arquivo JSON
const getData = (filePath) => {
    try {
        if (fs.existsSync(filePath)) {
            const data = fs.readFileSync(filePath, 'utf-8');
            return JSON.parse(data);
        }
        return [];
    } catch (error) {
        console.error(`Erro ao carregar dados do arquivo ${filePath}:`, error.message);
        return [];
    }
};

// Função para salvar dados em um arquivo JSON
const saveData = (filePath, data) => {
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    } catch (error) {
        console.error(`Erro ao salvar dados no arquivo ${filePath}:`, error.message);
    }
};

// ----- GERENCIAMENTO DE USUÁRIOS -----
// Endpoint para obter todos os usuários
app.get('/usuarios', (req, res) => {
    const usuarios = getData(userFilePath);
    res.json(usuarios);
});

// Endpoint para adicionar um novo usuário
app.post('/usuarios', (req, res) => {
    const usuarios = getData(userFilePath);
    const { nome, email, senha } = req.body;

    // Verificar se os campos obrigatórios estão preenchidos
    if (!nome || !email || !senha) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    // Verificar se o e-mail já está cadastrado
    const emailExistente = usuarios.find(user => user.email === email);
    if (emailExistente) {
        return res.status(400).json({ error: 'E-mail já cadastrado' });
    }

    const newUser = {
        id: Date.now().toString(),
        nome,
        email,
        senha,
    };
    usuarios.push(newUser);
    saveData(userFilePath, usuarios);
    res.status(201).json(newUser);
});

// Endpoint para editar um usuário existente
app.put('/usuarios/:id', (req, res) => {
    const usuarios = getData(userFilePath);
    const index = usuarios.findIndex(user => user.id === req.params.id);

    if (index === -1) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    usuarios[index] = { ...usuarios[index], ...req.body };
    saveData(userFilePath, usuarios);
    res.json(usuarios[index]);
});

// Endpoint para deletar um usuário
app.delete('/usuarios/:id', (req, res) => {
    let usuarios = getData(userFilePath);

    const usuarioExistente = usuarios.find(user => user.id === req.params.id);
    if (!usuarioExistente) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    usuarios = usuarios.filter(user => user.id !== req.params.id);
    saveData(userFilePath, usuarios);
    res.status(204).end();
});

// Endpoint para buscar um usuário específico pelo ID
app.get('/usuarios/:id', (req, res) => {
    const usuarios = getData(userFilePath);
    const usuario = usuarios.find(user => user.id === req.params.id);

    if (!usuario) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    res.json(usuario);
});

// ----- GERENCIAMENTO DE PEDIDOS -----
app.get('/pedidos', (req, res) => {
    const pedidos = getData(pedidoFilePath);
    res.json(pedidos);
});

app.post('/pedidos', (req, res) => {
    const pedidos = getData(pedidoFilePath);
    const newPedido = { id: Date.now().toString(), ...req.body };

    pedidos.push(newPedido); // Adiciona o novo pedido à lista
    saveData(pedidoFilePath, pedidos); // Salva no arquivo JSON

    // Envia o novo pedido e o total de pedidos como resposta
    res.status(201).json({ newPedido, totalPedidos: pedidos.length });
});


app.put('/pedidos/:id', (req, res) => {
    const pedidos = getData(pedidoFilePath);
    const index = pedidos.findIndex(pedido => pedido.id === req.params.id);

    if (index === -1) {
        return res.status(404).json({ error: 'Pedido não encontrado' });
    }

    pedidos[index] = { ...pedidos[index], ...req.body };
    saveData(pedidoFilePath, pedidos);
    res.json(pedidos[index]);
});

app.delete('/pedidos/:id', (req, res) => {
    let pedidos = getData(pedidoFilePath);

    const pedidoExistente = pedidos.find(pedido => pedido.id === req.params.id);
    if (!pedidoExistente) {
        return res.status(404).json({ error: 'Pedido não encontrado' });
    }

    pedidos = pedidos.filter(pedido => pedido.id !== req.params.id);
    saveData(pedidoFilePath, pedidos);
    res.status(204).end();
});

app.get('/pedidos/:id', (req, res) => {
    const pedidos = getData(pedidoFilePath);
    const pedido = pedidos.find(pedido => pedido.id === req.params.id);

    if (!pedido) {
        return res.status(404).json({ error: 'Pedido não encontrado' });
    }

    res.json(pedido);
});

// ----- GERENCIAMENTO DE PRODUTOS -----
app.get('/products', (req, res) => {
    const products = getData(productFilePath);
    res.json(products);
});

app.post('/products', (req, res) => {
    const products = getData(productFilePath);
    const newProduct = { id: Date.now().toString(), ...req.body };
    products.push(newProduct);
    saveData(productFilePath, products);
    res.status(201).json(newProduct);
});

app.put('/products/:id', (req, res) => {
    const products = getData(productFilePath);
    const index = products.findIndex(product => product.id === req.params.id);

    if (index === -1) {
        return res.status(404).json({ error: 'Produto não encontrado' });
    }

    products[index] = { ...products[index], ...req.body };
    saveData(productFilePath, products);
    res.json(products[index]);
});

app.delete('/products/:id', (req, res) => {
    let products = getData(productFilePath);

    const productExistente = products.find(product => product.id === req.params.id);
    if (!productExistente) {
        return res.status(404).json({ error: 'Produto não encontrado' });
    }

    products = products.filter(product => product.id !== req.params.id);
    saveData(productFilePath, products);
    res.status(204).end();
});

app.get('/products/:id', (req, res) => {
    const products = getData(productFilePath);
    const product = products.find(product => product.id === req.params.id);

    if (!product) {
        return res.status(404).json({ error: 'Produto não encontrado' });
    }

    res.json(product);
});

// ----- SERVIDOR -----
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

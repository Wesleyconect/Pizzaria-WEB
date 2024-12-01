const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const multer = require('multer'); // Biblioteca para upload de arquivos

const app = express();
app.use(cors());
app.use(express.json());

// Caminhos para os arquivos e diretório de imagens
const pedidoFilePath = path.join(__dirname, 'datapedido.json');
const productFilePath = path.join(__dirname, 'dataproduto.json');
const userFilePath = path.join(__dirname, 'datausuarios.json');
const imageUploadPath = path.join(__dirname, 'src/imagens_produto');

// Configuração do multer para salvar imagens
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, imageUploadPath); // Diretório onde as imagens serão salvas
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName); // Nome único para evitar conflitos
    },
});

const upload = multer({ storage });

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
app.get('/usuarios', (req, res) => {
    const usuarios = getData(userFilePath);
    res.json(usuarios);
});

app.post('/usuarios', (req, res) => {
    const usuarios = getData(userFilePath);
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

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

// ----- GERENCIAMENTO DE PEDIDOS -----
app.get('/pedidos', (req, res) => {
    const pedidos = getData(pedidoFilePath);
    res.json(pedidos);
});

// ----- GERENCIAMENTO DE PRODUTOS -----
app.get('/products', (req, res) => {
    const products = getData(productFilePath);
    res.json(products);
});

app.post('/products', upload.single('image'), (req, res) => {
    const products = getData(productFilePath);
    const { name, description, priceSmall, priceMedium, priceLarge } = req.body;

    if (!name || !priceSmall || !priceMedium || !priceLarge) {
        return res.status(400).json({ error: 'Campos obrigatórios não preenchidos' });
    }

    const newProduct = {
        id: Date.now().toString(),
        name,
        description,
        priceSmall,
        priceMedium,
        priceLarge,
        imageUrl: req.file ? req.file.filename : null, // Salva o nome do arquivo
    };

    products.push(newProduct);
    saveData(productFilePath, products);
    res.status(201).json(newProduct);
});

app.put('/products/:id', upload.single('image'), (req, res) => {
    const products = getData(productFilePath);
    const index = products.findIndex(product => product.id === req.params.id);

    if (index === -1) {
        return res.status(404).json({ error: 'Produto não encontrado' });
    }

    const updatedProduct = {
        ...products[index],
        ...req.body,
        imageUrl: req.file ? req.file.filename : products[index].imageUrl, // Atualiza a imagem se fornecida
    };

    products[index] = updatedProduct;
    saveData(productFilePath, products);
    res.json(updatedProduct);
});

// ----- ROTA PARA ACESSAR IMAGENS -----
app.use('/uploads', express.static(imageUploadPath)); // Servir imagens diretamente

// ----- SERVIDOR -----
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

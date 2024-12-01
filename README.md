---

# Pizzaria-WEB 🍕
Bem-vindo ao repositório **Pizzaria-WEB**, um sistema web desenvolvido para gerenciar o cadastro e login de usuários em uma pizzaria. Este projeto é baseado em **React.js** e utiliza bibliotecas modernas para estilização e manipulação de formulários, garantindo uma interface amigável e responsiva. 

## 🎯 Objetivo do Projeto
O objetivo do projeto é fornecer uma plataforma simples para que usuários possam:
- Realizar **cadastro** com informações detalhadas.
- Fazer **login** no sistema de forma segura.
- Gerenciar e salvar informações em um arquivo JSON local.

---

## 🛠️ Funcionalidades
1. **Login de Usuários**
   - Autenticação simples com validação de credenciais.
2. **Cadastro de Usuários**
   - Formulário completo para inserção de informações como nome, CPF, e-mail, senha, endereço e telefone.
   - Salva os dados cadastrados em um arquivo JSON local via download.
3. **Interface Responsiva**
   - Totalmente estilizada com **styled-components**.
   - Compatível com dispositivos móveis e desktops.

---

## 🚀 Tecnologias Utilizadas
- **React.js**: Biblioteca JavaScript para construção da interface do usuário.
- **React Router DOM**: Gerenciamento de rotas.
- **styled-components**: Estilização CSS dentro dos componentes React.
- **react-hook-form**: Manipulação e validação de formulários.
- **file-saver**: Biblioteca para salvar arquivos no navegador.

---

## 📂 Estrutura do Projeto
```
Pizzaria-WEB/
│
├── src/
│   ├── componentes/          # Componentes reutilizáveis (ex.: logo)
│   ├── Paginas/              # Páginas principais (Login, Cadastro)
│   ├── App.js                # Configuração principal do app
│   ├── index.js              # Ponto de entrada do React
│   └── styles/               # Estilos globais e utilitários
│
├── public/                   # Arquivos públicos (index.html, imagens)
│
├── package.json              # Dependências e scripts do projeto
│
└── README.md                 # Documentação do projeto
```

---

## ⚙️ Instalação e Configuração

### Pré-requisitos
Certifique-se de ter o **Node.js** e o **npm** instalados na sua máquina.

### Passo a Passo
1. **Clone o repositório**:
   ```bash
   git clone https://github.com/seu-usuario/Pizzaria-WEB.git
   ```
2. **Entre no diretório do projeto**:
   ```bash
   cd Pizzaria-WEB
   ```
3. **Instale as dependências**:
   ```bash
   npm install
   ```
4. **Inicie o servidor de desenvolvimento**:
   ```bash
   npm start
   ```
5. Acesse o projeto no navegador:
   ```
   http://localhost:3000
   ```

---

## 🔍 Como Usar

### Tela de Login
1. Insira o e-mail e a senha pré-definidos no código para acessar o sistema.
   - **E-mail**: `wesley@gmail.com`
   - **Senha**: `123456`
2. Caso os dados estejam incorretos, uma mensagem de erro será exibida.

### Tela de Cadastro
1. Preencha todos os campos obrigatórios do formulário.
2. Clique em "Cadastrar" para salvar as informações.
3. Um arquivo `usuario-cadastrado.json` será gerado para download.

---

## 🧩 Contribuição
Contribuições são sempre bem-vindas! Siga os passos abaixo para colaborar:
1. Faça um fork do projeto.
2. Crie uma nova branch com sua funcionalidade:
   ```bash
   git checkout -b minha-nova-funcionalidade
   ```
3. Realize os commits das alterações:
   ```bash
   git commit -m "Minha nova funcionalidade"
   ```
4. Faça o push para sua branch:
   ```bash
   git push origin minha-nova-funcionalidade
   ```
5. Abra um Pull Request no repositório original.

---

## 💡 Contato
Para dúvidas ou sugestões, entre em contato:

- **Nome**: Wesley Santos de Sousa
- **E-mail**: wesley16rg@gmail.com
- **LinkedIn**: [Perfil no LinkedIn](https://www.linkedin.com/in/wesley-sousa-1568b8222/)
---

# Lira

Lira é uma plataforma de compartilhamento de música que visa conectar artistas e ouvintes de forma interativa e colaborativa. Permite que músicos troquem composições, partituras e gravações, promovendo a colaboração musical e a descoberta de novas melodias.

## Executar o projeto 

```
cd frontend
npm install
npm start
```

## Tecnologias

- **Linguagem:** Javascript, Java

## Funcionalidades

---

### **Autenticação**

1️⃣ **Registro de usuário**  
**DADO** que sou um novo usuário,  
**QUANDO** acesso a página de cadastro e preencho meu e-mail e senha,  
**ENTÃO** minha conta é criada e posso acessar a plataforma.

✅ **INVEST:** História independente, pequena e testável ao validar o fluxo de cadastro.

---

2️⃣ **Login do usuário**  
**DADO** que já possuo uma conta,  
**QUANDO** informo meu e-mail e senha corretamente na tela de login,  
**ENTÃO** sou autenticado e redirecionado para minha página de perfil.

✅ **INVEST:** Pequena, valiosa e testável verificando o login correto.

---

3️⃣ **Recuperação de senha**  
**DADO** que esqueci minha senha,  
**QUANDO** solicito recuperação e informo meu e-mail,  
**ENTÃO** recebo um link para redefinição da senha.

✅ **INVEST:** Pequena e independente, facilita testes de recuperação de credenciais.

---

### **Gerenciamento de Portfólio**

4️⃣ **Upload de música (MP3)**  
**DADO** que estou autenticado,  
**QUANDO** faço upload de um arquivo MP3,  
**ENTÃO** ele é armazenado no meu portfólio e fica disponível para reprodução.

✅ **INVEST:** História essencial, pequena e testável verificando o upload e exibição.

---

5️⃣ **Edição do perfil**  
**DADO** que estou autenticado,  
**QUANDO** altero meu nome, foto ou biografia,  
**ENTÃO** as informações são salvas e exibidas no meu perfil atualizado.

✅ **INVEST:** Pequena e independente, garantindo personalização do usuário.

---

### **Descoberta de Músicas**

6️⃣ **Visualização de perfis públicos**  
**DADO** que sou um visitante,  
**QUANDO** acesso o perfil de um músico,  
**ENTÃO** posso visualizar sua foto, biografia e lista de músicas.

✅ **INVEST:** Testável e pequena, permitindo exploração de portfólios.

---

7️⃣ **Reprodução de música**  
**DADO** que estou no perfil de um usuário,  
**QUANDO** clico em uma música,  
**ENTÃO** a reprodução inicia diretamente na plataforma.

✅ **INVEST:** Valiosa e testável, garantindo funcionalidade essencial de portfólio.

---

# Protótipo

<img src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExNzVwNWdwa3JrODd4M2hwYTN4ZG50cTMzbm83NjE5NGk5M3B2NnIxbyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/C8ZoNpgUXRuyjc4nQV/giphy.gif"/>

[Clique aqui para conferir](https://www.figma.com/proto/oJ9ufsbaJr8AG3USKD68Oz/Lira?node-id=1-13&t=Xqz8ot83MIXzlyAW-1)

## Contato

Criado por **Mateus Xavier**  
E-mail: [mxs2@cesar.school](mailto:mxs2@cesar.school)

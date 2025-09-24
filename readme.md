# Nó Customizado n8n: Gerador de Números Aleatórios

Projeto desenvolvido como parte do desafio técnico para o processo seletivo de Trainee na **Onfly**.

O objetivo deste projeto foi criar um nó (conector) personalizado para a plataforma de automação n8n. Este nó se conecta à API pública do `Random.org` para gerar um número inteiro verdadeiramente aleatório com base em um intervalo definido pelo usuário.

## 🚀 Funcionalidades

- **Integração com API Externa:** Utiliza o endpoint `GET` do [Random.org](https://www.random.org/integers/) para buscar dados.
- **Operação Única:** O nó possui uma única operação chamada "True Random Number Generator".
- **Parâmetros Dinâmicos:** Recebe um valor **Mínimo** e **Máximo** como entrada para definir o intervalo do número a ser gerado.
- **Ícone Customizado:** Possui um ícone SVG personalizado para fácil identificação na interface do n8n.

## 🛠️ Tecnologias Utilizadas

- **n8n:** Versão `1.85.4`
- **TypeScript:** Linguagem principal para o desenvolvimento do nó.
- **Node.js:** Versão `22 LTS`
- **Docker & Docker Compose:** Para criação e orquestração do ambiente de desenvolvimento local.
- **PostgreSQL:** Banco de dados para a instância do n8n.

## ⚙️ Pré-requisitos

Antes de começar, garanta que você tenha as seguintes ferramentas instaladas em sua máquina:

- [Node.js](https://nodejs.org/) (versão 22 LTS)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)

## 📦 Instalação e Configuração

Siga os passos abaixo para configurar e executar o projeto localmente.

**1. Clone o Repositório**
```bash
git clone [https://github.com/Bruno-jhka/n8n-custom-random-node.git]
cd SEU_REPOSITORIO
```

**2. Instale as Dependências do Projeto**
Este comando irá instalar as dependências necessárias para o desenvolvimento e compilação do nó customizado.
```bash
npm install
```

**3. Compile o Código TypeScript**
O n8n executa arquivos JavaScript. Este comando compila o código-fonte `.ts` para `.js` na pasta `/dist` e também copia os arquivos de ícone (`.svg`) para o destino correto.
```bash
npm run build
```

---
## ▶️ Executando a Aplicação

Com o ambiente configurado, o próximo passo é iniciar os serviços do n8n e do banco de dados.

**1. Inicie o Docker Desktop**
Certifique-se de que o aplicativo Docker Desktop esteja em execução na sua máquina.

**2. Execute com Docker Compose**
Este comando irá baixar as imagens necessárias (se ainda não existirem) e iniciar os contêineres do n8n e do PostgreSQL.
```bash
docker-compose up
```

Após a inicialização, a interface do n8n estará acessível no seu navegador em:
**[http://localhost:5678](http://localhost:5678)**

### 🚨 Nota Importante para Usuários Windows
Para garantir que o Docker tenha recursos suficientes e evitar problemas de performance (`exit code 137`), é recomendado criar um arquivo `.wslconfig` na sua pasta de usuário (`C:\Users\<seu-usuario>\.wslconfig`) com o seguinte conteúdo:
```
[wsl2]
memory=6GB
processors=4
```
Após criar ou modificar este arquivo, é necessário reiniciar o computador para que as alterações tenham efeito.

---
## 🧪 Como Testar o Nó

1.  Acesse **[http://localhost:5678](http://localhost:5678)**.
2.  Na primeira vez, você precisará criar uma conta de administrador (owner account).
3.  Após o login, crie um novo workflow em branco.
4.  Clique no botão `+` para adicionar um novo nó.
5.  Na barra de busca, procure por **"Random"**. Seu nó customizado deverá aparecer com o ícone personalizado.
6.  Adicione o nó ao canvas.
7.  Nos parâmetros do nó à direita, defina os valores de **Min** e **Max** (ex: 1 e 100).
8.  Clique em **"Execute Node"**.
9.  Verifique a aba **"Output"** para ver o resultado, que deve ser um JSON contendo o número aleatório gerado, como no exemplo abaixo:
    ```json
    [
      {
        "randomNumber": 73
      }
    ]
    ```

---
Feito por **Bruno Henrique Freitas**.
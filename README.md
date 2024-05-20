Claro, aqui está o arquivo README.md em português, com informações sobre as tecnologias usadas e sem a parte do Vercel:

### README.md

```markdown
# Marvel Characters

Marvel Characters é uma aplicação web que permite aos usuários navegar e pesquisar por personagens da Marvel. A aplicação busca dados da API da Marvel e exibe informações detalhadas sobre cada personagem.

## Tecnologias Utilizadas

- [Next.js]
- [React]
- [Axios]
- [Tailwind CSS]
- [TypeScript]

## Funcionalidades

- Navegar pelos personagens da Marvel
- Pesquisar por personagens específicos
- Visualizar informações detalhadas sobre cada personagem
- Design responsivo

## Primeiros Passos

Siga estas instruções para configurar o projeto localmente na sua máquina.

### Pré-requisitos

Certifique-se de ter o seguinte software instalado:

- [Node.js]
- [npm]
- [Git]

### Instalação

1. **Clone o repositório**

   ```bash
   git clone https://github.com/celobastos/marvel-characters.git
   ```

2. **Navegue até o diretório do projeto**

   ```bash
   cd marvel-characters
   ```

3. **Instale as dependências**

   Usando npm:

   ```bash
   npm install
   ```

   Ou usando yarn:

   ```bash
   yarn install
   ```

### Configuração

1. **Obtenha as chaves da API da Marvel**

   - Acesse o [Portal do Desenvolvedor da Marvel](https://developer.marvel.com/)
   - Crie uma nova aplicação para obter suas chaves pública e privada.

2. **Configure as variáveis de ambiente**

   Crie um arquivo `.env.local` no diretório raiz do projeto e adicione suas chaves da API da Marvel:

   ```plaintext
   NEXT_PUBLIC_MARVEL_PUBLIC_KEY=sua_chave_publica
   NEXT_PUBLIC_MARVEL_PRIVATE_KEY=sua_chave_privada
   ```

### Executando a Aplicação

1. **Inicie o servidor de desenvolvimento**

   Usando npm:

   ```bash
   npm run dev
   ```

   Ou usando yarn:

   ```bash
   yarn dev
   ```

2. **Abra o navegador**

   Abra seu navegador e navegue até [http://localhost:3000](http://localhost:3000) para ver a aplicação.
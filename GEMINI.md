# Gemini CLI Steering Rules

Este arquivo funciona como um arquivo de direcionamento ("steering file", semelhante ao `.cursorrules` do Cursor) para o Gemini CLI.
As instruções contidas nos arquivos `GEMINI.md` são mandatos fundamentais e têm precedência absoluta sobre os meus fluxos de trabalho e padrões gerais.

## Contexto do Projeto

- **Nome:** IDR Web
- **Stack Tecnológica:** React 18, TypeScript, Vite, Tailwind CSS.
- **Gerenciador de Pacotes:** `pnpm` (versão ~10.x).
- **Ambiente:** Node >= 20.
- **Principais Bibliotecas:**
  - **Estado/Dados:** `@tanstack/react-query` (v5), `axios`.
  - **Formulários:** `react-hook-form`, `zod`, `@hookform/resolvers`.
  - **UI/Componentes:** `radix-ui`, `tailwind-merge`, `class-variance-authority` (CVA), `lucide-react` (ícones), `@tanstack/react-table` (tabelas).
  - **Feedback/Navegação:** `react-hot-toast`, `react-router-dom` (v6).
  - **Testes/Mock:** `msw` (Mock Service Worker), `@faker-js/faker`.

## Arquitetura e Padrões de Módulos (Clean Architecture)

O projeto segue uma estrutura baseada em camadas para garantir desacoplamento:

1.  **`src/core/domain`**: Contém as regras de negócio puras.
    - `models`: Definições de tipos das entidades (ex: `UserModel`).
    - `use-cases`: Interfaces que definem as ações do sistema (ex: `GetMeUseCase`). Utilizam o contrato `RequestInterface<TParams, TResponse>`.
    - `errors`: Classes de erro customizadas (ex: `UnexpectedError`).
2.  **`src/core/data`**: Implementações das interfaces do domínio.
    - `use-cases`: Implementações concretas (ex: `RemoteGetMeUseCase`).
    - `protocols`: Definições de contratos para infraestrutura (ex: `HttpClient`).
3.  **`src/core/infra`**: Implementações de infraestrutura (ex: adaptadores de Cache ou Http).
4.  **`src/core/main`**: Ponto de entrada e composição da aplicação.
    - `factories`: Funções que instanciam casos de uso com suas dependências (ex: `makeRemoteGetMeUseCase`).
    - `routes`: Configurações de rotas do sistema.
5.  **`src/core/presentation`**: Camada de interface com o usuário.
    - `components`: Componentes de UI reutilizáveis e atômicos.
    - `hooks`: Hooks customizados, incluindo os hooks de query (`queries`) que consomem as factories.
6.  **`src/app`**: Contém os módulos específicos de negócio (ex: `animals`, `auth`, `properties`) e as páginas da aplicação.
7.  **`src/core/mocks`**: Handlers e utilitários do MSW para desenvolvimento local e testes.

## Regras de Código e Padrões

1.  **Linguagem:** Responda sempre em Português do Brasil (pt-BR).
2.  **Componentes:** Utilize componentes funcionais e hooks. Mantenha a lógica de dados em hooks customizados (ex: `useMyQuery`).
3.  **Tipagem:**
    - Use `type` em vez de `interface` para modelos e contratos.
    - **Não** utilize o prefixo `I` em tipos (ex: use `AnimalModel`, não `IAnimal`).
    - Use TypeScript estrito.
4.  **Uso de Ícones:** Utilize exclusivamente `lucide-react`.
5.  **Feedback ao Usuário:** Utilize `react-hot-toast` para mensagens de sucesso ou erro.
6.  **Importações:**
    - Utilize *absolute imports* com os aliases `@/core/...` e `@/app/...`.
    - Ordem de importação: React (topo), bibliotecas externas, módulos internos (@/...), estilos.
7.  **Padrão de UseCase:** Sempre defina a interface no `domain` usando `RequestInterface` e implemente no `data`. Use factories no `main` para prover instâncias prontas para os hooks.

## Fluxo de Trabalho e Comandos

- **Instalação:** `pnpm install`
- **Desenvolvimento:** `pnpm dev`
- **Lint/Format:** `pnpm format:fix` e `pnpm lint:fix` (execute sempre antes de finalizar uma tarefa).
- **Type Check:** `pnpm type:check`
- **Mocks:** Ao adicionar ou alterar uma rota de API, atualize os handlers em `src/core/mocks/handlers`.
- **Sementes de Dados:** O comando `pnpm seed:mock` pode ser usado para popular dados de mock.
- **Storybook:** Utilize `pnpm storybook:dev` para desenvolver componentes de UI isoladamente.

## Linting e Formatação

1. Prettier: `semi: false`, `singleQuote: true`.
2. Proibido o uso de `console.log`. Use `console.info`, `console.warn` ou `console.error`.
3. Siga as regras de acessibilidade JSX (`jsx-a11y`).

Em caso de dúvidas sobre onde adicionar um novo arquivo, analise a estrutura de diretórios existente para manter a consistência.

# Gemini CLI Steering Rules

Este arquivo funciona como um arquivo de direcionamento ("steering file", semelhante ao `.cursorrules` do Cursor) para o Gemini CLI.
As instruções contidas nos arquivos `GEMINI.md` são mandatos fundamentais e têm precedência absoluta sobre os meus fluxos de trabalho e padrões gerais.

Você pode editar este arquivo à vontade para me dar mais contexto, ditar regras de arquitetura ou definir como devo me comportar no projeto.

## Contexto do Projeto

- **Nome:** IDR Web
- **Stack Tecnológica:** React 18, TypeScript, Vite, Tailwind CSS
- **Gerenciador de Pacotes:** `pnpm` (use apenas `pnpm` para instalar dependências e rodar scripts).

## Arquitetura e Padrões de Módulos

O projeto segue uma arquitetura modular, tipicamente dividida em:

- `data`: Implementações de repositórios e serviços.
- `domain`: Modelos, tipagens de entidades e contratos de UseCases.
- `main`: Factories, rotas e injeção de dependências.
- `mocks`: Handlers de Mock Service Worker (MSW).
- `presentation`: Componentes UI, hooks, páginas e screens.

## Regras de Código e Padrões

1. **Linguagem de Comunicação:** Responda em Português do Brasil (pt-BR).
2. **Estilo de Código:** Utilize componentes funcionais, hooks customizados e TypeScript estrito.
3. **Padrão de Nomenclatura:** Interfaces devem começar com a letra `I` maiúscula (e.g. `IAnimal`). Isso é mandatório de acordo com as regras de lint do projeto.
4. **Gerenciamento de Estado/Dados:**
   - O projeto utiliza React Query (`@tanstack/react-query`) para chamadas e cache. Siga os padrões com hooks customizados (e.g. `useMyQuery()`).
   - Formulários são construídos utilizando `react-hook-form` associado ao `zod` e `@hookform/resolvers` para validação de esquemas.
5. **Componentização (UI):** O projeto utiliza Radix UI e componentes padronizados via Tailwind/CVA. Reutilize componentes base existentes em `src/core/presentation/components` sempre que possível.
6. **Importações:** Dê preferência a *absolute imports* (`@/app/...` ou `@/core/...`) ao importar de outros módulos, para evitar caminhos relativos longos e confusos. O lint exige que as importações do react fiquem no topo.

## Linting e Formatação

1. O projeto usa Prettier sem ponto e vírgula (`semi: false`) e com aspas simples (`singleQuote: true`).
2. Respeite rigorosamente as regras do ESLint, que incluem restrições sobre ordem de importação, regras de acessibilidade JSX (`jsx-a11y`) e checagem forte de dependências em hooks do React.
3. Não use `console.log`, dê preferência a `console.info`, `console.warn` ou `console.error` quando necessário, pois logs geram *warnings* no lint.

## Fluxo de Trabalho

- Antes de considerar uma implementação como concluída, certifique-se de executar `pnpm format:fix` seguido de `pnpm lint:fix` para limpar os arquivos.
- Se fizer alterações profundas de tipagem, você pode rodar `pnpm type:check` para assegurar a consistência global.
- Crie ou atualize os *mocks* (MSW) ao adicionar novas requisições na API para garantir o funcionamento local para testes.
- Em caso de dúvidas sobre regras de negócio, arquitetura ou escopo de refatorações, pergunte antes de assumir um comportamento genérico.

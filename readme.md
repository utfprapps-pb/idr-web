# Instruções de Desenvolvimento Front-End [PT-BR]

## Estrutura de Componentes

Ao desenvolver componentes, siga estas diretrizes:

### Convenções de Codificação

1. Nomenclatura:

   - Utilize kebab-case para nomes de arquivos e pastas.
   - Use PascalCase para nomes de componentes e interfaces/tipos.
   - Use camelCase para nomes de funções, variáveis e propriedades.
   - Dê sentido ao arquivo, por exemplo se for um caso de uso nomeie o final como `-use-case.ts`
   - - **Exemplo:** `get-animals-use-case.ts`
   - Implementações dentro da camada de `data` devem seguir o padrão de `remote-`
   - - **Exemplo:** `remote-get-animals-use-case.ts`

2. Declarações:

   - Declare funções de componentes e hooks usando `function` em vez de `const`.
   - Utilize `type` para tipagem TypeScript em vez de `interface`.

3. Extensões de arquivo:

   - `.tsx` para arquivos de componentes React.
   - `.ts` para arquivos TypeScript puros.
   - `.hook.ts` para arquivos de hooks personalizados.
   - `.stories.tsx` para arquivos de Storybook.

4. Boas práticas:

   - Mantenha funções pequenas e com uma única responsabilidade.
   - Utilize nomes descritivos para funções, variáveis, propriedades e arquivos.
   - Use bons e poucos comentários somente para explicar lógica complexa ou decisões de design não óbvias.
   - Implemente tratamento de erros adequado, especialmente em operações assíncronas.

5. Estilização:

   - Utilize TailwindCSS estilos de componentes.
   - Mantenha a consistência com o design system do projeto.

6. Performance:

   - Utilize `React.memo()` para componentes que não precisam re-renderizar frequentemente.
   - Utilize `React.useMemo()` para evitar cálculos caros em cada renderização.
   - Utilize `React.useCallback()` para evitar recriar funções em cada renderização.
   - Implemente lazy loading para componentes grandes ou raramente usados.

7. Acessibilidade:
   - Siga as diretrizes WCAG para garantir que os componentes sejam acessíveis.
   - Use atributos ARIA quando necessário.

### Estrutura de Arquivos

1. Crie uma pasta com o nome do componente em kebab-case (ex.: `nome-do-componente`).
2. Dentro da pasta, crie os seguintes arquivos:
   - `nome-do-componente.tsx`: Contém o código do componente.
   - `index.ts`: Exporta o componente (`export * from './nome-do-componente'`).
   - `nome-do-componente.hook.ts`: Contém a lógica e regras de negócio associadas ao componente (model no MVVM).
   - `nome-do-componente.stories.tsx`: Storybook stories para o componente, se aplicável.

#### Exemplo de Estrutura

```markdown
nome-do-componente/
│
├── nome-do-componente.tsx
├── index.ts
├── nome-do-componente.hook.ts
├── nome-do-componente.stories.tsx (opcional)
```

### Gerenciamento de Estado

- Use Zustand para estado global quando apropriado.
- Use React Context para compartilhar estado entre vários componentes.

### Documentação

- Inclua JSDoc para funções e componentes importantes. (Ajustes futuros)
- Mantenha um README.md atualizado na raiz do projeto com instruções de instalação, execução e contribuição.

### Controle de Versão

- Faça commits frequentes, mensagens claras e descritivas.
- Utilize feature branches e pull requests para novas funcionalidades.
- Utilize a nomenclatura certa para o commit de acordo com o [guia de convenções de commit](https://www.conventionalcommits.org/en/v1.0.0/)

### Testes (Futuro)

- Escreva testes unitários para lógica de negócios.
- Implemente testes de integração para fluxos importantes do usuário.
- Mantenha uma cobertura de testes adequada.

### Justificativa

Esta estrutura e estas convenções visam:

1. Manter a organização, legibilidade e consistência do código.
2. Facilitar a manutenção e colaboração no projeto.
3. Melhorar a performance e acessibilidade da aplicação.
4. Garantir a qualidade do código através de testes e boas práticas.
5. Promover a escalabilidade e sustentabilidade do projeto a longo prazo.

### Recursos Adicionais

- [Documentação do React](https://reactjs.org/docs/getting-started.html)
- [Documentação do TailwindCSS](https://tailwindcss.com/docs)
- [Documentação do Zustand](https://zustand.docs.pmnd.rs/getting-started/introduction)
- [Documentação do Storybook](https://storybook.js.org/docs)
- [JSDoc](https://jsdoc.app/)

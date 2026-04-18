---
name: idr-web-module-generator
description: Guide for creating a new module from scratch following IDR Web Clean Architecture standards. Use this skill when asked to create a new module, entity, feature, or CRUD operations in the IDR Web project.
---

# IDR Web Module Generator

This skill contains the procedural knowledge required to build a new module from scratch in the IDR Web project. It ensures that the generated code strictly follows the project's Clean Architecture conventions and specific module structures.

## Core Mandates

The IDR Web project strictly follows a layered Clean Architecture structure. Every module typically consists of these layers:
- `domain`: Models, Types, and Use Cases interfaces.
- `data`: Implementations of domain use cases (e.g., `RemoteGet...`).
- `main`: Factories that instantiate the use cases to be consumed by the UI.
- `presentation`: UI components (Screens, Components, Forms, Contexts, Hooks, Types, Validations).
- `mocks`: Mock Service Worker handlers for local development.

## Step-by-Step Workflow

When asked to create a new module (e.g., "machines"), follow these steps precisely:

### 1. Domain Layer (`src/app/modules/{module-name}/domain`)
- Create `models/{module-name}-model.ts` with `WithId` type.
- Create `use-cases/{module-name}-use-cases/` directory.
- Define `RequestInterface` for all CRUD operations:
  - `create-{entity}-use-case.ts`
  - `update-{entity}-use-case.ts`
  - `delete-{entity}-use-case.ts`
  - `get-{entity}-use-case.ts` (Get One)
  - `get-{entities}-use-case.ts` (Get All/Paginated list)
- Export everything via `index.ts`.

### 2. Data Layer (`src/app/modules/{module-name}/data`)
- Create `use-cases/{module-name}-use-cases/` directory.
- Implement the domain interfaces using `HttpClient` from `@/core/data/protocols/http`:
  - `remote-create-{entity}-use-case.ts`
  - `remote-update-{entity}-use-case.ts`
  - `remote-delete-{entity}-use-case.ts`
  - `remote-get-{entity}-use-case.ts`
  - `remote-get-{entities}-use-case.ts`
- Throw custom errors on failure (e.g., `BadRequestError`, `ForbiddenError`, `UnexpectedError`).
- Export everything via `index.ts`.

### 3. Main Layer (`src/app/modules/{module-name}/main`)
- Create `factories/use-cases/{module-name}-use-cases/` directory.
- Create factory functions utilizing `makeApiHttpClient()` to instantiate the Data layer classes:
  - `remote-create-{entity}-use-case-factory.ts`
  - `remote-update-{entity}-use-case-factory.ts`
  - `remote-delete-{entity}-use-case-factory.ts`
  - `remote-get-{entity}-use-case-factory.ts`
  - `remote-get-{entities}-use-case-factory.ts`
- Export everything via `index.ts`.

### 4. Mocks Layer (`src/app/modules/{module-name}/mocks`)
- Create `handlers/{module-name}-handlers/` directory.
- Implement MSW handlers for all operations:
  - `create-{entity}-handler.ts`
  - `update-{entity}-handler.ts`
  - `delete-{entity}-handler.ts`
  - `get-{entity}-handler.ts`
  - `get-{entities}-handler.ts` (Implement pagination and sorting logic from `mock/utils`)
- Export handlers via `index.ts`.
- Important: Register the new handlers inside `src/core/mocks/browser.ts`.

### 5. Presentation Layer (`src/app/modules/{module-name}/presentation`)
This layer requires a highly specific file organization:

#### Validations and Types
- Create `validations/{entity}-form-schema.ts` with `zod`.
- Create `types/{entity}-types.ts` defining `Filters` and `Sort` types.

#### Queries Hooks
- Create `hooks/queries/{entities}-query.hook.ts` using `@tanstack/react-query` to fetch lists. Handle `toast.error` for errors.
- Create `hooks/queries/all-{entities}-query.hook.ts` (following the `all-breeds` pattern) to fetch a list of items mapped to `Option` (using `toOption`).
- Create `hooks/queries/{entity}-query.hook.ts` for fetching single items.
- Always use the factories from the `main` layer.

#### Context API
- Create `contexts/{entity}-context.tsx` controlling:
  - Form open/close states (New and Edit).
  - Delete dialog open/close states.
  - Selected item state.
  - Filter and sort states.
- Create `hooks/{entity}-context.hook.ts` to consume the context securely.

#### UI Components
- **Data Table**: `components/{entity}-data-table/`
  - Needs 3 files:
    - `index.ts` (exporting `{entity}-data-table.tsx`)
    - `{entity}-data-table.hook.tsx` mapping columns and returning `react-table` configuration.
    - `{entity}-data-table.tsx` implementing the table using the generic `<DataTable />` component from `@/core/presentation/components/ui`.
  - Include an action column with a `DropdownMenu` for "Editar" and "Excluir".
- **Delete Dialog**: `components/{entity}-delete-dialog/`
  - Needs 2 files:
    - `index.ts` (exporting `{entity}-delete-dialog.tsx`)
    - `{entity}-delete-dialog.tsx` (Implement with `<AlertDialog />`, use `finally` block to close the dialog, and follow the Title pattern: `{`Deseja remover o [entity] ${item?.name}?`}`)
  - Invalidates react-query cache on success.
- **Forms**: `forms/{entity}-form/`
  - Needs 6 files:
    - `index.ts` (exporting `{entity}-form.tsx`)
    - `{entity}-form.tsx` (Wrapper rendering `Create` or `Edit` based on `id` prop presence).
    - `create-{entity}-form.tsx` (using `<Sheet />`, form className `flex flex-col gap-4`, button text "Criar")
    - `edit-{entity}-form.tsx` (fetches the item via Get One hook, displays `<Loading />` while fetching, form className `flex flex-col gap-4`, button text "Salvar")
    - `{entity}-form-inputs.tsx` (UI inputs mapped to `react-hook-form` via `useFormContext`. Use `useAll{Entities}Query` for Comboboxes/Selects)
    - `{entity}-initial-form-data.ts` (Empty initial data object)

#### Screens
- Create `screens/{entities}-screen.tsx` which glues everything together:
  - Wraps content in `{Entity}Provider` and `{Entity}Context.Consumer`.
  - Destructure values in this exact order: `filters, handleChangeFilters, selected{Entity}, isOpenDelete{Entity}Container, isOpenNew{Entity}Form, isOpenEdit{Entity}Form, openNew{Entity}Form`.
  - Header (or `div` for sub-screens) with an "Add" button and a search `<Input />`.
  - `Input` value should be `filters.field?.value` (without `?? ''`).
  - `handleChangeFilters` inside `onChange` should be multi-line.
  - Renders `<{Entity}DataTable />`.
  - Conditionally renders `<{Entity}DeleteDialog />` and `<{Entity}Form />`.

## Example and Reference Check
**CRITICAL MANDATE:** To guarantee that the generated code has the exact same conditionals, React hooks usage, types, error messages in use-cases, and architectural structure as the rest of the project, you **MUST ALWAYS** read the files in the `src/app/modules/input-uses` or `src/app/modules/cultivations` modules before writing any code.

**DO NOT** rely on your general knowledge to generate the file contents. You must treat the existing modules as strict templates. For every single file you create (e.g., the Delete Dialog, the Create Form, the Data Table, the Use Cases), you must read its equivalent in the reference module, copy its exact implementation logic, and adapt only the entity names, variables, specific domain fields, and **Custom Error Messages**. This is the only way to ensure 100% fidelity to the project's internal patterns. Pay special attention to change strings like "Local de Uso" or "Praga" in exceptions like `NotFoundError("...")` or `ForbiddenError("Você não tem permissão para...")` to match the newly created entity context.

**Presentation Custom Messages:** You must also strictly adapt all success and error toasts, dialog titles, form titles, and action button labels present in the UI layers (`presentation/components`, `presentation/forms`, `presentation/screens`, `presentation/hooks/queries`) to the new entity name. For example, replace `toast.success('Local de utilização removido com sucesso')` with the appropriate label for the new entity. **Pay special attention to `useEffect` error toasts in query hooks** (`presentation/hooks/queries/{entity}-query.hook.ts`).

**Form Inputs and Placeholders:** Inside `presentation/forms/{entity}-form-inputs.tsx`, you must adapt all `<Form.Label>` and `<Input placeholder="..." />` to match the new entity's fields and context. Avoid leaving generic labels like "Descrição" if the field is "Nome", and update examples in placeholders (e.g., from "Ex: Galpão" to "Ex: Fertilizantes").

**Constants and Variables:** All constant names, like `INITIAL_FORM_DATA` or `FORM_SCHEMA`, should also be renamed to match the new entity prefix (e.g., `PRODUCT_CATEGORY_INITIAL_FORM_DATA`). Ensure that all imports of these constants are also updated accordingly.

**Once the files are created:** Always run formatting (`pnpm format:fix`) and linting (`pnpm lint:fix`) for the newly created module folder, and run `pnpm type:check` to ensure no errors were introduced.

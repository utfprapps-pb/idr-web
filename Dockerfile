FROM node:26-alpine AS build-step

WORKDIR /app

# Copiar apenas os manifests
COPY package.json pnpm-lock.yaml ./

# Instalar dependências
RUN npm install -g pnpm@10.32.1 \
    && pnpm install --frozen-lockfile

# Copiar código
COPY . .

ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}
ARG VITE_API_MOCKED
ENV VITE_API_MOCKED=${VITE_API_MOCKED}

# Seed mock
RUN pnpm seed:mock

# Gerar build
RUN pnpm build

FROM nginx:stable-alpine
COPY --from=build-step /app/dist /usr/share/nginx/html
COPY default-custom.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
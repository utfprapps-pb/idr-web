FROM node:22.18-alpine AS build-step

WORKDIR /app

# Copiar apenas os manifests
COPY package.json pnpm-lock.yaml ./

# Instalar dependências
RUN npm install -g pnpm \
    && pnpm install --frozen-lockfile

# Copiar código
COPY . .

# Seed mock
RUN pnpm seed:mock

# Gerar build
RUN pnpm build

FROM nginx:stable-alpine
COPY --from=build-step /app/dist /usr/share/nginx/html
COPY default-custom.conf /etc/nginx/conf.d/default.conf
EXPOSE 8200
CMD ["nginx", "-g", "daemon off;"]
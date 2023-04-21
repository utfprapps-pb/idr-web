FROM node:18.14.0-alpine AS build-step
RUN mkdir /app
WORKDIR /app
COPY . /app
RUN npm install -g pnpm
RUN pnpm install
RUN pnpm build

FROM nginx:stable-alpine
COPY --from=build-step /app/dist /usr/share/nginx/html
# @viniciuspegorini alterar a porta conforme a necessidade
EXPOSE 8200
CMD ["nginx", "-g", "daemon off;"]
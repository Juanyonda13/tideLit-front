# Etapa de construcción
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json pnpm-lock.yaml ./

# Instalar pnpm y dependencias
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile

# Configurar variables de entorno para resolver problemas de crypto
ENV NODE_OPTIONS="--openssl-legacy-provider"

# Copiar código fuente
COPY . .

# Construir la aplicación
ARG VITE_API_BASE_URL=https://apitidelit.codecrafstudio.com
ARG NODE_ENV=production
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
ENV NODE_ENV=$NODE_ENV
RUN pnpm run build

# Etapa de producción
FROM nginx:alpine

# Copiar archivos construidos
COPY --from=builder /app/dist /usr/share/nginx/html

# Copiar configuración personalizada de nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Exponer puerto
EXPOSE 80

# Comando por defecto
CMD ["nginx", "-g", "daemon off;"]

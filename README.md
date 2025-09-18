## Frontend (Vue 3 + Vite)

### Requisitos
- Node 18+ / pnpm
- Docker (opcional)

### Desarrollo Local
```bash
# Instalar dependencias
pnpm install

# Ejecutar servidor de desarrollo
pnpm run dev
# Abre http://localhost:5173
```

### Desarrollo con Docker
```bash
# Desarrollo con hot reload
docker-compose up frontend-dev
# Abre http://localhost:5173

# Producción
docker-compose --profile production up frontend-prod
# Abre http://localhost:80
```

### Comandos Docker
```bash
# Construir imagen de desarrollo
docker build -f Dockerfile.dev -t tidelit-frontend-dev .

# Construir imagen de producción
docker build -t tidelit-frontend-prod .

# Ejecutar contenedor de desarrollo
docker run -p 5173:5173 -v $(pwd):/app tidelit-frontend-dev

# Ejecutar contenedor de producción
docker run -p 80:80 tidelit-frontend-prod
```

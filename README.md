## Frontend TideLit (Vue 3 + Vite + CI/CD)

### 🚀 Despliegue Automático con GitHub Actions

El proyecto ahora usa **CI/CD completamente automatizado** con GitHub Actions:

- ✅ **Tests automáticos** en cada PR
- ✅ **Build automático** en cada push
- ✅ **Despliegue automático** a producción en `main/master`
- ✅ **Health checks** post-despliegue

### 📋 Requisitos
- Node 20+ / pnpm
- Docker (para desarrollo local)
- GitHub Actions (configurado automáticamente)

### 🔧 Configuración de Secrets en GitHub

Para que funcione el despliegue automático, configura estos secrets en tu repositorio:

```
Settings → Secrets and variables → Actions → New repository secret
```

**Secrets necesarios:**
- `SERVER_HOST`: IP del servidor (ej: 168.231.71.181)
- `SERVER_USER`: Usuario SSH (ej: root)
- `SERVER_SSH_KEY`: Clave privada SSH
- `SERVER_PORT`: Puerto SSH (opcional, default: 22)

### 🌐 Configuración de la API

Docker maneja automáticamente las variables de entorno:

- **Desarrollo**: `http://localhost:8000` (configurado en Dockerfile.dev)
- **Producción**: `https://apitidelit.codecrafstudio.com` (configurado en Dockerfile)

**Sin lógica condicional** - Docker define el entorno completo.

### 💻 Desarrollo Local

```bash
# Instalar dependencias
pnpm install

# Ejecutar servidor de desarrollo
pnpm run dev
# Abre http://localhost:5173
```

### 🐳 Desarrollo con Docker

```bash
# Desarrollo con hot reload
docker-compose --profile development up tidelit-front-dev
# Abre http://localhost:5173

# Producción
docker-compose --profile production up tidelit-front-prod
# Abre http://localhost:3000
```

### 📊 Monitoreo del Despliegue

1. **GitHub Actions**: Ve a la pestaña "Actions" en tu repositorio
2. **Logs del servidor**: `ssh root@[IP] "docker logs tidelit-front-web"`
3. **Estado de la app**: `curl http://[IP]:3000/health`

### 🔄 Flujo de Trabajo

1. **Desarrollo**: Trabaja en tu rama local
2. **PR**: Crea un Pull Request → Se ejecutan tests automáticos
3. **Merge**: Al hacer merge a `main` → Despliegue automático
4. **Verificación**: Health check automático post-despliegue

### 🚨 Rollback Manual (si es necesario)

```bash
# Conectar al servidor
ssh root@[IP]

# Ver contenedores
docker ps

# Reiniciar contenedor
docker restart tidelit-front-web

# Ver logs
docker logs tidelit-front-web
```

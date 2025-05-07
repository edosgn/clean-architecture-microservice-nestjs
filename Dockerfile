# ======================
# Etapa 1: Build
# ======================
FROM node:20-alpine as builder

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps --force

COPY . .
RUN npm run build

# ======================
# Etapa 2: Producción
# ======================
FROM node:20-alpine

WORKDIR /app

# Copiar solo lo necesario desde el builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

# Instalar solo dependencias necesarias para producción
RUN npm install --omit=dev --legacy-peer-deps --force

# Instalar PM2 para mantener el proceso en ejecución
RUN npm install -g pm2

EXPOSE 3000

CMD ["pm2-runtime", "dist/main.js"]

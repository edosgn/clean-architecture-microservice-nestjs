# =======================
# Etapa 1: Build
# =======================
FROM node:22-alpine as builder

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps --force

COPY . .
RUN npm run build

# =======================
# Etapa 2: Producción
# =======================
FROM node:22-alpine

WORKDIR /app

# Copiamos solo lo necesario desde la etapa anterior
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

RUN npm install -g pm2

EXPOSE 3000

CMD ["pm2-runtime", "dist/main.js"]

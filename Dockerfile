# Stage de compilation
FROM alpine:3.18 AS builder

RUN apk add --no-cache nodejs npm

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers du projet
COPY package*.json ./

# Installer les dépendances du projet
RUN npm install

# Copier le reste des fichiers de l'application
COPY . .

# Compilation l'application TypeScript
RUN npm run build

# Stage d'exécution
FROM alpine:3.18 AS runner

# Installation des paquets système nécessaires pour l'exécution
RUN apk add --no-cache nodejs npm 

# Définir le répertoire de travail
WORKDIR /app

# Copier uniquement les fichiers nécessaires à l'exécution
COPY --from=builder --chown=node:node /app/dist ./dist
COPY --from=builder --chown=node:node /app/package*.json ./
COPY --from=builder --chown=node:node /app/node_modules ./node_modules 

# Exécution de l'application
CMD ["node", "dist/server.js"]

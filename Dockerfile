# 1- IMAGE FOR BUILD OPTIMIZATION
# api-nodets-advance
# Directory Deployment
FROM node:alpine3.16 AS DEPLOYMENT

# Habilitar desde la terminal de la imagen la factibilidad de descargar procesos desde una ruta remota
RUN apk add curl bash --no-cache

# Descargar el recurso de una ruta y vincularlo  a la imagen
# f : significa forzar la instalación en un 100%
# s : significa el save o descarga del recurso
# b : significa que el recurso se esta descargando mediante procesamiento binario

RUN curl -sf https://gobinaries.com/tj/node-prune | sh -s -- -b /usr/local/bin

# especificación del directorio de la imagen
WORKDIR /build

# copiamos el package.json
COPY package.json .

# Instalar los paquetes de node
RUN npm install

# Copia de los demas archivos(archivos del código) y al directorio de la imagen WORKDIR
COPY . .

# Generar el build
RUN npm run build

# Identificar el entorno --production para que el node prune tenga el contexto de las librerías productivas a ...
RUN npm install --production

# Identificar el contexto de las librerias y la optimizaremos a partir del node-prune descargado
RUN /usr/local/bin/node-prune

# 2- IMAGE FOR PRODUCTION
# Directory Production
FROM node:alpine3.16

# Directorio de la imagen
WORKDIR /app

# Copiar archivos desde la primera imagen a la final de produccion.
COPY --from=DEPLOYMENT /build/node_modules ./node_modules

COPY --from=DEPLOYMENT /build/package.json ./package.json

COPY --from=DEPLOYMENT /build/dist ./dist

CMD ["npm","run","prod"]


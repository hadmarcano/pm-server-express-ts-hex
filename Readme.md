# Dockerfile

Nos permite crear imagenes personalizadas a partir de una aplicación.

## Tecnicas de optimización de librerias para las imagenes Docker:

Para realizar este proceso, sera hará uso del paquete node-prune. este proceso cumple con dos etapas, en resumen se intercepta el "build" y con "node-prune" los primera etapa que ocurre es que se segmenta y se asegura de que sólo pasen las dependencias productivas.

luego de esto, la segunda etapa es que se optimiza el tamaño de las dependencias del proyecto.

# Creando image mediante Docker

### 1. Creando nuestra imagen

[-t] = tagname

```
- docker build -t api-nodets-advance:1.0.0 .
```

### 2. Creando nuestra red

```
- docker network create net-hexa-advance
```

### 3. Vinculando nuestros contenedores a nuestra red

```
- docker network connect net-hexa-advance mysqlserver
```

### 4. Inspeccionando nuestra red

```
- docker network inspect net-hexa-advance
```

### 5. Creando nuestro contenedor con la nueva imagen.

```
- docker run -d --name nodets-advance-container --network net-hexa-advance -p 3000:3000 -e DB_HOST=mysqlserver -e DB_PORT=3306  api-nodets-advance:1.0.0
```

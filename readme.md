![Logo](https://imgur.com/B9kzdJP.png)
# Habits - NLW Setup

Projeto desenvolvido durante a semana NLW da Rocketseat.

## Stack utilizada

**Mobile:** React-Native, TailwindCSS

**Front-end:** React, ViteJS, TailwindCSS

**Back-end:** Node, Fastify


## Instalação

Instale nlw-setup com npm

```bash
  cd nlw-setup/web
  npm install
  
  cd nlw-setup/server
  npm install

  cd nlw-setup/mobile
  npm install
```

## FAQ

#### Iniciar back-end

```bash
    cd ~/nlw-setup/server
    npm run dev
```

#### Iniciar front-end

```bash
    cd ~/nlw-setup/web
    npm run dev
```

#### Iniciar mobile

```bash
    cd ~/nlw-setup/mobile
    npm run start
```

#### Configurar baseURL axios MOBILE

Edite o arquivo `/src/lib/axios.ts`
```js
    export const api = axios.create({
        baseURL: 'IP-DO-SERVER'
    })
```

#### Configurar baseURL axios WEB

Edite o arquivo `/src/utils/axios.ts`
```js
    export const axiosApi = axios.create({
        baseURL: 'IP DO BACK-END'
    })
```

#### Erro de conexão back-end com mobile
Edite o arquivo `/src/server.ts`
```js
    app.listen({
        port: 3333,
        host: 'SEU_IP OU 0.0.0.0'
    })
        .then(() => console.log('HTTP server running!'));
        
```

## Screenshots

![App Mobile](https://imgur.com/NbaKPXA.png)

![App Web](https://imgur.com/eAJN9ip.png)

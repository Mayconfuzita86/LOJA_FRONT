//Usar proxy no ambiente de desenvolvimento: Você também pode configurar um servidor proxy 
//durante o desenvolvimento para evitar problemas de CORS.
//Se você estiver usando o React, por exemplo, pode criar um arquivo setupProxy.js na pasta src com o seguinte conteúdo:

import { createProxyMiddleware } from 'http-proxy-middleware';

export default function (app) {
  app.use(
    '/product',
    createProxyMiddleware({
      target: 'http://localhost:8080',
      changeOrigin: true,
    })
  );
}

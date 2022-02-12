//Importando o modulo HTTP nativo do Node
const http = require("http");

//configuração inicial do servidor:
http.createServer((request, response) => {
    response.writeHead(200, { "Content-Type": "application/json"});

    //configurações iniciais de rotas
    if(request.url === '/produto') {
        response.end(JSON.stringify({
            message: "Rota de produto"
        }))
    }

    if(request.url === '/usuario') {
        response.end(JSON.stringify({
            message: "Rota de usuario"
        }))
    }

    
    response.end(
        JSON.stringify({
            message: "Qualquer outra rota"
         })
    );
    

}).listen(4001, () => console.log("servidor rodando"))
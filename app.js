//importar o Express:
const express = require("express");

//configurações para utilização de Id's
const { randomUUID } = require("crypto");

//importar o File System:
const fs = require("fs");

//inicializar o Express:
const app = express();

app.use(express.json());

/*configurações de rotas iniciais:
app.get("/primeira-rota", (request, response) => {
    return response.json({
        message: "acessou a primeira rota ",
    });
});
*/

let products = [];

//para inserir dados salvos no arquivo para dentro do array:
fs.readFile("products.json", "utf-8", (err, data) => {
    if(err) {
        console.log(err);
    } else {
        products = JSON.parse(data);
    }
});

/*
métodos básicos:
POST: inserir um dado
GET: buscar um ou mais dados
PUT: alterar um dado
DELETE: remover um dado
*/

/*
tipos de parâmetros mais comuns no Express:
body: sempre que eu quiser enviar dados para minha aplicação
params: /product/874274984798237
query: /product?id=409874982349238&value=90482734098234890
*/

app.post("/products", (request, response) => {
    //nome e preço

    const {name, price} = request.body;

    const product = {
        name,
        price,
        id: randomUUID(),
    };

    products.push(product);

    //para salvar informações em um arquivo:
    productFile()

    return response.json(product);
});

app.get("/products", (request, response) => {
    return response.json(products)
});

app.get("/products/:id", (request, response) => {
    const {id} = request.params;
    const product = products.find(product => product.id === id);
    return response.json(product);
});

app.put("/products/:id", (request, response) => {
    const {id} = request.params;
    const {name, price} = request.body;

    const productIndex = products.findIndex((product) => product.id === id);
    products[productIndex] = {
        ...products[productIndex],
        name,
        price
    };

    productFile()

    return response.json({message: "produto alterado com sucesso"});
});

app.delete("/products/:id", (request, response) => {
    const {id} = request.params;

    const productIndex = products.findIndex((product) => product.id === id);

    products.splice(productIndex, 1);

    productFile()

    return response.json({message: "produto removido com sucesso"})
})

function productFile() {
    fs.writeFile("products.json", JSON.stringify(products), (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("produto inserido")
        }
    });
}

app.listen(4002, () => console.log("rodando"));
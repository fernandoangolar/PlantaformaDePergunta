const express = require("express")
const app = express()
const port = 8080

// Estou dizendo para Express usar o EJS como View engine
app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get("/:nome/:lang", (req, res) => {
    let nome = req.params.nome
    let lang = req.params.lang
    let exibirMSG = false
    
    let produtos = [
        {nome: "Doritos", preco: 3.14},
        {nome: "Coca-cola", preco: 5},
        {nome: "Leite", preco: 1.45},
        {nome: "Carne", preco: 14},
        {nome: "Redbull", preco: 6},
        {nome: "Nescau", preco: 4}
    ]

    res.render("index", {
        nome: nome,
        lang, lang,
        empresa: "Guia do angolar",
        inscritos: 100000,
        msg : exibirMSG,
        produtos : produtos
    } )
} )

app.listen(port, () => {
    console.log("App rodando na porta ", port)
}) 

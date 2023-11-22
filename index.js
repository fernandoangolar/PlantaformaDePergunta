const express = require("express")
const app = express()
const port = 8080

// Estou dizendo para Express usar o EJS como View engine
app.set('view engine', 'ejs')

app.get("/:nome/:lang", (req, res) => {
    let nome = req.params.nome
    let lang = req.params.lang
    let exibirMSG = false
    const array = ['Fernando', 'Angolar', 'Silva', 'Evandre']

    res.render("index", {
        nome: nome,
        lang, lang,
        empresa: "Guia do angolar",
        inscritos: 100000,
        msg : exibirMSG,
        users : array
    } )
} )

app.listen(port, () => {
    console.log("App rodando na porta ", port)
}) 

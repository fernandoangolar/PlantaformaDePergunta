const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const port = 8080

// Estou dizendo para Express usar o EJS como View engine
app.set('view engine', 'ejs')
app.use(express.static('public'))

// configurar o body-parser
app.use(bodyParser.urlencoded( {extended: false} ))
app.use(bodyParser.json());

app.get("/", (req, res) => {
 
    res.render("index")
} )

app.get("/perguntar", (req, res) => {
    res.render('perguntar');
})

app.post( "/salvarpergunta", (req, res) => {

    let titulo = req.body.titulo
    let descricao = req.body.descricao

    res.send('Formulario Recebido!  titulo : ' + titulo + " descricao : " + descricao )
}) 

app.listen(port, () => {
    console.log("App rodando na porta ", port)
}) ;


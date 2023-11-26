const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const connection = require('./database/database')
const Pergunta = require('./database/Pergunta')

// Database 
connection
    .authenticate()
    .then( () => {
        console.log('Conexão feita com o banco de dados')
    })
    .catch( (msqErro) => {
        console.log(msqErro)
    })

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

    Pergunta.create( {
        titulo : titulo,
        descricao : descricao
    }).then( () => {
        res.redirect("/")
    })
}) 

app.listen(port, () => {
    console.log("App rodando na porta ", port)
}) ;


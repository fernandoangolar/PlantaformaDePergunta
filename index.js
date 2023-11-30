const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const connection = require('./database/database')
const Pergunta = require('./database/Pergunta')
const resposta = require('./database/Resposta')
const Resposta = require("./database/Resposta")

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

    Pergunta.findAll( {raw: true, order: [
        ['id', 'DESC']
    ]} )
        .then( perguntas => {
            res.render("index", {
                perguntas : perguntas
            })
        } )
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

app.get("/pergunta/:id", (req, res) => {
    let id = req.params.id;

    // busca no banco de dados
    Pergunta.findOne( {
        where: { id : id }
    }).then(pergunta => {
        if ( pergunta != undefined ) { //Pergunta encontrada

            Resposta.findAll( {
                where: { perguntaId : pergunta.id },
                order: [
                    ['id', 'DESC']
                ]
            }).then( respostas => {
                res.render("pergunta", {
                    pergunta: pergunta,
                    respostas : respostas
                })
            } )

        } else { // Não encontrada
            res.redirect("/")
        }
    })
})

app.post("/responder", (req, res) => {
    let corpo = req.body.corpo
    let perguntaId = req.body.pergunta

    Resposta.create ( {
        corpo : corpo,
        perguntaId : perguntaId
    }).then( () => {
        res.redirect("/pergunta/"+perguntaId)
    } )
})

app.listen(port, () => {
    console.log("App rodando na porta ", port)
}) ;


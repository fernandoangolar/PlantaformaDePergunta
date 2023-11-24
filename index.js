const express = require("express")
const app = express()
const port = 8080

// Estou dizendo para Express usar o EJS como View engine
app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get("/", (req, res) => {
 
    res.render("index")
} )

app.get("/perguntar", (req, res) => {
    res.render('perguntar');
})

app.listen(port, () => {
    console.log("App rodando na porta ", port)
}) ;


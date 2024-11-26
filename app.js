const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql2');

const usuarios = [{
    id: '1',
    nome: "Fernanda Alves",
    email: "fernanda@gmail.com",
    data_: "05/12/2007",
    genero: "Outro"    
}

]

const app = express()

app.set('view engine', 'ejs')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}))

const conexao = mysql.createConnection({
	host:'localhost',
	user:'root',
	password:'senai',
	database:'garimpa'
});

conexao.connect(function(erro){
	if(erro) throw erro;
	console.log('Conexão efetuada com sucesso!');
});


app.get("/", function (req, res) {
    res.render("home", {
    data: usuarios   
})
})

app.get("/json", (req, res) => {
    res.status(200).json(usuarios);
  });

app.get("/atualizar", function (req, res) {
    res.render("Atualizar", {
        data: usuarios
    })
})

app.get("/adicionar", function (req, res) {
    res.render("Adicionar", {
        data: usuarios
    })
})


app.post("/", (req, res) => {
    let id = req.body.id
    let nome = req.body.nome
    let email = req.body.email
    let data_ = req.body.data_
    let genero = req.body.genero

    

    usuarios.push({
        id: id,
        nome: nome,
        email: email,
        data_: data_,
        genero: genero
        
    })


 // SQL
 let sql = `INSERT INTO produtos (id, nome, email, data_, genero) VALUES ('${id}', '${nome}', '${email}', '${data_}', '${genero}')`;
        
 // Executar comando SQL
 conexao.query(sql, function(erro, retorno){
  // Caso ocorra algum erro
  if(erro) throw erro;
     console.log(retorno);


    res.render("home", {
        data: usuarios
    })
})

})



app.post('/delete', (req, res) => {
    var requestedid = req.body.id;
    var j = 0;
    usuarios.forEach(user => {
        j = j + 1;
        if (user.id === requestedid) {
            usuarios.splice((j - 1), 1)
        }
    })
   // SQL
   let sql = `DELETE FROM produtos WHERE id = ${req.body.id}`;

   // Executar o comando SQL
   conexao.query(sql, function(erro, retorno){
   // Caso falhe o comando SQL
       if(erro) throw erro;


    res.render("home", {
        data: usuarios
    })
})

})

app.post('/update', (req, res) => {
    let id = req.body.id
    let nome = req.body.nome
    let email = req.body.email
    let data_ = req.body.data_
    let genero = req.body.genero
    

    var j = 0;
    usuarios.forEach(user => {
        j = j + 1;
        if (user.id === id) {
            user.nome = nome
            user.email = email
            user.data_ = data_
            user.genero = genero
        }
    })
    // SQL
    let sql = `UPDATE produtos SET nome='${nome}', email='${email}', data_='${data_}', genero ='${genero}' WHERE id=${req.body.id}`;
    
    // Executar comando SQL
    conexao.query(sql, function(erro, retorno){
    // Caso falhe o comando SQL
        if(erro) throw erro;


    res.render("home", {
        data: usuarios
    })
})

})

app.listen(3000, (req, res) => {
    console.log("Servidor rodando na porta 3000")
})
var express = require('express');
// Cria a sessão para o login. Algumas coisas só podem ser acessadas
//Caso o login esteja ativo
var sessions = require('express-session')

//Biblioteca para parsear o form do login
const formidable = require('express-formidable');


//biblioteca para cookies
var cookieParser = require('cookie-parser')
//Biblioteca para ler arquivos
const fs = require('fs')

//importa middleware de autenticação
const auth_mid = require('./funcs/login_req.js')
//importa funcao que pega o json e parsea
const json_parser = require('./funcs/get_json_string.js')

//Template engine para manipularmos os dados.
const exphbs = require('express-handlebars')

const bodyParser = require('body-parser');


const rota_css = require('./rout_elements/css_elements.js')
const rota_js =  require('./rout_elements/js_elements.js')
const rota_ajax = require('./rout_elements/ajax_elements')
var app = express();
const path = require('path');
const port = 3000
app.listen(port, () => console.log(`Express app running on port ${port}!`));
// define a extensão e a instância do handlebars com o modelo que será interpretado o código
app.engine('hbs', exphbs.engine({extname: '.hbs',defaultLayout: "main"}));
// define qual o template a ser utilizado
app.set('view engine', 'hbs');
app.use(bodyParser.json());
app.use(formidable());
// HTML files from template
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/templates/template_boot/home.html'));

});

app.get('/dashboard', function(req, res) {
    res.sendFile(path.join(__dirname, '/templates/template_boot/template.html'));

});
// Rota para login

app.get('/login', function(req, res) {
    if (req.session){
    if(req.session.username == 'NA'){
        console.log('USUARIO INDEF')
    }
    else{
        console.log(req.session)
        console.log('testing')
    }
    

}
res.render('signin.hbs');
}
);

// creating 24 hours from milliseconds
const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false
}));
// cookie parser middleware
app.use(cookieParser());

//formidable test
app.use(formidable());
// Post Request para login.
app.post('/login_request', function(req, res) {
    console.log(req.fields)
    const file_json = fs.readFile(path.join(__dirname, `/fake_db/users/${req.fields.username}.json`), "utf-8", (err, jsonString) => {
        if (err) {
            req.session.username="NA"
            console.log('erro aqui')
            console.log(req.session)
            res.render('signin.hbs', {warning: true})
                    return;
        }
        console.log("File data:", jsonString);
        const to_string_json = JSON.parse(jsonString)
        console.log(to_string_json)

       
        
        if(req.fields.password == to_string_json.password){
            req.session.username=req.fields.username;
            console.log(req.session.username)
            res.redirect("/home_page_login")
        }
        else{
            req.session.username="NA"
            res.render('signin.hbs', {warning: true})
                    }
        
      })
    
    
});

app.get('/home_page_logindev',  function(req, res) {
    try {

        const file_json = fs.readFile(path.join(__dirname, `/fake_db/users/${req.fields.username}.json`), "utf-8", (err, jsonString) => {
            if (err) {
              console.log("File read failed:", err);
              res.send("Falha de autenticação")
              return
            }
            console.log("File data:", jsonString);
            const to_string_json = JSON.parse(jsonString)
            console.log(to_string_json)
    
           
            
            if(req.fields.password == to_string_json.password){
                req.session.username=req.fields.username;
                console.log(req.session.username)
                res.redirect("/home_page_login")
            }
            else{
                req.session.username="NA"
                res.sendFile(path.join(__dirname, '/templates/template_boot/sign-in.html'));
                        }
            
          })
        const teste = req.session.username
      }
      catch(err) {
        res.sendFile(path.join(__dirname, '/templates/template_boot/sign-in.html'));
        return
      }
          
        if (req.session.username){
            res.send(`Bem vindo ${req.session.username}`)
        }
        else{
            res.sendFile(path.join(__dirname, '/templates/template_boot/sign-in.html'));
        }

    

});
//página a ser acessada pós login
app.get('/home_page_login',auth_mid,  function(req, res) {
    const teste = json_parser(path.join(__dirname, `/fake_db/user_info/${req.session.username}.json`))
    var projetos = []
    if(teste != null){
        console.log(teste.projetos)
        for(let i = 0; i< teste.projetos.length; i++){
            projetos.push(teste.projetos[i].nome)
        }
        console.log(projetos)
    }
    var projects_bio = []
    for(let i =0; i< projetos.length; i++){
        const parsea_projeto = json_parser(path.join(__dirname, `/fake_db/project_info/${projetos[i]}.json`))
        console.log("testeeeeeeeeeeee_projetos")
        if(parsea_projeto != null){
            projects_bio.push(parsea_projeto.bio)
        }
       
    }
    object_projects = []
    for(let i =0; i<projetos.length; i++){
        var teste_object = new Object
        teste_object.nome = projetos[i]
        teste_object.bio = projects_bio[i]
        object_projects.push(teste_object)
    }
    console.log(object_projects)

    res.render('profile_template', {name: req.session.username,  object_projects})

});
app.get('/testeajax',auth_mid,  function(req, res) {
    
    res.render('ajax_teste')


});

// Páginas de projetos. Essas páginas nos levará a projetos que existem através de parâmetros. É preciso ser encarregado.
app.get('/projects/:name', auth_mid,  function(req, res) {
    console.log('======================================')
    console.log(req.url.split('/')[2])
    console.log('======================================')
    
    const parsea_projeto = json_parser(path.join(__dirname, `/fake_db/project_info/${req.url.split('/')[2]}.json`))
    if(parsea_projeto != null){
        res.render('project_dashboard')
        return
    }
    res.sendFile(path.join(__dirname, '/templates/template_boot/404.html'));

});
app.get('/projectapi/:nameproject', 
 function(req, res) {
    const file_json = fs.readFile(path.join(__dirname, `/fake_db/project_info/${req.params.nameproject}.json`), "utf-8", (err, jsonString) => {
        if (err) {
          console.log("File read failed:", err);
          res.send("Falha de autenticação")
          return
        }
        console.log("File data:", jsonString);
        const to_string_json = JSON.parse(jsonString)
        console.log(to_string_json)

       
        res.json(jsonString)
        
      })
    
    
});

//Salva novas obras
const dataFolder = 'fake_db/project_info/';
if (!fs.existsSync(dataFolder)) {
    fs.mkdirSync(dataFolder);
}
app.post('/adicionar-obra', (req, res) => {
    console.log("passou da requisição");

    try {

        const obra = req.fields;
        console.log(req.fields)

        if (!obra.nome) {
            return res.status(400).json({ error: 'Name attribute is required' });
        }
  
        const obraName = obra.nome.replace(/\s/g, '_').toLowerCase();
        const filename = path.join(__dirname,dataFolder + `${obraName}.json`);
  
        fs.writeFileSync(filename, JSON.stringify(obra, null, 2));
  
        res.status(201).json({ message: 'Data saved successfully', filename });
       } catch (error) {
          res.status(500).json({ error: 'Internal server error' });
        }
    });

app.get('/add-project', function(req, res) {
    res.sendFile(path.join(__dirname, '/views/add-project.html'));
});
  

// route css elements from template
app.use('/elementoscss', rota_css)

//route js elements from template
app.use('/elementosjs', rota_js)
app.use('/ajax', rota_ajax)



//session middleware

app.use(formidable())
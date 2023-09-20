var express = require('express');
var rota =  express.Router();
const path = require('path')
const auth_mid = require('../funcs/login_req')
const json_parser = require('../funcs/get_json_string')
rota.get('/testeajax',auth_mid,  function(req, res) {
    res.render('ajax_teste')
});
rota.get('/ajaxmessages',auth_mid,  function(req, res) {
    res.render('ajax_messages')
});


rota.get('/ajax_projects', auth_mid,  function(req, res){
    const teste = json_parser(path.join(__dirname, `../fake_db/user_info/${req.session.username}.json`))
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
        const parsea_projeto = json_parser(path.join(__dirname, `/../fake_db/project_info/${projetos[i]}.json`))
        console.log("testeeeeeeeeeeee_projetos")
        if(parsea_projeto != null){
            projects_bio.push(parsea_projeto.projeto.bio)
        }
       
    }
    object_projects = []
    for(let i =0; i<projetos.length; i++){
        var teste_object = new Object
        teste_object.nome = projetos[i]
        teste_object.bio = projects_bio[i]
        object_projects.push(teste_object)
    }
    console.log("ok testando")

    res.render('ajax_projects', {name: req.session.username,  object_projects})

})

module.exports = rota
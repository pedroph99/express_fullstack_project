var express = require('express');
var rota =  express.Router();
const path = require('path')

rota.get('/assets/css/nucleo-icons.css', function(req, res) {
    res.sendFile(path.join(__dirname, '../templates/template_boot/assets/css/nucleo-icons.css'));

});

rota.get('/assets/css/nucleo-svg.css', function(req, res) {
    res.sendFile(path.join(__dirname, '../templates/template_boot/assets/css/nucleo-svg.css'));
    console.log('teste_rota_2')
    
});

rota.get('/assets/css/material-dashboard.css', function(req, res) {
    res.sendFile(path.join( __dirname, '../templates/template_boot/assets/css/material-dashboard.css'));
    console.log('teste_rota_css')
});


rota.get('/assets/css/teste.gif', function(req, res) {
    res.sendFile(path.join( __dirname, '../templates/template_boot/assets/css/teste.gif'));
    console.log('teste_rota_imagem_css')
});


module.exports = rota
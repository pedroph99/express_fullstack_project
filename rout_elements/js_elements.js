var express = require('express');
var rota =  express.Router();
const path = require('path')






rota.get('/assets/js/core/popper.min.js', function(req, res) {
    console.log('ok popper')
    res.sendFile(path.join(__dirname, '../templates/template_boot/assets/js/core/popper.min.js'));

});
rota.get('/assets/js/core/bootstrap.min.js', function(req, res) {
    console.log('ok bootstrapjs')
    res.sendFile(path.join(__dirname, '../templates/template_boot/assets/js/core/bootstrap.min.js'));

});

rota.get('/assets/js/plugins/perfect-scrollbar.min.js', function(req, res) {
    console.log('ok bootstrapjs')
    res.sendFile(path.join(__dirname, '../templates/template_boot/assets/js/plugins/perfect-scrollbar.min.js'));
    console.log('testing')

});

rota.get('/assets/js/plugins/smooth-scrollbar.min.js', function(req, res) {
    console.log('ok bootstrapjs')
    res.sendFile(path.join(__dirname, '../templates/template_boot/assets/js/plugins/smooth-scrollbar.min.js'));
    console.log('testing')

});

rota.get('/assets/js/material-dashboard.min.js', function(req, res) {
    res.sendFile(path.join(__dirname, '../templates/template_boot/assets/js/material-dashboard.min.js'));
    console.log('testandoisto')
});

module.exports = rota





rota.get('/assets/img/logo-ct.png', function(req, res) {
    res.sendFile(path.join(__dirname, '/templates/template_boot/assets/img/logo-ct.png'));
    console.log('okoakosdk')
});

rota.get('/assets/img/team-2.jpg', function(req, res) {
    res.sendFile(path.join(__dirname, '/templates/template_boot/assets/img/team-2.jpg'));
    console.log('okoakosdk')
});

console.log('ok')

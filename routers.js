var express = require('express');
const rota_css = require('./rout_elements/css_elements.js')
const rota_js =  require('./rout_elements/js_elements.js')
var app = express();
const path = require('path');
const port = 3000
app.listen(port, () => console.log(`Express app running on port ${port}!`));

// HTML files from template
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/templates/template_boot/home.html'));

});

app.get('/dashboard', function(req, res) {
    res.sendFile(path.join(__dirname, '/templates/template_boot/template.html'));

});
// route css elements from template
app.use('/elementoscss', rota_css)

//route js elements from template
app.use('/elementosjs', rota_js)
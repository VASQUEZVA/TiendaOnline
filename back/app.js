var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var port = process.env.PORT || 4201;

var app = express();

var cliente_router = require('./routes/cliente');
var usuario_router = require('./routes/usuario');

app.use(bodyparser.urlencoded({limit: '50mb', extended:true}));
app.use(bodyparser.json({limit: '50mb', extended:true}));


mongoose.connect('mongodb://127.0.0.1:27017/TiendaOnline')
    .then(() => {
        console.log('Conexión a la base de datos establecida');
        
        app.listen(port, function(){
            console.log('Servidor corriendo en el puerto ' + port);
        });
    })
    .catch((err) => {
        console.error('Error de conexión a la base de datos:', err);
    });

 
    app.use((req, res, next)=>{
        res.header('Access-Control-Allow-Origin','*');
        res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method' );
        res.header('Access-Control-Allow-Methods','GET', 'PUT','POST', 'DELETE','OPTIONS' );
        res.header('Allow','GET', 'PUT','POST', 'DELETE','OPTIONS');
        next();
    });

 app.use('/api',cliente_router);
 app.use('/api',usuario_router);

module.exports = app;

 

 /*mongoose.connect('mongodb://127.0.0.1:27017/TiendaOnline', (err, res) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port, () => {
            console.log('Servidor corriendo en el puerto ' + port);
        });
    }
});


 module.exports = app;*/
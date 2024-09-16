var jwt= require('jwt-simple');
var moment= require('moment');
var secret = 'victor';


exports.decodeToken = function(req, res, next){
    if(!req.headers.authorization){
        return res.status(403).send({message: 'NoHeaderError'});
    }
    var token = req.headers.authorization;
    var segment = token.split('.');

    if(segment.length != 3){ 
        return res.status(403).send({message: 'InvalidToken'});

    }else
        try {
            var payload= jwt.decode(token, secret);
            console.log(payload);
        } catch (error) {
            return res.status(403).send({message: 'ErrorToken'});
        }

        req.user = payload;
        next();

}
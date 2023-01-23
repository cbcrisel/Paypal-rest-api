const express = require('express');
const cors = require('cors');
const morgan = require('morgan')

class Server {
    constructor(){
        this.app=express();
        this.port=process.env.PORT || 3000;
        this.middleware();
        this.routes();
    }

    middleware(){
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(morgan('dev'))
    }

    routes(){
        this.app.use(require('../routes/payment'))
    }

    start(){
        this.app.listen(this.port,()=>{
            console.log('Server started on port '+this.port);
        })
    }
}

module.exports=Server;
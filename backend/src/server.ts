//llamar al modulo de express

import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import mongoose from 'mongoose';
import cors from 'cors';
import producto from './routes/producto'
//clase
class Server
{
    //especificar el tipo de dato para la variable app
    public app:express.Application;
    constructor(){
        //inicializar al modulo express
        this.app = express();
        this.config();
        this.routes();
    }

    config(){
        //inicializar el puerto de express
        this.app.set('port', process.env.PORT || 3000);

        //ver las rutas que se estan solicitando 
        this.app.use(morgan('dev'));
        //proteccion del backend
        this.app.use(helmet());
        //conexion a la BDD
        const MONGO_URI = 'mongodb+srv://root:root@cluster0.drfu4.gcp.mongodb.net/cafe?retryWrites=true&w=majority'
        mongoose.connect(MONGO_URI,{useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true}).then(()=>{
           console.log("BDD OK") 
        });

        //compresion de las respuestas
        this.app.use(compression());
        //para la conexion con el frontend
        this.app.use(cors());
        //recibir y enviar las respuestas de tipo json
        this.app.use(express.json());
        //soporte para el envio de formularios
        this.app.use(express.urlencoded({extended:false}));
    }

    routes(){
        this.app.get('/',(req,res)=>{res.send("SERVIDOR DE NODE")});

        this.app.use('/api/producto',producto);

        this.app.use('/api/categoria',categoria);
    }

    start(){
        //inicializar el servidor de express
        this.app.listen(this.app.get('port'),() => {
            console.log("servidor funcionando");
        });
    }
}

//instanciar la clase

const server = new Server();
server.start();
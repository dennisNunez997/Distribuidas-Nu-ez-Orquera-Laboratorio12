"use strict";
//llamar al modulo de express
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const producto_1 = __importDefault(require("./routes/producto"));
//clase
class Server {
    constructor() {
        //inicializar al modulo express
        this.app = express_1.default();
        this.config();
        this.routes();
    }
    config() {
        //inicializar el puerto de express
        this.app.set('port', process.env.PORT || 3000);
        //ver las rutas que se estan solicitando 
        this.app.use(morgan_1.default('dev'));
        //proteccion del backend
        this.app.use(helmet_1.default());
    }
    routes() {
        this.app.get('/', (req, res) => { res.send("SERVIDOR DE NODE"); });
        this.app.use('/api/producto', producto_1.default);
    }
    start() {
        //inicializar el servidor de express
        this.app.listen(this.app.get('port'), () => {
            console.log("servidor funcionando");
        });
    }
}
//instanciar la clase
const server = new Server();
server.start();

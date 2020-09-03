import {Request, Response, Router} from 'express';

import CategoriaModel from '../models/categoria';

class Categoria{
    router: Router;
    constructor(){
        this.router = Router();
        this.exponerRutas();
    }

    async getCategoria(req: Request, res: Response){
        try{
            let categoriaBD = await CategoriaModel.find({}).sort('nombre');
            let conteo = await CategoriaModel.countDocuments();

            res.json({
                categorias: categoriaBD,
                conteo: conteo
            });
        }
    }
}
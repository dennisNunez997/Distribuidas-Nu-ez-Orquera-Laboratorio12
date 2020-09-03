"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class Producto {
    constructor() {
        this.router = express_1.Router();
        this.exponerRutas();
    }
    exponerRutas() {
        this.router.get('/', (req, res) => { res.send("PRODUCTO"); });
    }
}
const producto = new Producto();
exports.default = producto.router;

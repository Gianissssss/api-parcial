const productoModel = require('../models/productoModel');

export function listarProductos(req, res) {
 res.json(productoModel.getAllProductos());
}



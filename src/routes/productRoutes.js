const express = require('express');
const router = express.Router();
const productosController = require ('../controllers/Productoscontrollers');
const product = require ('../models/productoModel');
const productos = require ('../models/productoModel');

router.get('/', productosController.listarProductos);


//definimos nuestras rutas

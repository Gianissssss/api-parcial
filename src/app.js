const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { Sequelize } = require ('sequelize');
const  productos = require ('./src/models/productoModel');
// conexion a la base de datos
const sequelize = new Sequelize ('productos', 'root', '',{
    host: 'localhost',
    dialect: 'mysql'
});

(async () =>{
    try {
        await sequelize.authenticate();
        console.log('conexion a la base de datos establecida');
    }catch(error){
        console.error('Error al conectar la base de datos', error);
    }
})();
//fin conexion


//inicializamos nuestro servicio
const app = express();
const port = 3000;

//middlewares
app.use(cors());
app.use(morgan());
app.use(express.json())

//definimos nuestro modelo
//importamos 
const {DataTypes} = require('sequelize');

const Product = sequelize.define('Product', {
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    nombre:{
        type:DataTypes.STRING,
        allowNull:false //no permite que sea nulo
    },
    precio:{
        type:DataTypes.STRING,
        allowNull: false
    },
    cantidad:{
        type:DataTypes.INTEGER(20)
    },
    categoria:{
    type:DataTypes.STRING,

    }
});



//sincronizacion del modelo con la base de datos
(async ()=>{
    try{
        await sequelize.sync();
        console.log('Modelo sincronizado correctamente con la base de datos');
    }catch(error){
        console.error('Error al sincronizar el modelo:',error);
    }
})();


app.get('/', (req, res) => {
    res.status(200).json({
        ok: true,
        msg: "Hola estas accediendo a la api de Gianis!"
    })
});

//Crear nuevo usuario------
app.post('/productos/create', (req, res) => {

    try{
        const newProduct = Product.create(req.body);
        res.status(201).json({
            ok:true,
            msg:`producto creado con exito`,
            newProduct
        })
    }catch(error){
        res.status(500).json({
            ok:false,
            msg:`producto no creado`
        })
    }
  })
  

  
// obtener productos---
app.get('/productos', (req, res) => {
    res.json({
        ok: true,
        productos
    })
})
//buscar por id
app.get('/products/:id', async (req, res) => {
    const id = req.params.id;
    try {
      const product = await Product.findByPk(id);
      if (!product) {
        res.status(404).send({ message: 'Producto no encontrado' });
      } else {
        res.send(product);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Error de servidor' });
    }
  });



//actualizar producto-----
app.put("/productos/:id", (req, res) => {
    const id = req.query.id;
    const newData = req.body;

    const postProduct = productos.findIndex((product) => product.id == id);

    if (postProduct < 0) res.status(404).json({
        ok: false,
        msg: `No existe el producto con id: ${id}`
    })

    productos[postProduct] = {... productos[postProduct], ... newData}
  
    res.status(200).json({
        ok:true,
        user: productos[postProduct]
    })

})

//DELETE------
app.delete('/productos/:id', (req, res) => {
  const productos = db[req.params.product];

  if (!productos) {
    return res.status(404).json({ error: 'Producto no existe' });
  }


  delete db[req.params.product];

  res.sendStatus(204);
});


//productos ordenados----
app.get('/productos/ordenados', async (req, res) => {
    const criterio = req.query.criterio; // Obtener el criterio de ordenamiento de la query parameter
    let ordenamiento = [];
  
    switch (criterio) {
      case 'nombre':
        ordenamiento = [['nombre', 'ASC']];
        break;
      case 'precio':
        ordenamiento = [['precio', 'ASC']];
        break;
      case 'cantidad':
        ordenamiento = [['cantidad', 'ASC']];
        break;
      default:
        res.status(400).send({ error: 'Criterio de ordenamiento no válido' });
        return;
    }
  
    try {
      const productos = await productos.findAll({
        order: ordenamiento
      });
      res.json(productos);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Error al obtener productos' });
    }
  });


//productos filtrados
app.get('/productos/filtrados', (req, res) => {
    const { nombre, precio, categoria, cantidad } = req.query;
  
    let productosFiltrados = productos;
  
    if (nombre) {
      productosFiltrados = productosFiltrados.filter(producto => producto.nombre.toLowerCase().includes(nombre.toLowerCase()));
    }
  
    if (precio) {
      productosFiltrados = productosFiltrados.filter(producto => producto.precio >= parseInt(precio));
    }
  
    if (categoria) {
      productosFiltrados = productosFiltrados.filter(producto => producto.categoria.toLowerCase().includes(categoria.toLowerCase()))
    }
  
    if (cantidad) {
      productosFiltrados = productosFiltrados.filter(producto => producto.cantidad.includes(cantidad));
    }
  
    res.json(productosFiltrados);
  });




//escuhamos en el puerto 3000
app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});




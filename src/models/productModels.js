const productos = [
    { id: 1, nombre: 'Laptop', precio: 1200, categoria: ['electrónica', 'computadoras'] },
    { id: 2, nombre: 'Zapatos', precio: 7000, categoria: ['moda','sandalias'] },
    { id: 3, nombre: 'Heladera', precio: 20000, categoria: ['electrónica', 'electrodomesticos'] },
    { id: 4, nombre: 'Lapiz', precio: 200, categoria: ['escuela','utiles'] }
   ];
   function getAllProductos() {
    return productos;
   }
   function getProductoById(id) {
    return productos.find(p => p.id === id);
   }
   function addProducto(producto) {
    productos.push(producto);
    return producto;
   }
   function updateProducto(id, data) {
    const index = productos.findIndex(p => p.id === id);
    if (index !== -1) {
    productos[index] = { ...productos[index], ...data };
    return productos[index];
    }
    return null;
   }
   function deleteProducto(id) {
    const index = productos.findIndex(p => p.id === id);
    if (index !== -1) {
    return productos.splice(index, 1);
    }
    return null;
   }
   module.exports = {
    getAllProductos,
    getProductoById,
    addProducto,
    updateProducto,
    deleteProducto,
    productos
   };
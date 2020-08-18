const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3050;

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.json());

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 's3i796857',
  database : 'madretierra'
});

connection.connect(error => {
    if(error) throw error;
    console.log('Database server running!');
});

app.listen(PORT, ()=> console.log(`Servidor corriento en puerto ${PORT}`));


// Routes
app.get('/', (req, res) => {
    res.send('Pantalla de inicio');
});

// Listar productos
app.get('/productos', (req, res) => {
    const sql = 'SELECT * FROM producto';
    
    connection.query(sql, (error, results)=>{
        if(error) throw error;
        if(results.length > 0){
            res.json(results);
        }else{
            res.send('No se han encontrado resultados');
        }
    });
});

app.get('/contacto', (req, res) => {
    res.send('Quienes somos');
});

// Productos
// Producto por id
app.get('/productos/:id', (req, res) => {
    const {id} = req.params
    const sql = `SELECT * FROM producto WHERE id = ${id}`;
    connection.query(sql, (error, result)=>{
        if(error) throw error;
        if(result.length > 0){
            res.json(result);
        }else{
            res.send('No se han encontrado resultados');
        }
    });
});

// Agregar productos
app.post('/productos/agregar', (req, res) => {
    const sql = 'INSERT INTO producto SET ?';
    const productObj = {
        nombre: req.body.nombre,
        precio: req.body.precio,
        descripcion: req.body.descripcion,
        disponibilidad: req.body.disponibilidad,
        id_categoria: req.body.id_categoria,
        stock: req.body.stock,
        image: req.body.image
    }
    
    connection.query(sql, productObj, error=>{
        if(error) throw error;
        res.send('Producto creado!');
    });
   
});

// Modificar productos
app.put('/productos/modificar/:id', (req,res) => {
    const {id} = req.params;
    const {nombre,precio,descripcion,disponibilidad,id_categoria,stock,image} = req.body;
    const sql = `UPDATE producto SET nombre = '${nombre}', descripcion = '${descripcion}',
    disponibilidad = '${disponibilidad}',precio = '${precio}',id_categoria = '${id_categoria}',stock = '${stock}',image = '${image}' WHERE id = ${id}`;

    connection.query(sql, error =>{
        if(error) throw error;
        res.send('Producto modificado!');
    });
});

// Eliminar productos
app.delete('/productos/eliminar/:id', (req,res) => {
    const {id} = req.params;
    const sql = `DELETE FROM producto WHERE id = ${id}`;
    connection.query(sql, error => {
        if(error) throw error;
        res.send('Producto eliminado');
    });     
});

// Categorias

// Listar categoria
app.get('/categorias', (req, res) => {
    const sql = 'SELECT * FROM categoria';
    
    connection.query(sql, (error, results)=>{
        if(error) throw error;
        if(results.length > 0){
            res.json(results);
        }else{
            res.send('No se han encontrado resultados');
        }
    });
});

// Añadir categoria
app.post('/categorias/agregar', (req, res) => {
    const sql = 'INSERT INTO categoria SET ?';
    const productObj = {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion
    }
    connection.query(sql, productObj, error=>{
        if(error) throw error;
        res.send('Categoría creada!');
    });
   
});

// Modificar categoria
app.put('/categorias/modificar/:id', (req,res) => {
    const {id} = req.params;
    const {nombre,descripcion} = req.body;
    const sql = `UPDATE categoria SET nombre = '${nombre}', descripcion = '${descripcion}' WHERE id = ${id}`;

    connection.query(sql, error =>{
        if(error) throw error;
        res.send('Categoría modificada!');
    });
});

// Eliminar categoria
app.delete('/categorias/eliminar/:id', (req,res) => {
    const {id} = req.params;
    const sql = `DELETE FROM categoria WHERE id = ${id}`;
    connection.query(sql, error => {
        if(error) throw error;
        res.send('Categoría eliminada');
    });     
});


// Clientes

// Listar clientes
app.get('/clientes', (req, res) => {
    const sql = 'SELECT * FROM cliente';
    
    connection.query(sql, (error, results)=>{
        if(error) throw error;
        if(results.length > 0){
            res.json(results);
        }else{
            res.send('No se han encontrado resultados');
        }
    });
});

// Añadir clientes
app.post('/clientes/agregar', (req, res) => {
    const sql = 'INSERT INTO cliente SET ?';
    const productObj = {
        nombre: req.body.nombre,
        direccion: req.body.direccion,
        email: req.body.email,
        telefono: req.body.telefono
    }
    connection.query(sql, productObj, error=>{
        if(error) throw error;
        res.send('Cliente creado!');
    });
});

// Modificar clientes
app.put('/clientes/modificar/:id', (req,res) => {
    const {id} = req.params;
    const {nombre,direccion,email,telefono} = req.body;
    const sql = `UPDATE cliente SET nombre = '${nombre}', direccion = '${direccion}', email = '${email}', telefono = '${telefono}' WHERE id = ${id}`;

    connection.query(sql, error =>{
        if(error) throw error;
        res.send('Cliente modificado!');
    });
});

// Eliminar clientes
app.delete('/clientes/eliminar/:id', (req,res) => {
    const {id} = req.params;
    const sql = `DELETE FROM cliente WHERE id = ${id}`;
    connection.query(sql, error => {
        if(error) throw error;
        res.send('Cliente eliminado');
    });     
});


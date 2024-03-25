//crear archivo 
const express = require('express');
const fs =require('fs')
const nodemailer = require('nodemailer')
const transporter = require('./mailer');
const { readFileSync, escribirArchivo } = require('./files')


const app = express();
const morgan = require ('morgan');


//middlewares
app.use(morgan('dev'));
app.use(express.json());

//rutas 
app.get('/medicines', (req, res) =>{
    const todos = readFileSync('./src/medicamentos.json')
    res.send(todos)
});

//show
app.get('/medicines/:consecutivo', (req, res) => {
    const consecutivo = req.params.consecutivo
    const todos = readFileSync('./src/medicamentos.json')
    const todo = todos.find(todo => todo.consecutivo === parseInt (consecutivo))
    //no existe
    if (! todo ){
        res.status(404).send('No existe')
        return 
    }
    //Existe
    res.send(todo)
})

//store
app.post('/medicines', (req, res) => {
    const todo = req.body
    const todos = readFileSync('./src/medicamentos.json')
    todo.consecutivo = todos.length + 1
    todos.push(todo)
    //Escribir Archivo
    escribirArchivo('./src/medicamentos.json', todos)
    res.status(201).send(todo)
})

//update
app.put('/medicines/:consecutivo', (req, res) => {
    const consecutivo = req.params.consecutivo;
    const { fecha_de_corte, numero_cum, nombre_del_medicamento, forma_farmaceutica, descripcion_medicamento, valor_minimo, valor_maximo } = req.body;
    let todos = readFileSync('./src/medicamentos.json');
    const todoIndex = todos.findIndex(todo => todo.consecutivo === parseInt(consecutivo));
    
    // Si no se encuentra el medicamento, devolver un error 404
    if (todoIndex === -1) {
        res.status(404).send('No existe');
        return;
    }

    // Obtener el medicamento a actualizar
    let todo = todos[todoIndex];

    // Actualizar los campos del medicamento
    todo = {
        ...todo,
        fecha_de_corte: fecha_de_corte || todo.fecha_de_corte,
        numero_cum: numero_cum || todo.numero_cum,
        nombre_del_medicamento: nombre_del_medicamento || todo.nombre_del_medicamento,
        forma_farmaceutica: forma_farmaceutica || todo.forma_farmaceutica,
        descripcion_medicamento: descripcion_medicamento || todo.descripcion_medicamento,
        valor_minimo: valor_minimo || todo.valor_minimo,
        valor_maximo: valor_maximo || todo.valor_maximo,
    };

    // Actualizar el medicamento en el arreglo
    todos[todoIndex] = todo;

    // Escribir el archivo actualizado
    escribirArchivo('./src/medicamentos.json', todos);

    res.send(todo);
});

//destroy
app.delete('/medicines/:consecutivo', (req, res) => {
    const consecutivo = req.params.consecutivo;
    let todos = readFileSync('./src/medicamentos.json');

    // Buscar el índice del medicamento a eliminar
    const todoIndex = todos.findIndex(todo => todo.consecutivo === parseInt(consecutivo));

    // Si no se encuentra el medicamento, devolver un error 404
    if (todoIndex === -1) {
        res.status(404).send('No existe');
        return;
    }

    // Eliminar el medicamento del arreglo
    todos.splice(todoIndex, 1);

    // Escribir el archivo actualizado
    escribirArchivo('./src/medicamentos.json', todos);

    res.send('Medicamento eliminado correctamente');
});

//nodemailer 
app.put('/forgot-password', async (req, res) => {
    try {
        await transporter.sendMail({
            from: '"Forgot password 👻" <magreth.quintero9128@ucaldas.edu.co>', // sender address
            to:"magreth.quintero9128@ucaldas.edu.co",
            subject: "Forgot password", // Subject line
            html: "<b>Hello world?</b>", // html body
         });

res.send('Correo electrónico de recuperación de contraseña enviado correctamente');
    } catch (error) {
        console.error('Error al enviar correo electrónico de recuperación de contraseña:', error);
        res.status(500).send('Error al enviar correo electrónico de recuperación de contraseña');
    }
});

//empezando el servidor 
app.listen (4000, () =>{
    console.log('Server on port 4000');
})
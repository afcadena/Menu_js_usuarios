var colors = require('colors')

let tareas = []; // variable que sirve para almacenar las tareas segun la constante de crear_tarea
let contadorTareas = 1;  // este contador sirve cuando voy a crear una tarea entonces se le asigna un valor numerico al nombre EJ: Tarea 1 etc

const crearTarea = () => {
    const nombreTarea = `Tarea #${contadorTareas}`;  
    tareas.push(nombreTarea);
    console.log(`\nTarea "${nombreTarea}" creada exitosamente!\n`.green);
    contadorTareas++;  
};

const listarTarea = () => {
    console.log('\nTareas creadas:'.yellow);
    if (tareas.length === 0) {
        console.log('No hay tareas por listar.'.red);
    } else {
        tareas.forEach((tarea, index) => {
            console.log(`${index + 1}. ${tarea}`.blue);
        });
    }
    console.log('');
};

module.exports = {
    crearTarea,
    listarTarea
}
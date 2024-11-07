const Tarea = require('./tarea.js');

class Tareas {
    listado = {}; 

    
    get listadoArray() {
        const listado = [];
        Object.keys(this.listado).forEach(key => {
            listado.push(this.listado[key]); 
        });
        return listado;
    }

    constructor() {
        this.listado = {};
    }

    crearTarea(descripcion = '') {
        const tarea = new Tarea(descripcion); 
        this.listado[tarea.id] = tarea; 
        console.log(`La tarea "${tarea.descripcion}" se ha creado con éxito.`.green)
    }
};

module.exports = Tareas;

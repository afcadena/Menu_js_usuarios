const Tarea = require('./tarea.js');
const { guardarDB, leerDB } = require('./guardarArchivo');

class Tareas {
    listado = {};

    constructor() {
        this.cargarTareas(); // Carga las tareas desde el archivo al iniciar
    }

    get listadoArray() {
        const listado = [];
        Object.keys(this.listado).forEach(key => {
            listado.push(this.listado[key]);
        });
        return listado;
    }

    crearTarea(descripcion = '') {
        const tarea = new Tarea(descripcion);
        this.listado[tarea.id] = tarea;
        console.log(`La tarea "${tarea.descripcion}" se ha creado con éxito.`.green);
        this.guardarTareas();
    }

    guardarTareas() {
        guardarDB(this.listado); // Guarda el listado de tareas en el archivo
    }

    cargarTareas() {
        const data = leerDB(); // Lee los datos desde el archivo
        if (data) {
            this.listado = data; // Carga las tareas al listado
        }
    }

    listarCompletas() {
        console.log();
        console.log('=== Tareas Completadas ==='.green);
        this.listadoArray
            .filter(tarea => tarea.completado)
            .forEach((tarea, index) => {
                const idx = `${index + 1}`.green;
                console.log(`${idx}. ${tarea.descripcion}`);
            });
    }

    listarPendientes() {
        console.log();
        console.log('=== Tareas Pendientes ==='.yellow);
        this.listadoArray
            .filter(tarea => !tarea.completado)
            .forEach((tarea, index) => {
                const idx = `${index + 1}`.yellow;
                console.log(`${idx}. ${tarea.descripcion}`);
            });
    }

    completarTareas(ids = []) {
        ids.forEach(id => {
            if (this.listado[id]) {
                this.listado[id].completado = true;
            }
        });

        // Marcar como no completadas las que no estén en ids
        Object.keys(this.listado).forEach(id => {
            if (!ids.includes(id)) {
                this.listado[id].completado = false;
            }
        });

        this.guardarTareas();
    }
}

module.exports = Tareas;

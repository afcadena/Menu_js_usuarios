const { menu, pausa, leer } = require('./models/menu');
const Tareas = require('./tasks/tareas');
const inquirer = require('inquirer');


const principal = async () => {
    let opt = '0';

    const tareas = new Tareas();

    do {
        opt = await menu();

        switch (opt) {
            case '1': // Crear tarea
                const descripcion = await leer('Descripción: ');
                tareas.crearTarea(descripcion);
                break;

            case '2': // Listar tareas
                console.log();
                console.log('=== Lista de Tareas ==='.green);
                tareas.listadoArray.forEach((tarea, index) => {
                    const idx = `${index + 1}`.green;
                    const { descripcion, completado } = tarea;
                    const estado = completado ? 'Completada'.green : 'Pendiente'.red;
                    console.log(`${idx}. ${descripcion} :: ${estado}`);
                });

            case '3': // Listar tareas completas
                tareas.listarCompletas();
                break;
            
            case '4': // Listar tareas pendientes
                tareas.listarPendientes();
                break;
            
            case '5': // Completar tarea(s)
                const ids = await inquirer.default.prompt([{
                    type: 'checkbox',
                    name: 'ids',
                    message: 'Seleccione las tareas a completar:',
                    choices: tareas.listadoArray.map((tarea, index) => ({
                        value: tarea.id,
                        name: `${index + 1}. ${tarea.descripcion}`,
                        checked: tarea.completado
                    }))
                }]);
            
                tareas.completarTareas(ids.ids); // ids.ids contiene los seleccionados
                console.log('Tareas actualizadas correctamente.'.green);
                break;
            
        }

        await pausa();
    } while (opt !== '7');
};

principal();

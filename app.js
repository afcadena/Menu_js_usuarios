const { menu, pausa } = require('./models/menu');
const { crearTarea, listarTarea} = require('./models/tareas')

const principal = async () => {
    let opt = '0';

    do {
        opt = await menu();

        switch (opt) {
            case '1':
                await crearTarea();  // Llama a la función para crear una tarea
                break;
            case '2':
                listarTarea();  // Llama a la función para listar las tareas
                break;
        }

     await pausa();
    } while (opt !== '5');
};

principal();

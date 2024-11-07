const { menu, pausa, leer } = require('./models/menu');
const Tareas = require('./tasks/tareas');

const principal = async () => {
    let opt = '0';

    const tareas = new Tareas();

    do {
        opt = await menu();

        switch (opt) {
            case '1':
                const descripcion = await leer('Descripcion: ');
                tareas.crearTarea(descripcion);
                break;

            case '2':
                console.log(tareas.listadoArray);
                break;

        }

        await pausa();
    } while (opt !== '7');
};

principal();
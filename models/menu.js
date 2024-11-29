var colors = require('colors'); // Se encarga de ponerle colores distintivos en la línea de comandos en los textos
const inquirer = require('inquirer');

const questions = {
    type: 'list',
    name: 'options',
    message: 'Escoge la opción de tu preferencia. ',
    choices: [
        {
            value: '1',
            name: '1. Crear usuario'
        },
        {
            value: '2',
            name: '2. Listar usuarios'
        },
        {
            value: '3',
            name: '3. Listar usuarios con datos incompletos'
        },
        {
            value: '4',
            name: '4. Actualizar usuario'
        },
        {
            value: '5',
            name: '5. Eliminar usuario'
        },
        {
            value: '6',
            name: '6. Salir del menú'
        }
    ]
};

const menu = async () => {
    console.clear(); // Limpia la consola
    console.log(`${'°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°'.blue}`);
    console.log(`${'°                                   °'.blue}`);
    console.log(`${'°         Bienvenido al menú        °'.yellow}`);
    console.log(`${'°        Gestión de Usuarios        °'.yellow}`);
    console.log(`${'°                                   °'.blue}`);
    console.log(`${'°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°'.blue}`);

    const { options } = await inquirer.default.prompt(questions);
    return options;
};

const pausa = async () => {
    const question = {
        type: 'input',
        name: 'enter',
        message: `Presione la tecla ${'enter'.green} para continuar`
    };
    await inquirer.default.prompt(question);
};

const leer = async (message) => {
    const question = [{
        type: 'input',
        name: 'descripcion', 
        message,
        validate(value) {
            if (value.length === 0) {
                return 'Por favor ingrese un valor';
            }
            return true;
        }
    }];

    const { descripcion } = await inquirer.default.prompt(question);
    return descripcion;
};

module.exports = {
    menu,
    pausa,
    leer
};

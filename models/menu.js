var colors = require('colors')  //se encarga de ponerle colores distintivos en la linea de comandos en los textos
 //console.log(`${'Hola mundo'.blue}`); bactir que sirve para agregar variables dentro de los corchetes
const inquirer = require('inquirer');

const questions= {

    type: 'list',
    name: 'options',
    message: 'Escoge la opción de tu preferencia. ',
    choices: [
        {
            value: '1',
            name: '1. Crear tarea'
        },
        {
            value: '2',
            name: '2. Listar tareas'
        },
        {
            value: '3',
            name: '3. Eliminar tarea'
        },
        {
            value: '4',
            name: '4. Editar tarea'
        },
        {
            value: '5',
            name: '5. Salir'
        }
    ]

}

const menu = async () =>{
    console.clear();  //Limpia la consola 
    console.log(`${'°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°'.blue}`);
    console.log(`${'°                                   °'.blue}`);
    console.log(`${'°         Bienvenido al menú        °'.yellow}`);
    console.log(`${'°                                   °'.blue}`);
    console.log(`${'°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°'.blue}`);

    const {options} = await inquirer.default.prompt(questions);
    return  options; //retorna la opción que el usuario selecciona

}

const pausa = async ()=>{
    const question = {
        typer: 'input',
        name: 'enter',
        message: `Presione la tecla ${'enter'.green}`
    }
    await inquirer.default.prompt(question); // el await se asegura que el programa espere antes de continuar 
}



module.exports = {
    menu,
    pausa

}; 
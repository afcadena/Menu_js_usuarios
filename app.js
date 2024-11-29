const { menu, pausa, leer } = require('./models/menu');
const Usuarios = require('./Users/users_task');
const inquirer = require('inquirer');

const principal = async () => {
    let opt = '0';
    const usuarios = new Usuarios();

    do {
        opt = await menu();

        switch (opt) {
            case '1': // Crear usuario
                const nombre = await leer('Nombre: ');
                const email = await leer('Email: ');
                const telefono = await leer('Teléfono (opcional): ');
                usuarios.crearUsuario({ nombre, email, telefono });
                break;

            case '2': // Listar usuarios completos
                if (usuarios.listadoArray.length === 0) {
                    console.log('No hay usuarios registrados.'.red);
                } else {
                    console.log('\n=== Lista de Usuarios ==='.green);
                    usuarios.listadoArray.forEach((usuario, index) => {
                        const idx = `${index + 1}`.green;
                        console.log(
                            `${idx}. Nombre: ${usuario.nombre || 'Sin Nombre'}, Email: ${usuario.email || 'Sin Email'}, Teléfono: ${usuario.telefono || 'Sin Teléfono'}`
                        );
                    });
                }
                break;

            case '3': // Listar usuarios incompletos
                usuarios.listarUsuariosIncompletos();
                break;

            case '4': // Actualizar usuario seleccionando de la lista
                if (usuarios.listadoArray.length === 0) {
                    console.log('No hay usuarios registrados para actualizar.'.red);
                    break;
                }

                // Seleccionar usuario
                const { indexUsuario } = await inquirer.default.prompt([
                    {
                        type: 'list',
                        name: 'indexUsuario',
                        message: 'Selecciona un usuario para actualizar:',
                        choices: usuarios.listadoArray.map((usuario, index) => ({
                            name: `${usuario.nombre} (ID: ${usuario.id})`,
                            value: index,
                        })),
                    },
                ]);

                // Pedir nuevos datos
                const usuarioSeleccionado = usuarios.listadoArray[indexUsuario];
                const nuevosDatos = await inquirer.default.prompt([
                    {
                        type: 'input',
                        name: 'nombre',
                        message: 'Nuevo nombre (deje vacío para mantener el actual):',
                        default: usuarioSeleccionado.nombre,
                    },
                    {
                        type: 'input',
                        name: 'email',
                        message: 'Nuevo email (deje vacío para mantener el actual):',
                        default: usuarioSeleccionado.email,
                    },
                    {
                        type: 'input',
                        name: 'telefono',
                        message: 'Nuevo teléfono (deje vacío para mantener el actual):',
                        default: usuarioSeleccionado.telefono,
                    },
                ]);

                // Actualizar datos
                usuarios.actualizarUsuarioSeleccionado(indexUsuario, nuevosDatos);
                break;

                case '5': // Eliminar usuarios seleccionando de la lista
                if (usuarios.listadoArray.length === 0) {
                    console.log('No hay usuarios registrados para eliminar.'.red);
                    break;
                }
            
                // Mostrar lista para seleccionar múltiples usuarios
                const { seleccionados } = await inquirer.default.prompt([
                    {
                        type: 'checkbox',
                        name: 'seleccionados',
                        message: 'Selecciona los usuarios que deseas eliminar:',
                        choices: usuarios.listadoArray.map((usuario, index) => ({
                            name: `${usuario.nombre || 'Sin Nombre'} (ID: ${usuario.id})`,
                            value: index, // Usamos el índice para identificar el usuario
                        })),
                    },
                ]);
            
                // Validar que haya usuarios seleccionados
                if (!seleccionados || seleccionados.length === 0) {
                    console.log('No se seleccionaron usuarios para eliminar.'.yellow);
                    break;
                }
            
                // Confirmar la eliminación
                const { confirmar } = await inquirer.default.prompt([
                    {
                        type: 'confirm',
                        name: 'confirmar',
                        message: '¿Estás seguro de que deseas eliminar los usuarios seleccionados?',
                    },
                ]);
            
                if (!confirmar) {
                    console.log('Eliminación cancelada.'.yellow);
                    break;
                }
            
                // Eliminar los usuarios seleccionados
                usuarios.eliminarUsuarios(seleccionados);
                break;
            

            case '6': // Salir
                console.log('Saliendo...'.green);
                break;

            default:
                console.log('Opción no válida.'.red);
        }

        await pausa();

    } while (opt !== '6');
};

principal();

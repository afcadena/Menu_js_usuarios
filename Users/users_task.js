const { guardarDB, leerDB } = require('./guardarArchivo');
const inquirer = require('inquirer');
class Usuarios {
    listado = {}; // Listado de usuarios

    constructor() {
        this.cargarUsuarios(); // Carga los usuarios desde el archivo al iniciar
    }

    get listadoArray() {
        return Object.values(this.listado);
    }

    // Crear un nuevo usuario
    crearUsuario({ nombre, email, telefono }) {
        const id = Date.now().toString();
        const usuario = {
            id,
            nombre: nombre.trim() || 'Nombre desconocido',
            email: email.trim() || 'Sin Email',
            telefono: telefono.trim() || 'Sin Teléfono',
            activo: true,
            fechaCreacion: new Date().toISOString(),
        };

        this.listado[id] = usuario;
        console.log(`Usuario "${usuario.nombre}" creado con éxito.`.green);
        this.guardarUsuarios();
    }

    // Guardar usuarios en el archivo
    guardarUsuarios() {
        guardarDB(this.listado);
    }

    // Cargar usuarios desde el archivo
    cargarUsuarios() {
        const data = leerDB();
        if (data) {
            this.listado = data;
        }
    }

    // Listar usuarios con datos incompletos
    listarUsuariosIncompletos() {
        const incompletos = this.listadoArray.filter(
            (usuario) =>
                !usuario.nombre ||
                usuario.nombre === 'Nombre desconocido' ||
                !usuario.email ||
                usuario.email === 'Sin Email' ||
                !usuario.telefono ||
                usuario.telefono === 'Sin Teléfono'
        );

        if (incompletos.length === 0) {
            console.log('No hay usuarios con datos incompletos.'.yellow);
            return;
        }

        console.log('\n=== Usuarios con Datos Incompletos ==='.green);
        incompletos.forEach((usuario, index) => {
            const idx = `${index + 1}`.green;
            console.log(
                `${idx}. Nombre: ${usuario.nombre || 'Sin Nombre'}, Email: ${usuario.email || 'Sin Email'}, Teléfono: ${usuario.telefono || 'Sin Teléfono'}`
            );
        });
    }

    // Actualizar usuario seleccionado
    actualizarUsuarioSeleccionado(index, nuevosDatos) {
        const usuario = this.listadoArray[index];
        if (!usuario) {
            console.log('Usuario no encontrado.'.red);
            return;
        }

        const id = usuario.id;
        this.listado[id] = {
            ...usuario,
            ...nuevosDatos,
        };

        this.guardarUsuarios();
        console.log('Usuario actualizado con éxito.'.green);
    }
    
    eliminarUsuarios(seleccionados) {
        seleccionados.forEach((index) => {
            const usuario = this.listadoArray[index];
            if (usuario) {
                delete this.listado[usuario.id];
            }
        });

        console.log('Usuarios eliminados con éxito.'.green);
        this.guardarUsuarios();
    }
}

module.exports = Usuarios;

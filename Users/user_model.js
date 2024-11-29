const { v4: uuidv4 } = require('uuid');

class Usuario {

    id = ''; 
    nombre = ''; 
    email = ''; 
    telefono = ''; 
    activo = false; 
    fechaCreacion = ''; 

    constructor({ nombre = '', email = '', telefono = '', activo = true } = {}) {
        this.id = uuidv4();
        this.nombre = nombre;
        this.email = email;
        this.telefono = telefono;
        this.activo = activo; 
        this.fechaCreacion = new Date().toISOString(); 
    }

}

module.exports = Usuario;

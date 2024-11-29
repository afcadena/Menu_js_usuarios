const fs = require('fs');

const archivo = './db/data.txt';

const guardarDB = (data) => {
    fs.writeFileSync(archivo, JSON.stringify(data));
};

const leerDB = () => {
    if (!fs.existsSync(archivo)) {
        return null; // Si no existe el archivo, retorna null
    }

    const info = fs.readFileSync(archivo, { encoding: 'utf-8' });
    return JSON.parse(info); // Convierte los datos a un objeto
};

module.exports = {
    guardarDB,
    leerDB
};

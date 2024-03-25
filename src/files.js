const fs = require ('fs');

function readFileSync(path) {
    const data = fs.readFileSync(path);
    const todos = JSON.parse(data).todos;
    return todos;
}

    function escribirArchivo(path, info) {
        const data = JSON.stringify ({'todos': info});
        fs.writeFileSync(path, data);
    }


module.exports = {
    'readFileSync': readFileSync,
    'escribirArchivo': escribirArchivo
} 
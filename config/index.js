//la variable NODE_ENV la setea en proveedor
if( process.env.NODE_ENV !== 'production') {    
    /**
     * Todas las variables de entorno definidas en .ENV 
     * se van a cargar al entorno de ejecucion de nodejs
     */
    require('dotenv').config();
}

module.exports = {
    MONGO_URI: process.env.MONGO_URI
};
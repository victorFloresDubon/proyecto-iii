import axios from 'axios';

/**
 * Configuración para la conexión al endpoint API Pueblos
 */
export default axios.create({
    baseURL: process.env.REACT_APP_ENDPOINT,
    headers: {
        "Content-type": "application/json",
        'Access-Control-Allow-Origin' : '*',
        "Access-Control-Allow-Methods" : "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers" : 'Authorization, Origin, X-Requested-With, Content-Type, Accept, access-control-allow-origin',
    }
});
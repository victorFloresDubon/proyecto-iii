/**
 * Esta clase representa el servicio que consumirá nuestra API
 * a base del archivo de configuración
 */
import http from "../config/http-common";

const URL = "/pueblos";

class PuebloService {

    /**
     * Obtener el listado de todos los pueblos
     * @returns Lista de todos los pueblos
     */
    getPueblos() {
        return http.get(`${URL}/`);
    }


    /**
     * Crear un nuevo pueblo
     * @param {*} pueblo
     * @returns confirmación del pueblo creado
     */
    crearPueblo(pueblo) {
        return http.post(`${URL}/crear-pueblo`, pueblo);
    }

    /**
     * Crear un nuevo habitante para un pueblo
     * @param {*} habitante 
     * @returns confirmación de creación de un nuevo habitante
     */
    crearHabitante(habitante) {
        return http.post(`${URL}/crear-habitante`, habitante);
    }

    /**
     * Elimina un habitante de un pueblo
     * @param {*} puebloId 
     * @param {*} habitante 
     * @returns confirmación de eliminación del habitante
     */
    eliminarHabitante(puebloId, habitante){
        // Parámetros del endpoint
        let params = {
            puebloId: puebloId,
            habitante: habitante
        }
        return http.delete(`${URL}/eliminarHabitante`, {
            params: params
        })
    }

    /**
     * Elimina un pueblo por id
     * @param {*} id 
     * @returns confirmación de eliminación
     */
    eliminarPuebloPorId(id) {
        let params = {
            id: id
        }
        return http.delete(`${URL}/eliminarPueblo`, { 
            params: params
        });
    }

}

export default new PuebloService();
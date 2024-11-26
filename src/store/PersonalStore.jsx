import { create } from "zustand";
import { MostrarPersonal, InsertarPesonal, EliminarPersonal, EditarPersonal, BuscarPersonal } from "../index";

export const usePersonalStore = create((set, get) => ({
  buscador: "", // Para buscar personal
  setBuscador: (p) => {
    set({ buscador: p }); // Establece el valor del buscador
  },
  datapersona: [], // Almacena los datos del personal
  personalItemSelect: [], // Almacena el personal seleccionado
  parametro: {}, // Parámetros para la consulta

  // Función para mostrar el personal
  mostrarPersonal: async (p) => {
    try {
        const response = await MostrarPersonal(p);
        if (response && response.length > 0) {
            set({ parametro: p });
            set({ datapersona: response });
            set({ personalItemSelect: response[0] });
        } else {
            console.warn("No se encontró ningún personal");
            set({ datapersona: [] });
        }
    } catch (error) {
        console.error("Error al obtener los datos del personal:", error);
        set({ datapersona: [] });
    }
},

  // Función para seleccionar un ítem de personal
  selectPersonal: (p) => {
    set({ personalItemSelect: p });
  },

  // Función para insertar un nuevo personal
  insertarPersonal: async (p) => {
    await InsertarPesonal(p);
    const { mostrarPersonal } = get();
    const { parametro } = get();
    set(mostrarPersonal(parametro)); // Actualiza la lista después de insertar
  },

  // Función para eliminar un personal
  eliminarPersonal: async (p) => {
    await EliminarPersonal(p); // Asegúrate de que se pase el parámetro correcto
    const { mostrarPersonal } = get();
    const { parametro } = get();
    set(mostrarPersonal(parametro)); // Actualiza la lista después de eliminar
  },

  // Función para editar el personal
  editarPersonal: async (p) => {
    await EditarPersonal(p); // Asegúrate de pasar el parámetro correcto para editar
    const { mostrarPersonal } = get();
    const { parametro } = get();
    set(mostrarPersonal(parametro)); // Actualiza la lista después de editar
  },

  // Función para buscar personal
  buscarPersonal: async (p) => {
    const response = await BuscarPersonal(p);
    set({ datapersona: response }); // Actualiza la lista con los resultados de la búsqueda
  },
}));
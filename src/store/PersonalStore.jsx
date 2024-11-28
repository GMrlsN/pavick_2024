import { create } from "zustand";
import { MostrarPersonal, InsertarPesonal, EliminarPersonal, EditarPersonal, BuscarPersonal } from "../index"; // Asegúrate de importar las funciones correctamente
import Swal from "sweetalert2";
import { supabase } from "../index"; // Asegúrate de que la importación de Supabase sea correcta

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

  // Función para insertar personal
  insertarPersonal: async (p) => {
    const { data, error } = await supabase
      .from("usuarios") // Cambiar "usuarios" por la tabla "personal"
      .insert(p)
      .select()
      .maybeSingle();
    if (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error al insertar personal: " + error.message,
      });
    }
    if (data) {
      const { mostrarPersonal } = get(); // Llamamos a la función para actualizar la lista de personal
      const { parametro } = get(); // Obtenemos los parámetros para la consulta
      set(mostrarPersonal(parametro)); // Actualiza la lista después de insertar
      return data;
    }
  },

  // Función para eliminar personal
  eliminarPersonal: async (p) => {
    await EliminarPersonal(p); // Asegúrate de que se pase el parámetro correcto
    const { mostrarPersonal } = get();
    const { parametro } = get();
    set(mostrarPersonal(parametro)); // Actualiza la lista después de eliminar
  },

  // Función para editar personal
  editarPersonal: async (p) => {
    const { data, error } = await supabase
      .from("usuarios") // Cambiar "usuarios" por la tabla "personal"
      .update(p)
      .match({ id: p.id }) // Asegúrate de que el parámetro 'id_personal' sea el correcto
      .select()
      .maybeSingle();
    if (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error al editar personal: " + error.message,
      });
    }
    if (data) {
      const { mostrarPersonal } = get(); // Llamamos a la función para actualizar la lista de personal
      const { parametro } = get(); // Obtenemos los parámetros para la consulta
      set(mostrarPersonal(parametro)); // Actualiza la lista después de editar
      return data;
    }
  },

  // Función para buscar personal
  buscarPersonal: async (p) => {
    const response = await BuscarPersonal(p);
    set({ datapersona: response }); // Actualiza la lista con los resultados de la búsqueda
  },
}));

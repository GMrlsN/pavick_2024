import { create } from "zustand";
import {
  BuscarPaquete,
  MostrarPaquete,
  MostrarTodosPaquetes,
  EliminarPaquete,
  InsertarPaquete,
  EditarPaquete,
} from "../index";

export const usePaqueteStore = create((set, get) => ({
  buscador: "",
  datapaquete: [], // Lista de todos los paquetes
  isLoading: false, // Indicador de carga

  // Setear término de búsqueda
  setBuscador: (nuevoBuscador) => set({ buscador: nuevoBuscador }),

  // Mostrar todos los paquetes
  mostrarTodosPaquetes: async () => {
    try {
      const response = await MostrarTodosPaquetes();
      set({ datapaquete: response });
      return response;
    } catch (error) {
      console.error("Error al mostrar todos los paquetes:", error);
      throw error;
    }
  },

  // Buscar un paquete por nombre
  buscarPaquete: async ({ nombre }) => {
    try {
      const response = await BuscarPaquete({ nombre });
      set({ datapaquete: response });
      return response;
    } catch (error) {
      console.error("Error al buscar paquete:", error);
      throw error;
    }
  },

  // Eliminar un paquete por ID
  eliminarPaquete: async (id_paquete) => {
    set({ isLoading: true }); // Activar indicador de carga
    try {
      if (!id_paquete) {
        throw new Error("ID de paquete no válido para eliminar.");
      }

      await EliminarPaquete({ id_paquete }); // Llamada al backend para eliminar
      const nuevaLista = get().datapaquete.filter((p) => p.id_paquete !== id_paquete);
      set({ datapaquete: nuevaLista }); // Actualizar la lista de paquetes

      return { success: true };
    } catch (error) {
      console.error("Error al eliminar paquete:", error);
      return { success: false, error: error.message };
    } finally {
      set({ isLoading: false }); // Desactivar indicador de carga
    }
  },

  // Editar un paquete con sus productos asociados
  editarPaquete: async (id_paquete, paquete, productos) => {
    set({ isLoading: true }); // Activar indicador de carga
    try {
      if (!id_paquete || !paquete || !productos || productos.length === 0) {
        throw new Error("Datos inválidos para editar paquete.");
      }

      const payload = { ...paquete, productos };
      await EditarPaquete(id_paquete, payload); // Llamada al backend para editar

      // Actualizar el paquete en la lista local
      const nuevaLista = get().datapaquete.map((p) =>
        p.id_paquete === id_paquete ? { ...p, ...paquete, productos } : p
      );
      set({ datapaquete: nuevaLista });

      return { success: true };
    } catch (error) {
      console.error("Error al editar paquete:", error);
      return { success: false, error: error.message };
    } finally {
      set({ isLoading: false }); // Desactivar indicador de carga
    }
  },
}));

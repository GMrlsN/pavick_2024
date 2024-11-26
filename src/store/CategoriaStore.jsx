import { create } from "zustand";
import { BuscarCategoria, 
    MostrarCategoria, 
    EliminarCategoria, 
    InsertarCategoria, 
} from "../index";

export const useCategoriaStore = create((set, get) => ({
    buscador: "",
    isLoading: false,
    datacategoria: [],
    categoriaItemSelect: [],
    parametros: {},

    setBuscador: (p) => set({ buscador: p }),

    mostrarCategoria: async () => {
        console.log("Ejecutando mostrar Categoria con");
        try {
            const response = await MostrarCategoria();
            set({ datacategoria: response, categoriaItemSelect: response[0] });
            return response;
        } catch (error) {
            console.error("Error al mostrar el categoria:", error);
        }
    },

    reconsultarCategoria: () => {
        const { mostrarCategoria, parametros } = get();
        if (parametros) mostrarCategoria(parametros);
    },

    insertarCategoria: async (p) => {
        set({ isLoading: true });
        try {
            await InsertarCategoria(p);
            get().reconsultarCategoria();
        } catch (error) {
            console.error("Error al insertar categoria:", error);
        } finally {
            set({ isLoading: false });
        }
    },

    eliminarCategoria: async (p) => {
        set({ isLoading: true });
        try {
            await EliminarCategoria(p);
            get().reconsultarCategoria();
        } catch (error) {
            console.error("Error al eliminar categoria:", error);
        } finally {
            set({ isLoading: false });
        }
    },

    buscarCategoria: async (p) => {
        if (!p || !p.category_name) {
            console.error("Parámetro inválido para buscarCategoria");
            return;
        }
        try {
            const response = await BuscarCategoria(p);
            set({ datacategoria: response });
        } catch (error) {
            console.error("Error al buscar categoria:", error);
        }
    },
}));

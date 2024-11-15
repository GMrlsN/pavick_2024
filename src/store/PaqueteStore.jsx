import { create } from "zustand";
import { BuscarPaquete, MostrarPaquete, EliminarPaquete, InsertarPaquete, } from "../supabase/crudPaquetes";

export const usePaqueteStore = create((set, get) => ({
    buscador:"",
    setBuscador:(p)=>{
        set({buscador:p})
    },
    datapaquete:[],
    paqueteItemSelect:[],
    parametros:{},
    mostrarPaquete: async () => {
        const response = await MostrarPaquete(p)
        set({parametro:p})
        set({datapaquete:response})
        set({paqueteItemSelect:response[0]})
        console.log("MostrarPaquete",response)
        return response;
    },
    selectPaquete:(p)=>{
        set({paqueteItemSelect:p})
    },
    insertarPaquete: async (p) => {
        await InsertarPaquete(p)
        const {mostrarPaquete}=get();
        const{parametros}=get();

        console.log("InsertarPaquete",p)
        set(mostrarPaquete(parametros))
    },
    eliminarPaquete: async (p) => {
        await EliminarPaquete(p)
        const {mostrarPaquete}=get();
        const{parametros}=get();
        set(mostrarPaquete(parametros))
    },
    editarPaquete: async (p) => {
        await EditarPaquete(p)
        const {mostrarPaquete}=get();
        const{parametros}=get();
        set(mostrarPaquete(parametros))
    },
    buscarPaquete: async (p) => {
        const response = await BuscarPaquete(p)
        console.log("BuscarPaquete",response)
        set({datapaquete:response})
    }
}));
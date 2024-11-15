import { supabase } from "../index";
import Swa1 from "sweetalert2"

export async function InsertarPaquete(p){
    const {error} = await supabase.rpc
    ("InsertarPaquete",p)
    if(error)
    {
        Swa1.fire({
            icon:"error",
            title:"Error al insertar el paquete",
            text:error.message,
            footer: '<a href="">Agregue un nuevo nombre</a>'
        })
    }
}
export async function MostrarPaquete(p){
    const{data}=await supabase
    .from("paquete")
    .select()
    .eq("id_producto",p.id_producto)
    .order("id_paquete",{ascending:true})
    return data
}

export async function EliminarPaquete(p){
    const {error} = await supabase
    .from("paquete")
    .delete()
    .eq("id_paquete",p.id_paquete)
    if(error){
        alert("Error al eliminar el paquete",error.message);
    }
}

export async function EditarPaquete(p) {
    const { error } = await supabase
        .from("paquete")
        .update(p)
        .eq("id_paquete", p.id_paquete);
    if (error) {
        alert("Error al editar", error.message);
    }
}

export async function BuscarPaquete(p) {
    const { data } = await supabase
        .from('paquete')
        .select()
        .eq("id_producto", p.id_producto)
        .ilike("nombre","%"+p.nombre+"%");
    return data;
}
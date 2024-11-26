import { supabase } from "../index";
import Swal from "sweetalert2";

// Insertar un paquete completo con los productos asociados
export async function InsertarCategoria(p) {
    const{error}= await supabase.rpc
    ("insertarCategories",p)
    if(error){
        Swal.fire({
            icon: "error",
            title: "Error al insertar la categoria",
            text: error.message,
            footer: '<a href="">Verifica los datos e intenta de nuevo</a>',
        });
    }
}
export async function MostrarCategoria() {
    console.log("Ejecutando query")
    const { data } = await supabase
      .from("categories")
      .select("*")
      .order("category_id", { ascending: true });
    return data; 
}
export async function EliminarCategoria(p) {
 
    const { error } = await supabase
      .from("categories")
      .delete()
      .eq("category_id", p.category_id);
    if (error) {
      alert("Error al eliminar", error.message);
    }
}
export async function EditarCategoria(p) {
    const { error } = await supabase
      .from("categories")
      .update(p)
      .eq("category_id", p.category_id);
    if (error) {
      alert("Error al editar marca", error.message);
    }
}
export async function BuscarCategoria(p) {
    const { data} = await supabase
    .from("categories")
    .select()
    .eq("category_id", p.category_id)
    .ilike("description","%"+p.description+"%")
    return data;
}
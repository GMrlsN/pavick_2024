import {supabase} from "../index"
import Swal from "sweetalert2"
export async function InsertarProductos(p) {
    const {error} = await supabase.rpc("insertarproductos",p)
    if(error) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.message,
            footer: '<a href="">Agregue una nueva descripcion</a>',
          });
    }
}
export async function MostrarProductos(p) {
 
    const { data } = await supabase.rpc("mostrarproductos",p)
    return data;
  
}
export async function EliminarProductos(id) {
 
    const { error } = await supabase
      .from("products")
      .delete()
      .eq("product_id", id);
    if (error) {
      alert("Error al eliminar", error.message);
    }
}
export async function EditarProductos(p) {
    const { error } = await supabase
      .from("products")
      .update(p)
      .eq("product_id", p.product_id);
    if (error) {
      alert("Error al editar Productos", error.message);
    }
}
export async function BuscarProductos(p) {
    const { data} = await supabase.rpc("buscarproductos",p)
    return data;
}
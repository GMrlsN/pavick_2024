import {supabase} from "../index"
import Swal from "sweetalert2";
export async function InsertarPesonal(p) {
    const {error} = await supabase.rpc('insertarusuario', p);
    if (error) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.message,
            footer: '<a href="">Agregue una nueva descripcion</a>',
        });
    }
}
export async function MostrarPersonal(p) {
    const { data, error } = await supabase
        .from("usuarios")
        .select()  // No se aplica ningún filtro
        .order("id", { ascending: true });  // Ordena los resultados por id en orden ascendente
    if (error) {
        console.log(error.message);
    }
    return data;
}
export async function EliminarPersonal(p) {
    const {error} = await supabase
        .from("usuarios")
        .delete()
        .eq("id", p.id);  // Filtra por id del usuario
    if (error) {
        alert("Error al eliminar usuario: " + error.message);
    }
}
export async function EditarPersonal(p) {
    const {error} = await supabase
        .from("usuarios")
        .update(p)  // Actualiza los datos del usuario
        .eq("id", p.id);  // Filtra por el id del usuario
    if (error) {
        alert("Error al editar usuario: " + error.message);
    }
}
export async function BuscarPersonal(p) {
    const {data, error} = await supabase
        .from("usuarios")
        .select()
        .eq("id", p.id)
        .ilike("nombres", "%" + p.nombres + "%");  // Búsqueda por nombre (case-insensitive)
    if (error) {
        console.log(error.message);
    }
    return data;
}
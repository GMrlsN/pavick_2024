import { supabase } from "../index";
import Swal from "sweetalert2";

// Insertar un paquete completo con los productos asociados
export async function InsertarPaquete(paquete, productos) {
    const { data, error: errorPaquete } = await supabase
        .from("paquetes")
        .insert(paquete)
        .select("id_paquete");

    if (errorPaquete || !data || data.length === 0) {
        Swal.fire({
            icon: "error",
            title: "Error al insertar el paquete",
            text: errorPaquete?.message || "No se pudo insertar el paquete.",
            footer: '<a href="">Agregue un nuevo nombre</a>',
        });
        return null;
    }

    const paqueteId = data[0].id;

    const productosConPaqueteId = productos.map(producto => ({
        id_paquete: paqueteId,
        product_id: producto.producto_id,
        cantidad: producto.cantidad
    }));

    const { error: errorProductos } = await supabase
        .from("paquete_producto")
        .insert(productosConPaqueteId);

    if (errorProductos) {
        Swal.fire({
            icon: "error",
            title: "Error al insertar los productos en el paquete",
            text: errorProductos.message,
            footer: '<a href="">Verifica los datos e intenta de nuevo</a>',
        });
        return null;
    }

    Swal.fire({
        icon: "success",
        title: "Paquete y productos insertados exitosamente",
    });
    return true;
}

// Mostrar los detalles de un paquete
export async function MostrarPaquete(p) {
    console.log("Ejecutando MostrarPaquete con", p);
    const { data, error } = await supabase
        .from("paquete_producto ")
        .select(`
            cantidad,
            paquetes (id_paquete, nombre, precio),
            products (name)
        `)
        .eq("id_paquete", p.id_paquete);

    if (error) {
        console.error("Error al consultar los datos:", error);
        return null;
    }
    console.log("Datos de paquete:", data);
    return data;
}

// Mostrar todos los paquetes
export async function MostrarTodosPaquetes() {
    console.log("Ejecutando MostrarTodosPaquetes");
    const { data, error } = await supabase
        .from("paquete_producto")
        .select(`
            cantidad,
            paquetes (id_paquete, nombre, precio),
            products (name)
        `);

    if (error) {
        console.error("Error al consultar todos los paquetes:", error);
        return null;
    }
    console.log("Todos los paquetes:", data);
    return data;
}

// Eliminar un paquete y sus productos relacionados
export async function EliminarPaquete(p) {
    console.log("Ejecutando EliminarPaquete con", p);
    const { error: errorRelacionados } = await supabase
        .from("paquete_producto")
        .delete()
        .eq("id_paquete", p.id_paquete);

    if (errorRelacionados) {
        console.error("Error al eliminar los registros relacionados:", errorRelacionados.message);
        alert(`Error al eliminar los registros relacionados: ${errorRelacionados.message}`);
        return null;
    }

    const { error } = await supabase
        .from("paquetes")
        .delete()
        .eq("id_paquete", p.id_paquete);

    if (error) {
        console.error("Error al eliminar el paquete:", error.message);
        alert(`Error al eliminar el paquete: ${error.message}`);
        return null;
    } else {
        alert("Paquete eliminado exitosamente");
        return true;
    }
}

// Editar los detalles de un paquete o productos asociados
export async function EditarPaquete(p, paqueteId, productoIdActual, nuevoProductoId, nuevaCantidad) {
    const { error: errorPaquete } = await supabase
        .from("paquetes")
        .update({
            nombre: p.nombre,
            precio: p.precio
        })
        .eq("id_paquete", paqueteId);

    if (errorPaquete) {
        console.error("Error al editar el paquete:", errorPaquete.message);
        alert(`Error al editar el paquete: ${errorPaquete.message}`);
        return null;
    }

    if (productoIdActual === nuevoProductoId) {
        const { error: errorCantidad } = await supabase
            .from("paquete_producto")
            .update({ cantidad: nuevaCantidad })
            .eq("id_paquete", paqueteId)
            .eq("product_id", productoIdActual);

        if (errorCantidad) {
            console.error("Error al actualizar la cantidad del producto:", errorCantidad.message);
            alert(`Error al actualizar la cantidad del producto: ${errorCantidad.message}`);
            return null;
        } else {
            alert("Cantidad del producto actualizada exitosamente");
            return true;
        }
    } else {
        const { error: errorEliminar } = await supabase
            .from("paquete_producto")
            .delete()
            .eq("id_paquete", paqueteId)
            .eq("product_id", productoIdActual);

        if (errorEliminar) {
            console.error("Error al eliminar el producto actual:", errorEliminar.message);
            alert(`Error al eliminar el producto actual: ${errorEliminar.message}`);
            return null;
        }

        const { error: errorInsertar } = await supabase
            .from("paquete_producto")
            .insert([
                { id_paquete: paqueteId, product_id: nuevoProductoId, cantidad: nuevaCantidad }
            ]);

        if (errorInsertar) {
            console.error("Error al insertar el nuevo producto:", errorInsertar.message);
            alert(`Error al insertar el nuevo producto: ${errorInsertar.message}`);
            return null;
        } else {
            alert("Producto actualizado exitosamente en el paquete");
            return true;
        }
    }
}

// Buscar paquetes por nombre
export async function BuscarPaquete(p) {
    const { data, error } = await supabase
        .from("paquetes")
        .select()
        .ilike("nombre", `%${p.nombre}%`);

    if (error) {
        console.error("Error al buscar el paquete:", error.message);
        return null;
    }
    return data;
}

import { useQuery } from "@tanstack/react-query";
import {CategoriaTempleate, useCategoriaStore} from "../index";
export function Categoria(){
    const{mostrarCategoria} = useCategoriaStore();
    console.log("Ejecutando Categoria");
    const { data, isLoading, error } = useQuery({
        queryKey: ["mostrar categoria"], // Solo una clave, ya que no hay parámetros
        queryFn: mostrarCategoria, // Llama a la función directamente sin argumentos
      });
    
    //const { data: buscardata } = useQuery({
      //  queryKey: [
        //  "buscar categorias",
          //{ category_id: datacategoria.category_id, category_name: buscador },
        //],
        //queryFn: () =>
          //buscarcategorias({ category_id: datacategoria.category_id, category_name: buscador}),
        //enabled: datacategoria.id != null,
      //});
      //if (isLoading) {
        //return <SpinnerLoader />;
      //}
      //if (error) {
        //return <span>Error...</span>;
      //}

    return (<CategoriaTempleate/>);
}

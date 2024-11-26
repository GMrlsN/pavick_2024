import { useQuery } from "@tanstack/react-query";
import { 
  PersonalTemplate, 
  SpinnerLoader, 
  usePersonalStore } 
  from "../index"; // Ajuste de importación
export function Personal() {
  const { mostrarPersonal, datapersona, buscarPersonal, buscador } = usePersonalStore();
  // Obtener los datos del usuario usando React Query
  const { isLoading, error} = useQuery({
    queryKey: ["mostrar personal"],
    queryFn: () => mostrarPersonal(),
  });
  // Buscar productos específicos con el valor de `buscador`
  /*const { data: buscardata } = useQuery({
    queryKey: ["buscar personal", { descripcion: buscador }],
    queryFn: () => buscarPersonal({ buscador }),
    enabled: buscador.trim() !== "", // Solo ejecuta si `buscador` no está vacío
  });*/
  if (isLoading) {
    return <SpinnerLoader />;
  }
  // Manejar errores de consulta
  //if (error) {
    //return <span>Error...</span>;
  //}
  return <PersonalTemplate data={datapersona} />;
}
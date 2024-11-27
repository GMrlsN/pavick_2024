import { useQuery } from "@tanstack/react-query";
import { PaqueteTemplate, usePaqueteStore, SpinnerLoader } from "../index";

export function Paquetes() {
  const { mostrarTodosPaquetes, datapaquete } = usePaqueteStore();

  console.log("Ejecutando Paquetes");

  const { isLoading, error, data } =
    useQuery({
      queryKey: ["mostrar todos paquetes"],
      queryFn: () => mostrarTodosPaquetes(),
      enabled: true,
    });

  if (isLoading) return <SpinnerLoader message="Cargando paquetes..." />;
  if (error) {
    console.error("Error en consultas:", error);
    return <span>Error al cargar datos</span>;
  }

  const paqueteData = data;

  if (!paqueteData || paqueteData.length === 0) {
    return <span>No se encontraron paquetes</span>;
  }

  return <PaqueteTemplate data={paqueteData} />;
}

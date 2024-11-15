import { useQuery } from "@tanstack/react-query";
import {
    PaqueteTemplate,
    usePaqueteStore,
    SpinnerLoader}
from "../index";

export function Paquetes(){
    const {mostrarPaquete,datapaquete,buscarPaquete,buscador}= usePaqueteStore();
    const {isLoading, error}=useQuery({
        queryKey:["mostrar paquete",{id_producto:datapaquete?.id}],
        queryFn: () => mostrarPaquete({id_producto:datapaquete?.id}),
        enabled:datapaquete.id !=null});

    const {data : buscardata}=useQuery({
    queryKey:["buscar paquete",{id_producto:datapaquete.id,nombre:buscador}],
    queryFn: ()=> buscarPaquete({id_producto:datapaquete.id,nombre:buscador}),
    enabled:datapaquete.id !=null});

if(isLoading)
{
    return <SpinnerLoader/>
}
if(error)
{
    return <span>Error</span>
}
return (<PaqueteTemplate data={datapaquete}/>);
}

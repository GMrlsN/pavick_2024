import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    flexRender,
  } from "@tanstack/react-table";
import styled from "styled-components";
export function TablaPaquete(data) {
    const columns = [
        {
            accessorKey: "nombre",
            header: "Nombre",
        },
    ];
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFacetedRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })
    return(<Container>
        <table>
            <thead>
                {
                    table.getHeaderGroups().map((headerGroup) => (
                        <tr key ={headerGroup.id}>
                            {headerGroup.headers.map((column) => (
                                <th key={headerGroup.id}> 
                                    {headerGroup.column.columnDef.header}
                                </th>
                            ))}
                        </tr>
                    ))
                }
            </thead>
            <tbody>
            </tbody>
        </table>
    </Container>)
}
const Container = styled.div`

`
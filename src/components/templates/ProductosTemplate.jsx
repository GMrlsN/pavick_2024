import styled from "styled-components";
import { BtnFiltro, Buscador, ContentFiltro, Header, RegistrarProductos, TablaProductos, Title, useProductosStore, v } from "../../index";
import { useState } from "react";

export function ProductosTemplate({ data }) {
  // Estados locales
  const [state, setState] = useState(false); // Control del estado de configuración
  const [dataSelect, setdataSelect] = useState([]); // Datos del producto seleccionado
  const [accion, setAccion] = useState(""); // Acción actual: "Nuevo" o "Editar"
  const [openRegistro, setOpenRegistro] = useState(false); // Controla si el modal de registro está abierto

  // Función para abrir el registro de un nuevo producto
  const nuevoRegistro = () => {
    setOpenRegistro(!openRegistro); // Abre el modal
    setAccion("Nuevo"); // Define la acción como "Nuevo"
    setdataSelect([]); // Limpia cualquier selección previa
  };

  // Acceder al buscador desde el store global de productos
  const { setBuscador } = useProductosStore();

  return (
    <Container>
      {/* Modal de registro de productos */}
      {openRegistro && 
        <RegistrarProductos
          dataSelect={dataSelect} // Producto seleccionado
          accion={accion} // Acción actual (Nuevo/Editar)
          onClose={() => setOpenRegistro(!openRegistro)} // Cierra el modal
        />
      }

      {/* Header */}
      <header className="header">
        <Header stateConfig={{ state: state, setState: () => setState(!state) }} />
      </header>

      {/* Sección de filtro y búsqueda */}
      <section className="area1">
        <ContentFiltro>
          <Title>Productos</Title>
          <BtnFiltro
            funcion={nuevoRegistro} // Función para abrir el formulario de registro
            bgcolor="#f6f3f3"
            textcolor="#353535"
            icono={<v.agregar />} // Icono para el botón
          />
        </ContentFiltro>
        <Buscador setBuscador={setBuscador} /> {/* Componente de búsqueda */}
      </section>

      {/* Tabla de productos */}
      <section className="main">
        <TablaProductos
          data={data} // Datos de los productos
          SetopenRegistro={setOpenRegistro} // Controla la apertura del modal
          setdataSelect={setdataSelect} // Establece el producto seleccionado
          setAccion={setAccion} // Establece la acción actual (Editar, Ver)
        />
      </section>
    </Container>
  );
}

// Estilización del contenedor principal
const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  background-color: ${(props) => props.theme.bgtotal};
  color: ${({ theme }) => theme.text};
  display: grid;
  padding: 15px;
  grid-template:
    "header" 100px
    "area1" 100px
    "area2" 100px
    "main" auto;

  .header {
    grid-area: header;
    display: flex;
    align-items: center;
  }
  .area1 {
    grid-area: area1;
    display: flex;
    align-items: center;
  }
  .area2 {
    grid-area: area2;
    display: flex;
    align-items: center;
    justify-content: end;
  }
  .main {
    grid-area: main;
  }
`;

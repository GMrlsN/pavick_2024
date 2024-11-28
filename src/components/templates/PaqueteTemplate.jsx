import { useState } from "react";
import { BtnFiltro, ContentFiltro, Header, Title, TablaPaquete, Buscador, usePaqueteStore,RegistratPaquetes, v } from "../../index";
import styled from "styled-components";

export function PaqueteTemplate({ data }) {
  const [state, setState] = useState(false);
  const [dataSelect, setDataSelect] = useState({});
  const [accion, setAccion] = useState("");
  const [openRegistraPaquete, setOpenRegistraPaquete] = useState(false);

  const nuevoRegistro = () => {
    setOpenRegistraPaquete(!openRegistraPaquete);
    setAccion("Nuevo");
    setDataSelect([]);
  };

  const { setBuscador } = usePaqueteStore();

  return (
    <Containeir>
      {openRegistraPaquete && (
        <RegistratPaquetes
          dataSelect={dataSelect}
          accion={accion}
          onClose={() => setOpenRegistraPaquete(!openRegistraPaquete)}
        />
      )}
      <header className="header">
        <Header stateConfig={{ state: state, setState: () => setState(!state) }} />
      </header>

      <section className="area1">
        <ContentFiltro>
          <Title>Paquetes</Title>
          <BtnFiltro
            funcion={nuevoRegistro}
            bgcolor="#f6f3f3"
            textcolor="#353535"
            icono={<v.agregar />}
          />
        </ContentFiltro>
        <Buscador setBuscador={setBuscador} />
      </section>

      <section className="main">
        <TablaPaquete
          data={data} // Datos de paquetes y productos
          setOpenRegistraPaquete={setOpenRegistraPaquete}
          setDataSelect={setDataSelect}
          setAccion={setAccion}
        />
      </section>
    </Containeir>
  );
}

const Containeir = styled.div`
  height: 100vh;
  width: 100%;
  background-color: ${({ theme }) => theme.bgtotal};
  color: ${({ theme }) => theme.text};
  display: grid;
  padding: 15px;
  grid-template:
    "header" 100px
    "area1" 100px
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

  .main {
    grid-area: main;
    display: flex;
  }
`;

import styled from "styled-components";
import { Header, TablaCategoria,BtnFiltro, Btnsave, ContentFiltro, Title, v, Buscador,useCategoriaStore } from "../../index";
import { useState } from "react";

export function CategoriaTempleate() {
  const [state, setState] = useState(false);
  const [dataSelect, setDataSelect] = useState({});
  const [accion, setAccion] = useState("");
  const [openRegistrarCategoria, setOpenRegistrarCategoria,] = useState(false);
  const {setBuscador}=useCategoriaStore();
  // Datos proporcionados
  const data = [
    { category_id: 1, category_name: "Inflables", description: "Categoria Inflables" },
    { category_id: 2, category_name: "Cristaleria", description: "Categoria Cristaleria" },
    { category_id: 3, category_name: "Manteleria", description: "Categoria Manteleria" },
    { category_id: 4, category_name: "Otros", description: "Categoria de opciones diversas" },
    { category_id: 5, category_name: "Mobiliario Clasico", description: "Categoria Mobiliario Clasico (Mesas-Sillas)" },
    { category_id: 6, category_name: "Mobiliario Deluxe", description: "Categoria Mobiliario Deluxe (Mesas - Sillas)" },
  ];

  const nuevoRegistro = () => {
    setOpenRegistrarCategoria(!openRegistrarCategoria);
    setAccion("Nuevo");
    setDataSelect({});
  };

  return (
    <Containeir>
      <header className="header">
        <Header stateConfig={{ state: state, setState: () => setState(!state) }} />
      </header>
      <section className="area1">
      <ContentFiltro> 
                <Title>
                    Categoria 
                </Title>
                <BtnFiltro funcion={nuevoRegistro} bgcolor="#f6f3f3"
                textcolor="#353535"
                icono={<v.agregar/>}/>
            </ContentFiltro>
            <Buscador setBuscador={setBuscador}/>
      </section>
      <section className="main">
        <TablaCategoria
          data={data}
          setOpenRegistrarCategoria={setOpenRegistrarCategoria}
          setdataSelect={setDataSelect}
          setAccion={setAccion}
        />
      </section>
    </Containeir>
  );
}

const Containeir = styled.div` 
    height:100vh;
    width:100%;
    background-color:${({ theme }) => theme.bgtotal};
    color:${({ theme }) => theme.text};
    display:grid;
    padding:15px;
    grid-template: 
    "header" 100px
    "area1" 100px
    "main" auto;

    .header{
        grid-area:header;
        /*background-color:rgba(103,93,241,0.14);*/
        display:flex;
        align-items:center;
    }

    .area1{
        grid-area:area1;
        /*background-color:rgba(229,67,26,0.14);*/
        display:flex;
        align-items:center;
    }


    .main{
        grid-area:main;
        /*background-color:rgba(26,67,229,0.14);*/
        display:flex;
        
    }
`;
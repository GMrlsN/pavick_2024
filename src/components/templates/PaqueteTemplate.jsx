import styled from "styled-components";
import { Header } from "../../index";
import { useState } from "react";

export function PaqueteTemplate() {
    const [state, setState] = useState(false);
    return (
      <Containeir>
        <header className="header">
            <Header
                stateConfig={{ state: state, setState: () => setState(!state) }}
            />
        </header>
        <section className="area1"></section>
        <section className="area2"></section>
        <section className="main"></section>
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
    "area2" 100px
    "main" auto;

    .header{
        grid-area:header;
        background-color:rgba(103,93,241,0.14);
        display:flex;
        align-items:center;
    }

    .area1{
        grid-area:area1;
        background-color:rgba(229,67,26,0.14);
        display:flex;
        align-items:center;
    }

    .area2{
        grid-area:area2;
        background-color:rgba(26,229,67,0.14);
        display:flex;
        align-items:center;
    }

    .main{
        grid-area:main;
        background-color:rgba(26,67,229,0.14);
        display:flex;
        align-items:center;
    }
`;
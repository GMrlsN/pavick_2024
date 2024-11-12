import styled from "styled-components";
import {Btnsave, useAuthStore} from "../../index"
export function HomeTemplate() {
    const {signOut} = useAuthStore();
    return (<Containeir>
        <h1>Home PAVICK</h1>
        <Btnsave titulo="Cerrar sesión" bgcolor="#fff" funcion={signOut}  />
    </Containeir>);
}
const Containeir = styled.div` 
    display:flex;
    justify-content:center;
    align-items:center;
    height:100vh;
    overflow:hidden;
    background-color:${({ theme }) => theme.bgtotal};
    color:${({ theme }) => theme.text};
    width:100%;
`
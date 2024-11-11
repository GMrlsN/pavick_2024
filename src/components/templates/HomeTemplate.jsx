import styled from "styled-components";
export function HomeTemplate() {
    return (<Containeir>
        <h1>Home PAVICK</h1>
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
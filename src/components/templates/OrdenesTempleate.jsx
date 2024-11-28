import styled from "styled-components";
import { useState } from "react";
import { Header } from "../../index";

// Datos simulados
const ordenes = [
  {
    "Nombre de cliente": "Juan Pérez",
    Domicilio: "Calle Flores 13",
    Ciudad: "Queretaro",
    Celular: "555-1234-5678",
    Productos: [
      { Producto: "Carpa 3x6", Cantidad: 1, Total: 700 },
      { Producto: "Sillas Phoenix", Cantidad: 10, Total: 500 },
      { Producto: "Mesas redondas", Cantidad: 5, Total: 500 },
      { Producto: "Sala Lounge", Cantidad: 1, Total: 250 },
    ],
    "Renta total": 1950,
    Anticipo: 950,
    Restante: 1000,
    "Fecha y hora de Entrega": "2023-12-01T10:00:00",
  },
  {
    "Nombre de cliente": "María Gómez",
    Domicilio: "Avenida Siempre Viva 742",
    Ciudad: "Queretaro",
    Celular: "811-9876-5432",
    Productos: [
      { Producto: "Sillas Cross Back", Cantidad: 15, Total: 900 },
      { Producto: "Copas Globo-Transparente", Cantidad: 11, Total: 165 },
      { Producto: "Carpa 4x4", Cantidad: 1, Total: 400},
    ],
    "Renta total": 1465,
    Anticipo: 400,
    Restante: 765,
    "Fecha y hora de Entrega": "2023-12-10T09:00:00",
  },
  {
    "Nombre de cliente": "Maria Jose Gonzalez",
    Domicilio: "Monte atlas 459",
    Ciudad: "Queretaro",
    Celular: "4425908164",
    Productos: [
      { Producto: "Carpa 3x6", Cantidad: 2, Total: 1400 },
      { Producto: "Silla Antonela", Cantidad: 10, Total: 900 },
      { Producto: "Mesa Cuadrada", Cantidad: 5, Total: 100 },
    ],
    "Renta total": 2400,
    Anticipo: 600,
    Restante: 1800,
    "Fecha y hora de Entrega": "2023-12-10T09:00:00",
  },
  
];

// Componente principal
export function OrdenesTempleate() {
  const [state, setState] = useState(false);

  return (
    <Containeir>
      <header className="header">
      <h1>Órdenes</h1>
        <Header stateConfig={{ state: state, setState: () => setState(!state) }} />
      </header>
      <section className="main">
        
        {ordenes.map((orden, index) => (
          <OrdenCard key={index}>
            <h2>{orden["Nombre de cliente"]}</h2>
            <p>
              <strong>Domicilio:</strong> {orden.Domicilio}
            </p>
            <p>
              <strong>Ciudad:</strong> {orden.Ciudad}
            </p>
            <p>
              <strong>Celular:</strong> {orden.Celular}
            </p>
            <h3>Productos:</h3>
            <ul>
              {orden.Productos.map((producto, idx) => (
                <li key={idx}>
                  {producto.Cantidad} x {producto.Producto} - ${producto.Total}
                </li>
              ))}
            </ul>
            <p>
              <strong>Renta total:</strong> ${orden["Renta total"]}
            </p>
            <p>
              <strong>Anticipo:</strong> ${orden.Anticipo}
            </p>
            <p>
              <strong>Restante:</strong> ${orden.Restante}
            </p>
            <p>
              <strong>Fecha y hora de entrega:</strong>{" "}
              {new Date(orden["Fecha y hora de Entrega"]).toLocaleString()}
            </p>
          </OrdenCard>
        ))}
      </section>
    </Containeir>
  );
}

// Estilos con styled-components
const Containeir = styled.div`
  height: 100vh;
  width: 100%;
  background-color: ${({ theme }) => theme.bgtotal || "#f5f5f5"};
  color: ${({ theme }) => theme.text || "#333"};
  display: grid;
  grid-template:
    "header" 100px
    "main" auto;
  padding: 15px;

  .header {
    grid-area: header;
    display: flex;
    align-items: center;
  }

  .main {
    grid-area: main;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
    padding: 20px;
  }
`;

const OrdenCard = styled.div`
  background: #ffffff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  width: 100%;
  max-width: 400px;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.2);
  }

  h2 {
    margin: 0 0 10px;
    color: #333;
    font-size: 1.5em;
    border-bottom: 2px solid #f0f0f0;
    padding-bottom: 5px;
  }

  p {
    margin: 5px 0;
    font-size: 0.95em;
    color: #555;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 10px 0;
  }

  ul li {
    margin-bottom: 5px;
    font-size: 0.9em;
    color: #666;
  }

  .badge {
    display: inline-block;
    padding: 5px 10px;
    font-size: 0.8em;
    border-radius: 15px;
    background: #f0f0f0;
    color: #666;
    margin: 5px 0;
  }
`;
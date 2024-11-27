import {useEffect,useState, useMemo } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import {v} from "../../../styles/variables";
import {
  InputText,
  Btnsave,
  useProductosStore,
} from "../../../index";

export function RegistrarProductos({ onClose, dataSelect, accion }) {
  console.log(accion);
  const { insertarproductos, editarproductos } = useProductosStore(); // Call both functions from the store
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  // Memorizar valores por defecto para evitar renders innecesarios
  const memoizedData = useMemo(() => {
    return {
      name: dataSelect?.name || "",
      description: dataSelect?.description || "",
      price: dataSelect?.price || "",
      stock_quantity: dataSelect?.stock_quantity || "",
      category_id: dataSelect?.category_id || "",
      is_active: dataSelect?.is_active?.toString() || "true",
    };
  }, [dataSelect]);

  // Function to insert or edit a category
  async function insertar(data) {
    console.log(data);
    console.log(accion);
    console.log("ID: " +dataSelect.product_id);
    const payload = {
      name: data.nombre, // category_name instead of descripcion
      description: data.descripcion,
      price: data.precio,
      stock_quantity: data.stock_quantity,
      category_id: data.category_id,
      is_active: data.is_active === "true" ,
    };

    if (accion == "Nuevo") {
      // If adding a new category
       const newProducto = await insertarproductos(dataSelect.product_id,payload.name,payload.description,payload.price,payload.stock_quantity,payload.category_id,payload.is_active);
      if (newProducto) {
        console.log("Producto añadida:", newProducto);
      } 
    } else if (accion == "Editar") {
      // If editing an existing category
      const updatedProducto = await editarproductos(dataSelect.product_id,payload.name,payload.description,payload.price,payload.stock_quantity,payload.category_id,payload.is_active );
      if (updatedProducto) {
        console.log("Producto editado:", updatedProducto);
      }
    }

    onClose(); // Close the modal after the operation
  }

  return (
    <Container>
      <div className="sub-contenedor">
        <div className="headers">
          <section>
            <h1>
              {accion === "Editar"? "Editar Producto" : "Registrar Producto"}
            </h1>
          </section>
          <section>
            <span onClick={onClose}>x</span>
          </section>
        </div>

        <form className="formulario" onSubmit={handleSubmit(insertar)}>
        <section>
  {/* Nombre */}
  <article>
    <InputText icono={<v.iconomarca />}>
      <input
        className="form__field"
        defaultValue={memoizedData.name} // Valor por defecto para "name"
        type="text"
        placeholder=""
        {...register("nombre", { required: true })}
      />
      <label className="form__label">Praducto</label>
      {errors.nombre?.type === "required" && <p>Campo requerido</p>}
    </InputText>
  </article>

  {/* Descripción */}
  <article>
    <InputText icono={<v.iconomarca />}>
      <input
        className="form__field"
        defaultValue={memoizedData.description} // Valor por defecto para "description"
        type="text"
        placeholder=""
        {...register("descripcion", { required: true })}
      />
      <label className="form__label">Descripcion</label>
      {errors.descripcion?.type === "required" && <p>Campo requerido</p>}
    </InputText>
  </article>

  {/* Precio */}
  <article>
    <InputText icono={<v.iconomarca />}>
      <input
        className="form__field"
        defaultValue={memoizedData.price} // Valor por defecto para "price"
        type="number"
        step="0.01" // Permite valores decimales
        placeholder=""
        {...register("precio", { required: true, min: 0 })}
      />
      <label className="form__label">Precio</label>
      {errors.precio?.type === "required" && <p>Campo requerido</p>}
      {errors.precio?.type === "min" && <p>El precio debe ser mayor o igual a 0</p>}
    </InputText>
  </article>

  {/* Cantidad en Stock */}
  <article>
    <InputText icono={<v.iconomarca />}>
      <input
        className="form__field"
        defaultValue={memoizedData.stock_quantity} // Valor por defecto para "stock_quantity"
        type="number"
        placeholder=""
        {...register("stock_quantity", { required: true, min: 0 })}
      />
      <label className="form__label">Cantidad en Stock</label>
      {errors.stock_quantity?.type === "required" && <p>Campo requerido</p>}
      {errors.stock_quantity?.type === "min" && <p>El stock debe ser mayor o igual a 0</p>}
    </InputText>
  </article>

  {/* Categoría */}
  <article>
    <InputText icono={<v.iconomarca />}>
      <select
        className="form__field"
        defaultValue={memoizedData.category_id} // Valor por defecto para "category_id"
        {...register("category_id", { required: true })}
      >
        <option value="" disabled>
          Seleccione una categoría
        </option>
        {/* Opciones dinámicas ajustadas a tu sistema */}
        <option value="1">Categoría 1</option>
        <option value="2">Categoría 2</option>
        <option value="3">Categoría 3</option>
      </select>
      <label className="form__label">Categoría</label>
      {errors.category_id?.type === "required" && <p>Campo requerido</p>}
    </InputText>
  </article>

  {/* Estado Activo */}
  <article>
    <InputText icono={<v.iconomarca />}>
      <select
        className="form__field"
        defaultValue={memoizedData.is_active ? "true" : "false"} // Valor por defecto para "is_active"
        {...register("is_active", { required: true })}
      >
        <option value="true">Activo</option>
        <option value="false">Inactivo</option>
      </select>
      <label className="form__label">Estado</label>
      {errors.is_active?.type === "required" && <p>Campo requerido</p>}
    </InputText>
  </article>

  {/* Botón Guardar */}
  <div className="btnguardarContent">
    <Btnsave icono={<v.iconoguardar />} titulo="Guardar" bgcolor="#ef552b" />
  </div>
</section>

          
        </form>
      </div>
    </Container>
  );
}

const Container = styled.div`
  transition: 0.5s;
  top: 0;
  left: 0;
  position: fixed;
  background-color: rgba(10, 9, 9, 0.5);
  display: flex;
  width: 100%;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  z-index: 1000;

  .sub-contenedor {
    width: 500px;
    max-width: 85%;
    border-radius: 20px;
    background: ${({ theme }) => theme.bgtotal};
    box-shadow: -10px 15px 30px rgba(10, 9, 9, 0.4);
    padding: 13px 36px 20px 36px;
    z-index: 100;

    .headers {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;

      h1 {
        font-size: 20px;
        font-weight: 500;
      }
      span {
        font-size: 20px;
        cursor: pointer;
      }
    }

    .formulario {
      section {
        gap: 20px;
        display: flex;
        flex-direction: column;
        .colorContainer {
          .colorPickerContent {
            padding-top: 15px;
            min-height: 50px;
          }
        }
      }
    }
  }
`;

// Estilización permanece igual

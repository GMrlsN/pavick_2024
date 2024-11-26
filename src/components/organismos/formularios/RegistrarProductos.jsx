import React, { useEffect } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { FaRegEdit, FaTags, FaRegMoneyBillAlt, FaWarehouse, FaCheckCircle } from "react-icons/fa";

export function RegistrarProductos({ accion, dataSelect, onSubmit, onClose }) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const handleRegister = (data) => {
    const newProduct = {
      _name: data._name,
      _description: data._description,
      _price: parseFloat(data._price),
      _stock_quantity: parseInt(data._stock_quantity, 10),
      _category_id: parseInt(data._category_id, 10),
      _is_active: data._is_active === "true",
      _created_at: new Date().toISOString(),
      _updated_at: new Date().toISOString(),
    };

    if (onSubmit) onSubmit(newProduct);
  };

  useEffect(() => {
    if (accion === "Editar" && dataSelect) {
      setValue("_name", dataSelect._name);
      setValue("_description", dataSelect._description);
      setValue("_price", dataSelect._price);
      setValue("_stock_quantity", dataSelect._stock_quantity);
      setValue("_category_id", dataSelect._category_id);
      setValue("_is_active", dataSelect._is_active !== undefined ? dataSelect._is_active.toString() : "true");
    }
  }, [accion, dataSelect, setValue]);

  return (
    <Container>
      <div className="sub-contenedor">
        <div className="headers">
          <h1>{accion === "Editar" ? "Editar Producto" : "Registrar Producto"}</h1>
          <CloseButton onClick={onClose}>x</CloseButton>
        </div>

        <form className="formulario" onSubmit={handleSubmit(handleRegister)}>
          <Section>
            <InputWrapper>
              <Label>
                <FaRegEdit /> Nombre
              </Label>
              <Input
                type="text"
                {...register("_name", { required: "Este campo es obligatorio" })}
              />
              {errors._name && <ErrorMessage>{errors._name.message}</ErrorMessage>}
            </InputWrapper>

            <InputWrapper>
              <Label>
                <FaTags /> Descripción
              </Label>
              <TextArea
                {...register("_description", { required: "Este campo es obligatorio" })}
              />
              {errors._description && <ErrorMessage>{errors._description.message}</ErrorMessage>}
            </InputWrapper>

            <InputWrapper>
              <Label>
                <FaRegMoneyBillAlt /> Precio
              </Label>
              <Input
                type="number"
                step="0.01"
                {...register("_price", {
                  required: "Este campo es obligatorio",
                  min: { value: 0, message: "El precio debe ser mayor o igual a 0" },
                })}
              />
              {errors._price && <ErrorMessage>{errors._price.message}</ErrorMessage>}
            </InputWrapper>

            <InputWrapper>
              <Label>
                <FaWarehouse /> Cantidad en stock
              </Label>
              <Input
                type="number"
                {...register("_stock_quantity", {
                  required: "Este campo es obligatorio",
                  min: { value: 0, message: "La cantidad debe ser mayor o igual a 0" },
                })}
              />
              {errors._stock_quantity && <ErrorMessage>{errors._stock_quantity.message}</ErrorMessage>}
            </InputWrapper>
          </Section>

          <Section>
            <InputWrapper>
              <Label>
                <FaTags /> ID de Categoría
              </Label>
              <Input
                type="number"
                {...register("_category_id", {
                  required: "Este campo es obligatorio",
                  min: { value: 1, message: "El ID debe ser mayor a 0" },
                })}
              />
              {errors._category_id && <ErrorMessage>{errors._category_id.message}</ErrorMessage>}
            </InputWrapper>

            <InputWrapper>
              <Label>
                <FaCheckCircle /> ¿Está activo?
              </Label>
              <Select
                defaultValue={dataSelect?._is_active?.toString() || "true"}
                {...register("_is_active", { required: "Seleccione un estado" })}
              >
                <option value="true">Activo</option>
                <option value="false">Inactivo</option>
              </Select>
              {errors._is_active && <ErrorMessage>{errors._is_active.message}</ErrorMessage>}
            </InputWrapper>
          </Section>

          <ButtonGuardar type="submit">Guardar Producto</ButtonGuardar>
        </form>
      </div>
    </Container>
  );
}

// Estilos del modal y componentes
const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(10, 9, 9, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;

  .sub-contenedor {
    width: 500px;
    max-width: 85%;
    background: #fff;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.25);
  }

  .headers {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    h1 {
      font-size: 20px;
      font-weight: bold;
    }
  }
`;

const CloseButton = styled.span`
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;

  &:focus {
    border-color: #ef552b;
    box-shadow: 0 0 5px rgba(239, 85, 43, 0.5);
  }
`;

const TextArea = styled.textarea`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  resize: none;

  &:focus {
    border-color: #ef552b;
    box-shadow: 0 0 5px rgba(239, 85, 43, 0.5);
  }
`;

const Select = styled.select`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;

  &:focus {
    border-color: #ef552b;
    box-shadow: 0 0 5px rgba(239, 85, 43, 0.5);
  }
`;

const ErrorMessage = styled.span`
  font-size: 12px;
  color: #e74c3c;
`;

const ButtonGuardar = styled.button`
  background-color: #ef552b;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    background-color: #d64a25;
  }
`;
import { useEffect } from "react";
import styled from "styled-components";
import { v } from "../../../styles/variables";
import { InputText, Btnsave, ConvertirCapitalize, usePersonalStore } from "../../../index";
import { useForm } from "react-hook-form";
export function RegistrarPersonal({ onClose, dataSelect, accion }) {
  const { insertarPersonal, editarPersonal } = usePersonalStore();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  // Función para manejar el envío del formulario
  async function insertar(data) {
    if (accion === "Editar") {
      const p = {
        id_personal: dataSelect.id, // Usamos el id de la persona a editar
        nombres: ConvertirCapitalize(data.nombres),
        telefono: ConvertirCapitalize(data.telefono),
        correo: ConvertirCapitalize(data.correo),
        tipouser: ConvertirCapitalize(data.tipouser),
        // Otros campos que no se muestran pero podrían ser necesarios:
        // nro_doc: data.nro_doc,
        // direccion: data.direccion,
        // estado: data.estado,
        // tipodoc: data.tipodoc,
        // fecharegistro: data.fecharegistro
      };
      await editarPersonal(p);
      onClose();
    } else {
      const p = {
        nombres: ConvertirCapitalize(data.nombres),
        telefono: ConvertirCapitalize(data.telefono),
        correo: ConvertirCapitalize(data.correo),
        tipouser: ConvertirCapitalize(data.tipouser),
        // Otros campos que no se muestran:
        // nro_doc: data.nro_doc,
        // direccion: data.direccion,
        // estado: data.estado,
        // tipodoc: data.tipodoc,
        // fecharegistro: new Date() // Si quieres asignar la fecha de registro
      };
      await insertarPersonal(p);
      onClose();
    }
  }
  // Si la acción es "Editar", cargamos los datos existentes en los campos del formulario
  useEffect(() => {
    if (accion === "Editar" && dataSelect) {
      // Prellenar los campos si estamos editando
    }
  }, [accion, dataSelect]);
  return (
    <Container>
      <div className="sub-contenedor">
        <div className="headers">
          <section>
            <h1>{accion === "Editar" ? "Editar personal" : "Registrar nuevo personal"}</h1>
          </section>
          <section>
            <span onClick={onClose}>x</span>
          </section>
        </div>
        <form className="formulario" onSubmit={handleSubmit(insertar)}>
          <section>
            {/* Campo de nombre */}
            <article>
              <InputText icono={<v.iconomarca />}>
                <input
                  className="form__field"
                  defaultValue={dataSelect?.nombres || ""}
                  type="text"
                  placeholder="Nombre completo"
                  {...register("nombres", {
                    required: true,
                  })}
                />
                <label className="form__label">Nombre</label>
                {errors.nombres?.type === "required" && <p>Campo requerido</p>}
              </InputText>
            </article>
            {/* Campo de teléfono */}
            <article>
              <InputText icono={<v.iconomarca />}>
                <input
                  className="form__field"
                  defaultValue={dataSelect?.telefono || ""}
                  type="text"
                  placeholder="Teléfono"
                  {...register("telefono", {
                    required: true,
                  })}
                />
                <label className="form__label">Teléfono</label>
                {errors.telefono?.type === "required" && <p>Campo requerido</p>}
              </InputText>
            </article>
            {/* Campo de correo */}
            <article>
              <InputText icono={<v.iconomarca />}>
                <input
                  className="form__field"
                  defaultValue={dataSelect?.correo || ""}
                  type="email"
                  placeholder="Correo electrónico"
                  {...register("correo", {
                    required: true,
                  })}
                />
                <label className="form__label">Correo</label>
                {errors.correo?.type === "required" && <p>Campo requerido</p>}
              </InputText>
            </article>
            {/* Campo de tipo de usuario */}
            <article>
              <InputText icono={<v.iconomarca />}>
                <input
                  className="form__field"
                  defaultValue={dataSelect?.tipouser || ""}
                  type="text"
                  placeholder="Tipo de usuario"
                  {...register("tipouser", {
                    required: true,
                  })}
                />
                <label className="form__label">Tipo de Usuario</label>
                {errors.tipouser?.type === "required" && <p>Campo requerido</p>}
              </InputText>
            </article>
            <div className="btnguardarContent">
              <Btnsave
                icono={<v.iconoguardar />}
                titulo="Guardar"
                bgcolor="#ef552b"
              />
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
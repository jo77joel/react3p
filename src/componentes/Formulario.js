import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa"; // Iconos

const Formulario = () => {
  // Estado para el mensaje de validación de la edad
  const [isAdult, setIsAdult] = useState(false);

  // useForm hook de react-hook-form
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();

  // Función para manejar el submit del formulario
  const onSubmit = (data) => {
    console.log(data);
  };

  // Función que valida si la persona es mayor de edad
  const validateAge = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    const age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }

    setIsAdult(age >= 18); // Si tiene 18 o más años, es mayor de edad
  };

  // useEffect para recalcular la edad al cambiar la fecha
  useEffect(() => {
    setValue("birthdate", ""); // Limpiar el valor para que use el estado inicial vacío
  }, [setValue]);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Formulario de Registro</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="needs-validation" noValidate>
        
        {/* Nombre */}
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Nombre</label>
          <input
            id="name"
            {...register("name", { required: "El nombre es obligatorio" })}
            type="text"
            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
          />
          {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
        </div>

        {/* Fecha de nacimiento */}
        <div className="mb-3">
          <label htmlFor="birthdate" className="form-label">Fecha de Nacimiento</label>
          <input
            id="birthdate"
            {...register("birthdate", {
              required: "La fecha de nacimiento es obligatoria",
              onChange: (e) => validateAge(e.target.value),
            })}
            type="date"
            className={`form-control ${errors.birthdate ? 'is-invalid' : ''}`}
          />
          {errors.birthdate && <div className="invalid-feedback">{errors.birthdate.message}</div>}
          {!isAdult && (
            <div className="text-danger mt-2">Debes ser mayor de edad para registrarte.</div>
          )}
        </div>

        {/* Nota */}
        <div className="mb-3">
          <label htmlFor="grade" className="form-label">Nota</label>
          <input
            id="grade"
            {...register("grade", {
              required: "La nota es obligatoria",
              min: { value: 1, message: "La nota debe ser mayor a 0" },
              max: { value: 100, message: "La nota debe ser menor a 100" },
            })}
            type="number"
            className={`form-control ${errors.grade ? 'is-invalid' : ''}`}
          />
          {errors.grade && <div className="invalid-feedback">{errors.grade.message}</div>}
        </div>

        {/* Botón de Enviar */}
        <div className="d-grid gap-2">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!isAdult}
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Formulario;

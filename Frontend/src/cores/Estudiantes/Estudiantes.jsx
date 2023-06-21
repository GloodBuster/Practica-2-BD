import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { GrAdd } from "react-icons/gr";
import { IoArrowBackOutline } from "react-icons/io5";
import "./styles/estudiantes.css";
import EstudiantesTemplate from "./EstudiantesTemplate";

function Estudiantes() {
  const [estudiantes, setEstudiantes] = useState();

  useEffect(() => {
    const fetchEstudiantes = async () => {
      try {
        const response = await axios.get("http://localhost:3000/estudiantes");
        setEstudiantes(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchEstudiantes();
  }, [estudiantes]);
  return (
    <div className="estudiantes-container">
      <header className="estudiantes-header">
        <Link to="/">
          <IoArrowBackOutline size="3rem" />
        </Link>
      </header>
      <table className="estudiantes-table">
        <thead>
          <tr className="estudiantes-table-header">
            <th className="first-element">ID</th>
            <th>Cedula</th>
            <th>Nombre</th>
            <th>Escuela</th>
            <th>Direccion</th>
            <th>Telefono</th>
            <th>Fecha Nacimiento</th>
            <th>Estatus</th>
            <th></th>
            <th className="last-element"></th>
          </tr>
        </thead>
        {estudiantes && (
          <tbody>
            {estudiantes.map((estudiante) => (
              <EstudiantesTemplate
                estudiante={estudiante}
                key={estudiante.idestudiante}
              />
            ))}
          </tbody>
            )}
      </table>
      <Link to="/estudiantes/create" className="create-button">
        <GrAdd size="2rem" />
      </Link>
    </div>
  );
}

export default Estudiantes;

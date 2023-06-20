import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { GrAdd } from "react-icons/gr";
import { IoArrowBackOutline } from "react-icons/io5";
import "./styles/estudiantes.css";

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
  }, []);
  return (
    <div className="estudiantes-container">
      <header className="estudiantes-header">
        <Link to="/">
          <IoArrowBackOutline size="3rem" />
        </Link>
      </header>
      <main>
        
      </main>
      {/*estudiantes && estudiantes.length > 0 ? (
        <h3>
          {estudiantes.map((estudiante) => (
            <p key={estudiante.cedula}>
              El nombre del estudiante con la cedula {estudiante.cedula} es{" "}
              {estudiante.nombreest}
            </p>
          ))}
        </h3>
      ) : (
        <h1>No hay estudiantes disponibles</h1>
      )*/}
      <Link to="/estudiantes/create" className="create-button">
        <GrAdd size="2rem" />
      </Link>
    </div>
  );
}

export default Estudiantes;

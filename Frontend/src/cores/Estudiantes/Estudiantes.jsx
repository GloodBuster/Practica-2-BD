import { useState, useEffect } from "react";
import axios from "axios";

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
    <div>
      {estudiantes && estudiantes.length > 0 ? (
        <h3>
          {estudiantes.map((estudiante) => (
            <p>
              El nombre del estudiante con la cedula {estudiante.cedula} es{" "}
              {estudiante.nombreest}
            </p>
          ))}
        </h3>
      ) : (
        <h1>No hay estudiantes disponibles</h1>
      )}
    </div>
  );
}

export default Estudiantes;

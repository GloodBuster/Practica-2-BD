import { useEffect, useState } from "react";
import axios from "axios";

function Escuelas() {
  const [escuelas, setEscuelas] = useState();

  useEffect(() => {
    const fetchEscuelas = async () => {
      try {
        const response = await axios.get("http://localhost:3000/escuelas");
        setEscuelas(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchEscuelas();
  }, []);
  return (
    <div>
      {escuelas && escuelas.length > 0 ? (
        <h3>
          {escuelas.map((escuela) => (
            <p key={escuela.codescuela}>
              La escuela con el codigo {escuela.codescuela} es{" "}
              {escuela.nombreesc}
            </p>
          ))}
        </h3>
      ) : (
        <h1>No hay escuelas disponibles</h1>
      )}
    </div>
  );
}

export default Escuelas;

import { useEffect, useState } from "react";
import axios from "axios";
import { GrAdd } from "react-icons/gr";
import { Link } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";
import "./styles/escuelas.css"

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
    <div className="escuelas-container">
      <header className="escuelas-header">
        <Link to="/">
          <IoArrowBackOutline size="3rem" />
        </Link>
      </header>
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
      <Link to="/escuelas/create" className="create-button">
        <GrAdd size="2rem" />
      </Link>
    </div>
  );
}

export default Escuelas;

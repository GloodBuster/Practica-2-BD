import { useEffect, useState } from "react";
import axios from "axios";
import { GrAdd } from "react-icons/gr";
import { Link } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";
import "./styles/escuelas.css";
import EscuelasTemplate from "./EscuelasTemplate";

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
  }, [escuelas]);
  return (
    <div className="escuelas-container">
      <header className="escuelas-header">
        <Link to="/">
          <IoArrowBackOutline size="3rem" />
        </Link>
      </header>
      <table className="escuelas-table">
        <thead>
          <tr className="escuelas-table-header">
            <th className="first-element">Codigo</th>
            <th>Nombre</th>
            <th>Fecha de creación</th>
            <th></th>
            <th className="last-element"></th>
          </tr>
        </thead>
        {escuelas && (
          <tbody>
            {escuelas.map((escuela) => (
              <EscuelasTemplate escuela={escuela} key={escuela.codescuela} />
            ))}
          </tbody>
        )}
      </table>
      <Link to="/escuelas/create" className="create-button">
        <GrAdd size="2rem" />
      </Link>
    </div>
  );
}

export default Escuelas;

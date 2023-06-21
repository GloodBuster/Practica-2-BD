import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";

function EscuelasEditForm() {
  const navigate = useNavigate();
  const id = useParams().id;
  const [escuela, setEscuela] = useState({
    codescuela: "",
    nombreesc: "",
    fechacreacion: "",
  });
  useEffect(() => {
    const fetchEscuela = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/escuelas/${id}`
        );
        setEscuela(response.data[0]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchEscuela();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:3000/escuelas/${id}`,
        escuela
      );
      console.log(response);
      navigate("/escuelas");
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event) => {
    setEscuela({ ...escuela, [event.target.name]: event.target.value });
  };

  return (
    <div className="EscuelasFormContainer">
      <header className="EscuelasFormHeader">
        <Link to="/escuelas">
          <IoArrowBackOutline size="3rem" />
        </Link>
      </header>
      <form className="EscuelasForm" onSubmit={handleSubmit}>
        <h1>Escuela</h1>
        <label>
          <h2>Codigo de escuela</h2>
          <input
            type="text"
            name="codescuela"
            required
            placeholder="COD"
            value={escuela.codescuela}
            onChange={handleChange}
          />
        </label>
        <label>
          <h2>Nombre de escuela</h2>
          <input
            type="text"
            name="nombreesc"
            required
            placeholder="Nombre"
            value={escuela.nombreesc}
            onChange={handleChange}
          />
        </label>
        <label>
          <h2>Fecha de creacion de la escuela</h2>
          <input
            type="text"
            name="fechacreacion"
            required
            placeholder="YYYY-MM-DD"
            value={escuela.fechacreacion.substring(0, 10)}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Editar Escuela</button>
      </form>
    </div>
  );
}

export default EscuelasEditForm;

import React from "react";
import "./styles/escuelastemplate.css";
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";
import axios from "axios";
import { Link } from "react-router-dom";

function EscuelasTemplate({ escuela }) {
  const handleDelete = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.delete(
        `http://localhost:3000/escuelas/${escuela.codescuela}`
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <tr className="escuelas-template">
      <td>{escuela.codescuela}</td>
      <td>{escuela.nombreesc}</td>
      <td>{escuela.fechacreacion.substring(0, 10)}</td>
      <td>
        <Link to={`/escuelas/edit/${escuela.codescuela}`}>
          <BsFillPencilFill className="press" size="1.2rem" color="black" />
        </Link>
      </td>
      <td>
        <BsFillTrashFill
          className="press"
          size="1.2rem"
          onClick={handleDelete}
        />
      </td>
    </tr>
  );
}

export default EscuelasTemplate;

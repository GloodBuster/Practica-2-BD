import axios from "axios";
import React from "react";
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";
import { Link } from "react-router-dom";

function EstudiantesTemplate({ estudiante }) {
  const handleDelete = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.delete(
        `http://localhost:3000/estudiantes/${estudiante.idestudiante}`
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <tr>
      <td>{estudiante.idestudiante}</td>
      <td>{estudiante.cedula}</td>
      <td>{estudiante.nombreest}</td>
      <td>{estudiante.codescuela}</td>
      <td>{estudiante.direccionest}</td>
      <td>{estudiante.telefonoest}</td>
      <td>{estudiante.fechanac.substring(0, 10)}</td>
      <td>{estudiante.statusest}</td>
      <td>
        <Link to={`/estudiantes/edit/${estudiante.idestudiante}`}>
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

export default EstudiantesTemplate;

import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";
import "./styles/estudiantesForm.css";
import axios from "axios";

function EstudiantesEditForm() {
  const navigate = useNavigate();
  const id = useParams().id;
  const [estudiante, setEstudiante] = useState({
    cedula: "",
    nombreest: "",
    direccionest: "",
    telefonoest: "",
    fechanac: "",
    statusest: "",
    codescuela: "",
  });
  useEffect(() => {
    const fetchEstudiante = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/estudiantes/${id}`
        );
        setEstudiante(response.data[0]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchEstudiante();
  }, []);
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:3000/estudiantes/${id}`,
        estudiante
      );
      console.log(response);
      navigate("/estudiantes");
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (event) => {
    setEstudiante({ ...estudiante, [event.target.name]: event.target.value });
  };
  return (
    <div className="EstudiantesFormContainer">
      <header className="EstudiantesHeader">
        <Link to="/estudiantes">
          <IoArrowBackOutline size="3rem" />
        </Link>
      </header>
      <form className="EstudiantesForm" onSubmit={handleSubmit}>
        <h1>Estudiantes</h1>
        <label>
          <h2>Cedula</h2>
          <input
            type="text"
            name="cedula"
            required
            placeholder="11111111"
            value={estudiante.cedula}
            onChange={handleChange}
          />
        </label>
        <label>
          <h2>Nombre</h2>

          <input
            type="text"
            name="nombreest"
            required
            placeholder="Nombre"
            value={estudiante.nombreest}
            onChange={handleChange}
          />
        </label>
        <label>
          <h2>Codigo de escuela</h2>

          <input
            type="text"
            name="codescuela"
            required
            placeholder="COD"
            value={estudiante.codescuela}
            onChange={handleChange}
          />
        </label>
        <label>
          <h2>Direccion</h2>

          <input
            type="text"
            name="direccionest"
            required
            placeholder="Direccion"
            value={estudiante.direccionest}
            onChange={handleChange}
          />
        </label>
        <label>
          <h2>Telefono</h2>

          <input
            type="text"
            name="telefonoest"
            placeholder="04XXXXXXXXX"
            value={estudiante.telefonoest}
            onChange={handleChange}
          />
        </label>
        <label>
          <h2>Fecha de nacimiento</h2>

          <input
            type="text"
            name="fechanac"
            required
            placeholder="YYYY-MM-DD"
            value={estudiante.fechanac.substring(0, 10)}
            onChange={handleChange}
          />
        </label>
        <label>
          <h2>Estatus</h2>

          <input
            type="text"
            name="statusest"
            required
            placeholder="XXXXXXX"
            value={estudiante.statusest}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Editar Estudiante</button>
      </form>
    </div>
  );
}

export default EstudiantesEditForm;

import { Link } from "react-router-dom";
import "./styles/dashboard.css";

function Dashboard() {
  return (
    <div className="Dashboard">
      <h1>CRUDS PRACTICA 2</h1>
      <div className="DashLinkContainer">
        <Link to="/estudiantes" className="DashLink">
          Estudiantes
        </Link>
        <Link to="escuelas" className="DashLink">
          Escuelas
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;

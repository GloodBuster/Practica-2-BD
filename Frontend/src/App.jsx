import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Dashboard from "./cores/Dashboard/Dashboard";
import Estudiantes from "./cores/Estudiantes/Estudiantes";
import Escuelas from "./cores/Escuelas/Escuelas";
import EscuelasForm from "./cores/Escuelas/EscuelasForm";
import EstudiantesForm from "./cores/Estudiantes/EstudiantesForm";
import EscuelasEditForm from "./cores/Escuelas/EscuelasEditForm";
import EstudiantesEditForm from "./cores/Estudiantes/EstudiantesEditForm";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/estudiantes" element={<Estudiantes />} /> 
          <Route path="/estudiantes/create" element={<EstudiantesForm />} /> 
          <Route path="/estudiantes/edit/:id" element={<EstudiantesEditForm />} /> 
          <Route path="/escuelas" element={<Escuelas />} />
          <Route path="/escuelas/create" element={<EscuelasForm />} />
          <Route path="/escuelas/edit/:id" element={<EscuelasEditForm />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

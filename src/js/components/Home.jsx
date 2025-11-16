import { useState } from "react";
import "../../styles/index.css";


const Home = () => {
  const [tareas, setTareas] = useState([
    "Hacer la compra",
    "Llevar a Sofia al Dentista",
    "Clases de Gimnasia Ritmica",
    "Hacer un Biscocho",
    "Hacer Maqueta con Sofia",
  ]);

  const [nuevaTarea, setNuevaTarea] = useState("");

  const agregarTarea = () => {
    if (nuevaTarea.trim() !== "") {
      setTareas([...tareas, nuevaTarea]);
      setNuevaTarea("");
    }
  };

  const eliminarTarea = (index) => {
    setTareas(tareas.filter((_, i) => i !== index));
  };

  return (
    <div className="container">
      <h1>Mi Lista de Tareas Diarias</h1>
      <ul>
        <li>
          <input
            type="text"
            placeholder="¿Qué tengo que hacer?"
            value={nuevaTarea}
            onChange={(e) => setNuevaTarea(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && agregarTarea()}
          />
        </li>

        {tareas.map((tarea, index) => (
          <li key={index}>
            {tarea}
            <button onClick={() => eliminarTarea(index)}>✏️</button>
          </li>
        ))}
      </ul>

      {tareas.length === 0 ? (
        <div>No hay tareas, añade una tarea</div>
      ) : (
        <div>{tareas.length} Tareas</div>
      )}
    </div>
  );
};

export default Home;

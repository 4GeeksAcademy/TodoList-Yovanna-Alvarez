import { useState, useEffect } from "react";
import "./index.css";  

const USERNAME = "yovanna";
const BASE_URL = "https://playground.4geeks.com/todo";

const Home = () => {
  const [tareas, setTareas] = useState([]);
  const [nuevaTarea, setNuevaTarea] = useState("");

  useEffect(() => {
    crearUsuario().then(() => obtenerTareas());
  }, []);

  const crearUsuario = async () => {
    try {
      const resp = await fetch(`${BASE_URL}/users/${USERNAME}`);
      
      if (resp.status === 404) {
        await fetch(`${BASE_URL}/users/${USERNAME}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });
        console.log("Usuario creado exitosamente");
      } else {
        console.log("El usuario ya existe");
      }
    } catch (error) {
      console.error("Error al verificar/crear usuario:", error);
    }
  };

  const obtenerTareas = async () => {
    try {
      const resp = await fetch(`${BASE_URL}/users/${USERNAME}`);
      const data = await resp.json();
      console.log("Datos recibidos:", data);
      console.log("Tareas:", data.todos);
      setTareas(data.todos || []);
    } catch (error) {
      console.error("Error al obtener tareas:", error);
    }
  };

  const agregarTarea = async () => {
    if (nuevaTarea.trim() === "") return;

    const nueva = { label: nuevaTarea, is_done: false };
    try {
      await fetch(`${BASE_URL}/todos/${USERNAME}`, {
        method: "POST",
        body: JSON.stringify(nueva),
        headers: { "Content-Type": "application/json" },
      });
      setNuevaTarea("");
      obtenerTareas();
    } catch (error) {
      console.error("Error al agregar tarea:", error);
    }
  };

  const actualizarTarea = async (id, tarea) => {
    try {
      await fetch(`${BASE_URL}/todos/${id}`, {
        method: "PUT",
        body: JSON.stringify({ label: tarea.label, is_done: !tarea.is_done }),
        headers: { "Content-Type": "application/json" },
      });
      obtenerTareas();
    } catch (error) {
      console.error("Error al actualizar tarea:", error);
    }
  };

  const eliminarTarea = async (id) => {
    try {
      await fetch(`${BASE_URL}/todos/${id}`, {
        method: "DELETE",
      });
      obtenerTareas();
    } catch (error) {
      console.error("Error al eliminar tarea:", error);
    }
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
          <button onClick={agregarTarea}>Agregar</button>
        </li>

        {tareas.map((tarea) => (
          <li key={tarea.id}>
            <span
              style={{
                textDecoration: tarea.is_done ? "line-through" : "none",
              }}
              onClick={() => actualizarTarea(tarea.id, tarea)}
            >
              {tarea.label}
            </span>
            <button onClick={() => eliminarTarea(tarea.id)}>🗑️</button>
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
// Importaciones necesarias de React y componentes personalizados
import React, { useState, useEffect } from 'react';
import Form from './components/Form';    // Componente para agregar/editar evaluaciones
import List from './components/List';    // Componente para mostrar la lista de evaluaciones
import './App.css';                      // Estilos CSS de la aplicación

// Componente principal de la aplicación
function App() {
  // Estado: lista de evaluaciones
  const [evaluaciones, setEvaluaciones] = useState([]);

  // Estado: evaluación que se está editando actualmente
  const [evaluacionEditando, setEvaluacionEditando] = useState(null);

  // Cargar evaluaciones guardadas desde el localStorage al iniciar la app (solo una vez)
  useEffect(() => {
    const datosGuardados = JSON.parse(localStorage.getItem('evaluaciones')) || [];
    setEvaluaciones(datosGuardados);
  }, []);

  // Guardar evaluaciones en localStorage cada vez que cambie la lista
  useEffect(() => {
    localStorage.setItem('evaluaciones', JSON.stringify(evaluaciones));
  }, [evaluaciones]);

  // Función para agregar una nueva evaluación o actualizar una existente
  const agregarOActualizarEvaluacion = (nuevaEval) => {
    if (evaluacionEditando) {
      // Si hay una evaluación en edición, actualizarla
      setEvaluaciones(evaluaciones.map(e =>
        e.id === evaluacionEditando.id ? { ...e, ...nuevaEval } : e
      ));
      setEvaluacionEditando(null); // Salir del modo edición
    } else {
      // Si no hay edición activa, crear una nueva evaluación con ID único
      const nueva = { id: Date.now(), ...nuevaEval };
      setEvaluaciones([...evaluaciones, nueva]);
    }
  };

  // Función para eliminar una evaluación según su ID
  const eliminarEvaluacion = (id) => {
    setEvaluaciones(evaluaciones.filter(e => e.id !== id));
  };

  // Función para activar el modo edición de una evaluación seleccionada
  const editarEvaluacion = (evalSeleccionada) => {
    setEvaluacionEditando(evalSeleccionada);
  };

  // Renderizado del componente principal
  return (
    <div className="App">
      <h1>Evaluación de Alumnos</h1>

      {/* Formulario para agregar o editar una evaluación */}
      <Form
        agregarOActualizarEvaluacion={agregarOActualizarEvaluacion}
        evaluacionEditando={evaluacionEditando}
      />

      <h2>Evaluaciones Guardadas</h2>

      {/* Lista de evaluaciones con opciones de editar o eliminar */}
      <List
        evaluaciones={evaluaciones}
        eliminarEvaluacion={eliminarEvaluacion}
        editarEvaluacion={editarEvaluacion}
      />
    </div>
  );
}

export default App;

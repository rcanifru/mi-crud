import React, { useState, useEffect } from 'react';

function Form({ agregarOActualizarEvaluacion, evaluacionEditando }) {
  const [nombre, setNombre] = useState('');
  const [asignatura, setAsignatura] = useState('');
  const [promedio, setPromedio] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (evaluacionEditando) {
      setNombre(evaluacionEditando.nombre);
      setAsignatura(evaluacionEditando.asignatura);
      setPromedio(evaluacionEditando.promedio);
    } else {
      setNombre('');
      setAsignatura('');
      setPromedio('');
    }
  }, [evaluacionEditando]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nombre || !asignatura || promedio === '') {
      setError('Todos los campos son obligatorios.');
      return;
    }

    const promedioNum = parseFloat(promedio);
    if (isNaN(promedioNum) || promedioNum < 0 || promedioNum > 7) {
      setError('El promedio debe estar entre 0.0 y 7.0');
      return;
    }

    setError('');

    agregarOActualizarEvaluacion({ nombre, asignatura, promedio: promedioNum });
    setNombre('');
    setAsignatura('');
    setPromedio('');
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h2>Agregar Nueva Evaluación</h2>

      {error && <p className="error">{error}</p>}

      <label>Nombre del Alumno:</label>
      <input
        type="text"
        placeholder="Ej: Juan Pérez"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />

      <label>Asignatura:</label>
      <input
        type="text"
        placeholder="Ej: Matemáticas"
        value={asignatura}
        onChange={(e) => setAsignatura(e.target.value)}
      />

      <label>Promedio (0.0 - 7.0):</label>
      <input
        type="number"
        step="0.1"
        placeholder="Ej: 5.5"
        value={promedio}
        onChange={(e) => setPromedio(e.target.value)}
      />

      <button type="submit">
        {evaluacionEditando ? 'Actualizar Evaluación' : 'Agregar Evaluación'}
      </button>
    </form>
  );
}

export default Form;

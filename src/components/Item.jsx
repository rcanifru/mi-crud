import React from 'react';

function Item({ evaluacion, eliminarEvaluacion, editarEvaluacion }) {
  const { nombre, asignatura, promedio } = evaluacion;

  const obtenerEtiqueta = (promedio) => {
    if (promedio >= 6.0) return 'Destacado';
    if (promedio >= 4.0) return 'Aceptable';
    return 'Insuficiente';
  };

  return (
    <li className="item">
      <p><strong>Alumno:</strong> {nombre}</p>
      <p><strong>Asignatura:</strong> {asignatura}</p>
      <p><strong>Promedio:</strong> {promedio.toFixed(1)}</p>
      <span className={`etiqueta ${obtenerEtiqueta(promedio).toLowerCase()}`}>{obtenerEtiqueta(promedio)}</span>

      <div className="acciones">
        <button className="editar" onClick={() => editarEvaluacion(evaluacion)}>Editar</button>
        <button className="eliminar" onClick={() => eliminarEvaluacion(evaluacion.id)}>Eliminar</button>
      </div>
    </li>
  );
}

export default Item;

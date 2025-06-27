import React from 'react';
import Item from './Item';

function List({ evaluaciones, eliminarEvaluacion, editarEvaluacion }) {
  return (
    <ul className="lista">
      {evaluaciones.map(evaluacion => (
        <Item
          key={evaluacion.id}
          evaluacion={evaluacion}
          eliminarEvaluacion={eliminarEvaluacion}
          editarEvaluacion={editarEvaluacion}
        />
      ))}
    </ul>
  );
}

export default List;

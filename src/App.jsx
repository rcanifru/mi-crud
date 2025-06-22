// Importamos React y algunos hooks para manejar estado y efectos secundarios
import React, { useState, useEffect } from 'react'; 

// Importamos los componentes hijos del CRUD: Formulario y Lista
import Form from './components/Form';
import List from './components/List';

// Importamos los estilos CSS para esta app
import './App.css';

function App() {
  // Estado principal que almacena la lista de ítems (por ejemplo, tareas o elementos)
  const [items, setItems] = useState([]);

  // Estado para identificar si se está editando un ítem existente
  const [itemToEdit, setItemToEdit] = useState(null);

  // useEffect que se ejecuta solo una vez al cargar la app, para recuperar datos desde LocalStorage
  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('items')) || [];
    setItems(storedItems);
  }, []);

  // useEffect que se ejecuta cada vez que cambia la lista de ítems, y la guarda en LocalStorage
  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);

  // Función que agrega un nuevo ítem o actualiza uno existente (si hay uno seleccionado para editar)
  const addOrUpdateItem = (value) => {
    if (itemToEdit) {
      // Si estamos editando, actualizamos el valor del ítem con el mismo id
      setItems(items.map(item => item.id === itemToEdit.id ? { ...item, value } : item));
      setItemToEdit(null); // Terminamos la edición
    } else {
      // Si no estamos editando, agregamos un nuevo ítem con un id único
      setItems([...items, { id: Date.now(), value }]);
    }
  };

  // Función que elimina un ítem de la lista según su id
  const deleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  // Función que selecciona un ítem para editar, lo pasa al formulario
  const editItem = (item) => {
    setItemToEdit(item);
  };

  // Renderizado de la aplicación principal
  return (
    <div className="App">
      <h1>CRUD con LocalStorage</h1>
      {/* Form recibe la función para agregar o editar, y el ítem que se está editando */}
      <Form
        addOrUpdateItem={addOrUpdateItem}
        itemToEdit={itemToEdit}
      />
      {/* List recibe la lista de ítems y las funciones para editar y eliminar */}
      <List
        items={items}
        deleteItem={deleteItem}
        editItem={editItem}
      />
    </div>
  );
}

// Exportamos el componente principal App para que pueda ser usado por Vite/React
export default App;

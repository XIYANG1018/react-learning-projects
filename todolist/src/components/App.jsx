import React, { useState, useRef } from "react";

function App() {
  const [inputText, setInputText] = useState("");
  const [items, setItems] = useState([]);
  const inputRef = useRef(null);

  function handleChange(event) {
    const newValue = event.target.value;
    setInputText(newValue);
  }

  function addItem() {
    setItems((prevItems) => {
      return [...prevItems, inputText];
    });

    setInputText("");
    inputRef.current.focus();
  }

  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <div className="form">
        <input
          type="text"
          onChange={handleChange}
          value={inputText}
          ref={inputRef}
        />
        <button onClick={addItem}>
          <span>Add</span>
        </button>
      </div>
      <div>
        <ul>
          {items.map((todoItem) => (
            <li>{todoItem}</li>
          ))}{" "}
        </ul>
      </div>
    </div>
  );
}

export default App;

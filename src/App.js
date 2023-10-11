import "./styles.css";
import { useState } from "react";

export default function App() {
  const [input, setInput] = useState("");
  const [Items, setItems] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [originalItems, setOriginalItems] = useState([...Items]);

  function handleGetValue(e) {
    setInput(e.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (input.trim() === "") {
      return;
    } else {
      const setArray = [...Items, input];
      setItems(setArray);
      setInput("");
    }
  }

  function handleDelete(item_id) {
    const myfilter = Items.filter((_, f_id) => f_id !== item_id);
    setItems(myfilter);
  }

  function handleEdit(item_id) {
    setEditingIndex(item_id);
    setOriginalItems([...Items]); // Store the original items
  }

  function handleSave() {
    setEditingIndex(null);
  }
  function handleCancel(item_id) {
    const updatedItems = [...Items];
    updatedItems[item_id] = originalItems[item_id];
    setItems(updatedItems);
    setEditingIndex(null);
  }

  function handleInput2(e1, item_id) {
    let input2 = [...Items];
    input2[item_id] = e1.target.value;
    setItems(input2);
  }
  return (
    <>
      <div className="App">
        <h1>Hello ToDo List</h1>
        <form onSubmit={handleSubmit}>
          <input onChange={handleGetValue} value={input} />
          <button>SUBMIT</button>

          <ul>
            {Items.map((value, item_id) => {
              return (
                <div key={item_id}>
                  <li key={item_id}>
                    {item_id + 1}.{" "}
                    {editingIndex === item_id ? (
                      <div key={item_id}>
                        <input
                          type="text"
                          value={value}
                          onChange={(e1) => handleInput2(e1, item_id)}
                        />
                        <button onClick={handleSave}>Save</button>
                        <button onClick={() => handleCancel(item_id)}>
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div key={item_id}>
                        {value}
                        <button onClick={() => handleDelete(item_id)}>
                          Delete X
                        </button>
                        <button onClick={() => handleEdit(item_id)}>
                          Edit Y
                        </button>
                      </div>
                    )}
                  </li>
                </div>
              );
            })}
          </ul>
        </form>
      </div>
    </>
  );
}

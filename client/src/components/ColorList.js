import React, { useState } from "react";
import axiosWithAuth from "../axios";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors, history }) => {
  const [adding, setAdding] = useState(false);
  const [editing, setEditing] = useState(false);
  const [color, setColor] = useState(initialColor);

  const editColor = color => {
    setEditing(!editing);
    setColor(color);
  };

  const addColor = () => {
    setAdding(!adding);
  };

  const deleteColor = ({ id }) => {
    axiosWithAuth().delete(`http://localhost:5000/api/colors/${id}`)
      .then(res => {
        updateColors(colors.filter(color => color.id !== res.data))
      })
  };

  const saveEdit = e => {
    e.preventDefault();

    axiosWithAuth().put(`http://localhost:5000/api/colors/${color.id}`, color)
      .then(res => {
        const { id, color, code } = res.data;

        updateColors(colors.map(item => {
          if(item.id !== id) return item;
          return {...item, color, code }
        }))

        setEditing(false);
      })
  };

  const saveAddedColor = (e, color) => {
    e.preventDefault();

    axiosWithAuth().post('http://localhost:5000/api/colors', color)
      .then(res => {
        updateColors(res.data);
      })

    setAdding(false);
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color}>
            <span className="delete" onClick={() => deleteColor(color)}>
              x
            </span>{" "}
            <div className="color-flx-wrap" onClick={() => editColor(color)}>
              {color.color}

              <div
                className="color-box"
                style={{ backgroundColor: color.code.hex }}
              />
            </div>
          </li>
        ))}
      </ul>
      {editing && (
        <form className="small" onSubmit={saveEdit}>
          <label>
            color name:
            <input
              onChange={e =>
                setColor({ ...color, color: e.target.value })
              }
              value={color.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColor({
                  ...color,
                  code: { hex: e.target.value }
                })
              }
              value={color.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}

      <button className="add-color" type="button" onClick={addColor} >Add a color</button>
      
      {adding && (
        <form className="small" onSubmit={(e) => saveAddedColor(e, color)}>
          <label>
            color name:
            <input
              onChange={e => setColor({ ...color, color: e.target.value })}
              value={color.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e => setColor({ ...color, code: { hex: e.target.value }})}
              value={color.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setAdding(false)}>cancel</button>
          </div>
        </form>
      )}
      
      <div className="spacer" />
    </div>
  );
};

export default ColorList;

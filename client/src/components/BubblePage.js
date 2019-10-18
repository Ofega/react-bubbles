import React, { useState, useEffect } from "react";
import axiosWithAuth from "../axios";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  useEffect(() => {
    axiosWithAuth().get("http://localhost:5000/api/colors")
      .then((res) => {
        setColorList(res.data);
      })
      .catch((err) => [
        alert(err)
      ])
  }, [])

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;

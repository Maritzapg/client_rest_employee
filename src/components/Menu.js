import React, { useState } from "react";
import HomeContent from "./content/HomeContent";

const Menu = () => {
  const [activeItem, setActiveItem] = useState("employees");

  return (
    <div className='ui grid'>
      <div className='four wide column'>
        <div className='ui vertical fluid tabular menu'>
          <a
            href='#'
            className={`item ${activeItem === "employees" ? "active" : ""}`}
            onClick={() => setActiveItem("employees")}
          >
            Empleados
          </a>
          <a
            href='#'
            className={`item ${activeItem === "doc_types" ? "active" : ""}`}
            onClick={() => setActiveItem("doc_types")}
          >
            Tipo documentos
          </a>
          <a
            href='#'
            className={`item ${activeItem === "areas" ? "active" : ""}`}
            onClick={() => setActiveItem("areas")}
          >
            Áreas de trabajo
          </a>
        </div>
      </div>
      <div className='twelve wide stretched column'>
        <div className='ui segment'>
          <HomeContent activeItem={activeItem} />
        </div>
      </div>
    </div>
  );
};

export default Menu;

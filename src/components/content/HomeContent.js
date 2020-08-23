import React, { useState } from "react";
import ListEmployees from "./ListEmployees";
import ListAreas from "./ListAreas";
import ListDocuments from "./ListDocuments";
import Button from "./Button";
import FormEmployee from "../FormEmployee";

const HomeContent = ({ activeItem }) => {
  const [showFormEmployee, setShowFormEmployee] = useState(false);

  const openFormEmployee = () => {
    if (showFormEmployee) return <FormEmployee text='Crear empleado' close={() => setShowFormEmployee(false)} />;
  };

  const decideContent = activeItem => {
    switch (activeItem) {
      case "employees":
        return (
          <>
            <Button onClick={() => setShowFormEmployee(true)} text={"Agregar Empleado"} />
            <ListEmployees activeItem={activeItem} />
          </>
        );
      case "doc_types":
        return (
          <>
            <ListDocuments activeItem={activeItem} />
          </>
        );
      case "areas":
        return (
          <>
            <ListAreas activeItem={activeItem} />
          </>
        );
      default:
        break;
    }
  };

  return (
    <>
      {openFormEmployee()}
      {decideContent(activeItem)}
    </>
  );
};

export default HomeContent;

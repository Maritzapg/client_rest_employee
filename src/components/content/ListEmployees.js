import React, { useState, useEffect } from "react";
import restaurant from "../../apis/restaurant";
import FormEmployee from "../FormEmployee";

const ListEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [showFormEmployee, setShowFormEmployee] = useState(false);
  const [currenEmployee, setCurrenEmployee] = useState(0);

  async function fetchData() {
    const response = await restaurant.get("/employees");
    setEmployees(response.data.employees);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const deleteEmployee = async id => {
    await restaurant.delete(`/employees/${id}`);
    fetchData();
  };

  const openFormEmployee = () => {
    let employee = employees.find(x => x.id === currenEmployee);
    if (showFormEmployee)
      return <FormEmployee text='Editar empleado' initialValues={employee} close={() => setShowFormEmployee(false)} />;
  };

  const edit = id => {
    setCurrenEmployee(id);
    setShowFormEmployee(true);
  };

  const renderEmployees = employees => {
    return employees.map(({ id, first_name1, first_name2, last_name1, last_name2 }) => {
      return (
        <tr key={id}>
          <td>{first_name1}</td>
          <td>{first_name2}</td>
          <td>{last_name1}</td>
          <td>{last_name2}</td>
          <td>
            <i onClick={() => deleteEmployee(id)} className='trash alternate icon'></i>
            <i onClick={() => edit(id)} className='edit icon'></i>
          </td>
        </tr>
      );
    });
  };

  return (
    <>
      {openFormEmployee()}
      <table className='ui compact table'>
        <thead>
          <tr>
            <th>Primer nombre</th>
            <th>Segundo nombre</th>
            <th>Primer apellido</th>
            <th>Segundo apellido</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{renderEmployees(employees)}</tbody>
      </table>
    </>
  );
};

export default ListEmployees;

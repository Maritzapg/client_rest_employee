import React, { useState, useEffect } from "react";
import restaurant from "../../apis/restaurant";

const ListAreas = () => {
  const [areas, setAreas] = useState([]);

  async function fetchData() {
    const response = await restaurant.get("/areas");
    setAreas(response.data.areas);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const renderAreas = areas => {
    return areas.map(({ id, area }) => {
      return (
        <tr key={id}>
          <td>{area}</td>
        </tr>
      );
    });
  };

  return (
    <table className='ui compact table'>
      <thead>
        <tr>
          <th>Nombre</th>
        </tr>
      </thead>
      <tbody>{renderAreas(areas)}</tbody>
    </table>
  );
};

export default ListAreas;

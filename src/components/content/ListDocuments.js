import React, { useState, useEffect } from "react";
import restaurant from "../../apis/restaurant";

const ListDocuments = () => {
  const [documentTypes, setDocumentTypes] = useState([]);

  async function fetchData() {
    const response = await restaurant.get("/document_types");
    setDocumentTypes(response.data.document_types);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const renderDocumentTypes = types => {
    return types.map(({ id, type }) => {
      return (
        <tr key={id}>
          <td>{type}</td>
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
      <tbody>{renderDocumentTypes(documentTypes)}</tbody>
    </table>
  );
};

export default ListDocuments;

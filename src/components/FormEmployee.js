import React, { useState, useEffect } from "react";
import SemanticDatepicker from "react-semantic-ui-datepickers";
import "react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css";
import { Button, Modal, Form } from "semantic-ui-react";
import restaurant from "../apis/restaurant";

const FormEmployee = ({ close, initialValues, text }) => {
  let initialState =
    initialValues !== undefined
      ? initialValues
      : {
          first_name1: "",
          first_name2: "",
          last_name1: "",
          last_name2: "",
          document: "",
          birth_date: "",
          area_id: 0,
          document_type_id: 0,
        };

  const [open, setOpen] = useState(true);
  const [areas, setAreas] = useState([]);
  const [types, setTypes] = useState([]);
  const [type, setType] = useState("");
  const [area, setArea] = useState("");
  const [form, setForm] = useState(initialState);

  useEffect(() => {
    if (initialValues && types.length > 0 && areas.length > 0) {
      let type = types.find(x => x.id === initialValues.document_type_id);
      let area = areas.find(x => x.id === initialValues.area_id);

      setType(type.type);
      setArea(area.area);
    }
  }, [types, areas]);

  const onChangeDate = (event, data) =>
    setForm({
      ...form,
      ["birth_date"]: new Date(data.value).toISOString().slice(0, 19).replace("T", " "),
    });

  const changeOpen = state => {
    setOpen(state);
    if (!state) close();
  };

  async function fetchAreas() {
    const response = await restaurant.get("/areas");
    setAreas(response.data.areas);
  }

  async function fetchTypes() {
    const response = await restaurant.get("/document_types");
    setTypes(response.data.document_types);
  }

  useEffect(() => {
    fetchAreas();
    fetchTypes();
  }, []);

  const renderAreas = areas => {
    if (areas.length > 0) {
      return areas.map(({ id, area }) => {
        return {
          key: id,
          text: area,
          value: area,
        };
      });
    } else {
      return [];
    }
  };

  const renderDocumentTypes = types => {
    if (types.length > 0) {
      return types.map(({ id, type }) => {
        return {
          key: id,
          text: type,
          value: type,
        };
      });
    } else {
      return [];
    }
  };

  const handleChange = (evt, type) => {
    if (type === "doc") {
      let value = evt.target.innerText;
      let type = types.find(x => x.type === value);
      setType(type.type);
      setForm({
        ...form,
        ["document_type_id"]: type.id,
      });
    } else if (type === "area") {
      let value = evt.target.innerText;
      let area = areas.find(x => x.area === value);
      setArea(area.area);
      setForm({
        ...form,
        ["area_id"]: area.id,
      });
    } else {
      let value = evt.target.value;
      setForm({
        ...form,
        [evt.target.name]: value,
      });
    }
  };

  const save = async () => {
    if (!initialValues) {
      await restaurant.post("/employees", form);
      changeOpen(false);
    } else {
      await restaurant.put(`/employees/${form.id}`, form);
      changeOpen(false);
    }
  };

  return (
    <Modal size={"small"} open={open}>
      <Modal.Header>{text}</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Group widths='equal'>
            <Form.Input
              fluid
              name='first_name1'
              value={form.first_name1}
              onChange={handleChange}
              label='Primer nombre'
              placeholder='Primer nombre'
            />
            <Form.Input
              fluid
              name='first_name2'
              value={form.first_name2}
              onChange={handleChange}
              label='Segundo nombre'
              placeholder='Segundo nombre'
            />
            <Form.Input
              fluid
              name='last_name1'
              value={form.last_name1}
              onChange={handleChange}
              label='Primer apellido'
              placeholder='Primer apellido'
            />
            <Form.Input
              fluid
              name='last_name2'
              value={form.last_name2}
              onChange={handleChange}
              label='Segundo apellido'
              placeholder='Segundo apellido'
            />
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Select
              options={renderAreas(areas)}
              value={area}
              name='area_id'
              onChange={e => handleChange(e, "area")}
              label='Área'
              placeholder='Área'
            />
            <Form.Select
              options={renderDocumentTypes(types)}
              value={type}
              name='document_type_id'
              onChange={e => handleChange(e, "doc")}
              label='Tipo de Documento'
              placeholder='Tipo de documento'
            />
            <Form.Input
              fluid
              name='document'
              value={form.document}
              onChange={handleChange}
              label='Documento'
              placeholder='Documento'
            />
          </Form.Group>
          <Form.Group>
            <SemanticDatepicker onChange={onChangeDate} />
          </Form.Group>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button positive onClick={save}>
          Guardar
        </Button>
        <Button negative onClick={() => changeOpen(false)}>
          Cancelar
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default FormEmployee;

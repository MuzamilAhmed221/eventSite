import React from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import "../App.css";

const AddDetails = (props) => {
  const { form, setForm } = props;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <Modal
      {...props}
      aria-labelledby="example-custom-modal-styling-title"
      centered
      size="md"
      dialogClassName="modal"
    >
      <Modal.Body className="d-flex flex-column">
        <Row className="mt-4">
          <Col md="12">
            <Form.Control
              size="lg"
              type="text"
              name="name"
              onChange={handleChange}
              placeholder="Nombre"
            />
          </Col>
        </Row>
        <Row className="mt-4">
          <Col md="12">
            <Form.Control
              size="lg"
              type="text"
              name="surname"
              onChange={handleChange}
              placeholder="Apellidos"
            />
          </Col>
        </Row>
        <Row className="mt-4">
          <Col md="12">
            <Form.Control
              size="lg"
              type="email"
              name="email"
              onChange={handleChange}
              placeholder="Correo electrónico"
            />
          </Col>
        </Row>
        <Row className="mt-4">
          <Col md="12">
            <Form.Control
              size="lg"
              type="tel"
              name="number"
              onChange={handleChange}
              placeholder="número de contacto"
            />
          </Col>
        </Row>
        <Row className="mt-4">
          <Col md="12">
            <Form.Control
              size="lg"
              type="text"
              name="date_of_birth"
              onChange={handleChange}
              placeholder="Fecha de nacimiento(Ej: 12/06/1996)"
            />
          </Col>
        </Row>
        <button className="submit_button">Submit</button>
      </Modal.Body>
    </Modal>
  );
};

export default AddDetails;

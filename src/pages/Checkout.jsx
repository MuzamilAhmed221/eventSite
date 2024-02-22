import React from 'react'
import { Col, Container, Form, Row } from 'react-bootstrap'

const Checkout = () => {
  return (
    <div className='wrapper d-flex justify-content-center'>
<div className='fields_container'>
    <Row >
        <Col md='12'>
        <Form.Control size="lg" type="text" placeholder="Large text" />
        </Col>
    </Row>
</div>
    </div>
  )
}

export default Checkout
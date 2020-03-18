import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Config from "./config.json";

class Contact extends Component {
  render() {
    return (
      <Container>
        <Row style={{ height: "30rem" }}>
          <Col>
            <h1>Contact</h1>
            <br />
            <p>Drop us a line at {Config.contact_email}</p>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Contact;

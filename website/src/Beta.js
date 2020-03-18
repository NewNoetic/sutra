import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Mailchimp from "./Mailchimp";

class Beta extends Component {
  render() {
    return (
      <Container>
        <Row>
          <Col md={6}>
            <Mailchimp />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Beta;

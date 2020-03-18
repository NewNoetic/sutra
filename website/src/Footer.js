import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Config from "./config.json";

class Footer extends Component {
  render() {
    return (
      <footer
        style={{
          backgroundColor: "#eee",
          paddingTop: "4rem",
          paddingBottom: "4rem"
        }}
      >
        <Container>
          <Row>
            <Col xs={4}>
              <h6 className="text-uppercase">
                <strong>Site map</strong>
              </h6>
              <ul class="list-unstyled">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <a disabled href="#" target="_blank">About</a>
                </li>
                <li>
                  <Link to="/contact">Contact</Link>
                </li>
              </ul>
            </Col>
            <Col xs={4}>
              <h6 className="text-uppercase">
                <strong>Social media</strong>
              </h6>
              <ul class="list-unstyled">
                <li><a href={`https://twitter.com/${Config.twitter}`}>Twitter</a></li>
              </ul>
            </Col>
            <Col xs={4}>
              <h6 className="text-uppercase">
                <strong>Legal</strong>
              </h6>
              <ul class="list-unstyled">
                {/*<li>Terms of Service</li>*/}
                <li>
                  <Link to="/privacy">Privacy Policy</Link>
                </li>
              </ul>
            </Col>
          </Row>
          <div class="text-center" style={{ paddingTop: "4rem" }}>
             {"© " + Config.company + " " + (new Date()).getFullYear()}
          </div>
        </Container>
      </footer>
    );
  }
}

export default Footer;

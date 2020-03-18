import React, { Component } from "react";
import { Container, Row, Col, Button/*, Card */} from "react-bootstrap";
// import Mailchimp from "./Mailchimp";
import DemoVideo from "./DemoVideo";
import AppIcon from "./AppIcon";
import Config from "./config.json";

class Home extends Component {
  render() {
    return (
      <Container>
        <Row>
          <Col className="mt-5">
              <AppIcon
                height="80"
                width="auto"
              />
              <h1 className="mt-5">{Config.tagline}</h1>
              <h5 className="mt-4 text-muted" style={{ lineHeight: "2rem" }}>{Config.description}</h5>
              <Button className="mt-5" variant="dark" size="lg" href="#">Get {Config.name} <img height="40" width="auto" src="https://i.imgur.com/O7IrmYm.png?1" /></Button>
          </Col>
          <Col className="my-5 ml-5">
            <DemoVideo />
          </Col>
        </Row>
        {/* <Row>
          <Col>
            <Mailchimp />
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <Card.Text>
                  <h2>
                    <em>It's like FaceTime, but in augmented reality.</em>
                  </h2>
                </Card.Text>
              </Card.Body>
              <Card.Footer>— Arra user</Card.Footer>
            </Card>
          </Col>
        </Row> */}
        <br />
        <br />
      </Container>
    );
  }
}

export default Home;

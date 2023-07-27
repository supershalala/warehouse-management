import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero bg-primary text-white py-5">
        <Container>
          <Row className="justify-content-center align-items-center">
            <Col md={8} className="text-center">
              <h1>SMS Powered Software</h1>
              <p className="lead">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                gravida posuere velit nec posuere. Nulla facilisi. Etiam sed
                tincidunt elit.
              </p>
              <Button as={Link} to="/signup" variant="light">
                Get Started
              </Button>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Benefits Section */}
      <section className="py-5">
        <Container>
          <Row>
            <Col md={4}>
              <div className="text-center">
                <i className="fas fa-comments fa-3x mb-3"></i>
                <h3>Instant Communication</h3>
                <p>
                  Send and receive SMS messages instantly to stay connected with
                  your customers.
                </p>
              </div>
            </Col>
            <Col md={4}>
              <div className="text-center">
                <i className="fas fa-cog fa-3x mb-3"></i>
                <h3>Easy Integration</h3>
                <p>
                  Seamlessly integrate our SMS-powered software into your
                  existing systems.
                </p>
              </div>
            </Col>
            <Col md={4}>
              <div className="text-center">
                <i className="fas fa-chart-line fa-3x mb-3"></i>
                <h3>Boost Your Business</h3>
                <p>
                  Improve customer engagement and boost your business with our
                  powerful SMS tools.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Pricing Section */}
      <section className="bg-light py-5">
        <Container>
          <Row>
            <Col md={4}>
              <div className="text-center p-4 bg-white rounded">
                <h4>Basic Plan</h4>
                <h1>$29</h1>
                <p>per month</p>
                <ul className="list-unstyled">
                  <li>100 SMS credits</li>
                  <li>Basic support</li>
                </ul>

                <Button as={Link} to="/signup" variant="primary">
                  Get Started
                </Button>
              </div>
            </Col>
            <Col md={4}>
              <div className="text-center p-4 bg-white rounded">
                <h4>Pro Plan</h4>
                <h1>$49</h1>
                <p>per month</p>
                <ul className="list-unstyled">
                  <li>500 SMS credits</li>
                  <li>Premium support</li>
                </ul>
                <Button as={Link} to="/signup" variant="primary">
                  Get Started
                </Button>
              </div>
            </Col>
            <Col md={4}>
              <div className="text-center p-4 bg-white rounded">
                <h4>Enterprise Plan</h4>
                <h1>$99</h1>
                <p>per month</p>
                <ul className="list-unstyled">
                  <li>Unlimited SMS credits</li>
                  <li>VIP support</li>
                </ul>
                <Button as={Link} to="/signup" variant="primary">
                  Get Started
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Contact Section */}
      <section className="bg-primary text-white py-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} className="text-center">
              <h2>Contact Us</h2>
              <p className="lead">
                For any inquiries or support, feel free to contact our team.
              </p>
              <div>
                {/* GitHub Button */}
                <a
                  href="https://github.com/supershalala"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-light me-3"
                >
                  GitHub
                </a>

                {/* Twitter Button */}
                <a
                  href="https://twitter.com/adamshalala"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-light"
                >
                  Twitter
                </a>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default HomePage;

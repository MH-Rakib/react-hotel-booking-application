import React from "react";
import "./Destination.css";
import { FaArrowRight } from "react-icons/fa";
import { Container, Row, Col } from "react-bootstrap";
import { destinations } from "../../Assets/Data/DestinationsData";
import { useContext } from "react";
import { userContext } from "../../App";
import { Link } from "react-router-dom";

const Destination = () => {
  const { destination } = useContext(userContext);

  const [selectedDEstination, setSelectedDestination] = destination;

  const handleDestinations = (idName) => {
    const data = destinations.find((destination) => destination.id === idName);
    setSelectedDestination(data);
  };
  return (
    <div className="destination_page">
      <Container>
        <Row>
          <Col lg={5} style={{ textAlign: "left" }}>
            <div>
              <h2 className="destination_heading">
                {selectedDEstination.name}
              </h2>
              <p className="destination_details">
                {selectedDEstination.description}
              </p>
              <br />
              <Link to="/booking">
                <button className="destination_booking_button">
                  Book Now <FaArrowRight />
                </button>
              </Link>
            </div>
          </Col>

          <Col lg={7} className="destinations">
            <Row>
              {destinations.map((destination) => (
                <Col lg={4} key={destination.id.toString()}>
                  <div
                    onClick={() => handleDestinations(destination.id)}
                    className={
                      selectedDEstination.id === destination.id
                        ? "active_destination destination"
                        : "destination"
                    }
                  >
                    <img src={destination.image} alt="" />
                    <h3 className="destination_name">{destination.name}</h3>
                  </div>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Destination;

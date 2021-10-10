import React, { useContext } from "react";
import { userContext } from "../../App";
import "./Hotels.css";
import { Container } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";

const Hotels = () => {
  const { destination, booking } = useContext(userContext);

  const [selectedDestination, setSelectedDestination] = destination;
  const [bookingInfo, setBookingInfo] = booking;

  const { hotels } = selectedDestination;

  return (
    <div style={{ textAlign: "left" }}>
      <Container>
        <Row>
          <Col lg={12}>
            <div className="hotel_page_header">
              <h3>
                {bookingInfo.origin} to {bookingInfo.destination}
              </h3>
              <p>
                {bookingInfo.days} days package ( {bookingInfo.from[2]} to{" "}
                {bookingInfo.to[2]} )
              </p>
            </div>
            <div className="hotel_page">
              <Row>
                <Col lg={6}>
                  {hotels.map((hotel) => (
                    <div key={hotel.price} className="hotel_lists">
                      <Row>
                        <Col lg={5}>
                          <div className="hotel_image">
                            <img
                              src={hotel.image}
                              style={{ width: "100%" }}
                              alt=""
                            />
                          </div>
                        </Col>
                        <Col lg={7}>
                          <div className="hotel_informations">
                            <p className="hotel_information_name">
                              {hotel.name}
                            </p>
                            <p className="hotel_information_features">
                              <span>{hotel.bedrooms} Bedrooms</span>{" "}
                              &nbsp;&nbsp;
                              <span>{hotel.beds} Beds</span> &nbsp;&nbsp;
                              <span>{hotel.person} Persons</span>
                            </p>
                            <p className="hotel_information_details">
                              {hotel.details}
                            </p>
                            <p className="hotel_information_price">
                              <span>⭐ {hotel.rating}/5</span> &nbsp;&nbsp;
                              <span>$ {hotel.price} Per Day</span>
                            </p>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  ))}
                </Col>

                <Col lg={{ span: 5, offset: 1 }}>
                  <div className="hotel_map">
                    <iframe
                      title="map"
                      src={selectedDestination.mapUrl}
                      loading="lazy"
                    ></iframe>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Hotels;

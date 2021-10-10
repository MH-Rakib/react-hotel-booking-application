import React from "react";
import "./Booking.css";
import { Container, Row, Col } from "react-bootstrap";
import { useContext } from "react";
import { userContext } from "../../App";
import { FaRegCalendarCheck } from "react-icons/fa";
import { Link } from "react-router-dom";

const Booking = () => {
  const { destination, booking } = useContext(userContext);

  const [selectedDEstination, setSelectedDestination] = destination;
  const [bookingInfo, setBookingInfo] = booking;
  console.log(bookingInfo);

  const { facilities } = selectedDEstination;

  const handleDate = (event) => {
    const date = event.target.value;
    console.log(date);
    const dateArray = date.split("-");
    let target = event.target;
    const data = { ...bookingInfo };
    data[target.name] = dateArray;
    setBookingInfo(data);

    if (data.from && data.to) {
      const start = parseFloat(data.from[2]);
      const end = parseFloat(data.to[2]);
      const days = Math.abs(start - end) + 1;
      data.days = days;
      data.origin = "Dhaka";
      data.destination = selectedDEstination.name;
      data.isDone = true;
      setBookingInfo(data);
    }
  };

  const handleAlert = (e) => {
    alert("Select date");
    e.preventDefault();
  };

  return (
    <div className="booking_page">
      <Container>
        <Row>
          <Col lg={10} className="mx-auto">
            <Row>
              <Col lg={6}>
                <div className="booking_page_destination">
                  <h2 className="destination_heading">
                    {selectedDEstination.name}
                  </h2>
                  <p className="destination_details">
                    {selectedDEstination.description}
                  </p>
                  <br />
                  {facilities.map((obj) => (
                    <p key={obj.facility} className="booking_facility">
                      {" "}
                      <FaRegCalendarCheck></FaRegCalendarCheck> &nbsp;{" "}
                      {obj.facility}
                    </p>
                  ))}
                </div>
              </Col>

              <Col lg={6}>
                <div className="booking_form">
                  <form action="">
                    <label htmlFor="origin">Origin</label>
                    <input
                      style={{ width: "100%" }}
                      type="name"
                      name="origin"
                      defaultValue="Dhaka"
                    />

                    <label htmlFor="destination">Destination</label>
                    <input
                      style={{ width: "100%" }}
                      type="name"
                      name="destination"
                      defaultValue={selectedDEstination.name}
                    />

                    <Row>
                      <Col lg={6}>
                        <label htmlFor="from">From</label>
                        <input
                          onChange={handleDate}
                          style={{ width: "100%" }}
                          type="date"
                          name="from"
                        />
                      </Col>

                      <Col lg={6}>
                        <label htmlFor="to">To</label>
                        <input
                          onChange={handleDate}
                          style={{ width: "100%" }}
                          type="date"
                          name="to"
                        />
                      </Col>
                    </Row>

                    {bookingInfo.isDone ? (
                      <Link to="/hotels">
                        <button
                          style={{ width: "100%" }}
                          className="booking_button_done"
                        >
                          Start Booking
                        </button>
                      </Link>
                    ) : (
                      <button
                        onClick={handleAlert}
                        style={{ width: "100%" }}
                        className="booking_button"
                      >
                        Start Booking
                      </button>
                    )}
                  </form>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Booking;

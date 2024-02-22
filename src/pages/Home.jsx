import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const Home = () => {
  const [organization, setOrganization] = useState(null);
  const [events, setEvents] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    try {
      if (id != undefined) {
        axios
          .get(`organizations/${id}`)
          .then((res) => {
            setOrganization(res.data?.data);
          })
          .then((res) => {
            axios
              .get(`events/organization/${id}`)
              .then((res) => {
                setEvents(res.data?.data);
              })
              .catch((e) => {
                console.log(e);
              });
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
        navigate("/here");
      }
    } catch (e) {
      console.log(e);
    }
  }, []);

  const setTimeDate = (item) => {
    let Days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let month = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    let eventDate = new Date(item?.eventDate);
    let eventTimeObj = JSON.parse(item?.eventTime);
    let eventTimeStart = new Date(eventTimeObj?.from);
    let eventTimeEnd = new Date(eventTimeObj?.to);

    let locationWords = JSON.parse(item?.locationWords);

    let eventDateInWords =
      Days[eventDate?.getDay()] +
      " " +
      month[eventDate?.getMonth()] +
      " " +
      eventDate?.getFullYear();

    let eventTimeInWords =
      eventTimeStart?.getHours() +
      ":" +
      eventTimeStart?.getMinutes() +
      " - " +
      eventTimeEnd?.getHours() +
      ":" +
      eventTimeEnd?.getMinutes();

    return {
      locationWords,
      eventDateInWords,
      eventTimeInWords,
      date: eventDate?.getDate(),
      month: month[eventDate?.getMonth()],
    };
  };

  return (
    <div className="App">
      <Container
        fluid
        className="hero_section_background p-4"
        style={{ backgroundImage: `url(${organization?.displayImage})` }}
      >
        {/* <div className="w-100  ">
          <div className="share_icon ms-auto"></div>
        </div> */}
      </Container>
      <Container>
        <div className="wrap">
          <div className="absolute_wrapper">
            <h1 className="section_heading fw-bold text-white mb-3">
              {organization?.title || "Moss"}
            </h1>
            <div className="section_container w-100 p-4 bg-white rounded-2 border">
              <p className="fs-5 text-center fw-semibold">
                {events?.length} eventos disponibles
              </p>
              <Row className="cards_wrap f-wrap mt-5 gap-5 justify-content-around ">
                {events?.map((item, index) => {
                  let dateTimeLocation = setTimeDate(item);
                  return (
                    <Col
                      onClick={() => navigate(`/eventdetails/${item?.id}`)}
                      md="5"
                      className="_card p-4 rounded-4 d-flex flex-column justify-content-between  "
                      style={{
                        backgroundImage: `url(${item?.displayImage})`,
                      }}
                    >
                      <div className="w-100 ">
                        <div className="date_box bg-white ms-auto rounded-2 d-flex flex-column align-items-center justify-content-center fs-5 lh-sm">
                          <p className="date text-black fw-semibold">
                            {dateTimeLocation?.date}
                          </p>
                          <p className="month text-secondary fs-6 fw-regular ">
                            {dateTimeLocation?.month?.slice(0,3)?.toUpperCase()}
                          </p>
                        </div>
                      </div>
                      <div className="text_wrap">
                        <h4 className="text-white fw-bold lh-sm">
                          {item?.title}
                        </h4>
                        <p className="fw-semibold text-white text-secondary mt-2">
                          {dateTimeLocation?.eventTimeInWords}
                        </p>
                      </div>
                    </Col>
                  );
                })}
              </Row>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Home;

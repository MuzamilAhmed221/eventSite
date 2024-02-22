import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import age from "../assets/cake.svg";
import hanger from "../assets/clotheshanger.svg";
import plus from "../assets/plus.svg";
import minus from "../assets/dash.svg";
import AddDetails from "../components/AddDetails";
import axios from "axios";
import Loader from "../components/Loader";

const EventDetails = (props) => {
  const [modalShow, setModalShow] = React.useState(false);
  const [form, setForm] = useState({
    name: "",
    surname: "",
    email: "",
    number: "",
    date_of_birth: "",
  });
  const location = useLocation();
  const [quantity, setQuantity] = useState(0);
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    try {
      if (id != undefined) {
        axios
          .get(`events/${id}`)
          .then((res) => {
            setEvent(res.data?.data);
            setLoading(false);
          })
          .catch((e) => {
            console.log(e);
            setLoading(false);
          });
      } else {
        navigate("/here");
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  }, []);

  const _onAdd = () => {
    setQuantity((prev) => prev + 1);
  };
  const _onSubtract = () => {
    setQuantity((prev) => (quantity > 0 ? prev - 1 : 0));
  };

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

    let locationWords = JSON.parse(item?.locationWords)[0];

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

  if (loading) {
    return <Loader />;
  }
  let dateTimeLocation = setTimeDate(event);

  let eventLocationInWords = Object.values(
    dateTimeLocation?.locationWords
  )?.reduce((a, b) => {
    return a + " " + b;
  }, "");

  let organizationDetails = JSON.parse(event?.orgnizerDetails);

  return (
    <div className="App">
      <Container
        fluid
        className="hero_section_background p-4"
        style={{ backgroundImage: `url(${event?.displayImage})` }}
      >
       
      </Container>
      <Container>
        <div className="wrap ">
          <div className="absolute_wrapper">
            <div className="d-flex gap-3 mb-3">
              <h1 className="section_heading fw-bold text-white">
                {event?.title}
              </h1>
              <div className="date_box bg-white  rounded-2 d-flex flex-column align-items-center justify-content-center fs-5 lh-sm">
                <p className="date text-black fw-semibold">
                  {dateTimeLocation?.date}
                </p>
                <p className="month text-secondary fs-6 fw-semibold ">
                  {dateTimeLocation?.month?.slice(0, 3)?.toUpperCase()}
                </p>
              </div>
            </div>
            <div className="section_container w-100 p-4 bg-white rounded-3">
              <Row className="cards_wrap f-wrap p-3  justify-content-between ">
                <Col md="6">
                  <div
                    style={{
                      backgroundImage: `url(${event?.displayImage})`,
                    }}
                    className="_card_event w-100 p-4 rounded-5 d-flex flex-column justify-content-between overflow-hidden"
                  />
                  <h4 className="mt-4 fw-bold">Info</h4>
                  <p>{eventLocationInWords}</p>
                  <h4 className="text-secondary mt-2">Momento</h4>
                  <p className="fs-6 text-secondary mt-2">
                    {dateTimeLocation?.eventTimeInWords}
                  </p>

                  <div className="w-75 mt-2 d-flex gap-2">
                    <span className="tags d-flex align-items-center">
                      <img src={age} />
                      <p className="text ms-2">18+</p>
                    </span>
                  </div>
                  <h4 className="text-secondary mt-2">
                    Detalles del organizador
                  </h4>
                  <p className="fs-6 text-secondary mt-2">
                    Contact: {organizationDetails?.phone}
                  </p>
                  <p className="fs-6 text-secondary mt-2">
                    Email: {organizationDetails?.email}
                  </p>
                </Col>
                <Col md="6" className="mt-4 mt-md-0">
                  <div>
                    <h3>Cantidad</h3>
                    <div className="quantity_wrap d-flex align-items-center gap-3">
                      <div className="circle" onClick={_onSubtract}>
                        <img src={minus} />
                      </div>
                      <div className="quantityInput fs-5 fw-semibold d-flex align-items-center justify-content-center">
                        {quantity}
                      </div>
                      <div className="circle" onClick={_onAdd}>
                        <img src={plus} fill="red" />
                      </div>
                    </div>
                    <button
                      onClick={() => setModalShow(true)}
                      disabled={quantity == 0 ? true : false}
                      className="px-5 py-2 mt-5  fs-6 fw-semibold button"
                    >
                      Purchase
                    </button>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </div>
        <AddDetails
          show={modalShow}
          onHide={() => setModalShow(false)}
          form={form}
          setForm={setForm}
        />
      </Container>
    </div>
  );
};

export default EventDetails;

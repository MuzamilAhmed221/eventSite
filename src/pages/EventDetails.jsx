import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import age from "../assets/cake.svg";
import hanger from "../assets/clotheshanger.svg";
import plus from "../assets/plus.svg";
import minus from "../assets/dash.svg";
import AddDetails from "../components/AddDetails";
import axios from "axios";

const EventDetails = (props) => {
  const [modalShow, setModalShow] = React.useState(false);
  const [form,setForm] = useState({
    name: '',
    surname:'',
    email:'',
    number:'',
    date_of_birth:''
  })
  const location = useLocation();
  const [quantity, setQuantity] = useState(0);
  const [event, setEvent] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    try {
      if (id != undefined) {
        axios
          .get(`events/${id}`)
          .then((res) => {
           setEvent(res.data?.data);
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
  console.log(event);

  const _onAdd = () => {
    setQuantity((prev) => prev + 1);
  };
  const _onSubtract = () => {
    setQuantity((prev) => (quantity > 0 ? prev - 1 : 0));
  };
  return (
    <div className="App">
      <Container fluid className="hero_section_background p-4">
        <div className="w-100  ">
          <div className="share_icon ms-auto"></div>
        </div>
      </Container>
      <Container>
        <div className="wrap ">
          <div className="absolute_wrapper">
            <div className="d-flex gap-3 mb-3">
              <h1 className="section_heading fw-bold text-white">
                Morel gypsum events Pocatello
              </h1>
              <div className="date_box bg-white  rounded-2 d-flex flex-column align-items-center justify-content-center fs-5 lh-sm">
                <p className="date text-black fw-semibold">10</p>
                <p className="month text-secondary fs-6 fw-semibold ">FEB</p>
              </div>
            </div>
            <div className="section_container w-100 p-4 bg-white rounded-3">
              <Row className="cards_wrap f-wrap p-3  justify-content-between ">
                <Col md="6">
                  <div
                    style={{
                      backgroundImage: `url(${require("../assets/caard.png")})`,
                    }}
                    className="_card_event w-100 p-4 rounded-5 d-flex flex-column justify-content-between overflow-hidden"
                  />
                  <h4 className="mt-4 fw-bold">Info</h4>
                  <p>
                    🎩 | @laelitebymoss 🔊 | Just Tech Party 🕶️ | Dress code:
                    Ropa negra y gafas de sol 🎧 | DJ invitado: KONE 🎧 |
                    Warmup: Joel Morchón 🛕 | @mosstheclub
                  </p>
                  <h4 className="text-secondary mt-2">momento</h4>
                  <p className="fs-6 text-secondary mt-2"> 22:00-23:00</p>

                  <div className="w-75 mt-2 d-flex gap-2">
                    <span className="tags d-flex align-items-center">
                      <img src={age} />
                      <p className="text ms-2">18+</p>
                    </span>
                    <span className="tags d-flex align-items-center">
                      <img src={hanger} />
                      <p className="text ms-2">Arreglada</p>
                    </span>
                  </div>
                </Col>
                <Col md='6' className="mt-4 mt-md-0">
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
                    <button onClick={()=>setModalShow(true)} disabled={quantity == 0 ? true : false} className="px-5 py-2 mt-5  fs-6 fw-semibold button" >Purchase</button>
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

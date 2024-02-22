import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const Home = () => {
  const [organizations, setOrganizations] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    try {
      if (id != undefined) {
        axios
          .get(`organizations/${id}`)
          .then((res) => {
            setOrganizations(res.data?.data);
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
console.log(organizations?.displayImage  );
  return (
    <div className="App">
      <Container
        fluid
        className="hero_section_background p-4"
        style={{ backgroundImage: `url(${organizations?.displayImage})` }}
      >
        <div className="w-100  ">
          <div className="share_icon ms-auto"></div>
        </div>
      </Container>
      <Container>
        <div className="wrap">
          <div className="absolute_wrapper">
            <h1 className="section_heading fw-bold text-white mb-3">{organizations?.title || 'Moss'}</h1>
            <div className="section_container w-100 p-4 bg-white rounded-2 border">
              <p className="fs-5 text-center fw-semibold">
                6 eventos disponibles
              </p>
              <Row className="cards_wrap f-wrap mt-5 gap-5 justify-content-around ">
                {[1, 2, 3, 4, 5].map(() => {
                  return (
                    <Col
                      onClick={() => navigate("/eventdetails", { state: 25 })}
                      md="5"
                      className="_card p-4 rounded-4 d-flex flex-column justify-content-between  "
                      style={{
                        backgroundImage: `url(${require("../assets/caard.png")})`,
                      }}
                    >
                      <div className="w-100 ">
                        <div className="date_box bg-white ms-auto rounded-2 d-flex flex-column align-items-center justify-content-center fs-5 lh-sm">
                          <p className="date text-black fw-semibold">10</p>
                          <p className="month text-secondary fs-6 fw-regular ">
                            FEB
                          </p>
                        </div>
                      </div>
                      <div className="text_wrap">
                        <h4 className="text-white fw-bold lh-sm">
                          Morel gypsum events Pocatello
                        </h4>
                        <p className="fw-semibold text-secondary mt-2">
                          22:00-23:00
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

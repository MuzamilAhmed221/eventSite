import { Col, Container, Row } from "react-bootstrap";
import "./App.css";
import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import EventDetails from "./pages/EventDetails";
import Checkout from "./pages/Checkout";
import axios from "axios";
import ErrorPage404 from "./pages/ErrorPage404";

function App() {
  axios.defaults.baseURL = 'http://eventapp2-env.eba-qupg2a9j.ap-southeast-2.elasticbeanstalk.com/'
  // axios.defaults.baseURL = "http://192.168.100.127:5000";

  return (
    <div className="App">
     <BrowserRouter>
      <Routes>
        <Route path='/home/:id' element={<Home/>} />
        <Route path='/eventdetails/:id' element={<EventDetails/>} />
        <Route path='/checkout' element={<Checkout/>} />
        <Route path='/:id' element={<ErrorPage404/>} />
      </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;

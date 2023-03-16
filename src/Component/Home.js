import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  InputGroup,
  Row,
  Form,
  Tab,
  Nav,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import BookMark from "./BookMark";
import Map from "./Map";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Style.css";
const Home = () => {
  const [search, setSearch] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [list, setList] = useState([]);
  const [booked, setBooked] = useState([]);
  const NavTo = useNavigate();

  useEffect(() => {
    toast.success("WELCOME USER", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
    fetchRestaurant();
    const data = JSON.parse(localStorage.getItem("userInfo"));
    console.log(data.list, data.booked);
    if (data.list !== []) {
      setList(data.list);
    }
    if (data.booked !== []) {
      setBooked(data.booked);
    }
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userInfo"));
    console.log(list);
    userData["list"] = list;
    userData["booked"] = booked;
    localStorage.setItem("userInfo", JSON.stringify(userData));
  }, [list, booked]);
  const handleSearch = (text) => {
    let matches = [];
    if (text.length > 0) {
      matches = restaurants.filter((e) => {
        const regex = new RegExp(`${text}`, "gi");
        return e.fields.Name.match(regex);
      });
    }
    setSuggestions(matches);
    setSearch(text);
  };
  const fetchRestaurant = async () => {
    try {
      const config = {
        method: "GET",
        headers: {
          Authorization: "Bearer keyfXgn8PL6pB3x32",
        },
      };
      const res = await fetch(
        "https://api.airtable.com/v0/appjWdL7YgpxIxCKA/restaurants?maxRecords=3&view=Grid%20view",
        config
      );
      const data = await res.json();

      setRestaurants(data.records);
    } catch (error) {}
  };
  const addRestaurants = () => {
    if (search) {
      toast.success(search + " Added to list", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      setList([...list, search]);
      console.log("LIST :" + list);
      setSearch("");
    } else {
      toast.error("Enter Something Valid", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };
  const logOut = () => {
    toast.error("Logging OUT");
    NavTo("/");
  };
  const handleSuggestions = (text) => {
    setSearch(text);
    setSuggestions([]);
  };

  return (
    <Container fluid>
      <Tab.Container id="tabContainer" defaultActiveKey="first">
        <Row>
          <Col sm={3} className="box">
            <Nav
              className="flex-column"
              variant="pills"
              style={{ textDecoration: "none" }}
            >
              <Nav.Item>
                {" "}
                <Nav.Link eventKey="first">
                  <span>HOME PAGE</span>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <span>
                  <Nav.Link eventKey="second">BOOKMARK</Nav.Link>
                </span>
              </Nav.Item>
            </Nav>
            <Button onClick={logOut}>LOG OUT</Button>
          </Col>
          <Col>
            <Tab.Content>
              <Tab.Pane eventKey="first">
                <InputGroup className="my-2">
                  <Form.Control
                    placeholder="Search Any Restaurant"
                    value={search}
                    onChange={(e) => handleSearch(e.target.value)}
                  />
                  <Button
                    variant="outline-secondary"
                    id="button-addon2"
                    onClick={addRestaurants}
                  >
                    ADD
                  </Button>
                </InputGroup>

                {suggestions &&
                  suggestions?.map((e) => (
                    <div
                      className="suggestions"
                      key={e.id}
                      onClick={() => handleSuggestions(e.fields.Name)}
                    >
                      {e.fields.Name}
                    </div>
                  ))}
                {list !== [] ? (
                  list.map((listItems, i) => (
                    <Map
                      search={listItems}
                      list={list}
                      key={i}
                      id={i}
                      setList={setList}
                      booked={booked}
                      setBooked={setBooked}
                    />
                  ))
                ) : (
                  <></>
                )}
              </Tab.Pane>
              <Tab.Pane eventKey="second" className="d-flex flex-wrap">
                {booked.length > 0 ? (
                  booked.map((listItems, i) => (
                    <BookMark
                      listItems={listItems}
                      booked={booked}
                      setBooked={setBooked}
                      key={i}
                      id={i}
                    />
                  ))
                ) : (
                  <span> Nothing Here Yet.........</span>
                )}
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
      <ToastContainer />
    </Container>
  );
};

export default Home;

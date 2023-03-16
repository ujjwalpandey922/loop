import React from "react";
import { Button, Card } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Style.css";
const Map = ({ search, list, id, setList, booked, setBooked }) => {
  console.log(search);
  const handleAdd = (id) => {
    setList(list.filter((e, i) => e[i] !== e[id]));
    toast.success(list[id] + " Bookmarked", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
    return setBooked([...booked, list[id]]);
  };
  const handleRemove = (id) => {
    console.log(list[id]);
    toast.error(list[id] + " Removed", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
    return setList(list.filter((e, i) => e[i] !== e[id]));
  };

  return (
    <Card className="cardStyle my-3">
      <Card.Header>{search} : Near You......</Card.Header>
      <Card.Body style={{ width: "100%", height: "200px" }}>
        <iframe
          src={`https://datastudio.google.com/embed/reporting/430242fa-4162-4950-a984-824b3b355b3c/page/dQMwC?params={"ds2.name2":"${search}"}`}
          frameBorder="0"
          width="100%"
          height="200px"
          allowFullScreen
        ></iframe>
      </Card.Body>
      <Card.Footer className="d-flex justify-content-between">
        <Button variant="primary" onClick={() => handleAdd(id)}>
          {" "}
          BookMark
        </Button>
        <Button variant="danger" onClick={() => handleRemove(id)}>
          {" "}
          Remove
        </Button>
      </Card.Footer>
      <ToastContainer />
    </Card>
  );
};

export default Map;

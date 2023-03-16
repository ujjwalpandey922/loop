import React from "react";
import { Button, Card } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const BookMark = ({ booked, setBooked, id, listItems }) => {
  const removeRes = (id) => {
    console.log(booked, id);
    toast.error("Removed");
    return setBooked(booked.filter((e, i) => e[i] !== e[id]));
  };
  return (
    <Card className="cardStyle my-3" style={{ width: "30%" }}>
      <Card.Header>{listItems} : Near You......</Card.Header>
      <Card.Body>
        <iframe
          src={`https://datastudio.google.com/embed/reporting/430242fa-4162-4950-a984-824b3b355b3c/page/dQMwC?params={"ds2.name2":"${listItems}"}`}
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </Card.Body>
      <Card.Footer className="d-flex justify-content-center">
        <Button variant="danger" onClick={() => removeRes(id)}>
          {" "}
          Remove
        </Button>
      </Card.Footer>
      <ToastContainer />
    </Card>
  );
};

export default BookMark;

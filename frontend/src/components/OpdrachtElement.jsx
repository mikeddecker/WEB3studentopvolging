import React from "react";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";

const OpdrachtElement = ({ element, setSelectedElement, host = false }) => {
  const navigate = useNavigate();
  const handleClick = (element) => {
    setSelectedElement(element);
    console.log("Opdracht element");
    if (host) {
      navigate("/dashboard");
    } else {
      navigate("/element");
    }
  };

  return (
    <Card
      body
      className="my-4"
      style={{ minHeight: 100 }}
      onClick={() => handleClick(element)}>
      <div className="d-flex justify-content-between align-items-center">
        <p className="fw-bold">{element.beschrijving}</p>
        <i className="bi bi-chevron-right ms-4"></i>
      </div>
    </Card>
  );
};

export default OpdrachtElement;

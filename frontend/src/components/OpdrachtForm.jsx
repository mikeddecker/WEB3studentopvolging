import React from "react";

import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import axios from 'axios';
import { useSockets } from "../contexts/socketContext";

import { appUrl } from "../utils/constants";

const OpdrachtForm = ({ element }) => {
  const [rapport, setRapport] = useState(null);
  const [status, setStatus] = useState(0);
  const [question, setQuestion] = useState("");
  const [questions, setQuestions] = useState([]);
  const [xtraTime, setXtraTime] = useState(0);

  const socketContext = useSockets();


  console.log('OpdrachtFormScreenDisplayed');
  useEffect(() => {
    const getRapport = async () => {
      const findResponse = await axios.post(appUrl + "/rapporten/opdrachtelement", { elementId: element.id }, { withCredentials: true });
      console.log("eventueel rapport ontvangen");
      let rapport;
      if (findResponse.status === 200) {
        console.log('rapport gekregen');
        rapport = findResponse.data;
      } else if (findResponse.status === 204) {
        console.log("geen rapport gekregen, rapport laten aanmaken");
        const createResponse = await axios.post(appUrl + "/rapporten/create", { elementId: element.id }, { withCredentials: true });
        if (createResponse.status === 200) {
          console.log("rapport aangemaakt");
          rapport = createResponse.data;
        }
      }
      if (rapport) {
        console.log("Rapport displayen");
        setRapport(rapport);
        setStatus(rapport.status);
        setXtraTime(Number.parseInt(rapport.extraMinuten));
        setQuestions(rapport.vragen ? rapport.vragen : []);
        console.log(rapport);
      } else {
        console.error("Er ging iets mis");
      }
    };

    getRapport();
    console.log('OpdrachtFormScreenDisplayed');
  }, [element]);

  const handleStatusChange = (event) => {
    setStatus(Number.parseInt(event.target.value));
    console.log('status changed');
  };

  const handleStatusClick = async (event) => {
    console.log('handleStatusClick - socket this');
    console.log(status);
    await axios.post(
      appUrl + "/rapporten/updatestatus",
      {
        rapportId: rapport.id,
        status: status,
      },
      {
        withCredentials: true,
      }
    );
    console.log("Setting up emit for status change");
    socketContext.socket.emit("studentRapportUpdate");
  };

  const handleSubmitQuestion = async () => {
    console.log('handleSubmitQuestion - socket this');
    const response = await axios.post(
      appUrl + "/rapporten/addQuestion",
      { rapportID: rapport.id, question: question },
      { withCredentials: true }
    );

    if (response.status === 200) {
      const rapport = response.data;
      setQuestions(rapport.vragen);
    } else if (response.status === 201) {
      // Vraag object dat je terugkrijgt
      const newQuestion = response.data;
      setQuestions([...questions, newQuestion]);
    }
    setQuestion("");
    socketContext.socket.emit("studentRapportUpdate");
  };

  const handleExtraTime = async (extraTijd) => {
    console.log('handleExtraTime - socket this');
    const response = await axios.post(
      appUrl + "/rapporten/extratijd",
      {
        rapportId: rapport.id,
        xtraTime: extraTijd,
      },
      {
        withCredentials: true,
      }
    );

    if (response.status === 200) {
      setXtraTime(extraTijd);
    }
    socketContext.socket.emit("studentRapportUpdate");
  };

  const handleSubmit = (ev) => {
    console.log('handleSubmit(ev)', ev);
    ev.preventDefault();
  };
  console.log(element);
  return (
    <Container>
      <h1>{element.beschrijving}</h1>

      <div className="my-4">
        <h4 className="text-muted">Status</h4>
        <hr />
        <Form onSubmit={handleSubmit}>
          <Form.Check
            type="radio"
            label="Bezig"
            checked={status === 1}
            value={1}
            onChange={handleStatusChange}
            name="status"
          />
          <Form.Check
            type="radio"
            checked={status === 2}
            label="Ik doe niet mee"
            name="status"
            value={2}
            onChange={handleStatusChange}
          />
          <Form.Check
            type="radio"
            label="Ik geef op"
            checked={status === 3}
            value={3}
            name="status"
            onChange={handleStatusChange}
          />
          <Form.Check
            type="radio"
            checked={status === 4}
            label="Ik ben klaar"
            value={4}
            name="status"
            onChange={handleStatusChange}
          />
          <Button onClick={handleStatusClick} className="my-4">
            Wijzig status
          </Button>
        </Form>
      </div>
      <div className="my-4">
        <h4 className="text-muted">Extra tijd</h4>
        <hr />
        <div className="d-flex">
          <ButtonGroup>
            <Button
              onClick={() => handleExtraTime(1)}
              variant={xtraTime === 1 ? "primary" : "outline-primary"}>
              + 1 min
            </Button>
            <Button
              onClick={() => handleExtraTime(5)}
              variant={xtraTime === 5 ? "primary" : "outline-primary"}>
              + 5 min
            </Button>
            <Button
              onClick={() => handleExtraTime(10)}
              variant={xtraTime === 10 ? "primary" : "outline-primary"}>
              + 10 min
            </Button>
          </ButtonGroup>
        </div>
      </div>
      <div className="my-4">
        <h4 className="text-muted">Vragen</h4>
        <hr />
        <ul>
          {questions.map((q) => (
            <li key={q.id}>{q.beschrijving}</li>
          ))}
        </ul>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="question">
            <Form.Control
              type="text"
              placeholder="Vraag"
              name="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
          </Form.Group>
          <Button className="my-4" onClick={handleSubmitQuestion}>
            Verstuur vraag
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default OpdrachtForm;

import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import axios from 'axios';

import ProgressBar from "react-bootstrap/ProgressBar";

import { appUrl } from "../utils/constants";

const statussen = [
  {
    id: 1,
    label: "Nog niet gestart",
    variant: "warning",
  },
  {
    id: 2,
    label: "Bezig",
    variant: "info",
  },
  {
    id: 3,
    label: "Doet niet mee",
    variant: "danger",
  },
  {
    id: 4,
    label: "Geeft op",
    variant: "danger",
  },
  {
    id: 5,
    label: "Klaar",
    variant: "success",
  },
];

const DashboardScreen = ({ element }) => {
  const [opdrachtElement, setOpdrachtElement] = useState(null);

  const occurrences = [0, 0, 0, 0, 0];
  opdrachtElement?.opdrachtElement.rapporten
    .map((r) => r.status)
    .map((s) => (occurrences[s] = occurrences[s] + 1));

  useEffect(() => {
    const getStudentsCount = async () => {
      const response = await axios.get(appUrl + `/opdrachten/element/${element?.id}`);
      if (response.status === 200) {
        setOpdrachtElement(response.data);
      }
    };
    getStudentsCount();
  }, [element]);

  return (
    <Container>
      <Link to={-1}>Terug naar opdrachten</Link>
      <h1>{element?.beschrijving}</h1>
      <hr />

      <ProgressBar className="my-4">
        {statussen.map((s, idx) => (
          <ProgressBar
            key={s.id}
            variant={s.variant}
            now={
              opdrachtElement
                ? (occurrences[idx] / opdrachtElement.count) * 100
                : 0
            }
            label={s.label}
          />
        ))}
      </ProgressBar>

      {!opdrachtElement?.opdrachtElement.rapporten.length && (
        <p>Geen rapporten </p>
      )}

      {opdrachtElement?.opdrachtElement.rapporten.map((oe) => (
        <div key={oe.id}>
          <h3 className="text-muted">{`${oe.student.voorNaam} ${oe.student.familieNaam}`}</h3>
          <hr />
          <h5>Status</h5>
          <p>{statussen[oe.status].label}</p>
          <h5>Extra tijd: </h5>
          <p>
            {oe.extraMinuten !== 0
              ? `+ ${oe.extraMinuten} minuten`
              : "Geen extra tijd gevraagd"}
          </p>
          <h5>Vragen: </h5>
          <ul>
            {oe.vragen.map((v) => (
              <li key={v.id}>{v.beschrijving}</li>
            ))}
          </ul>
        </div>
      ))}
    </Container>
  );
};

export default DashboardScreen;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MyStopwatch from "../components/Stopwatch"
import axios from 'axios';

import ProgressBar from "react-bootstrap/ProgressBar";

import { appUrl } from "../utils/constants";
import styles from "../index.css"
import { useSockets } from "../contexts/socketContext";

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
  const socketContext = useSockets();
  const [opdrachtElement, setOpdrachtElement] = useState(null);
  const [timeElement, setTimeElement] = useState((new Date(Date.now())).toISOString());
  
  socketContext.socket.on("dashboardChange", () => { console.log("een student heeft zijn rapport gewijzigd"); setTimeElement((new Date(Date.now())).toISOString()); });
  
  
  const occurrences = [0, 0, 0, 0, 0];
  opdrachtElement?.opdrachtElement.rapporten
    .map((r) => r.status)
    .map((s) => (occurrences[s] = occurrences[s] + 1));

  
    //opdrachtElement?.opdrachtElement.rapporten.map((r) => r.extraMinuten).map((xtra) => xtraMinuten.add(xtra));
  const seconds = opdrachtElement?.opdrachtElement.minuten * 60;
  console.log(seconds);
  console.log(opdrachtElement);
  const studentenMetRapport = opdrachtElement?.opdrachtElement.rapporten.length;
  const stopwatchTijd =  Math.floor((opdrachtElement?.opdrachtElement.rapporten.
    map((r) => r.extraMinuten).reduce((xtraSec, xtraTijdStudent) => xtraSec + Number.parseInt(xtraTijdStudent), 0) * 60) / studentenMetRapport) + seconds;
  

  useEffect(() => {
    const getStudentsCount = async () => {
      const response = await axios.get(appUrl + `/opdrachten/element/${element?.id}`);
      if (response.status === 200) {
        setOpdrachtElement(response.data);
      }
    };
    getStudentsCount();
  }, [element, timeElement]);

  return (
    <div className="container">
      <Link to={-1}>Terug naar opdrachten</Link>
      <h1>{element?.beschrijving}</h1>
      <hr />
      <p className="text-pink-600 font-bold">Last updated: {timeElement}</p>

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

      <MyStopwatch seconden={stopwatchTijd} />

      {!opdrachtElement?.opdrachtElement.rapporten.length && (
        <p>Geen rapporten </p>
      )}

      {opdrachtElement?.opdrachtElement.rapporten.map((oe) => (
        <div key={oe.id}>
          <h3 className="text-muted text-pink-600">{`${oe.student.voorNaam} ${oe.student.familieNaam}`}</h3>
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
    </div>
  );
};

export default DashboardScreen;

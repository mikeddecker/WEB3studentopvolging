import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import OpdrachtElement from "./OpdrachtElement";
import { appUrl } from "../utils/constants";

const Opdrachten = ({ setSelectedElement }) => {
  const [opdrachten, setOpdrachten] = useState([]);

  useEffect(() => {
    fetch(appUrl + "/opdrachten")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setOpdrachten(data);
        console.log(data);
      })
      .catch((err) => console.log(err));
  }, []);
  console.log("displaying opdrachten");
  return (
    <div>
      <h1>Student View</h1>
      <hr />
      {/* <p>Connected: {"" + isConnected}</p> */}
      {opdrachten.map((o) => (
        <Container key={o.id}>
          <h1>{o.naam}</h1>
          {o.elementen.map((e) => (
            <OpdrachtElement
              key={e.id}
              element={e}
              setSelectedElement={setSelectedElement}
            />
          ))}
        </Container>
      ))}
    </div>
  );
};

export default Opdrachten;

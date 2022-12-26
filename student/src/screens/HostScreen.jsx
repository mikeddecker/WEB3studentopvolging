import React, { useState, useEffect } from "react";

import Container from "react-bootstrap/Container";
import OpdrachtElement from "../components/OpdrachtElement";

import { appUrl } from "../utils/constants";

const HostScreen = ({ setSelectedElement }) => {
  const [opdrachten, setOpdrachten] = useState([]);

  useEffect(() => {
    fetch(appUrl + "/opdrachten")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setOpdrachten(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <h1>Host View</h1>
      <hr />
      <Container>
        {opdrachten.map((o) => (
          <div key={o.id}>
            <h1 className="text-muted">Opdrachten:</h1>
            <h3>{o.naam}</h3>
            {o.elementen.map((e) => (
              <OpdrachtElement
                key={e.id}
                element={e}
                setSelectedElement={setSelectedElement}
                host={true}
              />
            ))}
          </div>
        ))}
      </Container>
    </>
  );
};

export default HostScreen;

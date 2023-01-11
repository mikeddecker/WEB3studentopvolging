import React, { useState, useEffect } from "react";

import Container from "react-bootstrap/Container";
import OpdrachtElement from "../components/OpdrachtElement";

import { appUrl } from "../utils/constants";
import axios from 'axios';

const HostScreen = ({ setSelectedElement }) => {
  const [opdrachten, setOpdrachten] = useState([]);

  useEffect(() => {
    const getOpdrachten = async () => {
      const response = await axios.get(appUrl + "/opdrachten");
      if (response.status === 202) {
        setOpdrachten(response.data);
      } else {
        console.error(response);
      }
    };
    getOpdrachten();
  }, []);
  console.log(opdrachten);
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

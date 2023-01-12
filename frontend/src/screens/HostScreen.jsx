import React, { useState, useEffect } from "react";

import Container from "react-bootstrap/Container";
import OpdrachtElement from "../components/OpdrachtElement";

import { appUrl } from "../utils/constants";
import axios from 'axios';
import { useSockets } from '../contexts/socketContext';

const HostScreen = ({ setSelectedElement }) => {
  const [opdrachten, setOpdrachten] = useState([]);
  const socketContext = useSockets();

  useEffect(() => {
    const getOpdrachten = async () => {
      const response = await axios.get(appUrl + "/opdrachten");
      if (response.status === 202) {
        console.log(response.data);
        setOpdrachten(response.data);
      } else {
        console.error(response);
      }
      
      console.log('get opdrachten');
      const kahootresponse = await axios.post(appUrl + "/opdrachten/sluitkahoot", { data: false }, {withCredentials: true});
      console.log(kahootresponse.status);
      if (kahootresponse.status >= 200 &&kahootresponse.status<300){
        console.log("geen actieve kahootvragen");
      }
      console.log('rerender host');
    };
    getOpdrachten();
  }, [socketContext?.socket]);
  console.log(opdrachten);
  return (
    <div className="">
      <h1>Host View</h1>
      <hr />
      <Container >
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
    </div>
  );
};

export default HostScreen;

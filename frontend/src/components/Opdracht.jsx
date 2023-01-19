import React, { useState, useEffect } from "react";
import { appUrl } from "../utils/constants";
import OpdrachtForm from "./OpdrachtForm";
import { useSockets } from "../contexts/socketContext";
import axios from 'axios';

const Opdracht = () => {
  const [kahootOpdrachtElement, setKahootOpdrachtElement] = useState(undefined);
  const [tmpBeschr, setTmpBeschr] = useState((new Date(Date.now())).toISOString());

  const socketContext = useSockets();
  socketContext.socket.on("nkvs", (beschr) => {console.log("ontvangen van nkvs socket " + beschr ); setTmpBeschr(beschr);});

  useEffect(() => {
    const getKahootOpdracht = async () => {
      const response = await axios.get(appUrl + "/opdrachten/kahoot");
      console.log(response.status);
      console.log(response);
      setKahootOpdrachtElement(response.data);
    }
    getKahootOpdracht();
  }, [socketContext?.socket, tmpBeschr]);


  console.log("displaying opdrachten");
  console.log(kahootOpdrachtElement);
  return (
    <div>
      <h1>Student View</h1>
      <hr />
      {/* <p>Connected: {"" + isConnected}</p> */}
      {kahootOpdrachtElement ?
        <div className="container">
          <h2>{kahootOpdrachtElement.naam}</h2>
          <OpdrachtForm element={kahootOpdrachtElement} />
        </div>
        :
        <p>Geen opdracht beschikbaar</p>}

    </div>
  );
};

export default Opdracht;

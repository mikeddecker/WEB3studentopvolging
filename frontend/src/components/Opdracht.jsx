import React, { useState, useEffect } from "react";
import OpdrachtElement from "./OpdrachtElement";
import { appUrl } from "../utils/constants";
import OpdrachtForm from "./OpdrachtForm";
import { useSockets } from "../contexts/socketContext";
import axios from 'axios';

const Opdracht = ({ setSelectedElement }) => {
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
      await setTimeout(100);
      socketContext.socket.emit('studentRapportUpdate');
    }
    getKahootOpdracht();
    //socketContext.socket.on("nieuw", () => { console.log("nieuwe kahootvraag gekregen van server"); console.log("oe"); console.log("oe"); });
    // fetch()
    //   .then((response) => {
    //     return response.json();
    //   })
    //   .then((data) => {
    //     setKahootOpdrachtElement(data);
    //     console.log(data);
    //     console.log("datalogged");
    //   })
    //   .catch((err) => console.log(err));
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

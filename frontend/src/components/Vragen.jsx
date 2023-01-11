import React from 'react';
import { useEffect, useState } from 'react';
import { useSockets } from "../contexts/socketContext";


function Vragen(props) {
  const [vragenlijst, setVragenLijst] = useState([]);
  setVragenLijst(props.vragen);
  const socketContext = useSockets();

  socketContext.socket.on("nieuweVraag", (vraag) => {setVragenLijst(...vragenlijst, vraag)});

  return (
    <div className="center">
      <h1 className="text-blue-600">
        <ul>
          {vragenlijst.map((vraag) => (
            <li>{vraag}</li>
          ))}
        </ul>
      </h1>
    </div>
  );
}

export default Vragen;
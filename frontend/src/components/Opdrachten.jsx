import React, { useState, useEffect } from "react";
import OpdrachtElement from "./OpdrachtElement";
import { appUrl } from "../utils/constants";
import OpdrachtForm from "./OpdrachtForm";

const Opdrachten = ({ setSelectedElement }) => {
  const [kahootOpdracht, setKahootOpdracht] = useState(undefined);

  useEffect(() => {
    fetch(appUrl + "/opdrachten/kahoot")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setKahootOpdracht(data);
        console.log(data);
        console.log("datalogged");
      })
      .catch((err) => console.log(err));
  }, []);

  console.log("displaying opdrachten");
  let aantalElementen = 0;
  if (kahootOpdracht) {

    aantalElementen = kahootOpdracht ? kahootOpdracht.elementen.length : 0;
    console.log(kahootOpdracht.elementen);
    console.log(setSelectedElement);
    console.log();
  }
  return (
    <div>
      <h1>Student View</h1>
      <hr />
      {/* <p>Connected: {"" + isConnected}</p> */}
      {aantalElementen > 0 ?
        <div className="container">
          <h2>{kahootOpdracht.naam}</h2>
          <OpdrachtForm element={kahootOpdracht.elementen[0]} />
        </div>
        :
        <p>Geen opdracht beschikbaar</p>}

    </div>
  );
};

export default Opdrachten;

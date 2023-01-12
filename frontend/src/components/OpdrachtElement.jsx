import React from "react";
import { useNavigate } from "react-router-dom";
import { Progress } from "@material-tailwind/react";


const OpdrachtElement = ({ element, setSelectedElement, host = false }) => {
  const occurrences = [0, 0, 0, 0, 0];
  const students = Number.parseInt(element.rapporten.length);

  
  element.rapporten
  .map((r) => r.status)
  .map((s) => (occurrences[s] = occurrences[s] + 1));
  
  const navigate = useNavigate();
  const handleClick = (element) => {
    setSelectedElement(element);
    if (host) {
      console.log("Opdracht element");
      console.log(element);
      navigate("/dashboard");
    } else {
      //navigate("/element");
    }
  };

  const widthVerhouding = (occArray) => {
    // TODO update, 33/40 herkent hij niet
    let occ = occArray.reduce((totOcc, occurence) => totOcc + Number.parseInt(occurence), 0);
    return occ/students === 1 ? 'full' : `${occ}/${students}`;
  }

  return (
    <div
      className="container border-2 rounded-2xl text-center m-10 p-10"
      style={{ minHeight: 100 }}
      onClick={() => handleClick(element)}>
      <div className="d-flex justify-content-between align-items-center">
        <p className="fw-bold">{element.beschrijving}</p>
      </div>
      {students > 0 ? 
      <div>
        <span className="text-green-600 font-medium">{students} student(en) met een inzending</span>
      </div>
        : <span>Nog geen rapporten</span>}
    </div>
  );
};

export default OpdrachtElement;

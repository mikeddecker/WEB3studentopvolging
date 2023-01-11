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
    console.log("Opdracht element");
    if (host) {
      navigate("/dashboard");
    } else {
      //navigate("/element");
    }
  };

  const widthVerhouding = (occ) => {
    return `${occ}/${students}`==='1/1' ? 'full' : `${occ}/${students}`;
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
        <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700 flex">
          <div className={`bg-yellow-600 h-2 w-${widthVerhouding(occurrences[0])}`}></div>
          <div className={`bg-red-600 h-2 w-${widthVerhouding(occurrences[1])}`}></div>
          <div className={`bg-red-600 h-2 w-${widthVerhouding(occurrences[2]+occurrences[3])}`}></div>
          <div className={`bg-green-600 h-2 w-${widthVerhouding(occurrences[4])}`}></div>
        </div>
      </div>
        : <span>Nog geen rapporten</span>}
    </div>
  );
};

export default OpdrachtElement;

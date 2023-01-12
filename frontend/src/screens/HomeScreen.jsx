import React from "react";


import Opdracht from "../components/Opdracht";

const HomeScreen = ({ setSelectedElement }) => {

  console.log("display home screen");
  return (
    <div>
      <Opdracht setSelectedElement={setSelectedElement} />
    </div>
  );
};

export default HomeScreen;

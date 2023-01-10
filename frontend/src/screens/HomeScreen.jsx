import React from "react";

import Opdrachten from "../components/Opdrachten";

const HomeScreen = ({ setSelectedElement }) => {
  console.log("display home screen");
  return (
    <div>
      <Opdrachten setSelectedElement={setSelectedElement} />
    </div>
  );
};

export default HomeScreen;

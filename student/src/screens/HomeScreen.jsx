import React from "react";

import Opdrachten from "../components/Opdrachten";

const HomeScreen = ({ setSelectedElement }) => {
  return (
    <div>
      <Opdrachten setSelectedElement={setSelectedElement} />
    </div>
  );
};

export default HomeScreen;

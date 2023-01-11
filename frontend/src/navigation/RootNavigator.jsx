import React from "react";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import DashboardScreen from "../screens/DashboardScreen";
import HomeScreen from "../screens/HomeScreen";
import HostScreen from "../screens/HostScreen";
import LoginScreen from "../screens/LoginScreen";
//import OpdrachtFormScreen from "../screens/OpdrachtFormScreen";
import ProtectedRoute from "./ProtectedRoute";

const RootNavigator = () => {
  
  const [selectedElement, setSelectedElement] = useState(null);

  return (
    <div className="d-flex flex-column flex-1 min-vh-100">
      <Routes>
        <Route path="/login" element={<LoginScreen />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomeScreen setSelectedElement={setSelectedElement} />
            </ProtectedRoute>
          }
        />
        {/* <Route
          path="/element"
          element={
            <ProtectedRoute>
              <OpdrachtFormScreen element={selectedElement} />
            </ProtectedRoute>
          }
        /> */}
        <Route
          path="/host"
          element={<HostScreen setSelectedElement={setSelectedElement} />}
        />
        <Route
          path="/dashboard"
          element={<DashboardScreen element={selectedElement} />}
        />
      </Routes>
    </div>
  );
};

export default RootNavigator;

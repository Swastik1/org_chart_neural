// src/App.jsx
import React from "react";
import OrgChartD3 from "./components/OrgChartD3";

const data = {
  nodes: [
    { id: "CEO", color: "#3498db" },
    { id: "Manager1", color: "#3498db" },
    { id: "Manager2", color: "#3498db" },
    { id: "Employee1", color: "#3498db" },
    { id: "Employee2", color: "#3498db" },
  ],
  links: [
    { source: "CEO", target: "Manager1" },
    { source: "CEO", target: "Manager2" },
    { source: "Manager1", target: "Employee1" },
    { source: "Manager2", target: "Employee2" },
  ],
};

const App = () => {
  return (
    <div className="App">
      <OrgChartD3 data={data} />
    </div>
  );
};

export default App;

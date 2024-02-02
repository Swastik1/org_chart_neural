import React, { useState } from "react";
import OrgChartD3 from "./components/OrgChartD3";

const initialData = {
  nodes: [
    { id: "Portfolios", label: "Portfolios", color: "#3498db" },
    { id: "Business Banking", label: "Business Banking", color: "#3498db" },
    { id: "Accounts Payable", label: "Accounts Payable", color: "#3498db" },
    { id: "BB Bento", label: "BB Bento", color: "#3498db" },
    { id: "BB Card", label: "BB Card", color: "#3498db" },
    {
      id: "Team Members",
      label: "BB IE RPS - Digital Servicing",
      color: "#3498db",
    },
    { id: "Amy Shaw", label: "Amy Shaw", color: "#3498db" },
    { id: "John Doe", label: "John Doe", color: "#3498db" },
  ],
  links: [
    { source: "Portfolios", target: "Business Banking" },
    { source: "Business Banking", target: "Accounts Payable" },
    { source: "Accounts Payable", target: "BB Bento" },
    { source: "Accounts Payable", target: "BB Card" },
    { source: "BB Bento", target: "Team Members" },
    { source: "Team Members", target: "Amy Shaw" },
    { source: "Team Members", target: "John Doe" },
  ],
};

const App = () => {
  const [data, setData] = useState(initialData);
  const [selectedNode, setSelectedNode] = useState(null);

  const handleNodeClick = (nodeId) => {
    if (selectedNode === nodeId) {
      setSelectedNode(null);
    } else {
      const highlightedNodes = [nodeId];
      data.links.forEach((link) => {
        if (link.source === nodeId) {
          highlightedNodes.push(link.target);
        }
      });
      setData((prevData) => ({
        ...prevData,
        nodes: prevData.nodes.map((node) => ({
          ...node,
          color: highlightedNodes.includes(node.id) ? "#e74c3c" : "#3498db",
        })),
      }));
      setSelectedNode(nodeId);
    }
  };

  return (
    <div className="App">
      <OrgChartD3
        data={data}
        onNodeClick={handleNodeClick}
        selectedNode={selectedNode}
      />
    </div>
  );
};

export default App;

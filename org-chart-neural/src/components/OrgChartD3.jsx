import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import "./OrgChartD3.css";

const OrgChartD3 = ({ data, onNodeClick }) => {
  const chartRef = useRef();

  useEffect(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    const svg = d3
      .select(chartRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    const simulation = d3
      .forceSimulation()
      .force(
        "link",
        d3
          .forceLink()
          .id((d) => d.id)
          .distance(150)
      )
      .force("charge", d3.forceManyBody().strength(-200))
      .force("center", d3.forceCenter(width / 2, height / 2));

    const drag = (simulation) => {
      function dragstarted(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      }

      function dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
      }

      function dragended(event, d) {
        if (!event.active) simulation.alphaTarget(0);
        //Comment out or remove the following lines to prevent spreading out on click
        d.fx = null;
        d.fy = null;
      }

      return d3
        .drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);
    };

    const link = svg
      .append("g")
      .attr("class", "links")
      .selectAll("line")
      .data(data.links)
      .enter()
      .append("line")
      .attr("class", "link");

    const node = svg
      .append("g")
      .attr("class", "nodes")
      .selectAll(".node")
      .data(data.nodes)
      .enter()
      .append("g")
      .attr("class", "node")
      .call(drag(simulation))
      .on("click", (d) => {
        onNodeClick(d.id);
        d3.selectAll(".link").classed(
          "highlighted",
          (link) => link.source.id === d.id
        );
      });

    // Add a rectangle for each node to represent a card
    node
      .append("rect")
      .attr("width", 120)
      .attr("height", 60)
      .attr("rx", 10) // Border radius
      .attr("ry", 10) // Border radius
      .attr("fill", (d) => (d.parent ? "#f95959" : "#2a2438"));

    // Add text labels within each card
    node
      .append("text")
      .attr("x", 60)
      .attr("y", 30)
      .attr("text-anchor", "middle")
      .attr("dy", "0.3em")
      .attr("fill", "#90f6d7")
      .attr("font-weight", "normal")
      .text((d) => d.id);

    simulation.nodes(data.nodes);
    simulation.force("link").links(data.links);
    simulation.alpha(1).restart();

    simulation.on("tick", () => {
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

      node.attr("transform", (d) => `translate(${d.x - 60},${d.y - 30})`);
    });

    return () => {
      svg.selectAll("*").remove();
      simulation.stop();
    };
  }, [data, onNodeClick]);

  return <div className="chart-container" ref={chartRef} />;
};

export default OrgChartD3;

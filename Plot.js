import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const ScatterPlot = ({ isVisible, onClose }) => {
  const graphRef = useRef(null);

  useEffect(() => {
    if (isVisible) {
      const data = [
        { index: 0, tension: 250.115616, torsion: 0.939354, bendingMomentX: 8.227668, bendingMomentY: 10.150800, time: 31.758400, temperature: 25.062500 },
        { index: 1, tension: 329.697845, torsion: -0.264946, bendingMomentX: 0.976164, bendingMomentY: 1.153500, time: 31.758800, temperature: 25.062500 },
        { index: 2, tension: 181.902267, torsion: 1.180214, bendingMomentX: 0.697260, bendingMomentY: -0.738240, time: 31.759200, temperature: 25.062500 },
        { index: 3, tension: 170.533371, torsion: 0.553978, bendingMomentX: -1.022648, bendingMomentY: 0.369120, time: 31.759600, temperature: 25.062500 },
        { index: 4, tension: 255.800064, torsion: 0.024086, bendingMomentX: -3.904656, bendingMomentY: -4.798560, time: 31.760000, temperature: 25.062500 },
        { index: 50, tension: 255.800064, torsion: 0.024086, bendingMomentX: -3.904656, bendingMomentY: -4.798560, time: 31.760000, temperature: 25.062500 },
      ];
      const margin = { top: 20, right: 30, bottom: 30, left: 40 };
      const width = 370 - margin.left - margin.right;
      const height = 160 - margin.top - margin.bottom;
      const svg = d3.select(graphRef.current)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);


      const xScale = d3.scaleLinear()
        .domain([-30, d3.max(data, d => d.index)])
        .range([0, width]);

      const yScale = d3.scaleLinear()
        .domain([-200, d3.max(data, d => d.tension)])
        .range([height, 0]);
      const line = d3.line().x((d, i) => xScale(i)).y(d => yScale(d));

      svg.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", d => xScale(d.index))
        .attr("cy", d => yScale(d.tension))
        .attr("r", 5);

      // Add axes
      svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(xScale));
      svg.append('line')
        .attr('x1', xScale(0))
        .attr('y1', 0)
        .attr('x2', xScale(0))
        .attr('y2', height)
        .attr('stroke', 'black')
        .attr('stroke-width', 1)
        .attr('stroke-dasharray', '4 4');

      svg.append("g")
        .call(d3.axisLeft(yScale));
      svg.append('line')
        .attr('x1', 0)
        .attr('y1', yScale(0))
        .attr('x2', width)
        .attr('y2', yScale(0))
        .attr('stroke', 'black')
        .attr('stroke-width', 1)
        .attr('stroke-dasharray', '4 4'); // Optional: add dashes for better visibility
      // Draw the line 
      svg.append('path')
        .data([data])
        .attr('d', line)
        .attr('fill', 'none')
        .attr('stroke', 'steelblue')
        .attr('stroke-width', 2);
    return () => {
        d3.select(graphRef.current).selectAll("svg").remove();
      };
    }
  }, [isVisible]);
  return (

    <div className="scatter-plot" style={{ display: isVisible ? 'inline-block' : 'none' }}>
      <div ref={graphRef}></div>
      <div>
        <h1>objwqnsl</h1>
      </div>
    </div>
  );

};
const HorizontalScatterPlots = ({ data, isVisible, onClose }) => {
  return (
    <div className="horizontal-scatter-plots">
      {data.map((plotData, index) => (

        <ScatterPlot key={index} data={plotData} isVisible={isVisible} onClose={onClose} />
      ))}
    </div>
  );
};
const VerticalScatterPlots = ({ data, isVisible, onClose }) => {
  return (
    <div className="vertical-scatter-plots">
      {data.map((plotData, index) => (
        <ScatterPlot key={index} data={plotData} isVisible={isVisible} onClose={onClose} />
      ))}
    </div>
  );
};
const Plot = () => {
  // Sample data for each graph
  const graphData = [
    { index: 0, tension: 250.115616, torsion: 0.939354, bendingMomentX: 8.227668, bendingMomentY: 10.150800, time: 31.758400, temperature: 25.062500 },
    // { index: 1, tension: 329.697845, torsion: -0.264946, bendingMomentX: 0.976164, bendingMomentY: 1.153500, time: 31.758800, temperature: 25.062500 },
    // { index: 2, tension: 329.697845, torsion: -0.264946, bendingMomentX: 0.976164, bendingMomentY: 1.153500, time: 31.758800, temperature: 25.062500 },
    // { index: 3, tension: 329.697845, torsion: -0.264946, bendingMomentX: 0.976164, bendingMomentY: 1.153500, time: 31.758800, temperature: 25.062500 },
    // { index: 4, tension: 329.697845, torsion: -0.264946, bendingMomentX: 0.976164, bendingMomentY: 1.153500, time: 31.758800, temperature: 25.062500 },
    // { index: 5, tension: 329.697845, torsion: -0.264946, bendingMomentX: 0.976164, bendingMomentY: 1.153500, time: 31.758800, temperature: 25.062500 },

    // data for the first graph
    // ... (similar structure as your sample data)
    // data for the second graph
    // ...
    // Repeat for the remaining graphs
  ];

  const rows = [];
  const columns = 1; // Number of columns
  for (let i = 6; i < graphData.length; i += columns) {
    rows.push(graphData.slice(i, i + columns));
  }
  return (
    <div className="container">
      <div className="horizontal-layout">
        {/* <HorizontalScatterPlots data={graphData} isVisible={true} /> */}
      </div>
      
        <div className="row">
            <div className="col">
                <ScatterPlot data={graphData} isVisible={true} />
            </div>

        </div>

    </div>
  );
};
export default Plot;
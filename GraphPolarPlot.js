import React, { useEffect, useRef, useState } from 'react';
import Plotly from 'plotly.js-dist';

const GraphicPolarPlot = ({ isVisible, onClose }) => {
  const [selectedFolderFiles, setSelectedFolderFiles] = useState([]);
  const [selectedFolderCheckboxes, setSelectedFolderCheckboxes] = useState({});
  const [folderPath, setFolderPath] = useState('');
  const plotColors = ['#FF5733', '#33FF57', '#334CFF', '#FF33EC', '#AACCFF', '#FFAABB', '#FF0000', '#00FF00', '#0000FF', '#FFFF00'];
  const [graphData, setGraphData] = useState([]);
  const [showGraph, setShowGraph] = useState(true);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const graphContainerRef = useRef(null);
  const [graphLimits, setGraphLimits] = useState([-4.65947, 4.65947]);
  const [calculateValues, setCalculateValues] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [showAngleCalculator, setShowAngleCalculator] = useState(false);
  const [showValueCalculator, setShowValueCalculator] = useState(false);
  const [showPointCalculatorPopup, setShowPointCalculatorPopup] = useState(false);
  const [showZeroPointCalculatorPopup, setShowZeroPointCalculatorPopup] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  const handleToggleValueCalculator = () => setShowValueCalculator(!showValueCalculator);
  const handleToggleCalculateValues = () => setCalculateValues(!calculateValues);
  const handleToggleAngleCalculator = () => setShowAngleCalculator(!showAngleCalculator);
 

  const handlePopupClose = () => {
    setShowPointCalculatorPopup(false);
  };
  const handleZeroPointCalculatorClick = () => {
    setShowZeroPointCalculatorPopup(!showZeroPointCalculatorPopup);
  };
  const handleZeroPointCalculatorPopupClose = () => {
    setShowZeroPointCalculatorPopup(!showZeroPointCalculatorPopup);
  };
// pop up messsage after 6 graphs 
const PopupMessage = ({ message, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div className="bg-white p-4 rounded-md flex flex-col">
    <div className="flex justify-end">
      <button className="bg-red-500 text-white hover:bg-red-600 px-4 py-2 rounded"onClick={onClose}>
          X
        </button>
        </div>
      <div className="text-xl mb-4">{message}</div>
      <div className="flex justify-center">
        <button
          className="bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded mr-2"
          onClick={onClose}
        >
          OK
        </button>
       
      </div>
    </div>
  </div>
);
  const handleFolderSelect = async () => {
    try {
      const folderInput = document.createElement('input');
      folderInput.setAttribute('type', 'file');
      folderInput.setAttribute('webkitdirectory', true);

      folderInput.addEventListener('change', async (e) => {
        const files = e.target.files;
        if (files.length > 0) {
          const fileList = Array.from(files);
          setSelectedFolderFiles(fileList);
          setSelectedFolderCheckboxes({});

          const folderPath = fileList[0].webkitRelativePath;

          handleCheckboxChange(fileList[0]);

          setFolderPath(folderPath);
        }
      });

      folderInput.click();
    } catch (error) {
      console.error('Error selecting folder:', error);
    }
  };

  const handleCheckboxChange = async (file) => {
    try {
      const updatedCheckboxes = { ...selectedFolderCheckboxes };
      if (Object.keys(updatedCheckboxes).length === 0) {
        // Prevent the first checkbox from being selected initially
        updatedCheckboxes[file.name] = false;
      } else {
        updatedCheckboxes[file.name] = !updatedCheckboxes[file.name];
      }
  
      const updatedSelectedFiles = Object.keys(updatedCheckboxes)
        .filter((fileName) => updatedCheckboxes[fileName])
        .map((fileName) => selectedFolderFiles.find((file) => file.name === fileName));
  
      // Sort the selected files based on the series number
      updatedSelectedFiles.sort((a, b) => {
        const getSeriesNumber = (filename) => {
          const match = filename.match(/(\d+)$/);
          return match ? parseInt(match[1]) : 0;
        };
        return getSeriesNumber(a.name) - getSeriesNumber(b.name);
      });
  
      if (updatedSelectedFiles.length > 6) {
        // Show a pop-up message if more than 6 files are selected
        setPopupMessage('More than 6 graphs are not possible.');
        setShowPopup(true);
        return;
      }
  
      setSelectedFolderCheckboxes(updatedCheckboxes);
      setSelectedFiles(updatedSelectedFiles);
  
      const processedData = await Promise.all(updatedSelectedFiles.map(async (file, index) => {
        const fileContent = await readFileContent(file);
        const processedContent = processFileContent(fileContent);
        return { file: file.name, data: processedContent, index };
      }));
  
      const updatedGraphData = [...graphData];
      processedData.forEach(({ data, index }) => {
        updatedGraphData[index] = {
          file: updatedSelectedFiles[index].name,
          data,
        };
      });
  
      let maxAbsoluteValue = 0;
      updatedGraphData.forEach(({ data }) => {
        data.forEach(({ bendingMomentX, bendingMomentY }) => {
          const absX = Math.abs(bendingMomentX);
          const absY = Math.abs(bendingMomentY);
          maxAbsoluteValue = Math.max(maxAbsoluteValue, absX, absY);
        });
      });
  
      const newGraphLimits = [-maxAbsoluteValue, maxAbsoluteValue];
      setGraphData(updatedGraphData);
      setShowGraph(true);
      setGraphLimits(newGraphLimits);
    } catch (error) {
      console.error('Error processing files:', error);
    }
  };
  
  
  const closePopup = () => {
    setShowPopup(false);
    setPopupMessage('');
  };


  const readFileContent = async (file) => {
    return new Promise((resolve, reject) => {    
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;
        resolve(content);                 
      };
      reader.onerror = (error) => reject(error);
      reader.readAsText(file);
    });
  };

  const processFileContent = (fileContent) => {
    const lines = fileContent.split('\n');
    const dataStartIndex = lines.findIndex(line => line.startsWith('Tension;Torsion;Bending moment X;Bending moment Y;Time;Temperature'));

    if (dataStartIndex !== -1) {
      const data = lines.slice(dataStartIndex + 2).map(line => {
        const [Tension, _torsion_, bendingMomentX, bendingMomentY, _time__, _temperature__] = line.split(';');
        return { bendingMomentX: parseFloat(bendingMomentX), bendingMomentY: parseFloat(bendingMomentY) };
      });

      const maxLength = Math.max(data.length, data.filter(({ bendingMomentX }) => !isNaN(bendingMomentX)).length, data.filter(({ bendingMomentY }) => !isNaN(bendingMomentY)).length);
      const alignedData = data.map(({ bendingMomentX, bendingMomentY }) => ({
        bendingMomentX: isNaN(bendingMomentX) ? 0 : bendingMomentX,
        bendingMomentY: isNaN(bendingMomentY) ? 0 : bendingMomentY,
      }));
      while (alignedData.length < maxLength) {
        alignedData.push({ bendingMomentX: 0, bendingMomentY: 0 });
      }

      return alignedData;
    } else {
      return [];
    }
  };
  useEffect(() => {
    const initialGraphData = Array.from({ length: 6 }, (_, index) => ({
      file: ` ${index + 1}`,
      data: Array.from({ length: 100 }, (_, i) => ({
        bendingMomentX: 0,
        bendingMomentY: 0
      })),
    }));

    setGraphData(initialGraphData);
  }, []);

  const timeLabels = graphData.length > 0 ? graphData[0].data.map((_, i) => i) : [];

  useEffect(() => {
    if (showGraph) {
      const rows = 2;
      const cols = 3;
      const graphContainerId = 'graph-container';
      const container = graphContainerRef.current;
      container.innerHTML = '';
      const containerMaxWidth = 800; // Adjust this value as needed
      const containerWidthPercent = 100 / cols;

      for (let row = 0; row < rows; row++) {
        const rowContainer = document.createElement('div');
        rowContainer.style.display = 'flex';

        for (let col = 0; col < cols; col++) {
          const index = col + row * cols;
          if (index < graphData.length) {
            const modifiedData = graphData[index].data.map((point, pointIndex, arr) => {
              if (pointIndex === arr.length - 1) {
                return {
                  bendingMomentX: arr[0].bendingMomentX,
                  bendingMomentY: arr[0].bendingMomentY,
                };
              }
              return point;
            });

            const trace = {
              x: modifiedData.map(d => d.bendingMomentX),
              y: modifiedData.map(d => d.bendingMomentY),
              
              text: modifiedData.map(d => `(${d.bendingMomentX}, ${d.bendingMomentY})`),
              mode: 'markers',
              type: 'scatter',
              marker: {
                symbol: 'diamond',
                color: plotColors[index % plotColors.length],
              },
            };

            const midpointX = (graphLimits[0] + graphLimits[1]) / 2;
            const midpointY = (graphLimits[0] + graphLimits[1]) / 2;

            const layout = {
              xaxis: {
                title: 'Bending Moment X' ,
                zeroline: true,
                zerolinecolor: 'black',
                showline: true,
                showticklabels: true,
                ticks: 'inside',
                tickvals: [graphLimits[0], 0, graphLimits[1]],
                range: graphLimits,
                fixedrange: true,
                tickmode: 'array',
              },
              yaxis: {
                title: 'Bending Moment Y',
                zeroline: true,
                zerolinecolor: 'black',
                showline: true,
                showticklabels: true,
                tickmode: 'array',
                tickvals: [
                  graphLimits[0],
                  Math.round(graphLimits[0] * 0.2),
                  Math.round(graphLimits[0] * 0.4),
                  Math.round(graphLimits[0] * 0.6),
                  Math.round(graphLimits[0] * 0.8),
                  0,
                  Math.round(graphLimits[1] * 0.2),
                  Math.round(graphLimits[1] * 0.4),
                  Math.round(graphLimits[1] * 0.6),
                  Math.round(graphLimits[1] * 0.8),
                  graphLimits[1],
                ],
                ticks: 'inside',
                range: graphLimits,
                fixedrange: true,
              },
              shapes: [
                {
                  type: 'line',
                  x0: midpointX,
                  x1: midpointX,
                  y0: graphLimits[0],
                  y1: graphLimits[1],
                  line: {
                    color: 'black',
                    width: 2,
                    dash: 'dashdot',
                  },
                },
                {
                  type: 'line',
                  x0: graphLimits[0],
                  x1: graphLimits[1],
                  y0: midpointY,
                  y1: midpointY,
                  line: {
                    color: 'black',
                    width: 2,
                    dash: 'dashdot',
                  },
                },
              ],
              dragmode: calculateValues ? 'select' : false,
              modebar: {
                remove: [
                  'select2d', 'lasso2d', 'zoomIn2d', 'zoomOut2d', 'autoScale2d', 'resetScale2d', 'hoverClosestCartesian', 'hoverCompareCartesian', 'toggleSpikelines', 'resetViews', 'sendDataToCloud', 'toggleHover', 'resetViewMapbox', 'resetCameraDefault3d', 'resetCameraLastSave3d',
                ],
              },
            };

            const config = {
              displayModeBar: false,
              displaylogo: false,
            };

            const newGraphContainer = document.createElement('div');
            newGraphContainer.id = `${graphContainerId}-${index}`;
            newGraphContainer.style.width = `${containerWidthPercent}%`;
            newGraphContainer.style.maxWidth = `${containerMaxWidth}px`; // Set maximum width
            newGraphContainer.style.float = 'left';
            newGraphContainer.style.border = '2px solid #ccc';
            newGraphContainer.style.margin = '10px';
            newGraphContainer.style.backgroundColor ='gray';
            newGraphContainer.style.marginRight = '2px'; // Add right margin
            rowContainer.appendChild(newGraphContainer);

            const fileNameElement = document.createElement('div');
            fileNameElement.innerText = graphData[index].file;
            fileNameElement.style.textAlign = 'center';
            fileNameElement.style.marginBottom = '5px';
            newGraphContainer.appendChild(fileNameElement);

            const graphElement = document.createElement('div');
            graphElement.style.width = '80%';
            newGraphContainer.appendChild(graphElement);

            Plotly.newPlot(graphElement, [trace], layout, config);
          }
        }

        container.appendChild(rowContainer);
      }
    }
  }, [showGraph, graphData, graphLimits, calculateValues]);
  const handlePointCalculatorClick = () => {
    setShowPointCalculatorPopup(true);
  };
  const handlePointCalculatorPopupClose = () => {
    setShowPointCalculatorPopup(false);
  };
  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ${isVisible ? '' : 'hidden'}`}>
      <div className="bg-white p-2 rounded-md flex flex-col w-full max-w-8xl " onClick={(e) => e.stopPropagation()}>
        <div className="w-full flex">
          <div className="flex-1" ref={graphContainerRef}>
            <div id="graph-container"></div>
          </div>
          <div className="ml-8">
            <label htmlFor="folderInput" className="block">Folder of polarplot files: </label>
            <div style={{ display: "flex", border: "1px solid #555555", }}>
              <label className="inline-block w-6 h-6" onClick={handleFolderSelect}> 📁</label>
              <div className="mt-2">
                <input id="folderInput" type="text" readOnly value={folderPath}className="border border-gray-300 p-2 rounded-md w-full"
                  style={{ border: '1px solid #555555' }}/>
              </div>
            </div>
            <label>List of polarplot Files:</label>
            <div style={{ height: '400px', overflowY: 'auto', border: '1px solid black', padding: '5px' }}>
              <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                {selectedFolderFiles.map((file, index) => (
                  <li key={index} style={{ padding: '5px 0' }}>
                    <label>
                      <input type="checkbox"checked={selectedFolderCheckboxes[file.name] || false} onChange={() => handleCheckboxChange(file)}/>
                      {file.name}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
            {showPopup && <PopupMessage message={popupMessage} onClose={closePopup} />}
            <button  className="mt-4 bg-gray-300 text-black hover:bg-gray-400 px-4 py-2 rounded"onClick={onClose}  style={{ width: '200px', height: '50px' }}>Exit</button>
            <button
              className={`block mt-4 ${showAngleCalculator ? 'bg-green-500 text-white' : 'bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded'}`}
              onClick={handleToggleAngleCalculator}
              style={{ width: '200px', height: '50px' }}>
              {showAngleCalculator ? 'Hide Angle Calculator' : 'Show Angle Calculator'}
            </button>
            <button
              className={`block mt-4 ${showPointCalculatorPopup ? 'bg-green-500 text-white' : 'bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-1 rounded'}`}
              onClick={handlePointCalculatorClick} style={{ width: '200px', height: '50px' }}>
              Point Calculator at stress
            </button>
            {/* <button
              className={`block mt-4 ${showZeroPointCalculatorPopup ? 'bg-green-500 text-white' : 'bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-1 rounded'}`}
              onClick={handleZeroPointCalculatorClick} style={{ width: '200px', height: '50px' }}>
              Point Calculator at zero point
            </button> */}
            <button
              className={`block mt-4 ${showValueCalculator ? 'bg-green-500 text-white' : 'bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-1 rounded'}`}
              onClick={handleToggleValueCalculator} style={{ width: '200px', height: '50px' }}>
              {showValueCalculator ? 'Value Calculator On' : 'Value Calculator Off'}
            </button>
            <button  className="mt-4 bg-gray-300 text-black hover:bg-gray-400 px-4 py-2 rounded"  style={{ width: '200px', height: '50px' }}>Report</button>
            <button
              className={`block mt-4 ${showZeroPointCalculatorPopup ? 'bg-green-500 text-white' : 'bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-1 rounded'}`}
              onClick={handleZeroPointCalculatorClick} style={{ width: '200px', height: '50px' }}>
              Show / not Show at Stress point
            </button>
            {showValueCalculator && (
              <div className="mt-4">
              </div>
            )}
          </div>
        </div>
        {showPointCalculatorPopup && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-4 rounded-md">
                <div className="flex justify-end">
                  <button className="text-red-500 hover:text-red-700" onClick={handlePopupClose}>X</button>
                </div>
                <p>Please click on the stress point first.</p>
                <div className="flex justify-center">
                <button className="bg-blue-500 text-white mt-2" onClick={handlePointCalculatorPopupClose}>OK</button>
                </div>
              </div>
            </div>
          )}
          {showZeroPointCalculatorPopup && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-4 rounded-md">
                <div className="flex justify-end">
                  <button className="text-red-500 hover:text-red-700" onClick={handleZeroPointCalculatorPopupClose}>X</button>
                </div>
                <p>Please click on the zero point first.</p>
                <div className="flex justify-center">
                <button className="bg-blue-500 text-white mt-2" onClick={handleZeroPointCalculatorPopupClose}>OK</button>
              </div>
              </div>
            </div>
          )}
        </div>
      </div>
);
};

export default GraphicPolarPlot;

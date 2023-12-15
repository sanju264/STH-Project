import React, { useState } from 'react';
// import { FaFile } from 'react-icons/fa';
import { Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App(props) {
  const [isCheckedArray, setIsCheckedArray] = useState(Array(9).fill(false));

  const handleCheckboxChange = (index) => {
    const updatedArray = [...isCheckedArray];
    updatedArray[index] = !updatedArray[index];
    setIsCheckedArray(updatedArray);
  };

  const handleFileIconClick = () => {
    // Add your logic for handling the file icon click here
    console.log('File icon clicked!');
    // You can add any additional logic or state updates here
  };

  return (
    <div className='App'>
      <div style={{ textAlign: 'right', marginRight: '10px', marginTop: '10px' }}>
      </div>
      <div>
      <p>Folders of polarplot files</p>
        <p>Lista of polarplot files</p>
        {/* <FaFile
          style={{ fontSize: '24px', cursor: 'pointer' }}
          onClick={handleFileIconClick}/> */}
        <Table responsive striped bordered hover>
          <tbody>
            {[...Array(9).keys()].map((index) => (
              <tr key={index}>
                <td width={3}>
                  <input
                    type="checkbox"
                    checked={isCheckedArray[index]}
                    onChange={() => handleCheckboxChange(index)}
                  />
                </td>
                <td key={index}>{index}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default App;

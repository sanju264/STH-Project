import React from 'react';
import Buttons from './Buttons';

const Buttons = () => {
  return (
    <div className="button-box">
      <button className="small-button">Value Calculator <br />On/Off</button>
      <button className="small-button">Angle Calculator <br />On/Off</button>
      <button className="small-button">Show/Not Show stress Point</button>
      <button className="small-button">Show/Not Show zero Point</button>
      <button className="small-button">Report</button>
      <button className="small-button">Exit</button>
      <button className="small-button">Point Calculator at Stress </button>
      <button className="small-button">Point Calculator at Zero Point</button>
    </div>
  );
};

export default Buttons;



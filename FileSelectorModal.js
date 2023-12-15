import React, { useState, useRef } from 'react';

const FileSelectorModal = ({ isVisible, onClose }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const fileList = event.target.files;
    const selectedFilesArray = Array.from(fileList);
    setSelectedFiles(selectedFilesArray);
  };

  const handleCheckboxChange = (file) => {
    // Handle checkbox change if needed
    // You can access the selectedFiles state to see which files are checked
  };

  const stopPropagation = (event) => {
    event.stopPropagation();
  };

  return (
    <div className={`fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center ${isVisible ? '' : 'hidden'}`} onClick={onClose}>
      <div className="bg-white p-2 rounded-md absolute  top-11 right-0" onClick={stopPropagation}>
        <h2>Selected Files:</h2> <span role="img" aria-label="folder-icon">
              📁
            </span> 
        <input
          type="file"
          webkitdirectory="true"
          multiple
          ref={fileInputRef}
          onChange={handleFileChange}
          className="mr-2 p-2 border border-gray-400 rounded-md"
        />
        <ul>
          {selectedFiles.map((file) => (
            <li key={file.name}>
              <input
                type="checkbox"
                defaultChecked={true} // You can set the default value for the checkbox
                onChange={() => handleCheckboxChange(file)}
              />
              {file.name}
            </li>
          ))}
        </ul>
        <div className="flex justify-end mt-4">
          <button onClick={onClose} className="p-2 text-black bg-gray-800 rounded-md">
            Close
          </button>
          <button className="ml-2 p-2 text-black bg-blue-500 rounded-md" onClick={() => fileInputRef.current && fileInputRef.current.click()}>
            Update Files
          </button>
        </div>
      </div>
    </div>
  );
};

export default FileSelectorModal;



// update code
// import React, { useState, useRef } from 'react';

// const FileSelectorModal = ({ isVisible, onClose, onUpdateFiles }) => {
//   const [selectedFiles, setSelectedFiles] = useState([]);
//   const fileInputRef = useRef(null);

//   const handleFileChange = (event) => {
//     const fileList = event.target.files;
//     const selectedFilesArray = Array.from(fileList);
//     setSelectedFiles(selectedFilesArray);
//   };

//   const handleCheckboxChange = (file) => {
//     // Handle checkbox change if needed
//     // You can access the selectedFiles state to see which files are checked
//   };

//   const stopPropagation = (event) => {
//     event.stopPropagation();
//   };

//   const handleUpdateFiles = () => {
//     // Call the provided onUpdateFiles function with the selected files
//     onUpdateFiles(selectedFiles);
//     // Close the modal
//     onClose();
//   };

//   return (
//     <div className={`fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center ${isVisible ? '' : 'hidden'}`} onClick={onClose}>
//       <div className="bg-white p-2 rounded-md absolute top-11 right-0" onClick={stopPropagation}>
//         <h2>Selected Files:</h2>
//         <span role="img" aria-label="folder-icon">
//           📁
//         </span>
//         <input
//           type="file"
//           webkitdirectory="true"
//           multiple
//           ref={fileInputRef}
//           onChange={handleFileChange}
//           className="mr-2 p-2 border border-gray-400 rounded-md"
//         />
//         <ul>
//           {selectedFiles.map((file) => (
//             <li key={file.name}>
//               <input
//                 type="checkbox"
//                 defaultChecked={true} // You can set the default value for the checkbox
//                 onChange={() => handleCheckboxChange(file)}
//               />
//               {file.name}
//             </li>
//           ))}
//         </ul>
//         <div className="flex flex-col sm:flex-row justify-end mt-4">
//           <button onClick={onClose} className="mb-2 sm:mb-0 p-2 text-black bg-gray-800 rounded-md">
//             Close
//           </button>
//           <button className="ml-2 p-2 text-black bg-blue-500 rounded-md" onClick={handleUpdateFiles}>
//             Update Files
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FileSelectorModal;



// import React, { useState } from 'react';
// import FileSelectorModal from './FileSelectorModal';

// const ParentComponent = () => {
//   const [isModalVisible, setModalVisibility] = useState(false);

//   const handleUpdateFiles = (selectedFiles) => {
//     // Implement logic to update your graph or perform any other action with selected files
//     console.log('Selected Files:', selectedFiles);
//   };

//   const handleOpenModal = () => {
//     setModalVisibility(true);
//   };

//   const handleCloseModal = () => {
//     setModalVisibility(false);
//   };

//   return (
//     <div>
//       <button onClick={handleOpenModal}>Open Modal</button>
//       <FileSelectorModal
//         isVisible={isModalVisible}
//         onClose={handleCloseModal}
//         onUpdateFiles={handleUpdateFiles}
//       />
//     </div>
//   );
// };

// export default ParentComponent;

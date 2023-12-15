
// import File from './components/File';

import './App.css';
import FileSelectorModal from './components/FileSelectorModal';
import UpdateTable from './components/UpdateTable';
import Graphs from './components/Graphs';
// import Insidegraph from './components/Insidegraph';


function App() {
  return (
    <div className="App">
       
       <FileSelectorModal/>
       <UpdateTable/>
      <Graphs />
      {/* <Folderpart/> */}
      {/* <Insidegraph/> */}
      
      
</div>
  );
}

export default App;

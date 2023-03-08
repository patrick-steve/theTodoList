import { useState } from 'react';
import './App.css';
import AddListCard from './components/addTask';
import ViewList from './components/viewTask'

function App() {
  const handlePageChange = (index) => {
    if(index === 0) setCurrentPage(<ViewList changePage={handlePageChange}></ViewList>)
    else if(index === 1) setCurrentPage(<AddListCard changePage={handlePageChange}></AddListCard>)
  }
  
  const [currentPage, setCurrentPage] = useState(<ViewList changePage={handlePageChange}></ViewList>)

  return (
    <div className='App'>
      { currentPage }
    </div>
  );
}



export default App;

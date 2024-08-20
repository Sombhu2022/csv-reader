import React, { useState } from 'react';
import Table1 from './Table1';
import Table2 from './Table2';
import '../style/CsvReader.css'

function CsvReader() {
  const [showTable, setShowTable] = useState(null);

  const handleShowTable1 = () => {
    setShowTable('Table1');
  };

  const handleShowTable2 = () => {
    setShowTable('Table2');
  };

  return (
    <div style={{padding:"20px"}}>
      <div style={{marginBottom:"10px"}}>
        <button
          onClick={handleShowTable1}
          className='btn btn1'
        >
          Show Table 1
        </button>
        <button
          onClick={handleShowTable2}
          className='btn btn2'
        >
          Show Table 2
        </button>
      </div>
      <div>
        {showTable === 'Table1' && <Table1 />}
        {showTable === 'Table2' && <Table2 />}
      </div>
    </div>
  );
}

export default CsvReader;

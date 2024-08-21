import React, { useEffect, useState } from "react";
import useCSVController from "../controller/csvFileController";
import '../style/table2.css'

function Table2() {
  const [convertData, setConvertData] = useState([]);
  const [showData, setShowData] = useState([]);
  const [heading, setHeading] = useState([]);
  const { csvFileConverter } = useCSVController();


  const [loading, setLoading] = useState(false);
  const [option, setOption] = useState("");
  const [inputData, setInputData] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();

    const inputValue = e.target.value.toLowerCase();
    setInputData(inputValue);

    if (option && inputValue) {
        console.log(option , inputData , inputValue);
        
      const updatedData = convertData.filter((ele) => {
        return ele[option]?.toString().toLowerCase().includes(inputValue);
      });

      setShowData(updatedData);
    } else {
      setShowData(convertData);
    }
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await fetch("src/assets/data/csv2.csv");
        let textfile = await response.text();

        // remove unwanted data ... 
        const regex = /Disclaimer - The Data provided in the adjusted 52 week high and adjusted 52 week low columns\s*are adjusted for corporate actions \(bonus, splits & rights\)\.For actual \(unadjusted\) 52 week high & low prices, kindly refer bhavcopy\.|Effective for 19-Aug-2024/g;
        textfile = textfile.replace(regex , '')
        console.log(textfile);
      
        // remove extra space and empty "" , 
        let csvData = textfile; 
        let lines = csvData.split('\n');
        let filteredLines = lines.filter(line => line.trim() !== '""');
        let cleanedCsvData = filteredLines.join('\n');
        console.log(cleanedCsvData);

        
        const { data, success } = await csvFileConverter(cleanedCsvData);
         
        if (success && data.length > 0) {
          
            setShowData(data)
            setConvertData(data)
            const headingData = Object.keys(data[0])
            setHeading(headingData)
          
        }
        setLoading(false)
      } catch (error) {
        console.error("Error converting CSV file:", error);
        setLoading(false)
      }
    };

    fetchData();
  }, []);

  console.log(showData);
  console.log(heading);
  
  if(loading) return(<p>loading...</p>)

  return (
    <div className="table2">
     <div className="search-container">
        <select
          name=""
          id=""
          className="select"
          required
          onChange={(e) => setOption(e.target.value)}
        >
            <option value="" >select option</option>
          {heading &&
            heading?.map((ele, index) => {
              return (
                <option key={index} value={ele}>
                  {ele}
                </option>
              );
            })}
        </select>

        <input
          type="text"
          placeholder="Search..."
          value={inputData}
          onChange={handleSearch}
          className="search-input"
        />
      </div>
      <div className="Table2-table-container">
      <h1>Table 1</h1>
      <div className="table-container ">
      <table>
        <thead>
          <tr>
            {heading.slice(0, 4).map((key) => (
              <th key={key}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {showData.map((ele, index) => {
            
              return (
                <tr key={index}>
                  {heading
                    .slice(0, 4)
                    .map((key, i) => (
                      <td key={i}>{ele[key] }</td>
                    ))}
                </tr>
              );
            
          })}
        </tbody>
      </table>
     </div>
      </div>

      <div className="Table2-table-container">
      <h1>Table 2</h1>
     <div className="table-container ">
      <table>
        <thead>
          <tr>
            {heading
              .slice(0, 2)
              .concat(heading.slice(4, 6))
              .map((key) => (
                <th key={key}>{key}</th>
              ))}
          </tr>
        </thead>
        <tbody>
        {showData.map((ele, index) => {
            
            return (
              <tr key={index}>
                {heading
                  .slice(0, 2).concat(heading.slice(4,6))
                  .map((key, i) => (
                    <td key={i}>{ele[key] }</td>
                  ))}
              </tr>
            );
          
        })}
        </tbody>
      </table>

     </div>

      </div>
      </div>
    
  );
}

export default Table2;


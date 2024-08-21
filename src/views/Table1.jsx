import React, { useEffect, useState } from "react";


import "../style/table1.css";
import useCSVController from "../controller/csvFileController";

function Table1() {
  const [convertData, setConvertData] = useState([]);
  const [showData, setShowData] = useState([]);

  const [heading, setHeading] = useState([]);
  const [loading, setLoading] = useState(false);

  const [option, setOption] = useState("");
  const [inputData, setInputData] = useState("");

  const { csvFileConverter } = useCSVController()


useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true)
      const response = await fetch("src/assets/data/csv1.csv");
      let textfile = await response.text();
      
      const { data, success } = await csvFileConverter(textfile);
      console.log(data);
      
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


  
  if (loading) return <div>Loading...</div>;

  return (
    <div className="table1">
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

      <h2>Table 1</h2>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              {heading &&
                heading?.map((data, index) => {
                  return <td key={index}>{data}</td>;
                })}
            </tr>
          </thead>
          <tbody>
            {showData?.map((ele, index) => {
              return (
                <tr key={index}>
                  {heading?.map((key, index) => {
                    return <td key={index}>{ele[key]}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table1;

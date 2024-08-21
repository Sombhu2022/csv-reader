import React, { useEffect, useState } from "react";

import csvController from "../controller/csvFileController";

import csvFile from '../assets/data/csv1.csv'

import "../style/table1.css";

function Table1() {
  const [convertData, setConvertData] = useState([]);
  const [showData, setShowData] = useState([]);

  const [heading, setHeading] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const [option, setOption] = useState("");
  const [inputData, setInputData] = useState("");

//   const { csvFileConverter } = csvController();

//   const handleFileUpload = async (e) => {
//     const file = e.target.files[0];

//     if (csvFile) {
//       try {
//         setLoading(true);
//         const data = await csvFileConverter(file);
//         if (data) {
//           setConvertData(data.data);
//           setShowData(data.data);
//           const headingData = Object.keys(data.data[0]);
//           setHeading(headingData);
//         }
//         setLoading(false);
//       } catch (error) {
//         console.error(error);
//         setLoading(false);
//       }
//     }
//   };

useEffect(() => {
    if (csvFile) {
      setConvertData(csvFile);
      setShowData(csvFile);
    }
  }, [csvFile]);
  
  useEffect(() => {
    if (convertData.length > 0) {
      const headingData = Object.keys(convertData[0]);
      setHeading(headingData);
    }
  }, [convertData]);
  

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

  console.log("csv file",csvFile);
  
  if (loading) return <div>Loading...</div>;

  return (
    <div className="table1">

      {/* <input
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        className="file-input"
      /> */}

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

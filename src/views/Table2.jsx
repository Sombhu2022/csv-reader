import React, { useEffect, useState } from "react";
import useCSVController from "../controller/csvFileController";
import '../style/table2.css'

function Table2() {
  const [convertData, setConvertData] = useState([]);
  const [showData, setShowData] = useState([]);
  const [heading, setHeading] = useState([]);
  const { csvFileConverter } = useCSVController();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("src/assets/data/csv2.csv");
        const textfile = await response.text();
        const { data, success } = await csvFileConverter(textfile);
        console.log(data , data["Disclaimer - The Data provided in the adjusted 52 week high and adjusted 52 week low columns  are adjusted for corporate actions (bonus, splits & rights).For actual (unadjusted) 52 week high & low prices, kindly refer bhavcopy."]);
        
        if (success && data) {
          
          const arr = data
            .filter((ele, index) => ele["__parsed_extra"] !== undefined)
            .map((ele) => ele["__parsed_extra"]);
          setConvertData(arr);
          setShowData(arr);
          if (arr.length > 0) {
            setHeading(arr[0]);
          }
        }
      } catch (error) {
        console.error("Error converting CSV file:", error);
      }
    };

    fetchData();
  }, []);

  console.log(showData);
  

  return (
    <div className="table2">
      <div className="table1-container table-container">

      <h1>Table 1</h1>
      <table>
        <thead>
          <tr>
            {heading.slice(0, 4).map((key) => (
              <th key={key}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {showData.map((row, index) => {
            if (index > 0) {
              return (
                <tr key={index}>
                  {Object.values(row)
                    .slice(0, 4)
                    .map((value, i) => (
                      <td key={i}>{value }</td>
                    ))}
                </tr>
              );
            }
          })}
        </tbody>
      </table>
     </div>
     <div className="table2-container table-container">
      <h1>Table 2</h1>
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
          {showData.map((row, index) => {
            if (index > 0) {
              return (
                <tr key={index}>
                  {Object.values(row)
                    .slice(0, 2)
                    .concat(Object.values(row).slice(4, 6))
                    .map((value, i) => (
                      <td key={i}>{value}</td>
                    ))}
                </tr>
              );
            }
          })}
        </tbody>
      </table>

     </div>
      </div>
    
  );
}

export default Table2;


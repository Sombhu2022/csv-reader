import { parse } from "papaparse";

const useCSVController = () => {
  const csvFileConverter = (file) => {
    return new Promise((resolve, reject) => {
      parse(file, {
        header: true,
        complete: (results) => {
            console.log(results);
            
          resolve({ success: true, message: 'File converted successfully', data: results.data });
        },
        error: (error) => {
          console.error("Error parsing CSV:", error);
          reject({ success: false, message: 'File conversion failed', error });
        },
      });
    });
  };

  return { csvFileConverter };
};

export default useCSVController;

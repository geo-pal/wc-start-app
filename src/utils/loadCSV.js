import Papa from 'papaparse';

export function loadCSV(path) {
  return new Promise((resolve, reject) => {
    Papa.parse(path, {
      download: true,
      header: true,
      dynamicTyping: true,
      complete: results => resolve(results.data),
      error: err => reject(err),
    });
  });
}



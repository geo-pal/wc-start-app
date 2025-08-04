import Papa from 'papaparse';

export function loadCSV(relativePath) {
  const fullPath = process.env.BASE_URL + relativePath;

  return new Promise((resolve, reject) => {
    Papa.parse(fullPath, {
      download: true,
      header: true,
      dynamicTyping: true,
      complete: results => resolve(results.data),
      error: err => reject(err),
    });
  });
}

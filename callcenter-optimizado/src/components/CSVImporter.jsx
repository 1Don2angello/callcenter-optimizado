// src/components/CSVImporter.jsx
import Papa from "papaparse";

export default function CSVImporter({ onData }) {
  function handleFile(e) {
    const file = e.target.files[0];
    if (!file) return;
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: results => {
        // results.data es un array de objetos
        onData(results.data);
      }
    });
  }

  return (
    <div style={{ margin: "24px 0" }}>
      <label>
        <b>Importar contactos (CSV): </b>
        <input type="file" accept=".csv" onChange={handleFile} />
      </label>
    </div>
  );
}

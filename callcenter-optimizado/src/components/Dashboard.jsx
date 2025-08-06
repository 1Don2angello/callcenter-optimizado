import React, { useState } from "react";
import ContactList from "./ContactList";
import CSVImporter from "./ImportarContactos";
import Papa from "papaparse";

function exportarCSV(contactos) {
  const csv = Papa.unparse(contactos);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "contactos-exportados.csv";
  a.click();
}
// Importa datos
import clientesEjemplo from "../data/clientes-ejemplo.json";

export default function Dashboard() {
  // Local state, puedes luego guardar en localStorage
  const [contactos, setContactos] = useState(clientesEjemplo);

  // Cambia estatus del contacto
  function onStatusChange(idx, value) {
    const nuevos = contactos.slice();
    nuevos[idx].estatus = value;
    setContactos(nuevos);
  }

  // Cambia notas del contacto
  function onNotaChange(idx, value) {
    const nuevos = contactos.slice();
    nuevos[idx].notas = value;
    setContactos(nuevos);
  }

  return (
    <div style={{ padding: 32 }}>
      <h2>Panel de Contactos - Call Center</h2>
        <h3>Exportar Contactos</h3>
      <button onClick={() => exportarCSV(contactos)}>Exportar CSV</button>
        <CSVImporter onData={data => setContactos(data)} />

      <ContactList contactos={contactos} onStatusChange={onStatusChange} onNotaChange={onNotaChange} />

      {/* <ContactList
        contactos={contactos}
        onStatusChange={onStatusChange}
        onNotaChange={onNotaChange}
      /> */}
    </div>
  );
}

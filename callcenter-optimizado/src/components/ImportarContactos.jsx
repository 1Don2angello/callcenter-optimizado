import React, { useState } from "react";
import * as XLSX from "xlsx";
import WhatsAppButton from "./WhatsAppButton"; // <-- importa tu botón

export default function ImportarContactos() {
  const [contactos, setContactos] = useState([]);

  function onFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws);

      const soloNuevos = data.filter(
        (row) => !row["STATUS LLAMADA"] || row["STATUS LLAMADA"].trim() === ""
      );
      const filtrados = soloNuevos.map((row) => ({
        nombre: row["NOMBRE"] || "",
        telefono: row["TELEFONO"] || "",
        correo: row["CORREO"] || "",
        status: row["STATUS LLAMADA"] || ""
      }));
      setContactos(filtrados);
    };
    reader.readAsBinaryString(file);
  }

  return (
    <div>
      <h2>Importar Contactos Nuevos</h2>
      <input type="file" accept=".xlsx,.xls" onChange={onFileChange} />
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Teléfono</th>
            <th>Correo</th>
            <th>Status Llamada</th>
            <th>Acciones WhatsApp</th>
          </tr>
        </thead>
        <tbody>
          {contactos.map((c, i) => (
            <tr key={i}>
              <td>{c.nombre}</td>
              <td>{c.telefono}</td>
              <td>{c.correo}</td>
              <td>{c.status}</td>
              <td>
                <WhatsAppButton telefono={c.telefono} nombre={c.nombre} tipo="saludo" />
                <WhatsAppButton telefono={c.telefono} nombre={c.nombre} tipo="seguimiento" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

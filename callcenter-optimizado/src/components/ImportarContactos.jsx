import React, { useState } from "react";
import * as XLSX from "xlsx";
import WhatsAppButton from "./WhatsAppButton";

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
      // Estado inicial de los checks
      const filtrados = soloNuevos.map((row) => ({
        nombre: row["NOMBRE"] || "",
        telefono: row["TELEFONO"] || "",
        correo: row["CORREO"] || "",
        status: row["STATUS LLAMADA"] || "",
        llamadoHecho: false,
        saludoEnviado: false,
        seguimientoEnviado: false,
      }));
      setContactos(filtrados);
    };
    reader.readAsBinaryString(file);
  }

  // Maneja los cambios de los checks
  function handleCheck(i, campo) {
    const nuevos = [...contactos];
    nuevos[i][campo] = !nuevos[i][campo];
    setContactos(nuevos);
  }

  // Solo muestra contactos que no están completos
  const visibles = contactos.filter(
    (c) => !(c.llamadoHecho && c.saludoEnviado && c.seguimientoEnviado)
  );

  return (
    <div>
      <h2>Importar Contactos Nuevos</h2>
      <input type="file" accept=".xlsx,.xls" onChange={onFileChange} />
      <p>Completados: {contactos.length - visibles.length} / {contactos.length}</p>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Teléfono</th>
            <th>Correo</th>
            <th>Status Llamada</th>
            <th>✓ Llamado</th>
            <th>✓ WhatsApp Saludo</th>
            <th>✓ WhatsApp Seguimiento</th>
            <th>Acciones WhatsApp</th>
          </tr>
        </thead>
        <tbody>
          {visibles.map((c, i) => (
            <tr key={i}>
              <td>{c.nombre}</td>
              <td>{c.telefono}</td>
              <td>{c.correo}</td>
              <td>{c.status}</td>
              <td>
                <input
                  type="checkbox"
                  checked={c.llamadoHecho}
                  onChange={() => handleCheck(i, "llamadoHecho")}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={c.saludoEnviado}
                  onChange={() => handleCheck(i, "saludoEnviado")}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={c.seguimientoEnviado}
                  onChange={() => handleCheck(i, "seguimientoEnviado")}
                />
              </td>
              <td>
                {!c.saludoEnviado && (
                  <WhatsAppButton
                    telefono={c.telefono}
                    nombre={c.nombre}
                    tipo="saludo"
                  />
                )}
                {!c.seguimientoEnviado && (
                  <WhatsAppButton
                    telefono={c.telefono}
                    nombre={c.nombre}
                    tipo="seguimiento"
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

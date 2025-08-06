import WhatsAppButton from "./WhatsAppButton";

export default function ContactList({
  contactos,
  onStatusChange,
  onNotaChange,
}) {
  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Teléfono</th>
          <th>Estatus</th>
          <th>Notas</th>
          <th>WhatsApp</th>
        </tr>
      </thead>
      <tbody>
        {contactos.map((c, i) => (
          <tr key={i}>
            <td>{c.nombre}</td>
            <td>{c.telefono}</td>
            <td>
              <select
                value={c.estatus}
                onChange={(e) => onStatusChange(i, e.target.value)}
              >
                <option>No contactado</option>
                <option>WhatsApp enviado</option>
                <option>Llamada hecha</option>
                <option>Agendado</option>
                <option>No interesado</option>
              </select>
            </td>
            <td>
              <input
                type="text"
                value={c.notas}
                onChange={(e) => onNotaChange(i, e.target.value)}
                style={{ width: "96%" }}
              />
            </td>
            <td>
              <div style={{ display: "flex", gap: 8 }}>
                <WhatsAppButton
                  telefono={c.telefono}
                  nombre={c.nombre}
                  tipo="saludo"
                />
                <WhatsAppButton
                  telefono={c.telefono}
                  nombre={c.nombre}
                  tipo="seguimiento"
                />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

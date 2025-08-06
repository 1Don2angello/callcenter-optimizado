export default function WhatsAppButton({ telefono, nombre, tipo }) {
  // Puedes modificar estos textos
  const MENSAJES = {
  saludo: {
    texto: (nombre) => `Hola ${nombre}, soy Ángel de Ciudad Maderas.`,
    img: "https://acortar.link/20fc1e"
  },
  seguimiento: {
    texto: () =>
      `Estamos reconectando con clientes de alto perfil que mostraron interés en nuestro proyecto hace un año y quisiera saber ¿del 1 al 10 qué tan interesado sigues? 😊`,
    img: "https://acortar.link/k6hGe4"
  }
};

  // Puedes poner aquí tu imagen de presentación (debe estar en /public)
  // Ejemplo: https://wa.me/5219981234567?text=...&media=https://tusitio.com/img/tuimagen.jpg
  // WhatsApp web NO soporta agregar imagen automáticamente por el link wa.me, pero puedes poner la URL de la imagen en el mensaje.

  //const urlImg = "https://drive.google.com/file/d/1fCJKsrp523xsSRPVF7c_Yt3MLGy0mziZ/view?usp=sharing"; // Cambia por tu ruta real

  // Añadir link a imagen en el mensaje, para que lo vean fácil
  const mensajeConImagen = encodeURIComponent(`${MENSAJES[tipo].texto(nombre)}\n\n${MENSAJES[tipo].img}`);

  const url = `https://wa.me/${telefono}?text=${mensajeConImagen}`;

  return (
    <a href={url} target="_blank" rel="noopener noreferrer">
      <button style={{
        padding: "0.6em 1.4em",
        background: tipo === "saludo" ? "#25d366" : "#fcba03",
        color: "#fff",
        border: "none",
        borderRadius: 8,
        fontWeight: 700,
        margin: 4,
        cursor: "pointer"
      }}>
        {tipo === "saludo" ? "Saludo" : "Seguimiento"}
      </button>
    </a>
  );
}

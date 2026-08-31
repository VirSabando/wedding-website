// src/data.js  — Datos de la boda de Viejo & Vir
// ✏️  Actualizá los valores marcados con TODO antes de publicar

export const weddingData = {
  couple: {
    person1: "Viejo",
    person2: "Vir",
  },

  date: "2027-02-13",
  dateDisplay: "13 de Febrero de 2027",

  ceremony: {
    date: "Viernes 12 de Febrero",
    time: "11:00 hs",
    venueName: "Delegación Registro Provincial de las Personas",
    address: "Avenida San Martín 3466, Ingeniero White",
    mapsUrl: "https://maps.app.goo.gl/SdBs7ggSv7yU1ieB9",
  },

  reception: {
    date: "Sábado 13 de Febrero",
    time: "12:00 hs a 20:00 hs",
    venueName: "Único Eventos",
    address: "Río Bermejo S/N, Punta Alta",
    mapsUrl: "https://maps.app.goo.gl/7x5rHRgCfzH7r5K36",
    sameAsVenue: false,
  },

  bus: {
    pickupLocation: "Punto de encuentro",          // TODO
    pickupTime: "16:15 hs",                        // TODO
    returnTime: "01:00 hs",                        // TODO
  },

  dressCode: {
    title: "Código de vestimenta",
    description:
      "Nos encantaría que te vistas con nuestra paleta de colores — pensá en algo terroso, elegante y relajado. " +
      "Verdes salvia, beiges cálidos, cremas suaves y tonos dorados apagados son bienvenidos. " +
      "¡Por favor evitá el blanco, el marfil y el negro para que nuestras fotos queden bien coloridas!",
    palette: [
      { name: "Verde Salvia",  hex: "#7D9B76" },
      { name: "Beige Cálido",  hex: "#E8DCC8" },
      { name: "Dorado Oscuro", hex: "#C9A227" },
      { name: "Marrón Oscuro", hex: "#5C3D2E" },
      { name: "Crema Suave",   hex: "#F5EDD9" },
    ],
    avoid: ["Blanco", "Marfil", "Negro"],
  },

  importantInfo: [
    {
      icon: "🎁",
      title: "Regalos",
      text: "Tu presencia es el mejor regalo. Si querés contribuir con algo más, tenemos un fondo de luna de miel — los detalles los compartimos pronto.", // TODO
    },
    {
      icon: "🧡",
      title: "Boda sin niñxs",
      text: "Para que todos podamos disfrutar la noche sin preocupaciones, esta es una celebración solo para adultos. ¡Gracias por entender!",
    },
    {
      icon: "🚗",
      title: "Estacionamiento",
      text: "Hay estacionamiento gratuito en el lugar. Si venís en el micro, ¡no te preocupes por esto!", // TODO
    },
    {
      icon: "🌿",
      title: "Alimentación",
      text: "Habrá opciones vegetarianas y veganas. Contanos en el formulario de confirmación si tenés alguna restricción o alergia.",
    },
  ],

  // TODO: Reemplazá con tu ID de formulario de Formspree
  // Registrate en https://formspree.io, creá un formulario y pegá el ID acá.
  rsvpFormEndpoint: "https://formspree.io/f/YOUR_FORM_ID",
};



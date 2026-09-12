// src/data.js  — Datos de la boda de Viejo & Vir
// ✏️  Actualizá los valores marcados con TODO antes de publicar

export const weddingData = {
  couple: {
    person1: "Viejo",
    person2: "Vir",
  },

  date: "2027-02-13",
  dateDisplay: "12 y 13 de febrero de 2027",
  countdownTarget: "2027-02-13T12:00:00-03:00",

  // Fondos de la sección Home.
  // Desktop y tablets anchos: horizontal.
  // Móviles en vertical: vertical.
  homeBackgroundImageDesktopUrl: "/photos/home-background-horizontal-sepia1.jpeg",
  homeBackgroundImageMobileVerticalUrl: "/photos/home-background-vertical-sepia1.jpeg",

  ceremony: {
    date: "Viernes 12 de febrero",
    time: "Horario a confirmar",
    venueName: "Delegación Registro Provincial de las Personas",
    address: "Avenida San Martín 3466, Ingeniero White",
    mapsUrl: "https://maps.app.goo.gl/SdBs7ggSv7yU1ieB9",
  },

  reception: {
    date: "Sábado 13 de febrero",
    time: "12:00 hs a 20:00 hs",
    venueName: "Único Eventos",
    address: "Río Bermejo S/N, Punta Alta",
    mapsUrl: "https://maps.app.goo.gl/7x5rHRgCfzH7r5K36",
    sameAsVenue: false,
  },

  // Lista rápida para que el RSVP detecte cuántas personas tiene cada invitación.
  // Podés tener grupos de 1, 2 o más personas, siempre con nombres exactos.
  rsvpInvitations: [
    { id: 'inv-001', members: ['Nombre Apellido'] },
    { id: 'inv-002', members: ['Nombre Pareja 1', 'Nombre Pareja 2'] },
    { id: 'inv-003', members: ['Nombre Grupo 1', 'Nombre Grupo 2', 'Nombre Grupo 3'] },
  ],

  // Si publicás una planilla como CSV, el RSVP la usa para validación estricta.
  // Headers recomendados: group_id, full_name
  // Ejemplo: https://docs.google.com/spreadsheets/d/<ID>/gviz/tq?tqx=out:csv
  rsvpSpreadsheetCsvUrl: "https://docs.google.com/spreadsheets/d/1LbmFDIZp3AXlhCHHI3Ps1E3h8Bnh2x2Doglt02D0Bb0/gviz/tq?tqx=out:csv",

  // Endpoint para guardar respuestas en Google Sheets (Apps Script Web App).
  // TODO: Reemplazar cuando publiques el script.
  // Ejemplo: https://script.google.com/macros/s/AKfycb.../exec
  rsvpSubmitEndpoint: "https://script.google.com/macros/s/AKfycbw7p9bHO5dJILileQai4EI6TJI4ugrRYlzL67RIaUKQRxwwHDs4QGRQ8MFMhyF808p6GQ/exec",

  // TODO: Reemplazá con tu ID de formulario de Formspree
  // Registrate en https://formspree.io, creá un formulario y pegá el ID acá.
  rsvpFormEndpoint: "https://formspree.io/f/YOUR_FORM_ID",
};



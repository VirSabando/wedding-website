// src/data.js  — Wedding data for Viejo & Vir
// ✏️  Update all placeholder values marked with TODO before publishing

export const weddingData = {
  couple: {
    person1: "Viejo",
    person2: "Vir",
  },

  // TODO: Set the actual wedding date (ISO format YYYY-MM-DD)
  date: "2027-06-01",
  // TODO: Set a friendly display date
  dateDisplay: "June 1st, 2027",

  ceremony: {
    time: "5:00 PM",                         // TODO
    venueName: "Venue Name",                 // TODO
    address: "123 Example St, City, Country", // TODO
    mapsUrl: "https://maps.google.com",       // TODO
  },

  reception: {
    time: "7:00 PM",                         // TODO
    venueName: "Reception Venue",            // TODO
    address: "123 Example St, City, Country", // TODO
    mapsUrl: "https://maps.google.com",       // TODO
    sameAsVenue: false,                       // set true if same place as ceremony
  },

  bus: {
    pickupLocation: "Meeting point address", // TODO
    pickupTime: "4:15 PM",                  // TODO
    returnTime: "1:00 AM",                  // TODO
  },

  dressCode: {
    title: "Dress Code",
    description:
      "We'd love for you to dress in our wedding palette — think earthy, elegant, and relaxed. " +
      "Sage greens, warm beiges, dusty creams, and muted gold tones are all welcome. " +
      "Please avoid white, ivory, and black so our photos stay colorful!",
    palette: [
      { name: "Sage Green",  hex: "#7D9B76" },
      { name: "Warm Beige",  hex: "#E8DCC8" },
      { name: "Dark Gold",   hex: "#C9A227" },
      { name: "Dark Brown",  hex: "#5C3D2E" },
      { name: "Dusty Cream", hex: "#F5EDD9" },
    ],
    avoid: ["White", "Ivory", "Black"],
  },

  importantInfo: [
    {
      icon: "🎁",
      title: "Gifts",
      text: "Your presence is the greatest gift. If you'd like to contribute, we have a honeymoon fund — details to follow.", // TODO
    },
    {
      icon: "📸",
      title: "Photos",
      text: "We'll have a professional photographer. Feel free to take photos during the reception, but please keep your phones away during the ceremony.",
    },
    {
      icon: "🚗",
      title: "Parking",
      text: "Free parking is available at the venue. If you're taking the bus, no need to worry!", // TODO
    },
    {
      icon: "🌿",
      title: "Dietary Needs",
      text: "We'll have vegetarian and vegan options. Let us know about any allergies or restrictions in the RSVP form below.",
    },
  ],

  // TODO: Replace with your Formspree form ID
  // Sign up at https://formspree.io, create a form, and paste the form ID here.
  rsvpFormEndpoint: "https://formspree.io/f/YOUR_FORM_ID",
};


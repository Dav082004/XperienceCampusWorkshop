// ============================================================================
// 📋 ARCHIVO DE DATOS DE COLABORADORES
// ============================================================================
//
// 🎯 INSTRUCCIONES PARA CONTRIBUIR:
// 1. Copia el template de abajo
// 2. Reemplaza los valores con tu información
// 3. Agrega tu objeto al array 'contributors'
// 4. Haz commit y pull request
//
// ⚠️  IMPORTANTE: Solo modifica el array 'contributors', no toques el resto
// ============================================================================

const contributors = [
  {
    name: "David",
    nickname: "Dav082004",
    github: "https://github.com/Dav082004",
    linkedin: "https://www.linkedin.com/in/davidcontreraspalacios", // Opcional
    instagram: "https://www.instagram.com/davidc_8n/", // Opcional
    image: "https://github.com/Dav082004.png", // Opcional - URL de imagen o usar avatar de GitHub
    description:
      "Apasionado por la tecnología y la enseñanza. Me encanta crear proyectos que ayuden a otros a aprender.",
    hobbies: ["Programación", "Open Source", "Github", "Gaming"],
  },
  {
    name: "OctocatChambeador",
    nickname: "xde268106-lab",
    github: "https://github.com/xde268106-lab",
    linkedin: "https://www.linkedin.com/in/-", // Opcional
    instagram: "https://www.instagram.com/-", // Opcional
    image: "https://github.com/xde268106-lab.png", // Opcional - URL de imagen o usar avatar de GitHub
    description:
      "Me gusta arreglar cosas.",
    hobbies: ["Cyber", "Open Source", "Github", "IoT"],
  },
  {
    name: "Prueba",
    nickname: "Prueba-lab",
    github: "https://github.com/Prueba",
    linkedin: "https://www.linkedin.com/in/Prueba", // Opcional
    image: "https://github.com/Prueba.png", // Opcional - URL de imagen o usar avatar de GitHub
    description:
      "Me gusta arreglar cosas.2",
    hobbies: ["Cyber", "Open Source", "Prueba", "IoT"],
  },

  // ================= TEMPLATE PARA NUEVOS COLABORADORES =================
  // Copia y pega este bloque dentro del array 'contributors' y reemplaza los valores:
  /*
  {
    name: "Tu Nombre",
    nickname: "TuUsuario",
    github: "https://github.com/TuUsuario",
    linkedin: "https://www.linkedin.com/in/tu-linkedin", // Opcional
    instagram: "https://www.instagram.com/tu-instagram/", // Opcional
    image: "https://github.com/TuUsuario.png", // Opcional - URL de imagen o usar avatar de GitHub
    description:
      "Breve descripción sobre ti.",
    hobbies: ["Hobby1", "Hobby2", "Hobby3", "Hobby4"],
  },
  */
  // ======================================================================
];

// ⚠️ NO MODIFIQUES NADA DE AQUÍ HACIA ABAJO ⚠️
// Esta línea hace que los datos estén disponibles para el resto de la aplicación
if (typeof module !== "undefined" && module.exports) {
  module.exports = { contributors };
}

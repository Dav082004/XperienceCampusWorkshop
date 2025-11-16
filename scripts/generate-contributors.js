// ============================================================================
// 🏗️  SCRIPT GENERADOR DE COLABORADORES
// ============================================================================
//
// Este script lee todos los archivos JSON de contributors/ y genera:
// 1. public/index.json - Lista consolidada para APIs
// 2. src/contributors-data.js - Módulo JS con el array de colaboradores
//
// Incluye validación de campos obligatorios y formato.
//
// Uso: node scripts/generate-contributors.js
// ============================================================================

const fs = require("fs");
const path = require("path");

// Colores para consola
const colors = {
  reset: "\x1b[0m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
};

// Función para validar un colaborador
function validateContributor(contributor, filename) {
  const errors = [];

  // Validar campos obligatorios
  if (!contributor.name || contributor.name.trim() === "") {
    errors.push("El campo 'name' es obligatorio");
  }

  if (!contributor.nickname || contributor.nickname.trim() === "") {
    errors.push("El campo 'nickname' es obligatorio");
  }

  // Validar hobbies
  if (!Array.isArray(contributor.hobbies)) {
    errors.push("El campo 'hobbies' debe ser un array");
  } else if (contributor.hobbies.length < 1) {
    errors.push("Debe haber al menos 1 hobby");
  } else if (contributor.hobbies.length > 5) {
    errors.push("No puede haber más de 5 hobbies");
  }

  if (errors.length > 0) {
    console.error(`${colors.red}❌ Error en ${filename}:${colors.reset}`);
    errors.forEach((error) => {
      console.error(`   ${colors.red}• ${error}${colors.reset}`);
    });
    return false;
  }

  return true;
}

// Función principal
function generateContributors() {
  console.log(
    `${colors.cyan}${"=".repeat(60)}${colors.reset}`
  );
  console.log(
    `${colors.cyan}🏗️  GENERADOR DE COLABORADORES${colors.reset}`
  );
  console.log(
    `${colors.cyan}${"=".repeat(60)}${colors.reset}\n`
  );

  const contributorsDir = path.join(__dirname, "..", "contributors");

  // Verificar que existe la carpeta contributors
  if (!fs.existsSync(contributorsDir)) {
    console.error(
      `${colors.red}❌ Error: No se encontró la carpeta 'contributors/'${colors.reset}`
    );
    console.log(
      `${colors.yellow}💡 Ejecuta primero: node scripts/split-contributors.js${colors.reset}\n`
    );
    process.exit(1);
  }

  console.log(
    `${colors.blue}📂 Leyendo archivos de contributors/...${colors.reset}`
  );

  // Leer todos los archivos JSON de la carpeta
  const files = fs
    .readdirSync(contributorsDir)
    .filter((file) => file.endsWith(".json"));

  if (files.length === 0) {
    console.error(
      `${colors.red}❌ No se encontraron archivos JSON en contributors/${colors.reset}\n`
    );
    process.exit(1);
  }

  console.log(
    `${colors.green}✅ Se encontraron ${files.length} archivos${colors.reset}\n`
  );

  // Procesar cada archivo
  const contributors = [];
  let validCount = 0;
  let invalidCount = 0;

  files.forEach((file) => {
    const filePath = path.join(contributorsDir, file);

    try {
      const content = fs.readFileSync(filePath, "utf-8");
      const contributor = JSON.parse(content);

      // Validar el colaborador
      if (validateContributor(contributor, file)) {
        contributors.push(contributor);
        console.log(`${colors.green}✅ ${file}${colors.reset}`);
        validCount++;
      } else {
        invalidCount++;
      }
    } catch (error) {
      console.error(
        `${colors.red}❌ Error al procesar ${file}: ${error.message}${colors.reset}`
      );
      invalidCount++;
    }
  });

  // Si hay errores, detener el proceso
  if (invalidCount > 0) {
    console.log(
      `\n${colors.red}❌ Se encontraron ${invalidCount} errores. Corrige los archivos y vuelve a ejecutar el script.${colors.reset}\n`
    );
    process.exit(1);
  }

  // Ordenar por nickname (alfabéticamente)
  console.log(
    `\n${colors.blue}🔤 Ordenando colaboradores por nickname...${colors.reset}`
  );
  contributors.sort((a, b) =>
    a.nickname.toLowerCase().localeCompare(b.nickname.toLowerCase())
  );

  // Generar public/index.json
  console.log(
    `\n${colors.magenta}📝 Generando archivos...${colors.reset}`
  );

  const publicDir = path.join(__dirname, "..", "public");
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const indexJsonPath = path.join(publicDir, "index.json");
  fs.writeFileSync(
    indexJsonPath,
    JSON.stringify(contributors, null, 2),
    "utf-8"
  );
  console.log(
    `${colors.green}✅ Generado: public/index.json${colors.reset}`
  );

  // Resumen final
  console.log(
    `\n${colors.cyan}${"=".repeat(60)}${colors.reset}`
  );
  console.log(
    `${colors.cyan}📊 RESUMEN DE GENERACIÓN${colors.reset}`
  );
  console.log(
    `${colors.cyan}${"=".repeat(60)}${colors.reset}`
  );
  console.log(
    `${colors.green}✅ Colaboradores procesados: ${validCount}${colors.reset}`
  );
  console.log(
    `${colors.red}❌ Archivos con errores: ${invalidCount}${colors.reset}`
  );
  console.log(
    `${colors.blue}📁 Archivo generado:${colors.reset}`
  );
  console.log(`   • public/index.json`);
  console.log(
    `${colors.cyan}${"=".repeat(60)}${colors.reset}`
  );
  console.log(
    `\n${colors.green}✨ ¡Generación completada exitosamente!${colors.reset}\n`
  );
}

// Ejecutar el script
generateContributors();

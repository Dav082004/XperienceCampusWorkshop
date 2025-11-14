#!/usr/bin/env node

/**
 * 🤖 Validador Local de Contribuciones
 * Ejecuta las mismas validaciones que el sistema automático
 * 
 * Uso: node validate-local.js
 */

const fs = require('fs');
const path = require('path');

console.log('🤖 Iniciando validación local de contribución...\n');

try {
  // Verificar que existe contributors-data.js
  const filePath = path.join(__dirname, 'contributors-data.js');
  if (!fs.existsSync(filePath)) {
    throw new Error('❌ No se encontró el archivo contributors-data.js');
  }

  // Leer y validar sintaxis
  console.log('📝 Validando sintaxis JavaScript...');
  const fileContent = fs.readFileSync(filePath, 'utf8');
  
  let contributors;
  try {
    contributors = eval(fileContent.replace('const contributors = ', '').replace(/;$/, ''));
  } catch (syntaxError) {
    throw new Error(`❌ Error de sintaxis: ${syntaxError.message}`);
  }

  if (!Array.isArray(contributors)) {
    throw new Error('❌ contributors debe ser un array');
  }

  console.log('✅ Sintaxis JavaScript correcta');
  console.log(`📊 Total de contribuidores: ${contributors.length}`);

  if (contributors.length === 0) {
    throw new Error('❌ No hay contribuidores en el archivo');
  }

  // Validar el último contribuidor (nueva contribución)
  const newContributor = contributors[contributors.length - 1];
  console.log(`\n🔍 Validando contribuidor: ${newContributor.nickname || 'Sin nickname'}`);

  const errors = [];
  const warnings = [];

  // ✅ Campos requeridos
  console.log('\n🏷️ Verificando campos requeridos...');
  const requiredFields = ['name', 'nickname', 'github', 'description', 'hobbies'];
  
  for (const field of requiredFields) {
    if (!newContributor[field] || newContributor[field] === '') {
      errors.push(`❌ Campo requerido faltante: ${field}`);
    } else {
      console.log(`  ✅ ${field}: ${typeof newContributor[field] === 'string' ? newContributor[field].substring(0, 30) + '...' : 'Array'}`);
    }
  }

  // 🔤 Formato de nickname
  console.log('\n🔤 Verificando formato de nickname...');
  if (newContributor.nickname) {
    if (!/^[a-zA-Z0-9-_]+$/.test(newContributor.nickname)) {
      errors.push('❌ Nickname solo puede contener letras, números, guiones y guiones bajos');
    } else {
      console.log(`  ✅ Formato válido: ${newContributor.nickname}`);
    }
  }

  // 🔗 URLs válidas
  console.log('\n🔗 Verificando URLs...');
  
  if (newContributor.github) {
    if (!newContributor.github.startsWith('https://github.com/')) {
      errors.push('❌ URL de GitHub debe comenzar con https://github.com/');
    } else {
      console.log(`  ✅ GitHub URL válida: ${newContributor.github}`);
    }
  }

  if (newContributor.linkedin) {
    if (!newContributor.linkedin.match(/^https:\/\/(www\.)?linkedin\.com\/(in|pub)\/[\w-]+\/?$/)) {
      errors.push('❌ URL de LinkedIn inválida. Formato: https://linkedin.com/in/username');
    } else {
      console.log(`  ✅ LinkedIn URL válida: ${newContributor.linkedin}`);
    }
  }

  if (newContributor.instagram) {
    if (!newContributor.instagram.match(/^https:\/\/(www\.)?instagram\.com\/[\w.-]+\/?$/)) {
      errors.push('❌ URL de Instagram inválida. Formato: https://instagram.com/username');
    } else {
      console.log(`  ✅ Instagram URL válida: ${newContributor.instagram}`);
    }
  }

  // 📏 Longitud de descripción
  console.log('\n📏 Verificando longitud de descripción...');
  if (newContributor.description) {
    const descLength = newContributor.description.length;
    if (descLength > 150) {
      errors.push(`❌ Descripción muy larga: ${descLength} caracteres (máximo 150)`);
    } else {
      console.log(`  ✅ Descripción OK: ${descLength}/150 caracteres`);
    }
  }

  // 🎯 Límite de hobbies
  console.log('\n🎯 Verificando hobbies...');
  if (!Array.isArray(newContributor.hobbies)) {
    errors.push('❌ hobbies debe ser un array');
  } else {
    const hobbiesCount = newContributor.hobbies.length;
    if (hobbiesCount > 4) {
      errors.push(`❌ Máximo 4 hobbies permitidos, encontrados: ${hobbiesCount}`);
    } else {
      console.log(`  ✅ Hobbies OK: ${hobbiesCount}/4`);
      newContributor.hobbies.forEach((hobby, index) => {
        console.log(`    ${index + 1}. ${hobby}`);
      });
    }
  }

  // 🚫 Duplicados
  console.log('\n🚫 Verificando duplicados...');
  const existingContributors = contributors.slice(0, -1);
  const duplicateNickname = existingContributors.find(c => c.nickname === newContributor.nickname);
  
  if (duplicateNickname) {
    errors.push(`❌ Nickname '${newContributor.nickname}' ya existe`);
  } else {
    console.log(`  ✅ Nickname único: ${newContributor.nickname}`);
  }

  // Campos opcionales
  console.log('\n📋 Campos opcionales incluidos:');
  const optionalFields = ['linkedin', 'instagram', 'image'];
  optionalFields.forEach(field => {
    if (newContributor[field]) {
      console.log(`  ✅ ${field}: ${newContributor[field]}`);
    } else {
      console.log(`  ➖ ${field}: No incluido`);
    }
  });

  // Mostrar resultado
  console.log('\n' + '='.repeat(50));
  
  if (errors.length > 0) {
    console.log('🚨 VALIDACIÓN FALLIDA\n');
    console.log('Errores encontrados:');
    errors.forEach(error => console.log(`  ${error}`));
    
    if (warnings.length > 0) {
      console.log('\nAdvertencias:');
      warnings.forEach(warning => console.log(`  ${warning}`));
    }
    
    console.log('\n📚 Para corregir los errores:');
    console.log('  1. Edita contributors-data.js');
    console.log('  2. Ejecuta este script nuevamente: node validate-local.js');
    console.log('  3. Haz commit cuando todas las validaciones pasen');
    
    process.exit(1);
  } else {
    console.log('🎉 VALIDACIÓN EXITOSA!\n');
    console.log('✅ Tu contribución cumple todos los requisitos');
    console.log('🚀 Puedes hacer commit y push sin problemas');
    
    if (warnings.length > 0) {
      console.log('\n⚠️ Advertencias (no bloquean el merge):');
      warnings.forEach(warning => console.log(`  ${warning}`));
    }
    
    console.log('\n📋 Resumen de tu contribución:');
    console.log(`  👤 Nombre: ${newContributor.name}`);
    console.log(`  🏷️ Nickname: ${newContributor.nickname}`);
    console.log(`  🔗 GitHub: ${newContributor.github}`);
    console.log(`  📝 Descripción: ${newContributor.description.substring(0, 50)}...`);
    console.log(`  🎯 Hobbies: ${newContributor.hobbies.join(', ')}`);
  }

} catch (error) {
  console.error(`\n❌ Error durante la validación: ${error.message}`);
  process.exit(1);
}
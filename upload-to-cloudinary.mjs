import cloudinary from 'cloudinary';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

cloudinary.v2.config({
  cloud_name: 'dm9driroe',
  api_key: '257842957393834',
  api_secret: 'DlKrU9_EZUkvoKkouJG-4gmj9HA'
});

// Función para obtener todos los archivos de imagen
function getAllImageFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      getAllImageFiles(filePath, fileList);
    } else {
      const ext = path.extname(file).toLowerCase();
      if (['.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp'].includes(ext)) {
        fileList.push(filePath);
      }
    }
  });
  
  return fileList;
}

// Función para subir una imagen
async function uploadImage(filePath, publicId) {
  try {
    const result = await cloudinary.v2.uploader.upload(filePath, {
      public_id: publicId,
      overwrite: true,
      resource_type: 'auto',
      unique_filename: false,
      use_filename: true
    });
    return { success: true, url: result.secure_url, publicId: result.public_id };
  } catch (error) {
    return { success: false, error: error.message, filePath };
  }
}

async function uploadAllImages() {
  console.log('🚀 Iniciando subida de imágenes a Cloudinary...\n');
  
  const publicDir = path.join(__dirname, 'public');
  const imageFiles = getAllImageFiles(publicDir);
  
  console.log(`📸 Encontradas ${imageFiles.length} imágenes para subir\n`);
  
  const results = {
    success: [],
    failed: [],
    skipped: []
  };
  
  for (let i = 0; i < imageFiles.length; i++) {
    const filePath = imageFiles[i];
    const relativePath = path.relative(publicDir, filePath);
    const fileNameWithoutExt = path.basename(filePath, path.extname(filePath));
    
    // Construir el public_id para Cloudinary
    let cloudinaryPath;
    
    // Manejar casos especiales
    if (relativePath.startsWith('logos/')) {
      // Los logos van a diferentes lugares según el tipo
      const logoName = fileNameWithoutExt.toLowerCase();
      
      if (['beefeater', 'loreal', 'mipcom', 'paris', 'youtube', 'london'].includes(logoName.replace('_', ''))) {
        cloudinaryPath = `blacro/clients/${fileNameWithoutExt}`;
      } else if (['click', 'noclick'].includes(logoName)) {
        cloudinaryPath = `blacro/ui/${fileNameWithoutExt}`;
      } else if (logoName.includes('logo')) {
        cloudinaryPath = `blacro/logos/${fileNameWithoutExt}`;
      } else {
        cloudinaryPath = `blacro/logos/${fileNameWithoutExt}`;
      }
    } else if (relativePath === 'aboutus.jpg') {
      cloudinaryPath = 'blacro/brand/founders-photo';
    } else {
      // Para el resto, mantener la estructura de carpetas
      const pathParts = relativePath.split(path.sep);
      const folder = pathParts[0];
      cloudinaryPath = `blacro/${folder}/${fileNameWithoutExt}`;
    }
    
    console.log(`[${i + 1}/${imageFiles.length}] Subiendo: ${relativePath}`);
    console.log(`  → Cloudinary path: ${cloudinaryPath}`);
    
    const result = await uploadImage(filePath, cloudinaryPath);
    
    if (result.success) {
      console.log(`  ✅ Subida exitosa: ${result.publicId}`);
      results.success.push({ file: relativePath, publicId: result.publicId, url: result.url });
    } else {
      console.log(`  ❌ Error: ${result.error}`);
      results.failed.push({ file: relativePath, error: result.error });
    }
    
    console.log('');
    
    // Pequeña pausa para evitar límites de rate
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  // Resumen
  console.log('\n📊 RESUMEN DE LA SUBIDA:');
  console.log(`✅ Exitosas: ${results.success.length}`);
  console.log(`❌ Fallidas: ${results.failed.length}`);
  
  if (results.failed.length > 0) {
    console.log('\n❌ ARCHIVOS QUE FALLARON:');
    results.failed.forEach(f => {
      console.log(`  - ${f.file}: ${f.error}`);
    });
  }
  
  // Guardar resultados
  fs.writeFileSync(
    'upload-results.json',
    JSON.stringify(results, null, 2)
  );
  
  console.log('\n💾 Resultados guardados en upload-results.json');
  
  // Mostrar estructura final
  console.log('\n📁 ESTRUCTURA EN CLOUDINARY:');
  const structure = {};
  results.success.forEach(item => {
    const parts = item.publicId.split('/');
    const folder = parts.slice(0, -1).join('/');
    if (!structure[folder]) structure[folder] = [];
    structure[folder].push(parts[parts.length - 1]);
  });
  
  Object.keys(structure).sort().forEach(folder => {
    console.log(`\n${folder}/`);
    structure[folder].sort().forEach(file => {
      console.log(`  - ${file}`);
    });
  });
}

// Ejecutar
uploadAllImages().catch(console.error);
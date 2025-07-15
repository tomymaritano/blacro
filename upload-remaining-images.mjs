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

async function uploadRemainingImages() {
  console.log('🚀 Subiendo imágenes de main y unicoin-everywhere...\n');
  
  const uploads = [];
  
  // 1. Subir imágenes de main
  console.log('📁 Procesando carpeta main/...');
  const mainDir = path.join(__dirname, 'public/main');
  const mainFiles = fs.readdirSync(mainDir).filter(f => 
    ['.jpg', '.jpeg', '.png', '.gif'].includes(path.extname(f).toLowerCase())
  );
  
  mainFiles.forEach(file => {
    const filePath = path.join(mainDir, file);
    const nameWithoutExt = path.basename(file, path.extname(file));
    uploads.push({
      filePath,
      publicId: `blacro/main/${nameWithoutExt}`,
      description: `main/${file}`
    });
  });
  
  // 2. Subir imágenes de unicoin-everywhere
  console.log('📁 Procesando carpeta unicoin-everywhere/...');
  const unicoinDir = path.join(__dirname, 'public/unicoin-everywhere');
  const unicoinFiles = fs.readdirSync(unicoinDir).filter(f => 
    ['.jpg', '.jpeg', '.png', '.gif'].includes(path.extname(f).toLowerCase())
  );
  
  unicoinFiles.forEach(file => {
    const filePath = path.join(unicoinDir, file);
    const nameWithoutExt = path.basename(file, path.extname(file));
    uploads.push({
      filePath,
      publicId: `blacro/unicoin-everywhere/${nameWithoutExt}`,
      description: `unicoin-everywhere/${file}`
    });
  });
  
  console.log(`\n📸 Total de imágenes a subir: ${uploads.length}\n`);
  
  // Subir todas las imágenes
  const results = { success: [], failed: [] };
  
  for (let i = 0; i < uploads.length; i++) {
    const upload = uploads[i];
    console.log(`[${i + 1}/${uploads.length}] Subiendo: ${upload.description}`);
    console.log(`  → Cloudinary path: ${upload.publicId}`);
    
    const result = await uploadImage(upload.filePath, upload.publicId);
    
    if (result.success) {
      console.log(`  ✅ Subida exitosa\n`);
      results.success.push(result);
    } else {
      console.log(`  ❌ Error: ${result.error}\n`);
      results.failed.push(result);
    }
    
    // Pequeña pausa
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  // Resumen
  console.log('\n📊 RESUMEN:');
  console.log(`✅ Exitosas: ${results.success.length}`);
  console.log(`❌ Fallidas: ${results.failed.length}`);
  
  if (results.failed.length > 0) {
    console.log('\n❌ Archivos que fallaron:');
    results.failed.forEach(f => {
      console.log(`  - ${f.filePath}`);
    });
  }
}

uploadRemainingImages().catch(console.error);
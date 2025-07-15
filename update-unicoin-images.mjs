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
      invalidate: true,
      resource_type: 'auto',
      unique_filename: false,
      use_filename: true
    });
    return { success: true, url: result.secure_url, publicId: result.public_id };
  } catch (error) {
    return { success: false, error: error.message, filePath };
  }
}

async function updateUnicoinImages() {
  console.log('🚀 Actualizando imágenes de Unicoin en Cloudinary...\n');
  
  const unicoinDir = path.join(__dirname, 'public/unicoin');
  const files = fs.readdirSync(unicoinDir).filter(f => 
    ['.jpg', '.jpeg', '.png', '.gif'].includes(path.extname(f).toLowerCase())
  );
  
  console.log(`📸 Encontradas ${files.length} imágenes para actualizar\n`);
  
  const results = { success: [], failed: [] };
  
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const filePath = path.join(unicoinDir, file);
    const nameWithoutExt = path.basename(file, path.extname(file));
    const publicId = `blacro/unicoin/${nameWithoutExt}`;
    
    console.log(`[${i + 1}/${files.length}] Actualizando: ${file}`);
    console.log(`  → Cloudinary path: ${publicId}`);
    
    const result = await uploadImage(filePath, publicId);
    
    if (result.success) {
      console.log(`  ✅ Actualización exitosa\n`);
      results.success.push({ file, publicId: result.publicId });
    } else {
      console.log(`  ❌ Error: ${result.error}\n`);
      results.failed.push({ file, error: result.error });
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
      console.log(`  - ${f.file}: ${f.error}`);
    });
  }
  
  // Mostrar las imágenes actualizadas
  console.log('\n📁 Imágenes actualizadas:');
  results.success.forEach(item => {
    console.log(`  - ${item.publicId}`);
  });
}

updateUnicoinImages().catch(console.error);
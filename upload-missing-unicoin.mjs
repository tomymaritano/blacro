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

async function uploadMissingImages() {
  console.log('🚀 Subiendo imágenes faltantes de Unicoin Everywhere...\n');
  
  const missingFiles = ['unicoin-13.png', 'unicoin-14.png'];
  
  for (const file of missingFiles) {
    const filePath = path.join(__dirname, 'public/unicoin-everywhere', file);
    const nameWithoutExt = path.basename(file, path.extname(file));
    const publicId = `blacro/unicoin-everywhere/${nameWithoutExt}`;
    
    console.log(`Subiendo: ${file}`);
    console.log(`  → Cloudinary path: ${publicId}`);
    
    const result = await uploadImage(filePath, publicId);
    
    if (result.success) {
      console.log(`  ✅ Subida exitosa\n`);
    } else {
      console.log(`  ❌ Error: ${result.error}\n`);
    }
  }
}

uploadMissingImages().catch(console.error);
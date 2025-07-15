import cloudinary from 'cloudinary';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

cloudinary.v2.config({
  cloud_name: 'dm9driroe',
  api_key: '257842957393834',
  api_secret: 'DlKrU9_EZUkvoKkouJG-4gmj9HA'
});

async function uploadLogo(filePath, publicId) {
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

async function updateLondonLogo() {
  console.log('🚀 Actualizando logo london.svg en Cloudinary...\n');
  
  const logoPath = path.join(__dirname, 'public/logos/london.svg');
  const publicId = 'blacro/logos/london';
  
  console.log(`📸 Actualizando: london.svg`);
  console.log(`  → Cloudinary path: ${publicId}`);
  
  const result = await uploadLogo(logoPath, publicId);
  
  if (result.success) {
    console.log(`  ✅ Actualización exitosa\n`);
    console.log(`📁 Logo actualizado: ${result.publicId}`);
    console.log(`🔗 URL: ${result.url}`);
  } else {
    console.log(`  ❌ Error: ${result.error}\n`);
  }
}

updateLondonLogo().catch(console.error);
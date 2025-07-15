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

// Remaining files from public
const remainingPublicFiles = [
  { file: 'myrica-1.gif', folder: 'projects/myrica' },
  { file: 'myrica-2.gif', folder: 'projects/myrica' },
  { file: 'youtube.svg', folder: 'projects/logos' }
  // next.svg is a Next.js file, we'll keep it
];

// Function to find and upload all images from the images directory
async function findAndUploadImages() {
  const imagesDir = './public/images';
  const allUploads = [];
  
  if (fs.existsSync(imagesDir)) {
    const scanDirectory = (dir, basePath = '') => {
      const items = fs.readdirSync(dir);
      
      for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          scanDirectory(fullPath, path.join(basePath, item));
        } else if (item.match(/\.(jpg|jpeg|png|gif|svg|webp)$/i)) {
          const relativePath = path.join(basePath, item);
          const cloudinaryPath = `blacro-portfolio/projects/${relativePath.replace(/\\/g, '/')}`;
          
          allUploads.push({
            localPath: fullPath,
            cloudinaryPath: cloudinaryPath.replace(/\.[^.]+$/, ''), // Remove extension
            resourceType: 'image'
          });
        }
      }
    };
    
    scanDirectory(imagesDir);
  }
  
  // Add remaining public files
  for (const item of remainingPublicFiles) {
    const localPath = `./public/${item.file}`;
    if (fs.existsSync(localPath)) {
      allUploads.push({
        localPath,
        cloudinaryPath: `blacro-portfolio/${item.folder}/${item.file.replace(/\.[^.]+$/, '')}`,
        resourceType: 'image'
      });
    }
  }
  
  console.log(`🔍 Found ${allUploads.length} images to upload...\n`);
  
  let successCount = 0;
  let errorCount = 0;
  
  for (const upload of allUploads) {
    try {
      console.log(`📤 Uploading: ${upload.localPath}`);
      console.log(`   → ${upload.cloudinaryPath}`);
      
      const result = await cloudinary.v2.uploader.upload(upload.localPath, {
        public_id: upload.cloudinaryPath,
        resource_type: upload.resourceType,
        overwrite: true,
        quality: 'auto:good'
      });
      
      console.log(`✅ Success: ${result.secure_url}\n`);
      successCount++;
      
    } catch (error) {
      console.error(`❌ Error uploading ${upload.localPath}:`, error.message);
      errorCount++;
    }
  }
  
  console.log(`\n📊 Upload Summary:`);
  console.log(`   ✅ Successful: ${successCount}`);
  console.log(`   ❌ Failed: ${errorCount}`);
  console.log(`   📁 Total: ${allUploads.length}`);
}

findAndUploadImages().catch(console.error);
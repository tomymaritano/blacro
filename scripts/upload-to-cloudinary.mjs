import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Configure Cloudinary
cloudinary.config({
  cloud_name: 'dm9driroe',
  api_key: '257842957393834',
  api_secret: 'DlKrU9_EZUkvoKkouJG-4gmj9HA'
});

async function uploadToCloudinary() {
  console.log('🚀 Starting upload to Cloudinary...');
  
  try {
    let uploadCount = 0;
    const errors = [];
    
    // Function to upload images recursively
    async function uploadFromDirectory(dirPath, folderPrefix = '') {
      const items = fs.readdirSync(dirPath, { withFileTypes: true });
      
      for (const item of items) {
        const itemPath = path.join(dirPath, item.name);
        
        if (item.isDirectory()) {
          const newFolderPrefix = folderPrefix ? `${folderPrefix}/${item.name}` : item.name;
          await uploadFromDirectory(itemPath, newFolderPrefix);
        } else if (item.isFile() && (item.name.endsWith('.jpg') || item.name.endsWith('.png') || item.name.endsWith('.jpeg'))) {
          try {
            // Create public_id (remove extension)
            const nameWithoutExt = item.name.replace(/\.[^/.]+$/, '');
            const publicId = folderPrefix ? `${folderPrefix}/${nameWithoutExt}` : nameWithoutExt;
            
            console.log(`📤 Uploading ${item.name}...`);
            
            const result = await cloudinary.uploader.upload(itemPath, {
              public_id: publicId,
              folder: 'blacro-portfolio',
              resource_type: 'image',
              quality: 'auto:good'
            });
            
            uploadCount++;
            console.log(`✅ Uploaded: ${publicId} (${(result.bytes / 1024).toFixed(1)}KB)`);
            
          } catch (error) {
            console.error(`❌ Failed to upload ${item.name}:`, error.message);
            errors.push({ file: item.name, error: error.message });
          }
        }
      }
    }
    
    // Start upload from images directory
    const imagesDir = path.join(__dirname, '../public/images');
    await uploadFromDirectory(imagesDir);
    
    console.log('\n✅ Upload to Cloudinary complete!');
    console.log(`📊 Total files uploaded: ${uploadCount}`);
    
    if (errors.length > 0) {
      console.log(`⚠️  Errors: ${errors.length}`);
      errors.forEach(({ file, error }) => {
        console.log(`   - ${file}: ${error}`);
      });
    }
    
    console.log('\n📋 Next steps:');
    console.log('1. Check your Cloudinary dashboard: https://cloudinary.com/console');
    console.log('2. Your images are now available via Cloudinary CDN');
    console.log('3. The OptimizedImage component will now use Cloudinary in production');
    
  } catch (error) {
    console.error('❌ Error during upload:', error);
  }
}

uploadToCloudinary();
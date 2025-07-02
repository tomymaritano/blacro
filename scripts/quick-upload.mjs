import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

// Configure Cloudinary
cloudinary.config({
  cloud_name: 'dm9driroe',
  api_key: '257842957393834',
  api_secret: 'DlKrU9_EZUkvoKkouJG-4gmj9HA'
});

async function quickUpload() {
  console.log('🚀 Quick upload test - uploading a few key images...');
  
  const testImages = [
    'public/images/myrica/myricacover.png',
    'public/images/unicoin/campaign-01.jpg',
    'public/images/londonfashionweek/london-fashion-week-01.png'
  ];
  
  try {
    for (const imagePath of testImages) {
      if (fs.existsSync(imagePath)) {
        const filename = imagePath.split('/').pop();
        const nameWithoutExt = filename.replace(/\.[^/.]+$/, '');
        
        console.log(`📤 Uploading ${filename}...`);
        
        const result = await cloudinary.uploader.upload(imagePath, {
          public_id: `test/${nameWithoutExt}`,
          resource_type: 'image',
          quality: 'auto:good'
        });
        
        console.log(`✅ Uploaded: ${result.public_id}`);
        console.log(`🔗 URL: ${result.secure_url}`);
      }
    }
    
    console.log('\n✅ Quick upload test complete!');
    console.log('🌐 Check your Cloudinary dashboard: https://cloudinary.com/console');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

quickUpload();